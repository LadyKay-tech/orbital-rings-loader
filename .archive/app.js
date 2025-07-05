// Modern Orbital Rings Loader
class OrbitalRingsLoader {
    constructor(options = {}) {
        this.config = {
            container: options.container || document.body,
            size: options.size || 200,
            ringCount: options.ringCount || 3,
            colors: options.colors || ['#0066FF', '#00CCFF', '#00FFCC'],
            speed: options.speed || 1,
            blur: options.blur !== false,
            progress: options.progress || 0,
            showProgress: options.showProgress !== false
        };
        
        this.init();
    }
    
    init() {
        // Create container
        this.element = document.createElement('div');
        this.element.className = 'orbital-loader';
        this.element.style.cssText = `
            position: relative;
            width: ${this.config.size}px;
            height: ${this.config.size}px;
        `;
        
        // Create rings
        this.rings = [];
        for (let i = 0; i < this.config.ringCount; i++) {
            const ring = this.createRing(i);
            this.element.appendChild(ring);
            this.rings.push(ring);
        }
        
        // Progress text
        if (this.config.showProgress) {
            this.progressEl = document.createElement('div');
            this.progressEl.className = 'orbital-progress';
            const fontSize = Math.max(16, this.config.size * 0.12); // 12% of size, minimum 16px
            this.progressEl.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', Arial;
                font-size: ${fontSize}px;
                font-weight: 600;
                color: #FFFFFF;
                letter-spacing: -0.5px;
                z-index: 1000;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            `;
            this.updateProgress();
            this.element.appendChild(this.progressEl);
        }
        
        // Add styles
        if (!document.querySelector('#orbital-styles')) {
            const styles = document.createElement('style');
            styles.id = 'orbital-styles';
            styles.textContent = `
                @keyframes orbit {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes orbit-reverse {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                
                .orbital-ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 2px solid;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                
                .orbital-ring::before {
                    content: '';
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: currentColor;
                    border-radius: 50%;
                    top: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 0 20px currentColor;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Add to container
        if (typeof this.config.container === 'string') {
            this.config.container = document.querySelector(this.config.container);
        }
        this.config.container.appendChild(this.element);
    }
    
    createRing(index) {
        const ring = document.createElement('div');
        ring.className = 'orbital-ring';
        
        const size = this.config.size * (0.4 + (index / this.config.ringCount) * 0.6);
        const duration = 3 + index * 1.5;
        const color = this.config.colors[index % this.config.colors.length];
        const opacity = 1; // Full opacity for all rings
        
        ring.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -${size/2}px;
            margin-top: -${size/2}px;
            border-color: ${color};
            opacity: ${opacity};
            animation: ${index % 2 === 0 ? 'orbit' : 'orbit-reverse'} ${duration / this.config.speed}s linear infinite;
            ${this.config.blur ? `filter: blur(${index === 0 ? 1 : 0}px);` : ''}
        `;
        
        // Add gradient border
        ring.style.borderImage = `linear-gradient(90deg, ${color} 0%, transparent 50%, ${color} 100%) 1`;
        
        return ring;
    }
    
    updateProgress() {
        if (this.progressEl) {
            this.progressEl.textContent = Math.floor(this.config.progress) + '%';
        }
    }
    
    setProgress(progress) {
        this.config.progress = Math.max(0, Math.min(100, progress));
        this.updateProgress();
    }
    
    destroy() {
        if (this.element) {
            this.element.remove();
        }
    }
}

// Clear page
document.body.style.cssText = `
    margin: 0;
    padding: 0;
    background: #000;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', Arial;
`;
document.body.innerHTML = '';



// Create toggle button
const toggleBtn = document.createElement('button');
toggleBtn.innerHTML = '⚙';
toggleBtn.style.cssText = `
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 1001;
`;
toggleBtn.onmouseover = () => {
    toggleBtn.style.background = 'rgba(255, 255, 255, 0.1)';
    toggleBtn.style.transform = 'translateY(-50%) rotate(90deg)';
};
toggleBtn.onmouseout = () => {
    toggleBtn.style.background = 'rgba(255, 255, 255, 0.05)';
    toggleBtn.style.transform = 'translateY(-50%) rotate(0deg)';
};

// Create customization panel
const panel = document.createElement('div');
panel.style.cssText = `
    position: fixed;
    right: -320px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(20, 20, 20, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    width: 260px;
    color: white;
    font-size: 13px;
    transition: right 0.3s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

// Toggle panel
let panelOpen = false;
toggleBtn.onclick = () => {
    panelOpen = !panelOpen;
    panel.style.right = panelOpen ? '20px' : '-320px';
    toggleBtn.style.transform = panelOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)';
};

panel.innerHTML = `
    <h3 style="margin: 0 0 20px 0; font-size: 16px; font-weight: 600; opacity: 0.9;">Customize</h3>
    
    <div class="control-group" style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; opacity: 0.7; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Size</label>
        <input type="range" id="size-slider" min="100" max="400" value="200" style="
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            outline: none;
            -webkit-appearance: none;
        ">
        <style>
            #size-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                background: white;
                border-radius: 50%;
                cursor: pointer;
            }
        </style>
    </div>
    
    <div class="control-group" style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; opacity: 0.7; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Speed</label>
        <input type="range" id="speed-slider" min="0.1" max="3" step="0.1" value="1" style="
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            outline: none;
            -webkit-appearance: none;
        ">
        <style>
            #speed-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                background: white;
                border-radius: 50%;
                cursor: pointer;
            }
        </style>
    </div>
    
    <div class="control-group" style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; opacity: 0.7; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Rings</label>
        <div style="display: flex; gap: 8px;">
            ${[2, 3, 4, 5].map(n => `
                <button onclick="setRings(${n})" class="ring-btn" data-rings="${n}" style="
                    flex: 1;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 8px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 14px;
                " onmouseover="this.style.background='rgba(255, 255, 255, 0.2)'" 
                   onmouseout="this.style.background=this.classList.contains('active')?'rgba(255, 255, 255, 0.2)':'rgba(255, 255, 255, 0.1)'">${n}</button>
            `).join('')}
        </div>
    </div>
    
    <div class="control-group" style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; opacity: 0.7; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Colors</label>
        <div style="display: flex; gap: 8px; align-items: center;">
            <input type="color" id="start-color" value="#0066FF" style="
                width: 50px;
                height: 36px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
            ">
            <div style="flex: 1; text-align: center; color: rgba(255, 255, 255, 0.3);">→</div>
            <input type="color" id="end-color" value="#00CCFF" style="
                width: 50px;
                height: 36px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
            ">
        </div>
        <div style="margin-top: 10px;">
            <div id="gradient-preview" style="
                height: 40px;
                border-radius: 8px;
                background: linear-gradient(90deg, #0066FF, #00CCFF);
                margin-bottom: 10px;
            "></div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
                <button onclick="applyPreset('ocean')" title="Ocean" style="
                    background: linear-gradient(135deg, #0066FF, #00CCFF);
                    border: none;
                    height: 28px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s;
                " onmouseover="this.style.transform='scale(1.05)'" 
                   onmouseout="this.style.transform='scale(1)'"></button>
                
                <button onclick="applyPreset('sunset')" title="Sunset" style="
                    background: linear-gradient(135deg, #FF0066, #FFCC00);
                    border: none;
                    height: 28px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s;
                " onmouseover="this.style.transform='scale(1.05)'" 
                   onmouseout="this.style.transform='scale(1)'"></button>
                
                <button onclick="applyPreset('mint')" title="Mint" style="
                    background: linear-gradient(135deg, #00FFB3, #00FF66);
                    border: none;
                    height: 28px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s;
                " onmouseover="this.style.transform='scale(1.05)'" 
                   onmouseout="this.style.transform='scale(1)'"></button>
            </div>
        </div>
    </div>
    
    <div class="control-group" style="margin-bottom: 0;">
        <label style="display: block; margin-bottom: 8px; opacity: 0.7; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Effects</label>
        <div style="display: flex; gap: 8px;">
            <button onclick="toggleBlur()" id="blur-btn" style="
                flex: 1;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 8px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 13px;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.2)'" 
               onmouseout="this.style.background=this.classList.contains('active')?'rgba(255, 255, 255, 0.2)':'rgba(255, 255, 255, 0.1)'">Blur</button>
            
            <button onclick="toggleProgress()" id="progress-btn" style="
                flex: 1;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                padding: 8px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 13px;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.2)'" 
               onmouseout="this.style.background=this.classList.contains('active')?'rgba(255, 255, 255, 0.2)':'rgba(255, 255, 255, 0.1)'">Progress</button>
        </div>
    </div>
`;

document.body.appendChild(toggleBtn);
document.body.appendChild(panel);

// Demo container
const demoContainer = document.createElement('div');
demoContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;
document.body.appendChild(demoContainer);

// Current configuration
let currentConfig = {
    size: 200,
    ringCount: 3,
    colors: ['#ffffff', '#ffffff', '#ffffff'],
    speed: 1,
    blur: true,
    showProgress: false
};

// Color schemes
const colorSchemes = {
    mono: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
    ocean: ['#0066FF', '#0099FF', '#00CCFF', '#00FFCC', '#00FFE6'],
    sunset: ['#FF0066', '#FF3366', '#FF6666', '#FF9966', '#FFCC00'],
    mint: ['#00FFB3', '#00FFCC', '#00FFE6', '#00FF99', '#00FF66'],
    purple: ['#9D00FF', '#B84AFF', '#D374FF', '#EE9EFF', '#FF00D4'],
    fire: ['#FF3300', '#FF5533', '#FF7755', '#FF9977', '#FFAA00']
};

// Initialize loader
let currentLoader = new OrbitalRingsLoader({
    container: demoContainer,
    ...currentConfig
});

// Progress interval tracker
let progressInterval = null;

// Update functions
function updateLoader() {
    // Clear existing progress interval
    if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
    }
    
    if (currentLoader) {
        currentLoader.destroy();
    }
    currentLoader = new OrbitalRingsLoader({
        container: demoContainer,
        ...currentConfig
    });
    
    // Handle progress simulation
    if (currentConfig.showProgress && !currentConfig.infinite) {
        let progress = 0;
        progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                progressInterval = null;
                setTimeout(() => {
                    if (currentConfig.showProgress) {
                        progress = 0;
                        currentLoader.setProgress(0);
                        // Restart progress animation
                        updateLoader();
                    }
                }, 1000);
            }
            currentLoader.setProgress(progress);
        }, 300);
    }
}

// Size slider
document.getElementById('size-slider').addEventListener('input', (e) => {
    currentConfig.size = parseInt(e.target.value);
    updateLoader();
});

// Speed slider
document.getElementById('speed-slider').addEventListener('input', (e) => {
    currentConfig.speed = parseFloat(e.target.value);
    updateLoader();
});

// Ring count buttons
window.setRings = (count) => {
    currentConfig.ringCount = count;
    // Update button states
    document.querySelectorAll('.ring-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.rings) === count) {
            btn.classList.add('active');
            btn.style.background = 'rgba(255, 255, 255, 0.2)';
        } else {
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
    // Regenerate gradient colors for new ring count
    updateGradient();
};


// Effects toggles
window.toggleBlur = () => {
    currentConfig.blur = !currentConfig.blur;
    const btn = document.getElementById('blur-btn');
    if (currentConfig.blur) {
        btn.classList.add('active');
        btn.style.background = 'rgba(255, 255, 255, 0.2)';
    } else {
        btn.classList.remove('active');
        btn.style.background = 'rgba(255, 255, 255, 0.1)';
    }
    updateLoader();
};

window.toggleProgress = () => {
    currentConfig.showProgress = !currentConfig.showProgress;
    currentConfig.infinite = !currentConfig.showProgress;
    const btn = document.getElementById('progress-btn');
    if (currentConfig.showProgress) {
        btn.classList.add('active');
        btn.style.background = 'rgba(255, 255, 255, 0.2)';
    } else {
        btn.classList.remove('active');
        btn.style.background = 'rgba(255, 255, 255, 0.1)';
    }
    updateLoader();
};

// Demo presets (update to use new system)
window.demo = (type) => {
    switch(type) {
        case 'minimal':
            currentConfig = {
                size: 200,
                ringCount: 3,
                colors: ['#ffffff', '#ffffff', '#ffffff'],
                speed: 1,
                blur: true,
                showProgress: false
            };
            break;
            
        case 'gradient':
            currentConfig = {
                size: 200,
                ringCount: 4,
                colors: colorSchemes.ocean,
                speed: 1,
                blur: false,
                showProgress: false
            };
            break;
            
        case 'progress':
            currentConfig = {
                size: 200,
                ringCount: 3,
                colors: colorSchemes.ocean,
                speed: 1,
                blur: false,
                showProgress: true,
                infinite: false
            };
            break;
    }
    
    // Update UI to reflect changes
    document.getElementById('size-slider').value = currentConfig.size;
    document.getElementById('speed-slider').value = currentConfig.speed;
    setRings(currentConfig.ringCount);
    
    updateLoader();
};

// Set initial active states
setRings(3);
document.getElementById('blur-btn').classList.add('active');
document.getElementById('blur-btn').style.background = 'rgba(255, 255, 255, 0.2)';

// Color gradient management
function generateGradientColors(startColor, endColor, steps) {
    const colors = [];
    
    // Convert hex to RGB
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    
    // Convert RGB to hex
    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    
    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);
    
    for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1);
        const r = Math.round(start.r + (end.r - start.r) * ratio);
        const g = Math.round(start.g + (end.g - start.g) * ratio);
        const b = Math.round(start.b + (end.b - start.b) * ratio);
        colors.push(rgbToHex(r, g, b));
    }
    
    return colors;
}

// Color preset definitions
const gradientPresets = {
    ocean: { start: '#0066FF', end: '#00CCFF' },
    sunset: { start: '#FF0066', end: '#FFCC00' },
    mint: { start: '#00FFB3', end: '#00FF66' }
};

// Apply preset
window.applyPreset = (preset) => {
    const { start, end } = gradientPresets[preset];
    document.getElementById('start-color').value = start;
    document.getElementById('end-color').value = end;
    updateGradient();
};

// Update gradient preview and loader
function updateGradient() {
    const startColor = document.getElementById('start-color').value;
    const endColor = document.getElementById('end-color').value;
    
    // Update preview
    const preview = document.getElementById('gradient-preview');
    if (preview) {
        preview.style.background = `linear-gradient(90deg, ${startColor}, ${endColor})`;
    }
    
    // Generate colors for rings
    currentConfig.colors = generateGradientColors(startColor, endColor, currentConfig.ringCount);
    updateLoader();
}

// Initialize color inputs
setTimeout(() => {
    // Add event listeners
    document.getElementById('start-color').addEventListener('input', updateGradient);
    document.getElementById('end-color').addEventListener('input', updateGradient);
    
    // Set initial gradient
    updateGradient();
}, 100);