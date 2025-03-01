'use client'
import { ModalOverlay, Modal, Dialog } from 'react-aria-components'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function PageModal({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <ModalOverlay
      isOpen
      className="flex justify-center items-center bg-opacity-40 bg-gray-900 absolute top-0 left-0 w-full h-full"
    >
      <Modal className={cn('bg-white text-black p-6 rounded-lg relative', className)}>
        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => router.back()}>
          ✖
        </div>
        <Dialog className="outline-none mt-2">{children}</Dialog>
      </Modal>
    </ModalOverlay>
  )
}
