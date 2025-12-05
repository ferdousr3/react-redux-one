import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/lib/products/store/product.actions'
import { setSelectedProduct, setQuery } from '@/lib/products/store/product.reducer'
import type { RootState, AppDispatch } from '@/store/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Search, Lock, LogIn } from 'lucide-react'
import { Product } from '@/lib/products/models/product.model'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { DeleteConfirmDialog } from '@/components/shared/ConfirmDialog'

export function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, selectedProduct, deleting } = useSelector(
    (state: RootState) => state.products
  )
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
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

  useEffect(() => {
    dispatch(fetchProducts({ size: 12 }))
  }, [dispatch])

  // Check if user can modify a product
  const canModifyProduct = (product: Product) => {
    if (!isAuthenticated || !user) return false
    if (!product.creatorId) return true
    return product.creatorId === user.id
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    dispatch(setQuery({ search: value }))
    dispatch(fetchProducts({ search: value, size: 12 }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedProduct) {
      const result = await dispatch(updateProduct({ id: selectedProduct.id, data: formData }))
      if (updateProduct.fulfilled.match(result)) {
        toast.success('Product updated successfully')
      }
    } else {
      const result = await dispatch(createProduct(formData))
      if (createProduct.fulfilled.match(result)) {
        toast.success('Product created successfully')
      }
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (product: Product) => {
    if (!canModifyProduct(product)) {
      toast.error('You can only edit your own products')
      return
    }
    dispatch(setSelectedProduct(product))
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      image: product.image || '',
    })
    setIsDialogOpen(true)
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

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', stock: 0, image: '' })
    dispatch(setSelectedProduct(null))
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  return (
    <div className="container py-10 px-6 md:px-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-muted-foreground">Browse and manage products</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {isAuthenticated ? (
            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{selectedProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Product name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Price</label>
                      <Input
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Stock</label>
                      <Input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                      />
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
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Product description"
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={handleDialogClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      {selectedProduct ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="gap-2">
                <LogIn className="w-4 h-4" />
                Login to Add
              </Button>
            </Link>
          )}
        </div>
      </div>

      {loading && <div className="text-center py-20">Loading products...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const canModify = canModifyProduct(product)
          return (
            <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="aspect-square bg-slate-100 relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                  ${product.price}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="flex justify-between">
                  <span>Stock: {product.stock}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {product.description || 'No description'}
                </p>

                {/* Only show edit/delete if user is logged in AND owns the product */}
                {isAuthenticated && canModify ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteClick(product)}
                      className="flex-1"
                      disabled={deleting === product.id}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                ) : isAuthenticated ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                    <Lock className="w-4 h-4" />
                    <span>Not your product</span>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 py-2">
                    <LogIn className="w-4 h-4" />
                    Login to edit
                  </Link>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

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
