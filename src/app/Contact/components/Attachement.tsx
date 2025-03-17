import React, { useState, useRef } from 'react';
import Image from "next/image";

interface AttachmentFieldProps {
  onFileSelect: (file: File | null) => void;
}

const AttachmentField: React.FC<AttachmentFieldProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="relative group">
      <div className=" bg-grayDark xl:w-[287px] w-full rounded-[26px] border border-[#2e2e2e]">
        <button
          type="button"
          className="w-full h-[50px] px-6 py-2 flex items-center justify-between"
          onClick={handleClick}
        >
          <p className={!selectedFile ? "text-[#454545]" : ""}>
            {selectedFile ? selectedFile.name : "Add attachment"}
          </p>
          <Image
            src="/images/icons/upload.svg"
            width={16}
            height={16}
            alt="Upload"
          />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
        />
      </div>
    </div>
  );
};

export default AttachmentField;