export type SensorStatus = 'normal' | 'warning' | 'danger';
export type ZoneStatus = 'active' | 'warning' | 'inactive';
export type AlertType = 'info' | 'warning' | 'success' | 'danger';

export interface SensorCardProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  target: number;
  color: string;
  status: SensorStatus;
  trend: number;
  history: number[];
  icon: string;
}

export interface Zone {
  id: string;
  name: string;
  crop: string;
  status: ZoneStatus;
  temp: number;
  humidity: number;
  health: number;
}

export interface Alert {
  id: number;
  type: AlertType;
  zone: string;
  message: string;
  detail: string;
  time: string;
}

export interface IrrigationSchedule {
  zone: string;
  crop: string;
  time: string;
  duration: number;
  volume: number;
  done: boolean;
  next?: boolean;
}
