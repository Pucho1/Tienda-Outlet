import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { AlertProps } from '../../interfaces/alertInterface';

const alertStyles = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-900',
    icon: 'text-green-500',
    IconComponent: CheckCircle
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-900',
    icon: 'text-red-500',
    IconComponent: AlertCircle
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-900',
    icon: 'text-amber-500',
    IconComponent: AlertTriangle
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-900',
    icon: 'text-blue-500',
    IconComponent: Info
  }
};

const Alert = ({ type = 'info', title, message, dismissible = true, onClose }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const style = alertStyles[type];
  const Icon = style.IconComponent;

  return (
    <div className={`
      rounded-lg border p-4 shadow-sm
      transition-all duration-300 ease-in-out
      ${style.container}
      w-full max-w-md mx-auto
      sm:max-w-lg md:max-w-xl lg:max-w-2xl
    `}>
      <div className="flex items-start gap-3">
        <Icon className={`flex-shrink-0 w-5 h-5 mt-0.5 ${style.icon}`} />

        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="font-semibold text-sm sm:text-base mb-1">
              {title}
            </h3>
          )}
          <p className="text-sm sm:text-base leading-relaxed">
            {message}
          </p>
        </div>

        {dismissible && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
            aria-label="Cerrar alerta"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
