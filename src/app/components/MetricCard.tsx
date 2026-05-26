import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: string;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  trendValue,
  color = '#10b981'
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} />
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-zinc-400 text-sm mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold" style={{ color }}>{value}</span>
            <span className="text-zinc-500 text-lg">{unit}</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-zinc-800/50">
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center gap-2 text-sm">
          <span className={`${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-zinc-400'}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
          <span className="text-zinc-500">vs last session</span>
        </div>
      )}
    </motion.div>
  );
}
