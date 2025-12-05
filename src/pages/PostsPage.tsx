import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, createPost, updatePost, deletePost } from '@/lib/posts/store/post.actions'
import { setSelectedPost } from '@/lib/posts/store/post.reducer'
import type { RootState, AppDispatch } from '@/store/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { PostInput } from '@/lib/posts/models/post.model'

export function PostsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, selectedPost } = useSelector((state: RootState) => state.posts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<PostInput>({
    userId: 1,
    title: '',
    body: '',
  })

  useEffect(() => {
    dispatch(fetchPosts({ limit: 20 }))
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPost) {
      await dispatch(updatePost({ id: selectedPost.id, data: formData }))
    } else {
      await dispatch(createPost(formData))
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (post: any) => {
    dispatch(setSelectedPost(post))
    setFormData({
      userId: post.userId,
      title: post.title,
      body: post.body,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await dispatch(deletePost(id))
    }
  }

  const resetForm = () => {
    setFormData({ userId: 1, title: '', body: '' })
    dispatch(setSelectedPost(null))
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  return (
    <div className="container py-10 px-6 md:px-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts Management</h1>
          <p className="text-muted-foreground">Create, read, update, and delete posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Body</label>
                <Textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Enter post content"
                  rows={5}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedPost ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading && <div className="text-center py-20">Loading posts...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription>User ID: {post.userId}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.body}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
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
