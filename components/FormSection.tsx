import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      {/* Colored Top Border for Emphasis */}
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      
      <div className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-slate-500 text-sm md:text-base mb-6 leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-6">
          {children}
        </div>
      </div>
    </div>
  );
};