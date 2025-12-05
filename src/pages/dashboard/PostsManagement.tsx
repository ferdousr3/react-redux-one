import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { fetchPosts, createPost, updatePost, deletePost, clearError } from '@/lib/posts/store/post.reducer'
import { Post } from '@/lib/posts/models/post.model'
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

export function PostsManagement() {
   const dispatch = useDispatch<AppDispatch>()
   const { posts, loading, creating, updating, deleting, error, initialized } = useSelector(
      (state: RootState) => state.posts
   )
   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
   const [isOpen, setIsOpen] = useState(false)
   const [editingPost, setEditingPost] = useState<Post | null>(null)
   const [formData, setFormData] = useState({ title: '', content: '' })

   // Delete confirmation state
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
   const [postToDelete, setPostToDelete] = useState<Post | null>(null)

   // Only fetch on initial load (not initialized yet)
   useEffect(() => {
      if (!initialized) {
         dispatch(fetchPosts({}))
      }
   }, [dispatch, initialized])

   // Show error toast
   useEffect(() => {
      if (error) {
         toast.error(error)
         dispatch(clearError())
      }
   }, [error, dispatch])

   // Check if user can edit/delete a post (must be creator or no creatorId set)
   const canModifyPost = (post: Post) => {
      if (!isAuthenticated || !user) return false
      // If post has no creatorId, allow modification (legacy data)
      if (!post.creatorId) return true
      // Only creator can modify
      return post.creatorId === user.id
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (editingPost) {
         const result = await dispatch(updatePost({ id: editingPost.id, data: formData }))
         if (updatePost.fulfilled.match(result)) {
            toast.success('Post updated successfully')
            setIsOpen(false)
            setEditingPost(null)
            setFormData({ title: '', content: '' })
         }
      } else {
         const result = await dispatch(createPost(formData))
         if (createPost.fulfilled.match(result)) {
            toast.success('Post created successfully')
            setIsOpen(false)
            setFormData({ title: '', content: '' })
         }
      }
   }

   const handleEdit = (post: Post) => {
      if (!canModifyPost(post)) {
         toast.error('You can only edit your own posts')
         return
      }
      setEditingPost(post)
      setFormData({ title: post.title, content: post.content || '' })
      setIsOpen(true)
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

   const openNewDialog = () => {
      setEditingPost(null)
      setFormData({ title: '', content: '' })
      setIsOpen(true)
   }

   const handleRetry = () => {
      dispatch(fetchPosts({}))
   }

   if (loading && !initialized) {
      return <PageLoading message="Loading posts..." />
   }

   if (error && !initialized) {
      return <PageError message={error} onRetry={handleRetry} />
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
               <p className="text-gray-500 mt-1">Manage your blog posts</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                  <Button onClick={openNewDialog} disabled={!isAuthenticated}>
                     <Plus className="h-4 w-4 mr-2" />
                     New Post
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleSubmit}>
                     <DialogHeader>
                        <DialogTitle>
                           {editingPost ? 'Edit Post' : 'Create Post'}
                        </DialogTitle>
                        <DialogDescription>
                           {editingPost ? 'Update your post details' : 'Add a new blog post'}
                        </DialogDescription>
                     </DialogHeader>
                     <div className="space-y-4 py-4">
                        <div>
                           <label className="text-sm font-medium">Title</label>
                           <Input
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              placeholder="Post title"
                              required
                           />
                        </div>
                        <div>
                           <label className="text-sm font-medium">Content</label>
                           <Textarea
                              value={formData.content}
                              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                              placeholder="Write your post content..."
                              rows={5}
                           />
                        </div>
                     </div>
                     <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                           Cancel
                        </Button>
                        <Button type="submit" disabled={creating || updating}>
                           {(creating || updating) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                           {editingPost ? (updating ? 'Updating...' : 'Update') : (creating ? 'Creating...' : 'Create')}
                        </Button>
                     </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>All Posts</CardTitle>
            </CardHeader>
            <CardContent>
               {loading && initialized ? (
                  <TableLoading columns={4} rows={5} />
               ) : posts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No posts yet. Create your first post!</p>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Title</TableHead>
                           <TableHead>Content</TableHead>
                           <TableHead>Created</TableHead>
                           <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {posts.map((post: Post) => {
                           const canModify = canModifyPost(post)
                           return (
                              <TableRow key={post.id} className={deleting === post.id ? 'opacity-50' : ''}>
                                 <TableCell className="font-medium">{post.title}</TableCell>
                                 <TableCell className="max-w-xs truncate">
                                    {post.content || '-'}
                                 </TableCell>
                                 <TableCell>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                 </TableCell>
                                 <TableCell className="text-right">
                                    {canModify ? (
                                       <>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             onClick={() => handleEdit(post)}
                                             disabled={deleting === post.id}
                                          >
                                             <Pencil className="h-4 w-4" />
                                          </Button>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="text-red-600 hover:text-red-700"
                                             onClick={() => handleDeleteClick(post)}
                                             disabled={deleting === post.id}
                                          >
                                             {deleting === post.id ? (
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
            itemName={postToDelete ? `"${postToDelete.title}"` : 'this post'}
            onConfirm={handleDeleteConfirm}
            loading={deleting === postToDelete?.id}
         />
      </div>
   )
}
