import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

interface TemperatureChartProps {
  data: Array<{ time: string; temp: number }>;
  title?: string;
}

export function TemperatureChart({ data, title = 'Body Temperature' }: TemperatureChartProps) {
  return (
    <motion.div
      key="temperature-chart-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-6 text-white">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="time"
            stroke="#71717a"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#71717a"
            style={{ fontSize: '12px' }}
            domain={[35, 39]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#FF7601"
            strokeWidth={3}
            dot={{ fill: '#FF7601', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
