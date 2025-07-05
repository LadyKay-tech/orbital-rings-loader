/**
 * Orbital Rings Loader
 * A modern, customizable loading animation
 * 
 * Usage:
 * const loader = new OrbitalRingsLoader({
 *     container: document.getElementById('my-container'),
 *     size: 200,
 *     ringCount: 3,
 *     colors: ['#0066FF', '#00CCFF'],
 *     speed: 1,
 *     blur: true,
 *     showProgress: true,
 *     progress: 0
 * });
 * 
 * // Update progress
 * loader.setProgress(50);
 * 
 * // Clean up
 * loader.destroy();
 */

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
                color: ${this.config.progressColor || '#FFFFFF'};
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
        const opacity = 1; // Full opacity for all rings on dark backgrounds
        
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

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrbitalRingsLoader;
} else if (typeof define === 'function' && define.amd) {
    define([], function() { return OrbitalRingsLoader; });
} else {
    window.OrbitalRingsLoader = OrbitalRingsLoader;
}