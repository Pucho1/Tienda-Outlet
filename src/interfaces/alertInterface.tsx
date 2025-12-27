type AlertType = 'success' | 'error' | 'warning' | 'info';


export interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  dismissible?: boolean;
  onClose?: () => void;
}
