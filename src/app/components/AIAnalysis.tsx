import { motion } from 'motion/react';
import { Brain, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Insight {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
}

interface AIAnalysisProps {
  insights: Insight[];
  title?: string;
}

export function AIAnalysis({ insights, title = 'AI Running Form Analysis' }: AIAnalysisProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle2;
      case 'warning':
        return AlertCircle;
      default:
        return TrendingUp;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-[#00809D]';
      case 'warning':
        return 'text-[#FF7601]';
      default:
        return 'text-[#F3A26D]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(0, 128, 157, 0.2)' }}>
          <Brain className="w-6 h-6" style={{ color: '#00809D' }} />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = getIcon(insight.type);
          const colorClass = getColor(insight.type);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Icon className={`w-5 h-5 ${colorClass}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${colorClass}`}>{insight.title}</h4>
                  <p className="text-zinc-400 text-sm">{insight.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400 text-sm">Overall Performance Score</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-full"
                style={{ background: 'linear-gradient(to right, #00809D, #F3A26D)' }}
              />
            </div>
            <span className="font-bold" style={{ color: '#00809D' }}>85%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
