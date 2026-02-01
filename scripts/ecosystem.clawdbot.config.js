/**
 * PM2 Ecosystem Configuration for Clawdbot Gateway
 * 
 * SETUP:
 * 1. Update the paths below to match your system
 * 2. Run: pm2 start ecosystem.clawdbot.config.js
 * 3. Run: pm2 save
 * 4. For boot startup:
 *    - Windows: npm install -g pm2-windows-startup && pm2-startup install
 *    - Linux/Mac: pm2 startup
 */

// UPDATE THESE PATHS for your system
const CLAWD_WORKSPACE = process.env.CLAWD_WORKSPACE || '/path/to/your/clawd';

module.exports = {
  apps: [{
    name: 'clawdbot-gateway',
    script: `${CLAWD_WORKSPACE}/scripts/gateway-runner.js`,
    cwd: CLAWD_WORKSPACE,
    
    // Auto-restart configuration
    autorestart: true,
    max_restarts: 10,        // Max restarts before giving up
    min_uptime: '10s',       // Consider started if running 10s+
    restart_delay: 5000,     // Wait 5s between restart attempts
    
    // Environment
    env: {
      NODE_ENV: 'production'
    },
    
    // Logging
    error_file: `${CLAWD_WORKSPACE}/logs/gateway-error.log`,
    out_file: `${CLAWD_WORKSPACE}/logs/gateway-out.log`,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Optional: Watch for config changes (disabled by default)
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'memory', '.git']
  }]
};
