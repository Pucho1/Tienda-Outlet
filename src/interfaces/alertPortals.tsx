type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertData {
  id: string;
  type: AlertType;
  title?: string;
  message: string;
  duration?: number;
}

export interface AlertPortalProps {
  alert: AlertData;
  onClose: (id: string) => void;
}


export interface AlertContextType {
  showAlert: (alert: Omit<AlertData, 'id'>) => void;
  hideAlert: (id: string) => void;
}