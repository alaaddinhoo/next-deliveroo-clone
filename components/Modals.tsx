import { X } from "lucide-react";
import React from "react";

interface Props {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ open, onClose, children }: Props) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center z-[999] 
        ${open ? "visible bg-black/50" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white max-w-[85vw] max-h-[95vh] md:max-w-[500px] md:max-h-none md:min-w-[500px] shadow  
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute z-50 top-2 right-6 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
