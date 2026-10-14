import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium uppercase tracking-wider text-deep-chocolate/80"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3.5 text-cocoa-brown/60 pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full bg-white/70 hover:bg-white/90 focus:bg-white text-deep-chocolate text-sm font-medium rounded-2xl border transition-all duration-200 outline-none py-3 ${
              icon ? 'pl-10 pr-4' : 'px-4'
            } ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-latte-beige/70 focus:border-cocoa-brown focus:ring-2 focus:ring-cocoa-brown/20'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span
            id={errorId}
            role="alert"
            className="text-xs text-red-700 font-medium pl-1 animate-fadeIn"
          >
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-xs text-deep-chocolate/60 pl-1">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
