
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Loading...',
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}: AnimatedButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-medium transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'active:scale-95 hover:scale-105',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
  );

  const variantClasses = {
    primary: cn(
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg',
      'hover:from-blue-700 hover:to-purple-700 hover:shadow-xl',
      'focus:ring-blue-500'
    ),
    secondary: cn(
      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 shadow-md',
      'hover:from-gray-200 hover:to-gray-300 hover:shadow-lg',
      'focus:ring-gray-500'
    ),
    outline: cn(
      'border-2 border-blue-500 text-blue-600 bg-transparent',
      'hover:bg-blue-50 hover:border-blue-600',
      'focus:ring-blue-500'
    ),
    ghost: cn(
      'text-gray-600 bg-transparent',
      'hover:bg-gray-100 hover:text-gray-900',
      'focus:ring-gray-500'
    )
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-base rounded-xl',
    lg: 'px-8 py-3.5 text-lg rounded-2xl'
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <span className={cn('flex items-center gap-2', loading && 'opacity-0')}>
        {icon && iconPosition === 'left' && (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        {loading ? loadingText : children}
        {icon && iconPosition === 'right' && (
          <span className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
      </span>
    </button>
  );
}
