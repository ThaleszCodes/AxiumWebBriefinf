import React from 'react';

// --- Types ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  error?: string;
  allowOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

// --- Components ---

export const TextField: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <input
      className={`w-full px-4 py-2 rounded-md border ${
        error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-500'
      } focus:outline-none focus:ring-2 transition-all duration-200 placeholder:text-slate-400`}
      {...props}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export const TextAreaField: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      className={`w-full px-4 py-2 rounded-md border min-h-[100px] ${
        error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-500'
      } focus:outline-none focus:ring-2 transition-all duration-200 placeholder:text-slate-400`}
      {...props}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  error,
  allowOther,
  otherValue,
  onOtherChange,
}) => {
  const isOtherSelected = selectedValue === 'Outro';

  return (
    <div className="mb-6">
      <label className="block text-base font-medium text-slate-800 mb-3">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedValue === option.value
                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
            />
            <span className="ml-3 text-sm">{option.label}</span>
          </label>
        ))}

        {allowOther && (
          <div className="mt-2">
             <label
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                isOtherSelected
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <input
                type="radio"
                name={name}
                value="Outro"
                checked={isOtherSelected}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm">Outro</span>
            </label>
            
            {isOtherSelected && (
              <input
                type="text"
                value={otherValue || ''}
                onChange={(e) => onOtherChange && onOtherChange(e.target.value)}
                placeholder="Descreva aqui..."
                className="mt-2 w-full px-4 py-2 text-sm border-b-2 border-indigo-300 focus:border-indigo-600 bg-transparent outline-none transition-colors"
                autoFocus
              />
            )}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};