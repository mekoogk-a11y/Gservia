import React from 'react';
import { ServiceCategory, Language } from '../types';
import { ServiceIcon } from './ServiceIcon';
import { Layers } from 'lucide-react';

interface CategoryFilterBarProps {
  categories: ServiceCategory[];
  selectedCategory: string; // 'all' or category.id
  onSelectCategory: (id: string) => void;
  lang: Language;
  getCategoryCount: (id: string) => number;
  totalServicesCount: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  lang,
  getCategoryCount,
  totalServicesCount,
}) => {
  return (
    <div className="w-full mb-8">
      {/* Scrollable Container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        
        {/* 'All' Tab */}
        <button
          id="category-tab-all"
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 border-2 ${
            selectedCategory === 'all'
              ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20'
              : 'bg-[#0e0e0e] text-white border-[#262626] hover:border-yellow-400/50 hover:text-yellow-300'
          }`}
        >
          <Layers className={`w-4 h-4 ${selectedCategory === 'all' ? 'text-black' : 'text-yellow-400'}`} />
          <span>{lang === 'ar' ? 'جميع التصنيفات' : 'All Categories'}</span>
          <span 
            className={`px-1.5 py-0.5 rounded-md text-[11px] font-black ${
              selectedCategory === 'all' 
                ? 'bg-black text-yellow-400' 
                : 'bg-black text-white border border-[#333333]'
            }`}
          >
            {totalServicesCount}
          </span>
        </button>

        {/* Dynamic Category Tabs */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const count = getCategoryCount(category.id);
          const title = lang === 'ar' ? category.titleAr : category.titleEn;

          return (
            <button
              key={category.id}
              id={`category-tab-${category.id}`}
              onClick={() => onSelectCategory(category.id)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border-2 ${
                isSelected
                  ? 'bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20'
                  : 'bg-[#0e0e0e] text-white border-[#262626] hover:border-yellow-400/50 hover:text-yellow-300'
              }`}
            >
              <ServiceIcon name={category.iconName} className={`w-4 h-4 ${isSelected ? '!text-black' : 'text-yellow-400'}`} />
              <span>{title}</span>
              <span 
                className={`px-1.5 py-0.5 rounded-md text-[11px] font-black ${
                  isSelected 
                    ? 'bg-black text-yellow-400' 
                    : 'bg-black text-white border border-[#333333]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};
