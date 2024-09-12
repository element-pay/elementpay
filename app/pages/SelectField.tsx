import React from "react";

interface SelectFieldProps {
  id: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
  defaultValue?: string;
  formMethods: any; // react-hook-form methods
  validation?: object;
  error?: any;
  disabled?: boolean;
}

export const SelectField = ({
  id,
  label,
  options,
  defaultValue,
  formMethods,
  validation,
  error,
  disabled,
}: SelectFieldProps) => {
  const { register } = formMethods;

  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label} <span className="text-rose-500">*</span>
      </label>
      <select
        id={id}
        {...register(id, validation)}
        defaultValue={defaultValue}
        disabled={disabled}
        className="rounded border p-2"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};
