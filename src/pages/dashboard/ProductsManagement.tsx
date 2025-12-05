import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { fetchProducts, createProduct, updateProduct, deleteProduct, clearError } from '@/lib/products/store/product.reducer'
import { Product } from '@/lib/products/models/product.model'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'
import { Plus, Pencil, Trash2, Loader2, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { PageLoading, TableLoading } from '@/components/shared/Loading'
import { PageError } from '@/components/shared/Error'
import { DeleteConfirmDialog } from '@/components/shared/ConfirmDialog'

export function ProductsManagement() {
   const dispatch = useDispatch<AppDispatch>()
   const { products, loading, creating, updating, deleting, error, initialized } = useSelector(
      (state: RootState) => state.products
   )
   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
   const [isOpen, setIsOpen] = useState(false)
   const [editingProduct, setEditingProduct] = useState<Product | null>(null)
   const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      stock: 0,
      image: '',
   })

   // Delete confirmation state
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
   const [productToDelete, setProductToDelete] = useState<Product | null>(null)

   // Only fetch on initial load
   useEffect(() => {
      if (!initialized) {
         dispatch(fetchProducts({}))
      }
   }, [dispatch, initialized])

   // Show error toast
   useEffect(() => {
      if (error) {
         toast.error(error)
         dispatch(clearError())
      }
   }, [error, dispatch])

   // Check if user can edit/delete a product
   const canModifyProduct = (product: Product) => {
      if (!isAuthenticated || !user) return false
      if (!product.creatorId) return true
      return product.creatorId === user.id
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (editingProduct) {
         const result = await dispatch(updateProduct({ id: editingProduct.id, data: formData }))
         if (updateProduct.fulfilled.match(result)) {
            toast.success('Product updated successfully')
            setIsOpen(false)
            setEditingProduct(null)
            resetForm()
         }
      } else {
         const result = await dispatch(createProduct(formData))
         if (createProduct.fulfilled.match(result)) {
            toast.success('Product created successfully')
            setIsOpen(false)
            resetForm()
         }
      }
   }

   const resetForm = () => {
      setFormData({ name: '', description: '', price: '', stock: 0, image: '' })
   }

   const handleEdit = (product: Product) => {
      if (!canModifyProduct(product)) {
         toast.error('You can only edit your own products')
         return
      }
      setEditingProduct(product)
      setFormData({
         name: product.name,
         description: product.description || '',
         price: product.price,
         stock: product.stock,
         image: product.image || '',
      })
      setIsOpen(true)
   }

   const handleDeleteClick = (product: Product) => {
      if (!canModifyProduct(product)) {
         toast.error('You can only delete your own products')
         return
      }
      setProductToDelete(product)
      setDeleteDialogOpen(true)
   }

   const handleDeleteConfirm = async () => {
      if (!productToDelete) return

      const result = await dispatch(deleteProduct(productToDelete.id))
      if (deleteProduct.fulfilled.match(result)) {
         toast.success('Product deleted successfully')
         setDeleteDialogOpen(false)
         setProductToDelete(null)
      }
   }

   const openNewDialog = () => {
      setEditingProduct(null)
      resetForm()
      setIsOpen(true)
   }

   const handleRetry = () => {
      dispatch(fetchProducts({}))
   }

   if (loading && !initialized) {
      return <PageLoading message="Loading products..." />
   }

   if (error && !initialized) {
      return <PageError message={error} onRetry={handleRetry} />
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Products</h1>
               <p className="text-gray-500 mt-1">Manage your products</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                  <Button onClick={openNewDialog} disabled={!isAuthenticated}>
                     <Plus className="h-4 w-4 mr-2" />
                     New Product
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleSubmit}>
                     <DialogHeader>
                        <DialogTitle>
                           {editingProduct ? 'Edit Product' : 'Create Product'}
                        </DialogTitle>
                        <DialogDescription>
                           {editingProduct ? 'Update product details' : 'Add a new product'}
                        </DialogDescription>
                     </DialogHeader>
                     <div className="space-y-4 py-4">
                        <div>
                           <label className="text-sm font-medium">Name *</label>
                           <Input
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Product name"
                              required
                           />
                        </div>
                        <div>
                           <label className="text-sm font-medium">Description</label>
                           <Textarea
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              placeholder="Product description..."
                              rows={3}
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-sm font-medium">Price *</label>
                              <Input
                                 value={formData.price}
                                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                 placeholder="0.00"
                                 required
                              />
                           </div>
                           <div>
                              <label className="text-sm font-medium">Stock</label>
                              <Input
                                 type="number"
                                 value={formData.stock}
                                 onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                                 placeholder="0"
                              />
                           </div>
                        </div>
                        <div>
                           <label className="text-sm font-medium">Image URL</label>
                           <Input
                              value={formData.image}
                              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                              placeholder="https://..."
                           />
                        </div>
                     </div>
                     <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                           Cancel
                        </Button>
                        <Button type="submit" disabled={creating || updating}>
                           {(creating || updating) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                           {editingProduct ? (updating ? 'Updating...' : 'Update') : (creating ? 'Creating...' : 'Create')}
                        </Button>
                     </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>All Products</CardTitle>
            </CardHeader>
            <CardContent>
               {loading && initialized ? (
                  <TableLoading columns={5} rows={5} />
               ) : products.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No products yet. Add your first product!</p>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Name</TableHead>
                           <TableHead>Price</TableHead>
                           <TableHead>Stock</TableHead>
                           <TableHead>Created</TableHead>
                           <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {products.map((product: Product) => {
                           const canModify = canModifyProduct(product)
                           return (
                              <TableRow key={product.id} className={deleting === product.id ? 'opacity-50' : ''}>
                                 <TableCell className="font-medium">{product.name}</TableCell>
                                 <TableCell>${product.price}</TableCell>
                                 <TableCell>{product.stock}</TableCell>
                                 <TableCell>
                                    {new Date(product.createdAt).toLocaleDateString()}
                                 </TableCell>
                                 <TableCell className="text-right">
                                    {canModify ? (
                                       <>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             onClick={() => handleEdit(product)}
                                             disabled={deleting === product.id}
                                          >
                                             <Pencil className="h-4 w-4" />
                                          </Button>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="text-red-600 hover:text-red-700"
                                             onClick={() => handleDeleteClick(product)}
                                             disabled={deleting === product.id}
                                          >
                                             {deleting === product.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                             ) : (
                                                <Trash2 className="h-4 w-4" />
                                             )}
                                          </Button>
                                       </>
                                    ) : (
                                       <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                          <Lock className="h-3 w-3" />
                                          Not yours
                                       </span>
                                    )}
                                 </TableCell>
                              </TableRow>
                           )
                        })}
                     </TableBody>
                  </Table>
               )}
            </CardContent>
         </Card>

         {/* Delete Confirmation Modal */}
         <DeleteConfirmDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            itemName={productToDelete ? `"${productToDelete.name}"` : 'this product'}
            onConfirm={handleDeleteConfirm}
            loading={deleting === productToDelete?.id}
         />
      </div>
   )
}
