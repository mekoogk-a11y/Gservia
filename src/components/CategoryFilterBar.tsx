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
          className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{lang === 'ar' ? 'جميع التصنيفات' : 'All Categories'}</span>
          <span 
            className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
              selectedCategory === 'all' 
                ? 'bg-white/20 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
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
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <ServiceIcon name={category.iconName} className="w-4 h-4" />
              <span>{title}</span>
              <span 
                className={`px-1.5 py-0.5 rounded-md text-[11px] font-bold ${
                  isSelected 
                    ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
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
