import React from "react";
import { observer } from "mobx-react-lite";

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const Modal: React.FC<ModalProps> = observer(
  ({ onClose, onConfirm, message }) => {
    // const { isOpenModalComfirm: isOpen } = staticStore;

    // if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
        <div className="bg-white rounded shadow-lg p-5">
          <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
          <p className="mb-4">{message}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
);
