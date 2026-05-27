import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thermometer, Gauge, Droplets, Radio } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { TemperatureChart } from '../components/TemperatureChart';
import { GyroscopeVisualization } from '../components/GyroscopeVisualization';
import { ActivityChart } from '../components/ActivityChart';
import { useApp, SENSOR_ICON_MAP } from '../context/AppContext';

export function RealtimeDashboardPage() {
  const { t, connectedSensors, connectedSensorTypes } = useApp();
  const navigate = useNavigate();

  const hasTemp = connectedSensorTypes.includes('temperature');
  const hasGyro = connectedSensorTypes.includes('gyroscope');
  const hasHumidity = connectedSensorTypes.includes('humidity');
  const hasAnySensor = connectedSensors.length > 0;

  const [currentTemp, setCurrentTemp] = useState(36.8);
  const [currentHumidity, setCurrentHumidity] = useState(65);
  const [gyroData, setGyroData] = useState({ pitch: 5, roll: -3, yaw: 2 });

  const [tempData] = useState([
    { id: 'temp-0', time: '0min', temp: 36.5 },
    { id: 'temp-5', time: '5min', temp: 36.7 },
    { id: 'temp-10', time: '10min', temp: 36.9 },
    { id: 'temp-15', time: '15min', temp: 37.2 },
    { id: 'temp-20', time: '20min', temp: 37.4 },
    { id: 'temp-25', time: '25min', temp: 37.3 },
    { id: 'temp-30', time: '30min', temp: 36.8 },
  ]);

  const [activityData] = useState([
    { id: 'activity-0', time: '0min', x: 0.5, y: 0.3, z: 0.2 },
    { id: 'activity-5', time: '5min', x: 1.2, y: 0.8, z: 0.6 },
    { id: 'activity-10', time: '10min', x: 2.1, y: 1.5, z: 1.2 },
    { id: 'activity-15', time: '15min', x: 2.8, y: 2.2, z: 1.8 },
    { id: 'activity-20', time: '20min', x: 3.2, y: 2.6, z: 2.1 },
    { id: 'activity-25', time: '25min', x: 2.9, y: 2.3, z: 1.9 },
    { id: 'activity-30', time: '30min', x: 1.8, y: 1.4, z: 1.1 },
  ]);

  useEffect(() => {
    if (!hasAnySensor) return;
    const interval = setInterval(() => {
      if (hasTemp) {
        setCurrentTemp((prev) => {
          const change = (Math.random() - 0.5) * 0.2;
          return Math.max(36.0, Math.min(38.0, prev + change));
        });
      }
      if (hasHumidity) {
        setCurrentHumidity((prev) => {
          const change = (Math.random() - 0.5) * 2;
          return Math.max(30, Math.min(90, prev + change));
        });
      }
      if (hasGyro) {
        setGyroData((prev) => ({
          pitch: prev.pitch + (Math.random() - 0.5) * 2,
          roll: prev.roll + (Math.random() - 0.5) * 2,
          yaw: prev.yaw + (Math.random() - 0.5) * 2,
        }));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [hasAnySensor, hasTemp, hasHumidity, hasGyro]);

  // Empty state — no sensors
  if (!hasAnySensor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fffef5] to-[#f0ede0] dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white p-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Radio className="w-16 h-16 mx-auto mb-6 text-gray-300 dark:text-zinc-600" />
          <h2 className="text-2xl font-bold mb-3">{t.sensors.noSensorsConnected || 'No Sensors Connected'}</h2>
          <p className="text-gray-500 dark:text-zinc-400 mb-6">{t.sensors.noSensorsDesc || 'Add and connect sensors on the Sensor Configuration page to see live data here.'}</p>
          <button
            onClick={() => navigate('/sensors')}
            className="px-6 py-3 bg-gradient-to-r from-[#00809D] to-[#FF7601] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            {t.sensors.goToSensorPage || 'Configure Sensors'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef5] to-[#f0ede0] dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white p-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hasTemp && (
            <MetricCard
              title={t.bodyTemperature}
              value={currentTemp.toFixed(1)}
              unit={t.unit.celsius}
              icon={Thermometer}
              trend="up"
              trendValue="+0.3°C"
              color="#FF7601"
            />
          )}
          {hasHumidity && (
            <MetricCard
              title={t.sensors.humidity}
              value={currentHumidity.toFixed(0)}
              unit="%"
              icon={Droplets}
              trend="stable"
              trendValue={t.trend.onPace}
              color="#F3A26D"
            />
          )}
        </div>

        {/* Charts Grid */}
        {(hasTemp || hasGyro) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {hasTemp && <TemperatureChart data={tempData} title={t.temperatureChart} />}
            {hasGyro && <ActivityChart data={activityData} title={t.gyroscopeMovement} />}
          </div>
        )}

        {/* 3D Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hasGyro && (
            <GyroscopeVisualization
              pitch={gyroData.pitch}
              roll={gyroData.roll}
              yaw={gyroData.yaw}
              title={t.realTime3DMovement}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800 text-center">
          <p className="text-gray-500 dark:text-zinc-500 text-sm">{t.footerText}</p>
        </footer>
      </div>
    </div>
  );
}
