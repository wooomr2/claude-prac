import { useEffect, useState } from 'react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AlertFeed from './components/AlertFeed';
import EnvironmentChart from './components/EnvironmentChart';
import IrrigationPanel from './components/IrrigationPanel';
import SensorCard from './components/SensorCard';
import ZoneGrid from './components/ZoneGrid';
import { CO2_HISTORY, HUMID_HISTORY, LIGHT_HISTORY, TEMP_HISTORY } from './data';
import type { ISensorCardProps, SensorStatus } from './types';

function getSensorStatus(
  value: number,
  warnLow: number,
  warnHigh: number,
  dangerLow: number,
  dangerHigh: number
): SensorStatus {
  if (value < dangerLow || value > dangerHigh) return 'danger';
  else return 'normal';
}

function clampedRandom(value: number, min: number, max: number, delta: number, decimals?: number): number {
  const raw = Math.max(min, Math.min(max, value + (Math.random() - 0.5) * delta));
  return decimals !== undefined ? parseFloat(raw.toFixed(decimals)) : Math.round(raw);
}

function DashboardPage() {
  const [temp, setTemp] = useState(24.3);
  const [humid, setHumid] = useState(67.5);
  const [co2, setCo2] = useState(842);
  const [light, setLight] = useState(35400);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setTemp((v) => clampedRandom(v, 20, 29, 0.2, 1));
      setHumid((v) => clampedRandom(v, 58, 78, 0.4, 1));
      setCo2((v) => clampedRandom(v, 750, 960, 8));
      setLight((v) => clampedRandom(v, 31000, 43000, 200));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const sensors: ISensorCardProps[] = [
    {
      label: '온도',
      value: temp,
      unit: '°C',
      min: 15,
      max: 35,
      target: 24,
      color: '#f59e0b',
      status: getSensorStatus(temp, 20, 28, 16, 32),
      trend: 0.3,
      history: TEMP_HISTORY,
      icon: '🌡',
    },
    {
      label: '습도',
      value: humid,
      unit: '%',
      min: 45,
      max: 90,
      target: 70,
      color: '#06b6d4',
      status: getSensorStatus(humid, 60, 80, 50, 88),
      trend: -1.2,
      history: HUMID_HISTORY,
      icon: '💧',
    },
    {
      label: 'CO₂ 농도',
      value: co2,
      unit: 'ppm',
      min: 400,
      max: 1200,
      target: 800,
      color: '#a78bfa',
      status: getSensorStatus(co2, 400, 900, 400, 1100),
      trend: 15,
      history: CO2_HISTORY,
      icon: '🌿',
    },
    {
      label: '광량',
      value: light,
      unit: 'lux',
      min: 0,
      max: 50000,
      target: 40000,
      color: '#fbbf24',
      status: getSensorStatus(light, 10000, 45000, 5000, 50000),
      trend: 200,
      history: LIGHT_HISTORY,
      icon: '☀',
    },
  ];

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: 'var(--sf-bg-page)', color: 'var(--sf-text-0)', fontFamily: 'Noto Sans KR, sans-serif' }}
    >
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar mobileOpen={false} onClose={() => setSidebarOpen(false)} />
        </div>
        <div className="md:hidden">
          <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-auto p-3 md:p-4 flex flex-col gap-3 md:gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 shrink-0">
              {sensors.map((s) => (
                <SensorCard key={s.label} {...s} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3 md:gap-4">
              <EnvironmentChart />
              <ZoneGrid />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 shrink-0">
              <IrrigationPanel />
              <AlertFeed />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardPage;
