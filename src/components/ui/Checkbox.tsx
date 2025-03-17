import React from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';

export interface CustomCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultValue?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

export function CustomCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  defaultValue = false,
  className = '',
  onChange,
}: CustomCheckboxProps<T>) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as unknown as PathValue<T, Path<T>>}
        render={({ field: { onChange: fieldOnChange, value, ref } }) => (
          <div className="relative">
            <input
              type="checkbox"
              onChange={(e) => {
                fieldOnChange(e);
                onChange?.(e.target.checked);
              }}
              checked={value}
              ref={ref}
              id={name}
              className="sr-only"
            />
            <label
              htmlFor={name}
              className={`block w-3.5 h-3.5 rounded-full border cursor-pointer transition-colors duration-200 ${
                value ? 'border-[#454545]' : 'bg-transparent'
              }`}
            >
              {value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </label>
          </div>
        )}
      />
      {label && (
        <label htmlFor={name} className="text-sm cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
}