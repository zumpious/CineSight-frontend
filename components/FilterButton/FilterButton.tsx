import React from 'react';
import { FilterButtonProps } from './FilterButton.types';

export default function FilterButton({ text, onClick, selected }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-2 h-6
        flex items-center justify-center
        rounded
        text-sm
        ${
          selected
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }
      `}
    >
      {text}
    </button>
  );
}