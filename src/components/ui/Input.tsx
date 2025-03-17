import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  className?: string;
  error?: string;
  preventAutocomplete?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  placeholder, 
  className = '', 
  error,
  preventAutocomplete = true,
  name,
  ...props 
}, ref) => {
  // Generate unique name to prevent autocompletion
  const uniqueName = React.useMemo(() => 
    `${name || 'input'}_${Math.random().toString(36).slice(2, 11)}`, 
    [name]
  );

  return (
    <div className="w-full">
      {preventAutocomplete && (
        <input 
          type="text" 
          className="hidden" 
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="new-password" 
        />
      )}
      
      {/* Main input field */}
      <input
        {...props}
        ref={ref}
        name={uniqueName}
        autoComplete={preventAutocomplete ? "off" : "on"}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        data-form-type="other"
        aria-autocomplete="none"
        placeholder={placeholder}
        className={` 
          w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
          ${className}
          [&:-webkit-autofill]:bg-transparent
          [&:-webkit-autofill]:text-white
          [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#222222_inset]
          [&:-webkit-autofill]:[text-fill-color:white]
          [&:-webkit-autofill]:[-webkit-text-fill-color:white]
        `}
      />
      
      {/* Error message */}
      {error && (
        <p className="text-red-500 text-xs mt-1" aria-live="polite">{error}</p>
      )}
    </div>
  );
});

// Add display name for better debugging
Input.displayName = 'Input';