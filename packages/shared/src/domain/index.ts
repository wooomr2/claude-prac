/** 센서 타입 */
export type SensorType = 'temperature' | 'humidity' | 'co2' | 'light';

/** 센서 읽기값 */
export interface SensorReading {
  sensorId: string;
  type: SensorType;
  value: number;
  unit: string;
  recordedAt: string;
}

/** 재배 구역 */
export interface Zone {
  id: string;
  name: string;
  cropType: string;
  status: 'active' | 'idle' | 'maintenance';
}

/** 알림 심각도 */
export type AlertSeverity = 'info' | 'warning' | 'critical';

/** 알림 */
export interface Alert {
  id: string;
  severity: AlertSeverity;
  message: string;
  zoneId?: string;
  createdAt: string;
  resolvedAt?: string;
}
