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
import { Plus, Edit, Trash2, Lock, LogIn } from 'lucide-react'
import { PostInput, Post } from '@/lib/posts/models/post.model'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { DeleteConfirmDialog } from '@/components/shared/ConfirmDialog'

export function PostsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, selectedPost, deleting } = useSelector((state: RootState) => state.posts)
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<PostInput>({
    title: '',
    content: '',
  })

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)

  useEffect(() => {
    dispatch(fetchPosts({ limit: 20 }))
  }, [dispatch])

  // Check if user can modify a post
  const canModifyPost = (post: Post) => {
    if (!isAuthenticated || !user) return false
    if (!post.creatorId) return true // Legacy data
    return post.creatorId === user.id
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPost) {
      const result = await dispatch(updatePost({ id: selectedPost.id, data: formData }))
      if (updatePost.fulfilled.match(result)) {
        toast.success('Post updated successfully')
      }
    } else {
      const result = await dispatch(createPost(formData))
      if (createPost.fulfilled.match(result)) {
        toast.success('Post created successfully')
      }
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (post: Post) => {
    if (!canModifyPost(post)) {
      toast.error('You can only edit your own posts')
      return
    }
    dispatch(setSelectedPost(post))
    setFormData({
      title: post.title,
      content: post.content || '',
    })
    setIsDialogOpen(true)
  }

  const handleDeleteClick = (post: Post) => {
    if (!canModifyPost(post)) {
      toast.error('You can only delete your own posts')
      return
    }
    setPostToDelete(post)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return
    const result = await dispatch(deletePost(postToDelete.id))
    if (deletePost.fulfilled.match(result)) {
      toast.success('Post deleted successfully')
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  const resetForm = () => {
    setFormData({ title: '', content: '' })
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
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Posts
          </h1>
          <p className="text-muted-foreground">Read and explore all posts</p>
        </div>

        {isAuthenticated ? (
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
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
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter post content"
                    rows={5}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    {selectedPost ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          <Link to="/login">
            <Button variant="outline" className="gap-2">
              <LogIn className="w-4 h-4" />
              Login to Create
            </Button>
          </Link>
        )}
      </div>

      {loading && <div className="text-center py-20">Loading posts...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const canModify = canModifyPost(post)
          return (
            <Card key={post.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {post.content || 'No content'}
                </p>

                {/* Only show edit/delete if user is logged in AND owns the post */}
                {isAuthenticated && canModify ? (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteClick(post)}
                      disabled={deleting === post.id}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                ) : isAuthenticated ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Not your post</span>
                  </div>
                ) : (
                  <Link to="/login" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
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
        itemName={postToDelete ? `"${postToDelete.title}"` : 'this post'}
        onConfirm={handleDeleteConfirm}
        loading={deleting === postToDelete?.id}
      />
    </div>
  )
}
