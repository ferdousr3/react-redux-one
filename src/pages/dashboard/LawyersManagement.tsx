import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { fetchLawyers, createLawyer, updateLawyer, deleteLawyer, clearError } from '@/lib/lawyers/store/lawyer.slice'
import { Lawyer } from '@/lib/lawyers/models/lawyer.model'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

export function LawyersManagement() {
   const dispatch = useDispatch<AppDispatch>()
   const { lawyers, loading, creating, updating, deleting, error, initialized } = useSelector(
      (state: RootState) => state.lawyers
   )
   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
   const [isOpen, setIsOpen] = useState(false)
   const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null)
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phoneNumber: '',
      lawyerType: '',
      instituteName: '',
      address: '',
   })

   // Delete confirmation state
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
   const [lawyerToDelete, setLawyerToDelete] = useState<Lawyer | null>(null)

   // Only fetch on initial load
   useEffect(() => {
      if (!initialized) {
         dispatch(fetchLawyers({}))
      }
   }, [dispatch, initialized])

   // Show error toast
   useEffect(() => {
      if (error) {
         toast.error(error)
         dispatch(clearError())
      }
   }, [error, dispatch])

   // Check if user can edit/delete - for now allow all authenticated users
   const canModifyLawyer = (_lawyer: Lawyer) => {
      return isAuthenticated && user !== null
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (editingLawyer) {
         const result = await dispatch(updateLawyer({ id: editingLawyer.id, data: formData }))
         if (updateLawyer.fulfilled.match(result)) {
            toast.success('Lawyer updated successfully')
            setIsOpen(false)
            setEditingLawyer(null)
            resetForm()
         }
      } else {
         const result = await dispatch(createLawyer(formData))
         if (createLawyer.fulfilled.match(result)) {
            toast.success('Lawyer created successfully')
            setIsOpen(false)
            resetForm()
         }
      }
   }

   const resetForm = () => {
      setFormData({ name: '', email: '', phoneNumber: '', lawyerType: '', instituteName: '', address: '' })
   }

   const handleEdit = (lawyer: Lawyer) => {
      if (!canModifyLawyer(lawyer)) {
         toast.error('You must be logged in to edit lawyers')
         return
      }
      setEditingLawyer(lawyer)
      setFormData({
         name: lawyer.name,
         email: lawyer.email || '',
         phoneNumber: lawyer.phoneNumber || '',
         lawyerType: lawyer.lawyerType || '',
         instituteName: lawyer.instituteName || '',
         address: lawyer.address || '',
      })
      setIsOpen(true)
   }

   const handleDeleteClick = (lawyer: Lawyer) => {
      if (!canModifyLawyer(lawyer)) {
         toast.error('You must be logged in to delete lawyers')
         return
      }
      setLawyerToDelete(lawyer)
      setDeleteDialogOpen(true)
   }

   const handleDeleteConfirm = async () => {
      if (!lawyerToDelete) return

      const result = await dispatch(deleteLawyer(lawyerToDelete.id))
      if (deleteLawyer.fulfilled.match(result)) {
         toast.success('Lawyer deleted successfully')
         setDeleteDialogOpen(false)
         setLawyerToDelete(null)
      }
   }

   const openNewDialog = () => {
      setEditingLawyer(null)
      resetForm()
      setIsOpen(true)
   }

   const handleRetry = () => {
      dispatch(fetchLawyers({}))
   }

   if (loading && !initialized) {
      return <PageLoading message="Loading lawyers..." />
   }

   if (error && !initialized) {
      return <PageError message={error} onRetry={handleRetry} />
   }

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Lawyers</h1>
               <p className="text-gray-500 mt-1">Manage lawyer profiles</p>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
               <DialogTrigger asChild>
                  <Button onClick={openNewDialog} disabled={!isAuthenticated}>
                     <Plus className="h-4 w-4 mr-2" />
                     New Lawyer
                  </Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[500px]">
                  <form onSubmit={handleSubmit}>
                     <DialogHeader>
                        <DialogTitle>
                           {editingLawyer ? 'Edit Lawyer' : 'Add Lawyer'}
                        </DialogTitle>
                        <DialogDescription>
                           {editingLawyer ? 'Update lawyer details' : 'Add a new lawyer profile'}
                        </DialogDescription>
                     </DialogHeader>
                     <div className="space-y-4 py-4">
                        <div>
                           <label className="text-sm font-medium">Name *</label>
                           <Input
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Full name"
                              required
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-sm font-medium">Email</label>
                              <Input
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                 placeholder="email@example.com"
                              />
                           </div>
                           <div>
                              <label className="text-sm font-medium">Phone</label>
                              <Input
                                 value={formData.phoneNumber}
                                 onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                 placeholder="+1234567890"
                              />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-sm font-medium">Lawyer Type</label>
                              <Input
                                 value={formData.lawyerType}
                                 onChange={(e) => setFormData({ ...formData, lawyerType: e.target.value })}
                                 placeholder="e.g., Criminal, Civil"
                              />
                           </div>
                           <div>
                              <label className="text-sm font-medium">Institute</label>
                              <Input
                                 value={formData.instituteName}
                                 onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                                 placeholder="Law firm name"
                              />
                           </div>
                        </div>
                        <div>
                           <label className="text-sm font-medium">Address</label>
                           <Input
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              placeholder="Office address"
                           />
                        </div>
                     </div>
                     <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                           Cancel
                        </Button>
                        <Button type="submit" disabled={creating || updating}>
                           {(creating || updating) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                           {editingLawyer ? (updating ? 'Updating...' : 'Update') : (creating ? 'Creating...' : 'Create')}
                        </Button>
                     </DialogFooter>
                  </form>
               </DialogContent>
            </Dialog>
         </div>

         <Card>
            <CardHeader>
               <CardTitle>All Lawyers</CardTitle>
            </CardHeader>
            <CardContent>
               {loading && initialized ? (
                  <TableLoading columns={5} rows={5} />
               ) : lawyers.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No lawyers yet. Add your first lawyer!</p>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Name</TableHead>
                           <TableHead>Type</TableHead>
                           <TableHead>Email</TableHead>
                           <TableHead>Phone</TableHead>
                           <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {lawyers.map((lawyer: Lawyer) => {
                           const canModify = canModifyLawyer(lawyer)
                           return (
                              <TableRow key={lawyer.id} className={deleting === lawyer.id ? 'opacity-50' : ''}>
                                 <TableCell className="font-medium">{lawyer.name}</TableCell>
                                 <TableCell>{lawyer.lawyerType || '-'}</TableCell>
                                 <TableCell>{lawyer.email || '-'}</TableCell>
                                 <TableCell>{lawyer.phoneNumber || '-'}</TableCell>
                                 <TableCell className="text-right">
                                    {canModify ? (
                                       <>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             onClick={() => handleEdit(lawyer)}
                                             disabled={deleting === lawyer.id}
                                          >
                                             <Pencil className="h-4 w-4" />
                                          </Button>
                                          <Button
                                             variant="ghost"
                                             size="sm"
                                             className="text-red-600 hover:text-red-700"
                                             onClick={() => handleDeleteClick(lawyer)}
                                             disabled={deleting === lawyer.id}
                                          >
                                             {deleting === lawyer.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                             ) : (
                                                <Trash2 className="h-4 w-4" />
                                             )}
                                          </Button>
                                       </>
                                    ) : (
                                       <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                          <Lock className="h-3 w-3" />
                                          Login required
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
            itemName={lawyerToDelete ? `"${lawyerToDelete.name}"` : 'this lawyer'}
            onConfirm={handleDeleteConfirm}
            loading={deleting === lawyerToDelete?.id}
         />
      </div>
   )
}
