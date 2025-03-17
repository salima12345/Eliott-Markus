import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-[#2e2e2e] outline-none py-3 transition-all resize-none placeholder:text-[#454545] placeholder:text-[25px]"
      />
    );
  }
);

// Add display name for better debugging
TextArea.displayName = 'TextArea';