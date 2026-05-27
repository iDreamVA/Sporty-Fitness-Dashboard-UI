import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'motion/react';
import { Thermometer, Gauge, Activity, Wifi, WifiOff, Trash2, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useIsMobile } from '../components/ui/use-mobile';

interface SensorNode {
  id: string;
  type: string;
  label: string;
  icon: any;
  color: string;
  x: number;
  y: number;
  connected: boolean;
  size?: 'small' | 'medium' | 'large';
}

interface SensorTemplate {
  type: string;
  label: string;
  icon: any;
  color: string;
  group?: string;
}

const SENSOR_TEMPLATES: SensorTemplate[] = [
  { type: 'temperature', label: 'Temperature', icon: Thermometer, color: '#FF7601' },
  { type: 'gyroscope', label: 'Gyroscope', icon: Gauge, color: '#00809D' },
  { type: 'heartRate', label: 'Heart Rate', icon: Activity, color: '#F3A26D' },
  {
    type: 'armGroup',
    label: 'Arm Sensors',
    icon: Activity,
    color: '#00809D',
    group: 'arm',
  },
  {
    type: 'backGroup',
    label: 'Back Sensors',
    icon: Activity,
    color: '#FF7601',
    group: 'back',
  },
  {
    type: 'legGroup',
    label: 'Leg Sensors',
    icon: Activity,
    color: '#F3A26D',
    group: 'leg',
  },
];

function SensorTemplate({ template }: { template: SensorTemplate }) {
  const { t } = useApp();
  const Icon = template.icon;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sensor',
    item: { template },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const labelMap: Record<string, string> = {
    temperature: t.sensors.temperature,
    gyroscope: t.sensors.gyroscope,
    heartRate: t.sensors.heartRate,
    armGroup: t.sensors.armSensors,
    backGroup: t.sensors.backSensors,
    legGroup: t.sensors.legSensors,
  };

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: 1.05 }}
      className={`p-4 bg-zinc-800 border-2 rounded-lg cursor-move transition-all ${
        isDragging ? 'opacity-50 border-dashed' : 'border-zinc-700'
      }`}
      style={{
        borderColor: isDragging ? template.color : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${template.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: template.color }} />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{labelMap[template.type] || template.label}</div>
          {template.group && (
            <div className="text-xs text-zinc-500 capitalize">{template.group}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SensorNode({
  node,
  onMove,
  onToggleConnection,
  onDelete,
}: {
  node: SensorNode;
  onMove: (id: string, x: number, y: number) => void;
  onToggleConnection: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { t } = useApp();
  const Icon = node.icon;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'node',
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const labelMap: Record<string, string> = {
    temperature: t.sensors.temperature,
    gyroscope: t.sensors.gyroscope,
    heartRate: t.sensors.heartRate,
    armGroup: t.sensors.armSensors,
    backGroup: t.sensors.backSensors,
    legGroup: t.sensors.legSensors,
  };

  return (
    <motion.div
      ref={drag}
      style={{
        position: 'absolute',
        left: node.x,
        top: node.y,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="bg-zinc-900 border-2 rounded-xl p-4 shadow-lg cursor-move min-w-[180px]"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      style={{
        borderColor: node.color,
        boxShadow: `0 0 20px ${node.color}40`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${node.color}20` }}
          >
            <Icon className="w-4 h-4" style={{ color: node.color }} />
          </div>
          <span className="font-medium text-sm">{labelMap[node.type] || node.label}</span>
        </div>
        <button
          onClick={() => onDelete(node.id)}
          className="p-1 hover:bg-zinc-800 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4 text-zinc-500 hover:text-red-500" />
        </button>
      </div>

      <button
        onClick={() => onToggleConnection(node.id)}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
          node.connected
            ? 'bg-[#00809D]/20 text-[#00809D] border border-[#00809D]/30'
            : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
        }`}
      >
        {node.connected ? (
          <>
            <Wifi className="w-4 h-4" />
            <span className="text-xs font-medium">{t.sensors.connected}</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span className="text-xs font-medium">{t.sensors.disconnected}</span>
          </>
        )}
      </button>
    </motion.div>
  );
}

function MobileSensorPicker({
  templates,
  onSelect,
  onClose,
}: {
  templates: SensorTemplate[];
  onSelect: (template: SensorTemplate) => void;
  onClose: () => void;
}) {
  const { t } = useApp();

  const labelMap: Record<string, string> = {
    temperature: t.sensors.temperature,
    gyroscope: t.sensors.gyroscope,
    heartRate: t.sensors.heartRate,
    armGroup: t.sensors.armSensors,
    backGroup: t.sensors.backSensors,
    legGroup: t.sensors.legSensors,
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Floating Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-zinc-900 border-t border-zinc-800 p-6 max-h-[80vh] overflow-y-auto"
      >
        <div className="max-w-md mx-auto">
          {/* Handle Bar */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-zinc-700 rounded-full" />
          </div>

          <h2 className="text-xl font-bold mb-1">{t.sensors.catalog || 'Select Sensor'}</h2>
          <p className="text-zinc-400 text-sm mb-6">{t.sensors.subtitle}</p>

          {/* Sensor Grid */}
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <motion.button
                  key={template.type}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onSelect(template);
                    onClose();
                  }}
                  className="p-4 rounded-2xl transition-all flex flex-col items-center gap-2"
                  style={{
                    backgroundColor: `${template.color}20`,
                    border: `2px solid ${template.color}40`,
                  }}
                  whileHover={{ scale: 1.05, borderColor: template.color }}
                >
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${template.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: template.color }} />
                  </div>
                  <span className="text-xs font-semibold text-center text-white">
                    {labelMap[template.type] || template.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function MobilePuzzleGrid({
  nodes,
  onToggleConnection,
  onDelete,
  onAddSensorClick,
  templates,
}: {
  nodes: SensorNode[];
  onToggleConnection: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSensorClick: () => void;
  templates: SensorTemplate[];
}) {
  const { t } = useApp();

  const labelMap: Record<string, string> = {
    temperature: t.sensors.temperature,
    gyroscope: t.sensors.gyroscope,
    heartRate: t.sensors.heartRate,
    armGroup: t.sensors.armSensors,
    backGroup: t.sensors.backSensors,
    legGroup: t.sensors.legSensors,
  };

  const getPuzzleHeight = (size?: string) => {
    switch (size) {
      case 'large':
        return 'min-h-[200px]';
      case 'medium':
        return 'min-h-[140px]';
      case 'small':
      default:
        return 'min-h-[100px]';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Bar with Add Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onAddSensorClick}
        className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 shadow-lg"
      >
        <Plus className="w-5 h-5" />
        <span>Add Sensor</span>
      </motion.button>

      {/* Puzzle Stack */}
      {nodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Gauge className="w-16 h-16 mx-auto mb-4 opacity-20 text-zinc-600" />
          <p className="text-zinc-500 text-sm">{t.sensors.dragInstruction}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${getPuzzleHeight(
                  node.size
                )} relative bg-gradient-to-br rounded-3xl p-5 cursor-pointer overflow-hidden group transition-all`}
                style={{
                  backgroundColor: node.color,
                  opacity: 0.92,
                  boxShadow: `0 8px 24px ${node.color}30`,
                }}
                whileHover={{ opacity: 1, scale: 1.02 }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-3xl" />

                {/* Delete Button - Top Right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(node.id);
                  }}
                  className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/20 rounded-full"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-2xl flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white">
                        {labelMap[node.type] || node.label}
                      </h3>
                      <p className="text-xs text-white/70">
                        {node.connected ? 'Connected' : 'Disconnected'}
                      </p>
                    </div>
                  </div>

                  {/* Connection Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleConnection(node.id);
                    }}
                    className={`mt-4 text-xs font-semibold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 w-full ${
                      node.connected
                        ? 'bg-white/30 text-white'
                        : 'bg-black/20 text-white/70 hover:bg-black/30'
                    }`}
                  >
                    {node.connected ? (
                      <>
                        <Wifi className="w-3 h-3" />
                        <span>{t.sensors.connected}</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3 h-3" />
                        <span>{t.sensors.disconnected}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Workspace({ nodes, onDrop, onMove, onToggleConnection, onDelete }: {
  nodes: SensorNode[];
  onDrop: (template: SensorTemplate, x: number, y: number) => void;
  onMove: (id: string, x: number, y: number) => void;
  onToggleConnection: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { t } = useApp();

  const [, drop] = useDrop(() => ({
    accept: ['sensor', 'node'],
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      const dropTarget = monitor.getDropResult();

      if (!offset) return;

      const workspaceElement = document.getElementById('workspace');
      if (!workspaceElement) return;

      const workspaceRect = workspaceElement.getBoundingClientRect();
      const x = offset.x - workspaceRect.left;
      const y = offset.y - workspaceRect.top;

      if (item.template) {
        onDrop(item.template, x, y);
      } else if (item.id) {
        onMove(item.id, x, y);
      }
    },
  }));

  return (
    <div
      id="workspace"
      ref={drop}
      className="relative flex-1 bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-xl overflow-hidden"
      style={{ minHeight: '600px' }}
    >
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-zinc-600">
            <Gauge className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">{t.sensors.dragInstruction}</p>
          </div>
        </div>
      )}

      {nodes.map((node) => (
        <SensorNode
          key={node.id}
          node={node}
          onMove={onMove}
          onToggleConnection={onToggleConnection}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export function SensorCanvasPage() {
  const { t } = useApp();
  const isMobile = useIsMobile();
  const [nodes, setNodes] = useState<SensorNode[]>([]);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const handleDrop = (template: SensorTemplate, x: number, y: number) => {
    const sizes = ['small', 'small', 'medium', 'large'] as const;
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    const newNode: SensorNode = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      label: template.label,
      icon: template.icon,
      color: template.color,
      x: x - 90,
      y: y - 40,
      connected: false,
      size: randomSize,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const handleAddSensor = (template: SensorTemplate) => {
    const sizes = ['small', 'small', 'medium', 'large'] as const;
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    const newNode: SensorNode = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      label: template.label,
      icon: template.icon,
      color: template.color,
      x: 0,
      y: 0,
      connected: false,
      size: randomSize,
    };
    setNodes((prev) => [...prev, newNode]);
  };

  const handleMove = (id: string, x: number, y: number) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, x: x - 90, y: y - 40 } : node
      )
    );
  };

  const handleToggleConnection = (id: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, connected: !node.connected } : node
      )
    );
  };

  const handleDelete = (id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
  };

  const groupTemplates = SENSOR_TEMPLATES.filter((t) => t.group);
  const individualTemplates = SENSOR_TEMPLATES.filter((t) => !t.group);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-black text-white p-4 pb-20">
        <div className="max-w-md mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold mb-1">{t.sensors.title}</h1>
            <p className="text-zinc-400 text-sm">{t.sensors.subtitle}</p>
          </header>

          <MobilePuzzleGrid
            nodes={nodes}
            onToggleConnection={handleToggleConnection}
            onDelete={handleDelete}
            onAddSensorClick={() => setShowMobileModal(true)}
            templates={SENSOR_TEMPLATES}
          />

          {/* Sensor Picker Modal */}
          <AnimatePresence>
            {showMobileModal && (
              <MobileSensorPicker
                templates={SENSOR_TEMPLATES}
                onSelect={handleAddSensor}
                onClose={() => setShowMobileModal(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t.sensors.title}</h1>
            <p className="text-zinc-400">{t.sensors.subtitle}</p>
          </header>

          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-72 space-y-6">
              {/* Group Nodes */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#00809D]">
                  {t.sensors.groupNodes}
                </h3>
                <div className="space-y-3">
                  {groupTemplates.map((template) => (
                    <SensorTemplate key={template.type} template={template} />
                  ))}
                </div>
              </div>

              {/* Individual Nodes */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#FF7601]">
                  {t.sensors.individualNodes}
                </h3>
                <div className="space-y-3">
                  {individualTemplates.map((template) => (
                    <SensorTemplate key={template.type} template={template} />
                  ))}
                </div>
              </div>
            </div>

            {/* Workspace */}
            <Workspace
              nodes={nodes}
              onDrop={handleDrop}
              onMove={handleMove}
              onToggleConnection={handleToggleConnection}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
