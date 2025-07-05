# Orbital Rings Loader

A modern, customizable loading animation built with pure JavaScript and CSS. Features smooth orbital rings with gradient colors, progress tracking, and beautiful animations.

![Orbital Rings Loader](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🎨 Fully customizable colors with gradient support
- 📊 Optional progress percentage display
- 🎯 Smooth orbital animations
- 📱 Responsive and mobile-friendly
- 🚀 Zero dependencies
- ⚡ Lightweight (~4KB)
- 🌈 Multiple preset styles
- 🎮 Easy to integrate

## 🚀 Demo

[**Live Demo →**](https://ladykay-tech.github.io/orbital-rings-loader/demo/)

## 📦 Installation

### Direct Download
```html
<script src="https://cdn.jsdelivr.net/gh/ladykay-tech/orbital-rings-loader/dist/orbital-rings-loader.min.js"></script>
```

### NPM
```bash
npm install orbital-rings-loader
```

### Manual
Download `orbital-rings-loader.js` and include it in your project.

## 🔧 Usage

### Basic Example
```javascript
const loader = new OrbitalRingsLoader({
    container: document.getElementById('loader-container'),
    size: 120,
    ringCount: 3,
    colors: ['#00D4FF', '#00FFB3', '#FFFFFF']
});
```

### With Progress
```javascript
const loader = new OrbitalRingsLoader({
    container: document.getElementById('loader-container'),
    showProgress: true,
    progress: 0
});

// Update progress
loader.setProgress(50);

// Clean up when done
loader.destroy();
```

### Full Options
```javascript
const loader = new OrbitalRingsLoader({
    container: document.getElementById('loader'),  // DOM element or selector
    size: 200,                                     // Size in pixels
    ringCount: 4,                                  // Number of rings (2-5 recommended)
    colors: ['#FF0066', '#FF6600', '#FFCC00'],   // Array of colors for gradient
    speed: 1.5,                                    // Animation speed multiplier
    blur: true,                                    // Enable blur effect
    showProgress: true,                            // Show percentage counter
    progress: 0,                                   // Initial progress (0-100)
    progressColor: '#FFFFFF'                       // Progress text color
});
```

## 🎨 Examples

### Minimal White
```javascript
new OrbitalRingsLoader({
    container: document.body,
    colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
    blur: true,
    showProgress: false
});
```

### Ocean Gradient
```javascript
new OrbitalRingsLoader({
    container: document.body,
    colors: ['#0066FF', '#00CCFF', '#00FFCC'],
    ringCount: 4
});
```

### Corporate Brand
```javascript
new OrbitalRingsLoader({
    container: document.querySelector('.loading-screen'),
    size: 150,
    colors: ['#FF0066', '#FF0066', '#333333'],
    speed: 0.8
});
```

## 🛠️ API

### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | Element/String | `document.body` | Container element or selector |
| `size` | Number | `200` | Loader size in pixels |
| `ringCount` | Number | `3` | Number of orbital rings |
| `colors` | Array | `['#0066FF', '#00CCFF', '#00FFCC']` | Array of hex colors |
| `speed` | Number | `1` | Animation speed multiplier |
| `blur` | Boolean | `true` | Enable blur effect on inner rings |
| `showProgress` | Boolean | `false` | Show progress percentage |
| `progress` | Number | `0` | Initial progress value (0-100) |
| `progressColor` | String | `'#1d1d1f'` | Progress text color |

### Methods

#### `setProgress(value)`
Update the progress percentage (0-100).
```javascript
loader.setProgress(75);
```

#### `destroy()`
Remove the loader and clean up.
```javascript
loader.destroy();
```

## 🎯 Use Cases

- **SPA Loading**: Perfect for single-page applications
- **API Calls**: Show progress for long-running requests
- **File Uploads**: Track upload progress with style
- **Game Loading**: Beautiful loading screens for web games
- **Data Processing**: Indicate background processing status

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

Created with ❤️ by [Karen Edegware](https://github.com/LadyKay-tech)

---

If you find this useful, please ⭐ star the repository!