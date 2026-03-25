export type SensorStatus = "normal" | "warning" | "danger";
export type ZoneStatus = "active" | "warning" | "inactive";
export type AlertType = "info" | "warning" | "success" | "danger";

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
