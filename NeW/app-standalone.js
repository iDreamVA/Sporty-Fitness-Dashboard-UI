// Sensor Configuration Data
const SENSOR_TEMPLATES = [
    { 
        type: 'temperature', 
        label: 'Temperature', 
        icon: '🌡️', 
        color: '#FF7601',
        group: null
    },
    { 
        type: 'gyroscope', 
        label: 'Gyroscope', 
        icon: '📍', 
        color: '#00809D',
        group: null
    },
    { 
        type: 'heartRate', 
        label: 'Heart Rate', 
        icon: '❤️', 
        color: '#F3A26D',
        group: null
    },
    { 
        type: 'armGroup', 
        label: 'Arm Sensors', 
        icon: '💪', 
        color: '#00809D',
        group: 'arm'
    },
    { 
        type: 'backGroup', 
        label: 'Back Sensors', 
        icon: '🔙', 
        color: '#FF7601',
        group: 'back'
    },
    { 
        type: 'legGroup', 
        label: 'Leg Sensors', 
        icon: '🦵', 
        color: '#F3A26D',
        group: 'leg'
    },
];

// App State
const state = {
    currentPage: 'dashboard',
    sensors: [],
    isMobile: window.innerWidth < 1024,
    showMobileMenu: false
};

// Utility Functions
function isMobileView() {
    return window.innerWidth < 1024;
}

function generateSensorId() {
    return `sensor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getRandomSensorSize() {
    const sizes = ['small', 'small', 'medium', 'large'];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

// Page Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            navigateToPage(pageId);
        });
    });
}

function navigateToPage(pageId) {
    // Update active link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });
    
    // Update active page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page-${pageId}`)?.classList.add('active');
    
    state.currentPage = pageId;
    
    // Initialize sensor page if needed
    if (pageId === 'sensors') {
        initializeSensorPage();
    }
}

// Sensor Configuration
function initializeSensorPage() {
    renderSensorTemplates();
    renderSensors();
    setupSensorEventListeners();
    updateMobileView();
}

function renderSensorTemplates() {
    const groupTemplates = SENSOR_TEMPLATES.filter(t => t.group);
    const individualTemplates = SENSOR_TEMPLATES.filter(t => !t.group);
    
    // Desktop sidebar
    const groupContainer = document.getElementById('groupTemplates');
    const individualContainer = document.getElementById('individualTemplates');
    
    if (groupContainer) {
        groupContainer.innerHTML = groupTemplates
            .map(template => createTemplateElement(template))
            .join('');
    }
    
    if (individualContainer) {
        individualContainer.innerHTML = individualTemplates
            .map(template => createTemplateElement(template))
            .join('');
    }
    
    // Mobile menu
    const mobileGroupContainer = document.getElementById('mobileGroupTemplates');
    const mobileIndividualContainer = document.getElementById('mobileIndividualTemplates');
    
    if (mobileGroupContainer) {
        mobileGroupContainer.innerHTML = groupTemplates
            .map(template => createMobileTemplateButton(template))
            .join('');
    }
    
    if (mobileIndividualContainer) {
        mobileIndividualContainer.innerHTML = individualTemplates
            .map(template => createMobileTemplateButton(template))
            .join('');
    }
    
    // Add event listeners to desktop templates
    document.querySelectorAll('.sensor-template').forEach(element => {
        element.addEventListener('dragstart', (e) => {
            const templateType = element.dataset.template;
            const template = SENSOR_TEMPLATES.find(t => t.type === templateType);
            e.dataTransfer.setData('application/json', JSON.stringify(template));
        });
    });
    
    // Add event listeners to mobile buttons
    document.querySelectorAll('.mobile-template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const templateType = btn.dataset.template;
            const template = SENSOR_TEMPLATES.find(t => t.type === templateType);
            addSensor(template);
            document.getElementById('mobileMenu').classList.add('hidden');
            state.showMobileMenu = false;
        });
    });
}

function createTemplateElement(template) {
    return `
        <div class="sensor-template" draggable="true" data-template="${template.type}">
            <div class="template-icon" style="background-color: ${template.color}20;">
                ${template.icon}
            </div>
            <div class="template-text">
                <h4>${template.label}</h4>
                ${template.group ? `<p>${template.group}</p>` : ''}
            </div>
        </div>
    `;
}

function createMobileTemplateButton(template) {
    return `
        <button class="mobile-template-btn" data-template="${template.type}">
            <span class="mobile-template-icon">${template.icon}</span>
            <span>${template.label}</span>
        </button>
    `;
}

function setupSensorEventListeners() {
    const workspace = document.getElementById('desktopWorkspace');
    
    if (workspace) {
        workspace.addEventListener('dragover', (e) => {
            e.preventDefault();
            workspace.style.backgroundColor = 'rgba(255, 118, 1, 0.1)';
        });
        
        workspace.addEventListener('dragleave', () => {
            workspace.style.backgroundColor = '';
        });
        
        workspace.addEventListener('drop', (e) => {
            e.preventDefault();
            workspace.style.backgroundColor = '';
            
            try {
                const template = JSON.parse(e.dataTransfer.getData('application/json'));
                addSensor(template);
            } catch (err) {
                console.error('Error dropping sensor:', err);
            }
        });
    }
    
    // Mobile add sensor button
    const addSensorBtn = document.getElementById('addSensorButton');
    if (addSensorBtn) {
        addSensorBtn.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    state.showMobileMenu = !state.showMobileMenu;
    
    if (state.showMobileMenu) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

function addSensor(template) {
    const sensor = {
        id: generateSensorId(),
        type: template.type,
        label: template.label,
        icon: template.icon,
        color: template.color,
        connected: false,
        size: getRandomSensorSize(),
        x: 0,
        y: 0
    };
    
    state.sensors.push(sensor);
    renderSensors();
}

function deleteSensor(sensorId) {
    state.sensors = state.sensors.filter(s => s.id !== sensorId);
    renderSensors();
}

function toggleSensorConnection(sensorId) {
    const sensor = state.sensors.find(s => s.id === sensorId);
    if (sensor) {
        sensor.connected = !sensor.connected;
        renderSensors();
    }
}

function renderSensors() {
    state.isMobile = isMobileView();
    
    if (state.isMobile) {
        renderMobileGridSensors();
    } else {
        renderDesktopSensors();
    }
}

function renderDesktopSensors() {
    const container = document.getElementById('sensorNodesContainer');
    if (!container) return;
    
    if (state.sensors.length === 0) {
        container.innerHTML = '';
        document.querySelector('.empty-state').style.display = 'block';
        return;
    }
    
    document.querySelector('.empty-state').style.display = 'none';
    
    container.innerHTML = state.sensors
        .map(sensor => createDesktopSensorNode(sensor))
        .join('');
    
    // Add event listeners
    document.querySelectorAll('.sensor-node').forEach(node => {
        const sensorId = node.dataset.sensorId;
        
        node.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', sensorId);
        });
        
        node.querySelector('.node-delete-btn').addEventListener('click', () => {
            deleteSensor(sensorId);
        });
        
        node.querySelector('.node-connection-btn').addEventListener('click', () => {
            toggleSensorConnection(sensorId);
        });
    });
}

function createDesktopSensorNode(sensor) {
    return `
        <div class="sensor-node" data-sensor-id="${sensor.id}" style="border-color: ${sensor.color}; box-shadow: 0 0 20px ${sensor.color}40;" draggable="true">
            <div class="node-header">
                <div class="node-title">
                    <div class="node-title-icon" style="background-color: ${sensor.color}20;">
                        ${sensor.icon}
                    </div>
                    <span class="node-title-text">${sensor.label}</span>
                </div>
                <button class="node-delete-btn" title="Delete sensor">✕</button>
            </div>
            <button class="node-connection-btn ${sensor.connected ? 'connected' : ''}">
                <span>${sensor.connected ? '📡' : '📵'}</span>
                <span>${sensor.connected ? 'Connected' : 'Disconnected'}</span>
            </button>
        </div>
    `;
}

function renderMobileGridSensors() {
    const grid = document.getElementById('puzzleGrid');
    if (!grid) return;
    
    if (state.sensors.length === 0) {
        grid.innerHTML = '';
        return;
    }
    
    grid.innerHTML = state.sensors
        .map(sensor => createPuzzlePiece(sensor))
        .join('');
    
    // Add event listeners
    document.querySelectorAll('.puzzle-piece').forEach(piece => {
        const sensorId = piece.dataset.sensorId;
        
        piece.querySelector('.puzzle-piece-delete').addEventListener('click', () => {
            deleteSensor(sensorId);
        });
        
        piece.querySelector('.puzzle-piece-status').addEventListener('click', () => {
            toggleSensorConnection(sensorId);
        });
    });
}

function createPuzzlePiece(sensor) {
    const sizeClass = sensor.size ? `size-${sensor.size}` : '';
    
    return `
        <div class="puzzle-piece ${sizeClass}" data-sensor-id="${sensor.id}" style="background-color: ${sensor.color}; opacity: 0.9;">
            <div class="puzzle-piece-header">
                <div>
                    <div class="puzzle-piece-icon">${sensor.icon}</div>
                    <div class="puzzle-piece-label">${sensor.label}</div>
                </div>
                <button class="puzzle-piece-delete" title="Delete">✕</button>
            </div>
            <div class="puzzle-piece-footer">
                <button class="puzzle-piece-status ${sensor.connected ? 'connected' : ''}" title="Toggle connection">
                    <span>${sensor.connected ? '📡' : '📵'}</span>
                    <span>${sensor.connected ? 'Connected' : 'Disconnected'}</span>
                </button>
            </div>
        </div>
    `;
}

function updateMobileView() {
    const isMobile = isMobileView();
    const desktopWorkspace = document.getElementById('desktopWorkspace');
    const mobileGrid = document.getElementById('mobileGrid');
    
    if (desktopWorkspace) {
        desktopWorkspace.style.display = isMobile ? 'none' : 'flex';
    }
    if (mobileGrid) {
        mobileGrid.style.display = isMobile ? 'flex' : 'none';
    }
}

// Initialize App
function initializeApp() {
    setupNavigation();
    navigateToPage('dashboard');
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const wasMobile = state.isMobile;
        state.isMobile = isMobileView();
        
        if (wasMobile !== state.isMobile && state.currentPage === 'sensors') {
            updateMobileView();
            renderSensors();
        }
    });
}

// Start App
document.addEventListener('DOMContentLoaded', initializeApp);
