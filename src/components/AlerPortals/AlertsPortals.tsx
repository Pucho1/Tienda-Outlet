import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertPortalProps } from '../../interfaces/alertPortals';

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

export function AlertPortal({ alert, onClose }: AlertPortalProps) {
  const style = alertStyles[alert.type];
  const Icon = style.IconComponent;

  useEffect(() => {
    if (alert.duration) {
      const timer = setTimeout(() => {
        onClose(alert.id);
      }, alert.duration);

      return () => clearTimeout(timer);
    }
  }, [alert.id, alert.duration, onClose]);

  const portalRoot = document.getElementById('alert-portal-root');
  if (!portalRoot) return null;

  return createPortal(
    <div
      className={`pointer-events-auto rounded-lg border p-4 shadow-lg
      transition-all duration-300 ease-in-out
      animate-slide-in
      ${style.container}
      w-full max-w-sm
      mb-3
    `}>
      <div className="flex items-start gap-3">
        <Icon className={`flex-shrink-0 w-5 h-5 mt-0.5 ${style.icon}`} />

        <div className="flex-1 min-w-0">
          {alert.title && (
            <h3 className="font-semibold text-sm sm:text-base mb-1">
              {alert.title}
            </h3>
          )}
          <p className="text-sm sm:text-base leading-relaxed">
            {alert.message}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); console.log('Alert close click:', alert.id); onClose(alert.id); }}
          className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
          aria-label="Cerrar alerta"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>,
    portalRoot
  );
}
