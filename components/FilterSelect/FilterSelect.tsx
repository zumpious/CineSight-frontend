import React from 'react';
import { FilterSelectProps } from './FilterSelect.types';

export default function FilterSelect<T extends string | number>({
  label,
  id,
  value,
  onChange,
  options,
  allLabel,
}: FilterSelectProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-3xl font-medium mb-2">
        {label}
      </label>
      <select
        id={id}
        value={value ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === '' ? null : (Number(val) as T));
        }}
        className="w-full p-2 border rounded text-black"
      >
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.toString()} value={option.toString()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}