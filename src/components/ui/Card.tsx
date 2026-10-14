import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cream' | 'chocolate' | 'glass';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'cream',
  className = '',
  ...props
}) => {
  const variantStyles = {
    cream: 'card-cream rounded-3xl p-6 sm:p-8',
    chocolate: 'glass-chocolate rounded-3xl p-6 sm:p-8',
    glass: 'glass-cream rounded-3xl p-6 sm:p-8 shadow-cocoa-sm',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
