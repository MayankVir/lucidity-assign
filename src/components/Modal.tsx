import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-custom-black/80 transition-opacity"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative inline-block transform overflow-hidden rounded-lg bg-custom-dark text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between border-b border-custom-forest pb-4">
              <h3 className="text-lg font-medium text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-300"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mt-4">{children}</div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              {onSave && (
                <button
                  type="button"
                  onClick={onSave}
                  className="rounded bg-custom-lime px-4 py-2 text-sm font-medium text-custom-black hover:bg-custom-lime/90"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill="currentColor"
    />
  </svg>
);

export default Modal;
