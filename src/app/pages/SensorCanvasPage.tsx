import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'motion/react';
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

function MobilePuzzleGrid({ nodes, onToggleConnection, onDelete, selectedSensors, onToggleSensorSelection, templates }: {
  nodes: SensorNode[];
  onToggleConnection: (id: string) => void;
  onDelete: (id: string) => void;
  selectedSensors: Set<string>;
  onToggleSensorSelection: (type: string) => void;
  templates: SensorTemplate[];
}) {
  const { t } = useApp();

  const getGridSize = (size?: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2';
      case 'medium':
        return 'col-span-2 row-span-1';
      case 'small':
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Catalog Section */}
      <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-400 mb-3">
          {t.sensors.catalog || 'Select Sensors'}
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedSensors.has(template.type);
            const labelMap: Record<string, string> = {
              temperature: t.sensors.temperature,
              gyroscope: t.sensors.gyroscope,
              heartRate: t.sensors.heartRate,
              armGroup: t.sensors.armSensors,
              backGroup: t.sensors.backSensors,
              legGroup: t.sensors.legSensors,
            };

            return (
              <motion.button
                key={template.type}
                onClick={() => onToggleSensorSelection(template.type)}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg transition-all border-2 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-zinc-800 border-blue-500 text-white'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-600'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: template.color }} />
                    <span className="text-xs font-medium">{labelMap[template.type] || template.label}</span>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  isSelected
                    ? 'bg-blue-500 border-blue-600'
                    : 'border-zinc-600'
                }`}>
                  {isSelected && (
                    <div className="w-1.5 h-1.5 bg-white rounded-[2px]" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Workspace Grid Section */}
      {nodes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Gauge className="w-12 h-12 mx-auto mb-3 opacity-30 text-zinc-600" />
          <p className="text-zinc-500 text-sm">{t.sensors.dragInstruction}</p>
        </div>
      ) : (
        <div>
          <h3 className="text-sm font-semibold text-zinc-400 mb-3">
            {t.sensors.workspace || 'Workspace'}
          </h3>
          <div className="grid grid-cols-2 gap-3 auto-rows-[120px]">
            {nodes.map((node) => {
              const Icon = node.icon;
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
                  key={node.id}
                  className={`${getGridSize(node.size)} relative bg-gradient-to-br rounded-xl p-3 cursor-pointer overflow-hidden group transition-all`}
                  style={{
                    backgroundColor: node.color,
                    opacity: 0.9,
                  }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
                  
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <Icon className="w-5 h-5 text-white" />
                        <span className="text-xs font-semibold text-white leading-tight max-w-[70px]">
                          {labelMap[node.type] || node.label}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(node.id);
                        }}
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/20 rounded"
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleConnection(node.id);
                      }}
                      className={`text-xs font-medium py-1 px-2 rounded transition-all flex items-center justify-center gap-1 ${
                        node.connected
                          ? 'bg-white/30 text-white'
                          : 'bg-black/20 text-white/60'
                      }`}
                    >
                      {node.connected ? (
                        <>
                          <Wifi className="w-3 h-3" />
                          <span className="hidden xs:inline">{t.sensors.connected}</span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-3 h-3" />
                          <span className="hidden xs:inline">{t.sensors.disconnected}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
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
  const [selectedSensors, setSelectedSensors] = useState<Set<string>>(new Set());

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

  const handleToggleSensorSelection = (type: string) => {
    setSelectedSensors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
        // Auto-add sensor to workspace when checked
        const template = SENSOR_TEMPLATES.find((t) => t.type === type);
        if (template) {
          handleAddSensor(template);
        }
      }
      return newSet;
    });
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
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-md mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold mb-1">{t.sensors.title}</h1>
            <p className="text-zinc-400 text-sm">{t.sensors.subtitle}</p>
          </header>

          <MobilePuzzleGrid
            nodes={nodes}
            onToggleConnection={handleToggleConnection}
            onDelete={handleDelete}
            selectedSensors={selectedSensors}
            onToggleSensorSelection={handleToggleSensorSelection}
            templates={SENSOR_TEMPLATES}
          />
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
