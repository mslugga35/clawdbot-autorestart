---
name: clawdbot-autorestart
description: Keep Clawdbot/Moltbot gateway running 24/7 with PM2 auto-restart and boot startup. Use when setting up daemon mode, process management, crash recovery, or Windows/Linux/Mac startup persistence for the gateway.
---

# Clawdbot Auto-Restart Skill

Keep your Clawdbot gateway running 24/7 with automatic restarts on crash or system reboot.

## What This Does

- Runs Clawdbot gateway via PM2 process manager
- Auto-restarts on crash (up to 10 retries with 5s delay)
- Survives system reboots (Windows/Linux/Mac)
- Logs errors for debugging

## Quick Setup

### 1. Install PM2

```bash
npm install -g pm2
```

### 2. Copy Files to Your Workspace

Copy these files to your Clawdbot workspace (e.g., `~/clawd/`):
- `scripts/gateway-runner.js`
- `scripts/ecosystem.clawdbot.config.js`

### 3. Edit the Config

Update paths in `ecosystem.clawdbot.config.js` to match your setup:

```javascript
module.exports = {
  apps: [{
    name: 'clawdbot-gateway',
    script: '/path/to/your/clawd/scripts/gateway-runner.js',  // UPDATE THIS
    cwd: '/path/to/your/clawd',  // UPDATE THIS
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    restart_delay: 5000,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

### 4. Start with PM2

```bash
cd ~/clawd
pm2 start scripts/ecosystem.clawdbot.config.js
pm2 save
```

### 5. Enable Boot Startup

**Windows:**
```bash
npm install -g pm2-windows-startup
pm2-startup install
pm2 save
```

**Linux/Mac:**
```bash
pm2 startup
pm2 save
```

## Commands

| Command | Description |
|---------|-------------|
| `pm2 list` | Show all processes |
| `pm2 logs clawdbot-gateway` | View logs |
| `pm2 restart clawdbot-gateway` | Restart gateway |
| `pm2 stop clawdbot-gateway` | Stop gateway |
| `pm2 monit` | Live monitoring dashboard |

## Troubleshooting

### Gateway keeps restarting?
Check logs: `pm2 logs clawdbot-gateway --lines 50`

### Not starting on boot?
Re-run: `pm2 save` after any changes

### Port conflict?
Another process may be using the gateway port. Check with:
- Windows: `netstat -ano | findstr :PORT`
- Linux/Mac: `lsof -i :PORT`

## Files

```
scripts/
├── gateway-runner.js          # Node wrapper for clawdbot gateway
└── ecosystem.clawdbot.config.js  # PM2 configuration
```

## Requirements

- Node.js 18+
- PM2 (`npm install -g pm2`)
- Clawdbot installed globally (`npm install -g clawdbot`)
