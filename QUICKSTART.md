# Quick Start Guide

## 1. Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <div id="loader"></div>
    
    <script src="orbital-rings-loader.js"></script>
    <script>
        const loader = new OrbitalRingsLoader({
            container: document.getElementById('loader')
        });
    </script>
</body>
</html>
```

## 2. Loading Screen

```javascript
// Show loader while fetching data
const loader = new OrbitalRingsLoader({
    container: document.body,
    showProgress: true
});

fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        loader.setProgress(100);
        setTimeout(() => loader.destroy(), 500);
    });
```

## 3. Custom Colors

```javascript
// Brand colors
const loader = new OrbitalRingsLoader({
    container: document.getElementById('loader'),
    colors: ['#FF0066', '#FF6600', '#FFCC00']
});
```

## 4. File Upload Progress

```javascript
const loader = new OrbitalRingsLoader({
    container: document.getElementById('upload-area'),
    size: 80,
    showProgress: true
});

// Update based on upload progress
xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        loader.setProgress(percentComplete);
    }
});
```

## 5. Dark Mode

```javascript
// For dark backgrounds
const loader = new OrbitalRingsLoader({
    container: document.body,
    colors: ['#FFFFFF', '#00D4FF', '#FFFFFF'],
    progressColor: '#FFFFFF'
});
```

## Need Help?

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/ladykay-tech/orbital-rings-loader/issues)
- 💬 [Discussions](https://github.com/ladykay-tech/orbital-rings-loader/discussions)