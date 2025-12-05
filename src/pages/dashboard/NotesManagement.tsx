import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { fetchNotes, createNote, updateNote, deleteNote, clearError } from '@/lib/notes/store/notes.slice'
import { Note } from '@/lib/notes/models/notes.model'
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

export function NotesManagement() {
   const dispatch = useDispatch<AppDispatch>()
   const { notes, loading, creating, updating, deleting, error, initialized } = useSelector(
      (state: RootState) => state.notes
   )
   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
   const [isOpen, setIsOpen] = useState(false)
   const [editingNote, setEditingNote] = useState<Note | null>(null)
   const [formData, setFormData] = useState({
      title: '',
      content: '',
   })

   // Delete confirmation state
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
   const [noteToDelete, setNoteToDelete] = useState<Note | null>(null)

   // Only fetch on initial load
   useEffect(() => {
      if (!initialized) {
         dispatch(fetchNotes({}))
      }
   }, [dispatch, initialized])

   // Show error toast
   useEffect(() => {
      if (error) {
         toast.error(error)
         dispatch(clearError())
      }
   }, [error, dispatch])

   // Check if user can edit/delete a note
   const canModifyNote = (note: Note) => {
      if (!isAuthenticated || !user) return false
      if (!note.creator) return true
      return note.creator.id === user.id
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (editingNote) {
         const result = await dispatch(updateNote({ id: editingNote.id, data: formData }))
         if (updateNote.fulfilled.match(result)) {
            toast.success('Note updated successfully')
            setIsOpen(false)
            setEditingNote(null)
            resetForm()
         }
      } else {
         const result = await dispatch(createNote(formData))
         if (createNote.fulfilled.match(result)) {
            toast.success('Note created successfully')
            setIsOpen(false)
            resetForm()
         }
      }
   }

   const resetForm = () => {
      setFormData({ title: '', content: '' })
   }

   const handleEdit = (note: Note) => {
      if (!canModifyNote(note)) {
         toast.error('You can only edit your own notes')
         return
      }
      setEditingNote(note)
      setFormData({
         title: note.title,
         content: note.content || '',
      })
      setIsOpen(true)
   }

   const handleDeleteClick = (note: Note) => {
      if (!canModifyNote(note)) {
         toast.error('You can only delete your own notes')
         return
      }
      setNoteToDelete(note)
      setDeleteDialogOpen(true)
   }

   const handleDeleteConfirm = async () => {
      if (!noteToDelete) return

      const result = await dispatch(deleteNote(noteToDelete.id))
      if (deleteNote.fulfilled.match(result)) {
         toast.success('Note deleted successfully')
         setDeleteDialogOpen(false)
         setNoteToDelete(null)
      }
   }

   const openNewDialog = () => {
      setEditingNote(null)
      resetForm()
      setIsOpen(true)
   }

   const handleRetry = () => {
      dispatch(fetchNotes({}))
   }

   if (loading && !initialized) {
      return <PageLoading message="Loading notes..." />
   }

   if (error && !initialized) {
      return <PageError message={error} onRetry={handleRetry} />
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
               <p className="text-gray-500 mt-1">Manage your personal notes</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                  <Button onClick={openNewDialog} disabled={!isAuthenticated}>
                     <Plus className="h-4 w-4 mr-2" />
                     New Note
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleSubmit}>
                     <DialogHeader>
                        <DialogTitle>
                           {editingNote ? 'Edit Note' : 'Create Note'}
                        </DialogTitle>
                        <DialogDescription>
                           {editingNote ? 'Update your note' : 'Add a new note'}
                        </DialogDescription>
                     </DialogHeader>
                     <div className="space-y-4 py-4">
                        <div>
                           <label className="text-sm font-medium">Title *</label>
                           <Input
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              placeholder="Note title"
                              required
                           />
                        </div>
                        <div>
                           <label className="text-sm font-medium">Content</label>
                           <Textarea
                              value={formData.content}
                              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                              placeholder="Write your note..."
                              rows={6}
                           />
                        </div>
                     </div>
                     <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                           Cancel
                        </Button>
                        <Button type="submit" disabled={creating || updating}>
                           {(creating || updating) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                           {editingNote ? (updating ? 'Updating...' : 'Update') : (creating ? 'Creating...' : 'Create')}
                        </Button>
                     </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>All Notes</CardTitle>
            </CardHeader>
            <CardContent>
               {loading && initialized ? (
                  <TableLoading columns={4} rows={5} />
               ) : notes.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No notes yet. Create your first note!</p>
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
                        {notes.map((note: Note) => {
                           const canModify = canModifyNote(note)
                           return (
                              <TableRow key={note.id} className={deleting === note.id ? 'opacity-50' : ''}>
                                 <TableCell className="font-medium">{note.title}</TableCell>
                                 <TableCell className="max-w-xs truncate">
                                    {note.content || '-'}
                                 </TableCell>
                                 <TableCell>
                                    {new Date(note.createdAt).toLocaleDateString()}
                                 </TableCell>
                                 <TableCell className="text-right">
                                    {canModify ? (
                                       <>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             onClick={() => handleEdit(note)}
                                             disabled={deleting === note.id}
                                          >
                                             <Pencil className="h-4 w-4" />
                                          </Button>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="text-red-600 hover:text-red-700"
                                             onClick={() => handleDeleteClick(note)}
                                             disabled={deleting === note.id}
                                          >
                                             {deleting === note.id ? (
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
            itemName={noteToDelete ? `"${noteToDelete.title}"` : 'this note'}
            onConfirm={handleDeleteConfirm}
            loading={deleting === noteToDelete?.id}
         />
      </div>
   )
}
