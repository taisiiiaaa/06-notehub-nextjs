'use client'
import styles from './Modal.module.css'
import { useEffect } from 'react'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div onClick={handleCloseModal} className={styles.backdrop} role='dialog' aria-modal='true'>
      <div className={styles.modal}>{children}</div>
    </div>
  )
}

export default Modal
