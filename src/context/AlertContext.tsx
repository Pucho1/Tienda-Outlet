import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

import { AlertPortal } from '../components/AlerPortals/AlertsPortals';
import { AlertContextType, AlertData } from '../interfaces/alertPortals';


const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  /**
   * Recibe un objeto con los datos de la alerta (tipo, título, mensaje, duración) y ...
   * ... agrega una nueva alerta al estado --> "Arreglo de alertas" con un ID único basado en la fecha y un número aleatorio.
   */
  const showAlert = useCallback((alert: Omit<AlertData, 'id'>) => {
    const id = `alert-${Date.now()}-${Math.random()}`;
    const newAlert: AlertData = {
      ...alert,
      id,
      duration: alert.duration ?? 5000
    };

    setAlerts(prev => [...prev, newAlert]);
  }, []);

  /**
   * Elimina una alerta del estado basado en su ID.
   */
  const hideAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <div
        id="alert-portal-root"
        className="fixed top-4 right-4 z-50 flex flex-col items-end pointer-events-none"
      >
        <div className="pointer-events-auto">
          {alerts.map(alert => (
            <AlertPortal
              key={alert.id}
              alert={alert}
              onClose={hideAlert}
            />
          ))}
        </div>
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
