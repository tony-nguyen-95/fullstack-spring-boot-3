import React from "react";

interface ImageHolderProps {
  imgSrcIncludeDomain: string;
  onCopy: (src: string) => void;
  onRemove: (src: string) => void;
}

export const ImageHolder: React.FC<ImageHolderProps> = ({
  imgSrcIncludeDomain,
  onCopy,
  onRemove,
}) => {
  return (
    <div className="relative group w-40 h-auto">
      <img
        src={imgSrcIncludeDomain}
        alt="Project"
        className="w-full h-auto transition-opacity duration-200"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50">
        <button
          type="button"
          onClick={() => onCopy(imgSrcIncludeDomain)}
          className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded mr-2"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={() => onRemove(imgSrcIncludeDomain)}
          className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
