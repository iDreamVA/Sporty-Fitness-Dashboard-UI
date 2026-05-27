import { useState, useEffect } from 'react';
import { Activity, Thermometer, Zap, Timer } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { TemperatureChart } from '../components/TemperatureChart';
import { GyroscopeVisualization } from '../components/GyroscopeVisualization';
import { AIAnalysis } from '../components/AIAnalysis';
import { ActivityChart } from '../components/ActivityChart';
import { useApp } from '../context/AppContext';

export function RealtimeDashboardPage() {
  const { t } = useApp();
  const [currentTemp, setCurrentTemp] = useState(36.8);
  const [gyroData, setGyroData] = useState({ pitch: 5, roll: -3, yaw: 2 });
  const [calories, setCalories] = useState(342);
  const [duration, setDuration] = useState(28);

  // Mock real-time temperature data
  const [tempData] = useState([
    { id: 'temp-0', time: '0min', temp: 36.5 },
    { id: 'temp-5', time: '5min', temp: 36.7 },
    { id: 'temp-10', time: '10min', temp: 36.9 },
    { id: 'temp-15', time: '15min', temp: 37.2 },
    { id: 'temp-20', time: '20min', temp: 37.4 },
    { id: 'temp-25', time: '25min', temp: 37.3 },
    { id: 'temp-30', time: '30min', temp: 36.8 },
  ]);

  // Mock gyroscope movement data
  const [activityData] = useState([
    { id: 'activity-0', time: '0min', x: 0.5, y: 0.3, z: 0.2 },
    { id: 'activity-5', time: '5min', x: 1.2, y: 0.8, z: 0.6 },
    { id: 'activity-10', time: '10min', x: 2.1, y: 1.5, z: 1.2 },
    { id: 'activity-15', time: '15min', x: 2.8, y: 2.2, z: 1.8 },
    { id: 'activity-20', time: '20min', x: 3.2, y: 2.6, z: 2.1 },
    { id: 'activity-25', time: '25min', x: 2.9, y: 2.3, z: 1.9 },
    { id: 'activity-30', time: '30min', x: 1.8, y: 1.4, z: 1.1 },
  ]);

  // AI insights with translations
  const insights = [
    {
      type: 'success' as const,
      title: t.insights.excellentCadence.title,
      description: t.insights.excellentCadence.description,
    },
    {
      type: 'warning' as const,
      title: t.insights.forwardLean.title,
      description: t.insights.forwardLean.description,
    },
    {
      type: 'info' as const,
      title: t.insights.temperatureRising.title,
      description: t.insights.temperatureRising.description,
    },
    {
      type: 'success' as const,
      title: t.insights.balancedFootStrike.title,
      description: t.insights.balancedFootStrike.description,
    },
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update temperature
      setCurrentTemp((prev) => {
        const change = (Math.random() - 0.5) * 0.2;
        return Math.max(36.0, Math.min(38.0, prev + change));
      });

      // Update gyroscope data
      setGyroData((prev) => ({
        pitch: prev.pitch + (Math.random() - 0.5) * 2,
        roll: prev.roll + (Math.random() - 0.5) * 2,
        yaw: prev.yaw + (Math.random() - 0.5) * 2,
      }));

      // Update calories and duration
      setCalories((prev) => prev + Math.floor(Math.random() * 3));
      setDuration((prev) => prev + 0.1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t.subtitle}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#FF7601]/20 px-4 py-2 rounded-full border border-[#FF7601]/30">
                <div className="w-2 h-2 bg-[#FF7601] rounded-full animate-pulse" />
                <span className="text-[#FF7601] text-sm font-semibold">{t.liveStatus}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title={t.bodyTemperature}
            value={currentTemp.toFixed(1)}
            unit={t.unit.celsius}
            icon={Thermometer}
            trend="up"
            trendValue="+0.3°C"
            color="#FF7601"
          />
          <MetricCard
            title={t.caloriesBurned}
            value={calories.toString()}
            unit={t.unit.kcal}
            icon={Zap}
            trend="up"
            trendValue="+12%"
            color="#00809D"
          />
          <MetricCard
            title={t.duration}
            value={duration.toFixed(1)}
            unit={t.unit.min}
            icon={Timer}
            trend="stable"
            trendValue={t.trend.onPace}
            color="#F3A26D"
          />
          <MetricCard
            title={t.activityLevel}
            value={t.activityLevels.high}
            unit=""
            icon={Activity}
            trend="up"
            trendValue="+8%"
            color="#00809D"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TemperatureChart data={tempData} title={t.temperatureChart} />
          <ActivityChart data={activityData} title={t.gyroscopeMovement} />
        </div>

        {/* 3D Visualization and AI Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GyroscopeVisualization
            pitch={gyroData.pitch}
            roll={gyroData.roll}
            yaw={gyroData.yaw}
            title={t.realTime3DMovement}
          />
          <AIAnalysis insights={insights} title={t.aiInsights} />
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800 text-center">
          <p className="text-gray-500 dark:text-zinc-500 text-sm">{t.footerText}</p>
        </footer>
      </div>
    </div>
  );
}
