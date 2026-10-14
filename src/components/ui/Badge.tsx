import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sage' | 'blush' | 'latte' | 'chocolate' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'latte',
  className = '',
}) => {
  const variantStyles = {
    sage: 'bg-sage-mist/80 text-deep-chocolate border border-sage-mist',
    blush: 'bg-blush-pink/60 text-deep-chocolate border border-blush-pink',
    latte: 'bg-latte-beige/50 text-deep-chocolate border border-latte-beige',
    chocolate: 'bg-deep-chocolate text-vanilla-cream',
    outline: 'border border-cocoa-brown/30 text-deep-chocolate bg-white/50',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
