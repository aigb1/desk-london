
import React from 'react';
import { CATEGORIES } from '../constants';

interface Props {
  onCategoryClick?: (id: string) => void;
}

const CategoryBar: React.FC<Props> = ({ onCategoryClick }) => {
  return (
    <div className="sticky top-0 z-50 bg-white pt-4 pb-2 border-b border-gray-100 shadow-sm md:shadow-none">
      <div className="max-w-7xl mx-auto px-6 overflow-x-auto hide-scrollbar flex items-center gap-10">
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => onCategoryClick?.(cat.id)}
            className="flex flex-col items-center gap-2 pb-3 border-b-2 border-transparent hover:border-gray-200 hover:text-black text-gray-500 transition-all min-w-max group"
          >
            <div className="group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <span className="text-xs font-medium">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
