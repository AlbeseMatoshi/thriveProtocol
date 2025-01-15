import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {ExclamationTriangleIcon, XMarkIcon} from "@heroicons/react/24/outline";

export function ConfirmDeleteModal({open, setOpen, onDelete }:{open:boolean, setOpen: (open: boolean) => void, onDelete: VoidFunction}) {
  return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
              </button>
            </div>
            <div className={'grid grid-cols-12'}>
              <div
                  className="col-span-1 mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
              </div>
              <div className={'col-span-11 mx-3'}>
                <AlertDialogTitle className={"text-base"}>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className={'mt-1'}>
                  You are about to remove an entry. Please note that this action will permanently delete the selected data.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
                className='bg-red-500 hover:bg-red-600'
                onClick={() => {
                  onDelete();
                }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}
