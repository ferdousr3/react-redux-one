import { toast as sonnerToast } from 'sonner'

export class ToastService {
   static success(message: string, description?: string) {
      sonnerToast.success(message, {
         description,
         duration: 4000,
      })
   }

   static error(message: string, description?: string) {
      sonnerToast.error(message, {
         description,
         duration: 5000,
      })
   }

   static warning(message: string, description?: string) {
      sonnerToast.warning(message, {
         description,
         duration: 4000,
      })
   }

   static info(message: string, description?: string) {
      sonnerToast.info(message, {
         description,
         duration: 4000,
      })
   }

   static loading(message: string, description?: string) {
      return sonnerToast.loading(message, {
         description,
      })
   }

   static promise<T>(
      promise: Promise<T>,
      messages: {
         loading: string
         success: string
         error: string
      }
   ) {
      return sonnerToast.promise(promise, messages)
   }

   static dismiss(toastId?: string | number) {
      sonnerToast.dismiss(toastId)
   }
}

// Export singleton instance
export const toast = ToastService
