import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchCategories,
} from '@/lib/products/store/product.actions'
import { setSelectedProduct, setQuery } from '@/lib/products/store/product.reducer'
import type { RootState, AppDispatch } from '@/store/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { ProductInput } from '@/lib/products/models/product.model'

export function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, loading, selectedProduct, categories } = useSelector(
    (state: RootState) => state.products
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState<ProductInput>({
    title: '',
    description: '',
    price: 0,
    brand: '',
    category: '',
  })

  useEffect(() => {
    dispatch(fetchProducts({ limit: 12 }))
    dispatch(fetchCategories())
  }, [dispatch])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    dispatch(setQuery({ search: value }))
    dispatch(fetchProducts({ search: value, limit: 12 }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedProduct) {
      await dispatch(updateProduct({ id: selectedProduct.id, data: formData }))
    } else {
      await dispatch(createProduct(formData))
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (product: any) => {
    dispatch(setSelectedProduct(product))
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(id))
    }
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', price: 0, brand: '', category: '' })
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
          <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
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
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>
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
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Product name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Brand</label>
                    <Input
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Brand name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Category"
                      required
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
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button type="submit">{selectedProduct ? 'Update' : 'Create'}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading && <div className="text-center py-20">Loading products...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="aspect-square bg-slate-100 relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                ${product.price}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{product.title}</CardTitle>
              <CardDescription className="flex justify-between">
                <span>{product.brand}</span>
                <span className="text-yellow-600">★ {product.rating}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {product.description}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(product)} className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
