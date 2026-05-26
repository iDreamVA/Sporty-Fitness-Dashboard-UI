# Visual Guide - Sporty Fitness Dashboard

## 🎬 What You'll See

### Opening the App
```
┌─────────────────────────────────────────────────────┐
│ Sporty Fitness | Dashboard | Realtime | Sensors    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [Metric 1]  [Metric 2]  [Metric 3]  [Metric 4]    │
│                                                      │
│  ❤️ Heart Rate     🌡️ Temperature                    │
│  72 BPM            36.8°C                           │
│  Last recorded     Normal                           │
│                                                      │
│  📍 Steps          ⚡ Calories                       │
│  8,234             425 kcal                         │
│  Today             Burned                           │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 📊 Page Views

### Dashboard Page
```
┌─────────────────────────────────────────┐
│ Main Dashboard                          │
│ Monitor your fitness metrics            │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│ │ ❤️      │  │ 🌡️      │  │ 📍      │ │
│ │ Heart   │  │ Temp    │  │ Steps   │ │
│ │ 72 BPM  │  │ 36.8°C  │  │ 8,234   │ │
│ └─────────┘  └─────────┘  └─────────┘ │
│                                         │
│ ┌─────────┐                             │
│ │ ⚡      │                             │
│ │ Calories│                             │
│ │ 425 kcal│                             │
│ └─────────┘                             │
│                                         │
└─────────────────────────────────────────┘
```

### Realtime Page
```
┌─────────────────────────────────────────┐
│ Realtime Monitoring                     │
│ Live health data from sensors           │
├─────────────────────────────────────────┤
│                                         │
│  ┌────────────────┐  ┌────────────────┐│
│  │ Heart Rate ● C │  │ Temperature ● C││
│  │  /‾‾‾\        │  │  ______        ││
│  │ /     \       │  │ /      \       ││
│  │ 72 BPM │       │  │ 36.8°C │       ││
│  └────────────────┘  └────────────────┘│
│                                         │
│  ┌────────────────┐                    │
│  │ Gyroscope ● D  │                    │
│  │ No data avail. │                    │
│  └────────────────┘                    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎮 Sensors Page - Desktop View (>1024px)

```
┌──────────────────────────────────────────────────────────┐
│ Sensor Configuration                                     │
├──────────────────────────────────┬──────────────────────┤
│ Group Sensors                    │                      │
│                                  │     [Empty Canvas]   │
│ ┌──────────────────┐             │                      │
│ │💪 Arm Sensors   │  ────────→  │                      │
│ │   arm            │             │  Drag sensors here   │
│ └──────────────────┘             │  to configure        │
│                                  │                      │
│ ┌──────────────────┐             │ [Sensor Nodes will   │
│ │🔙 Back Sensors  │  ────────→  │  appear here when    │
│ │   back           │             │  dropped]            │
│ └──────────────────┘             │                      │
│                                  │                      │
│ ┌──────────────────┐             │                      │
│ │🦵 Leg Sensors   │  ────────→  │                      │
│ │   leg            │             │                      │
│ └──────────────────┘             │                      │
│                                  │                      │
│ Individual Sensors               │                      │
│                                  │                      │
│ ┌──────────────────┐             │                      │
│ │🌡️ Temperature   │  ────────→  │                      │
│ │  (No group)      │             │                      │
│ └──────────────────┘             │                      │
│                                  │                      │
│ ┌──────────────────┐             │                      │
│ │📍 Gyroscope     │  ────────→  │                      │
│ │  (No group)      │             │                      │
│ └──────────────────┘             │                      │
│                                  │                      │
│ ┌──────────────────┐             │                      │
│ │❤️ Heart Rate    │  ────────→  │                      │
│ │  (No group)      │             │                      │
│ └──────────────────┘             │                      │
│                                  │                      │
└──────────────────────────────────┴──────────────────────┘

When you drag a sensor to the canvas:

┌─────────────────────────────────────────┐
│ Dropped Sensor appears in canvas:       │
│                                         │
│  ┌──────────────┐                       │
│  │ 🌡️ Temp     │                       │
│  │ Temperature │                       │
│  │             │                       │
│  │ [📵 Disc]   │  ← Click to toggle    │
│  └──────────────┘                       │
│     ✕ Click to delete                 │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📱 Sensors Page - Mobile View (<1024px)

### Step 1: Empty State
```
┌────────────────────┐
│ Sensor Config      │
│                    │
│  + Add Sensor      │ ← Click here
│                    │
│  (empty grid)      │
│                    │
└────────────────────┘
```

### Step 2: Click "+ Add Sensor"
```
┌────────────────────┐
│ Sensor Config      │
│                    │
│  + Add Sensor      │
│                    │
│ ┌────────────────┐ │
│ │Group Sensors:  │ │
│ │┌─────┬─────┐   │ │
│ ││💪   │🔙   │   │ │
│ ││Arm  │Back │   │ │
│ │├─────┼─────┤   │ │
│ ││🦵   │    │   │ │
│ ││Leg  │    │   │ │
│ │└─────┴─────┘   │ │
│ │                │ │
│ │Individual:     │ │
│ │┌─────┬─────┐   │ │
│ ││🌡️  │📍   │   │ │
│ ││Temp │Gyro │   │ │
│ │├─────┼─────┤   │ │
│ ││❤️  │    │   │ │
│ ││HR   │    │   │ │
│ │└─────┴─────┘   │ │
│ └────────────────┘ │
│                    │
└────────────────────┘
```

### Step 3: Select Sensor Type
```
After clicking a sensor, it appears in the puzzle grid:

┌────────────────────┐
│ Sensor Config      │
│                    │
│  + Add Sensor      │
│                    │
│ ┌───────┬────┐     │
│ │🌡️    │📍  │     │
│ │Temperature │     │ ← Small pieces (1×1)
│ │36.8°C      │Gyro │
│ │           │     │
│ │📵          │📡   │
│ └───────┴────┘     │
│ ┌──────────────┐   │
│ │❤️  Heart Rate │   │
│ │              │   │ ← Larger piece (2×1)
│ │72 BPM        │   │
│ │              │   │
│ │📵            │   │
│ └──────────────┘   │
│                    │
└────────────────────┘

Total 3 sensors added (randomly sized):
- 1 temperature (small)
- 1 gyroscope (medium) 
- 1 heart rate (large)
```

### Step 4: Interact with Grid

#### Tap Sensor to Toggle Connection:
```
Before:                  After:
┌────────┐              ┌────────┐
│🌡️ Temp│              │🌡️ Temp│
│        │ ← tap ───→  │        │
│📵      │              │📡      │
└────────┘              └────────┘
```

#### Delete Sensor:
```
Before:                  After:
┌────────┐              
│❤️  HR  │              
│        │ ← tap ✕ ──→ (removed)
│📵      │              
└────────┘              
```

---

## 🎨 Color Coding

### Sensor Colors in Grid
```
Orange (#FF7601)
┌──────────┐
│🌡️ Temp  │  Temperature
│ 36.8°C   │  Back Sensors
│          │
│📵        │
└──────────┘

Blue (#00809D)
┌──────────┐
│📍 Gyro   │  Gyroscope
│ Roll: 5° │  Arm Sensors
│          │
│📡        │
└──────────┘

Peach (#F3A26D)
┌──────────┐
│❤️  HR    │  Heart Rate
│ 72 BPM   │  Leg Sensors
│          │
│📵        │
└──────────┘
```

---

## 🔄 Responsive Behavior

### Wide Screen (>1024px) - Desktop
```
┌─────────────────────────────────────────┐
│ Sidebar (Left)  │  Canvas (Right)      │
│ Draggable       │  Drop zone           │
│ templates       │  Freeform positioning│
└─────────────────────────────────────────┘
```

### Medium Screen (768-1024px) - Tablet
```
┌─────────────────────────────────┐
│ Sidebar (Left)                  │
│ Draggable templates             │
├─────────────────────────────────┤
│ Canvas (Full width below)       │
│ Drop zone, touch-friendly       │
└─────────────────────────────────┘
```

### Narrow Screen (<768px) - Mobile
```
┌──────────────────┐
│ + Add Sensor     │
├──────────────────┤
│ [Menu hidden]    │
│                  │
│ Puzzle Grid:     │
│ ┌──┬──┬──┐      │
│ │  │  │  │      │
│ ├──┼──┼──┤      │
│ │     │  │      │
│ ├──┬──┴──┤      │
│ │  │     │      │
│ └──┴─────┘      │
└──────────────────┘
```

---

## 🖱️ Interaction Flows

### Desktop - Add Sensor
```
1. View sidebar              →  2. Drag sensor
   with templates               to canvas
   
   ┌──────────┐                ┌─────────────┐
   │ Templates│                │   Canvas    │
   │ • Temp   │                │             │
   │ • Gyro   │ ──drag───→     │  [Sensor]   │
   │ • HR     │                │             │
   └──────────┘                └─────────────┘

3. Sensor appears            →  4. Interact with node
   with color border             
   ┌──────────────┐             ┌──────────────┐
   │ 🌡️ Temp     │             │ 🌡️ Temp     │
   │ Temperature  │             │ Temperature  │
   │              │             │              │
   │ 📵 Disco.    │ ─click───→  │ 📡 Connec.  │
   │ (border=FF)  │             │ (border=blue)│
   └──────────────┘             └──────────────┘
```

### Mobile - Add Sensor
```
1. Click button             →  2. Menu opens
   ┌──────────────────┐         ┌──────────────────┐
   │ + Add Sensor     │         │ + Add Sensor     │
   │                  │  click→ │ ┌──────────────┐│
   │ (empty)          │         │ │Group Sensors ││
   └──────────────────┘         │ │Individual... ││
                                │ └──────────────┘│
                                └──────────────────┘

3. Select sensor type       →  4. Appears in grid
   ┌──────────────────┐         ┌──────────────────┐
   │ + Add Sensor     │         │ + Add Sensor     │
   │ ┌──────────────┐│         │ ┌───────┬───────┐│
   │ │ 💪 Arm Sensor││ click→  │ │ 🌡️   │ 📍    ││
   │ │ 🔙 Back...   ││         │ │ Temp  │ Gyro ││
   │ │ 🦵 Leg...    ││         │ ├───────┴───────┤│
   │ │ 🌡️ Temp...  ││         │ │ ❤️  Heart Rate ││
   │ │ 📍 Gyro...   ││         │ │               ││
   │ │ ❤️ HR...     ││         │ └───────────────┘│
   │ └──────────────┘│         └──────────────────┘
   └──────────────────┘
```

---

## 🎯 Puzzle Piece Sizes

### Small (1×1)
```
┌──────┐
│ 🌡️  │ Fits in
│ Temp │ 1 grid cell
│      │ 120×120px
│ 📵   │
└──────┘
```

### Medium (2×1)
```
┌─────────────┐
│ 🌡️ Temp    │ Fits across
│ 36.8°C      │ 2 grid cells
│             │ 240×120px
│ 📵          │
└─────────────┘
```

### Large (2×2)
```
┌─────────────┐
│ ❤️  Heart   │ Fits in
│ Rate Sensor │ 4 grid cells
│ 72 BPM      │ 240×240px
│             │
│ 📡          │
└─────────────┘
```

---

## 📍 Screen Breakpoints

```
Phone (320px)      Tablet (768px)       Desktop (1024px)     Ultra Wide
├─────────────┤    ├─────────────────┤   ├─────────────────────┤   
│ Mobile View │    │ Tablet View     │   │ Desktop View        │
│  - Puzzle   │    │  - Responsive   │   │  - Sidebar          │
│  - Grid     │    │  - Touch opt.   │   │  - Canvas           │
│  - Vertical │    │  - Adaptive     │   │  - Drag & drop      │
└─────────────┘    └─────────────────┘   └─────────────────────┘
```

---

## 🌈 Theme Colors

```
Background Colors:
- Primary:   #000000 (Black)
- Secondary: #0A0A0A (Very dark gray)
- Tertiary:  #1A1A1A (Dark gray)

Text Colors:
- Primary:   #FFFFFF (White)
- Secondary: #A0A0A0 (Medium gray)

Accent Colors:
- Orange:    #FF7601 (Temperature, Back)
- Blue:      #00809D (Gyroscope, Arm)
- Peach:     #F3A26D (Heart Rate, Leg)

Status:
- Connected:    #10B981 (Green)
- Disconnected: #EF4444 (Red)
```

---

## ✨ Animations

### Fade In
```
0% opacity:0
    ↓ 0.3s
100% opacity:1
```

### Scale Pop
```
0% scale:0
    ↓ 0.3s
100% scale:1
```

### Slide Down
```
0% translateY:-10px opacity:0
    ↓ 0.3s
100% translateY:0 opacity:1
```

### Hover Glow
```
Before:              After (hover):
┌──────────┐         ┌──────────┐
│ Sensor   │ hover→ │ Sensor   │
│          │  →     │ (glowing)│
│ 📵       │         │ 📵       │
└──────────┘         └──────────┘
```

---

## 🎓 Quick Legend

```
Icons Used:
🌡️  = Temperature
❤️  = Heart Rate
📍  = Gyroscope
💪  = Arm Sensors
🔙  = Back Sensors
🦵  = Leg Sensors

Status:
📡  = Connected
📵  = Disconnected
✕   = Delete
→   = Drag/Drop
─→  = Click/Interact
●   = Status indicator
```

---

This visual guide shows exactly what the dashboard looks like on different screen sizes and how to use all the features!
