import type { ZoneStatus, AlertType } from "./types";

export const TEMP_HISTORY = [
  21.2, 21.8, 22.1, 21.5, 20.9, 21.3, 22.4, 23.1, 23.8, 24.2, 24.5, 24.8, 25.1,
  24.7, 24.3, 24.1, 23.8, 23.5, 23.2, 22.9, 22.5, 22.1, 21.8, 24.3,
];
export const HUMID_HISTORY = [
  72, 71, 70, 69, 70, 71, 68, 67, 66, 67, 67, 66, 65, 66, 68, 68, 69, 70, 71,
  70, 71, 72, 71, 67,
];
export const CO2_HISTORY = [
  680, 700, 720, 730, 750, 770, 790, 810, 830, 840, 842, 838, 825, 820, 830,
  840, 842, 850, 845, 840, 838, 835, 840, 842,
];
export const LIGHT_HISTORY = [
  0, 0, 0, 0, 200, 4000, 14000, 24000, 32000, 37000, 40000, 41500, 42000, 41000,
  39000, 36000, 30000, 22000, 13000, 5000, 800, 0, 0, 0,
];

export const ZONES: {
  id: string;
  name: string;
  crop: string;
  status: ZoneStatus;
  temp: number;
  humidity: number;
  health: number;
}[] = [
  { id: "A", name: "구역 A", crop: "방울토마토", status: "active",   temp: 24.3, humidity: 68, health: 92 },
  { id: "B", name: "구역 B", crop: "로메인 상추", status: "active",  temp: 20.1, humidity: 72, health: 87 },
  { id: "C", name: "구역 C", crop: "딸기",        status: "warning", temp: 22.7, humidity: 62, health: 71 },
  { id: "D", name: "구역 D", crop: "파프리카",    status: "active",  temp: 25.8, humidity: 70, health: 95 },
  { id: "E", name: "구역 E", crop: "바질",        status: "active",  temp: 23.4, humidity: 75, health: 88 },
  { id: "F", name: "구역 F", crop: "오이",        status: "inactive",temp: 18.2, humidity: 55, health: 0  },
];

export const ALERTS: {
  id: number;
  type: AlertType;
  zone: string;
  message: string;
  detail: string;
  time: string;
}[] = [
  { id: 1, type: "warning", zone: "C",   message: "구역 C 습도 임계값 미달", detail: "현재 62%  |  권장 70% 이상",     time: "09:43" },
  { id: 2, type: "info",    zone: "A",   message: "구역 A 오전 관수 완료",   detail: "15분 운영 · 45L 공급",          time: "09:30" },
  { id: 3, type: "success", zone: "D",   message: "구역 D 수확 예정 (2일)",  detail: "파프리카 수확 가능 상태",        time: "09:15" },
  { id: 4, type: "warning", zone: "ALL", message: "CO₂ 농도 상승 감지",      detail: "현재 842 ppm  |  권장 800 이하", time: "09:00" },
  { id: 5, type: "info",    zone: "B",   message: "영양액 교체 3일 후 예정", detail: "EC 조정 및 pH 체크 권장",       time: "08:30" },
];

export const IRRIGATION: {
  zone: string;
  crop: string;
  time: string;
  duration: number;
  volume: number;
  done: boolean;
  next?: boolean;
}[] = [
  { zone: "A", crop: "방울토마토", time: "06:00", duration: 15, volume: 45, done: true  },
  { zone: "B", crop: "로메인 상추",time: "06:30", duration: 12, volume: 30, done: true  },
  { zone: "C", crop: "딸기",       time: "12:00", duration: 18, volume: 52, done: false, next: true },
  { zone: "D", crop: "파프리카",   time: "14:00", duration: 10, volume: 38, done: false },
  { zone: "E", crop: "바질",       time: "16:00", duration: 8,  volume: 22, done: false },
];
