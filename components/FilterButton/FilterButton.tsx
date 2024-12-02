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
        2xl:text-lg
        lg:text-sm
        sm:text-xs
        border-[0.5px]
        transition-colors
        ${
          selected
            ? 'bg-white text-black border-white'
            : 'bg-black text-white border-white hover:bg-white hover:text-black'
        }
      `}
    >
      {text}
    </button>
  );
}