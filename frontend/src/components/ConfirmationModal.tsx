import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;             
  description?: React.ReactNode; 
  cancelText?: string;          
  confirmText?: string;         
  confirmButtonColor?: string; 
  isLoading?: boolean;          
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelText,
  confirmText,
  confirmButtonColor = "bg-red-500 hover:bg-red-600",
  isLoading = false,
}) => {
  const { t } = useTranslation('modals');
  
  const defaultTitle = title ?? t('confirmationModal.title');
  const defaultDescription = description ?? t('confirmationModal.description');
  const defaultCancelText = cancelText ?? t('confirmationModal.cancel');
  const defaultConfirmText = confirmText ?? t('confirmationModal.confirm');
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-colors"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-bg-card shadow-2xl transition-all border border-border">
        
        <div className="bg-primary px-6 py-5 flex items-center justify-between">
          <h3 className="text-lg font-black tracking-wider text-white uppercase italic">
            {defaultTitle}
          </h3>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            aria-label={t('confirmationModal.closeAria')}
          >
            <span className="text-sm font-bold leading-none">✕</span>
          </button>
        </div>

        <div className="p-6">
          <div className="text-base text-text-main leading-relaxed transition-colors">
            {defaultDescription}
          </div>
        </div>

        <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-bg-body transition-colors">
          
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-xs font-bold tracking-widest text-text-muted uppercase hover:text-text-main transition-colors disabled:opacity-50"
          >
            {defaultCancelText}
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`min-w-[140px] rounded-xl px-5 py-2.5 text-xs font-bold tracking-widest text-white uppercase shadow-md active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center ${confirmButtonColor}`}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              defaultConfirmText
            )}
          </button>
        </div>

      </div>
    </div>
  );
};