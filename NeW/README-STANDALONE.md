# Sporty Fitness Dashboard - Standalone HTML Version

## Overview
This is a standalone HTML/CSS/JavaScript version of the Sporty Fitness Dashboard UI. It runs completely in the browser without needing Node.js, npm, React, or any build tools.

## Files

### Core Files
- **index-standalone.html** - Main HTML file (open this in your browser)
- **styles-standalone.css** - All styling and responsive design
- **app-standalone.js** - Application logic and interactivity

### Supporting Files
- **README.md** - This file with usage instructions

## How to Run

### Option 1: Direct File Access
Simply double-click `index-standalone.html` to open it in your default browser.

```
Double-click: index-standalone.html
```

### Option 2: Local Web Server
For better security and to avoid CORS issues, use a local web server:

**Python 3:**
```bash
cd "path/to/Sporty Fitness Dashboard UI"
python -m http.server 8000
```
Then open: http://localhost:8000/index-standalone.html

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (http-server):**
```bash
npm install -g http-server
http-server
```
Then open: http://localhost:8080/index-standalone.html

## Features

### Dashboard Pages
1. **Main Dashboard** - Overview of fitness metrics
   - Heart Rate monitoring
   - Temperature tracking
   - Step counter
   - Calories burned
   - Responsive card layout

2. **Realtime Monitoring** - Live sensor data
   - Heart Rate pulse chart
   - Temperature graph
   - Connection status indicators
   - Real-time data visualization

3. **Sensor Configuration** - Manage connected sensors
   - **Desktop View:**
     - Drag-and-drop sensor templates from sidebar
     - Freeform canvas positioning
     - Connect/disconnect sensors
     - Delete sensors
   - **Mobile View:**
     - Puzzle grid layout with varying piece sizes
     - "Add Sensor" button with collapsible menu
     - Tap to toggle connection status
     - Swipe-friendly interaction

### Responsive Design
- **Desktop** (1024px+): Full layout with sidebar and canvas
- **Tablet** (768px - 1023px): Optimized touch interactions
- **Mobile** (< 768px): Puzzle grid layout (as per your requirements)

### Sensor Types
- **Group Sensors:**
  - Arm Sensors (💪)
  - Back Sensors (🔙)
  - Leg Sensors (🦵)
  
- **Individual Sensors:**
  - Temperature (🌡️)
  - Gyroscope (📍)
  - Heart Rate (❤️)

## Color Scheme
- **Orange** (#FF7601): Temperature, Back Sensors
- **Blue** (#00809D): Gyroscope, Arm Sensors, Connection indicators
- **Peach** (#F3A26D): Heart Rate, Leg Sensors
- **Dark theme**: Black background with subtle borders

## Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser supporting:
  - CSS Grid
  - Flexbox
  - Drag and Drop API
  - ES6 JavaScript

## Features

### Desktop (Canvas View)
```
┌─────────────────────────────────────────┐
│ Sensor Templates │  Freeform Canvas     │
│ ─────────────────┼─────────────────────│
│ • Arm Sensors    │ [Sensor Node]       │
│ • Back Sensors   │      [Sensor Node]  │
│ • Leg Sensors    │          [Sensor]   │
│ • Temperature    │                     │
│ • Gyroscope      │                     │
│ • Heart Rate     │                     │
└─────────────────────────────────────────┘
```

### Mobile (Puzzle Grid View)
```
┌────────────────┐
│ + Add Sensor   │
├────────────────┤
│ [Sensor] [Sensor] [Sensor]
│ [Sensor] [2x Sensor  ]
│ [Sensor] [      ]
│ [2x Sensor] [Sensor]
│      [Sensor] [S]
└────────────────┘
```

## Customization

### Adding New Sensors
Edit `app-standalone.js` and add to `SENSOR_TEMPLATES`:

```javascript
{
    type: 'newSensor',
    label: 'New Sensor Name',
    icon: '🎯',
    color: '#YOURCOLOR',
    group: null // or 'groupname'
}
```

### Changing Colors
Edit `styles-standalone.css` CSS variables:

```css
:root {
    --color-accent-orange: #FF7601;
    --color-accent-blue: #00809D;
    --color-accent-peach: #F3A26D;
}
```

### Responsive Breakpoints
- Tablet/Mobile split: 1024px (CSS media query)
- Tablet/Mobile: 768px

## No Build Required
This version requires absolutely no build step or npm installation. Simply:
1. Download/copy the three files
2. Open `index-standalone.html` in a browser
3. Use immediately

## Migration Path
If you want to enhance this further:
- All code is vanilla JavaScript (no framework dependencies)
- Easy to integrate with a backend API
- Minimal file size (~40KB total)
- Easy to move to a framework later if needed

## File Sizes (Approximate)
- HTML: ~8.7 KB
- CSS: ~14.3 KB
- JavaScript: ~12.8 KB
- **Total: ~35.8 KB**

## Known Limitations
- No data persistence (data resets on page refresh)
- No backend connection
- Charts are SVG placeholders (not real data)
- No export functionality

## Future Enhancements
- Add local storage for persistence
- Connect to real sensor APIs
- Add data export features
- Real-time chart library integration
- Animated transitions
- Themes (light/dark)

## Support
For issues or questions about the standalone version, refer to the original React source in the `src/` directory.

---
Created: 2026-05-26
Version: 1.0.0 (Standalone HTML)
