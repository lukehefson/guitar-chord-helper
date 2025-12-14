# Running Locally

Since this app uses ES6 modules, you need to serve it through a local web server (you can't just open `index.html` directly in your browser).

## Quick Start Options

### Option 1: Python (Easiest - Works on Mac/Linux/Windows)

If you have Python installed:

```bash
# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

### Option 2: Node.js (if you have Node installed)

```bash
# Install http-server globally (one time)
npm install -g http-server

# Then run it
http-server -p 8000
```

Then open: **http://localhost:8000**

### Option 3: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: PHP (if you have PHP installed)

```bash
php -S localhost:8000
```

Then open: **http://localhost:8000**

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

