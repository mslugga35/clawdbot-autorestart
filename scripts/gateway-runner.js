/**
 * Clawdbot Gateway Runner
 * Wrapper script for PM2 process management
 * 
 * This script spawns the clawdbot gateway and handles signals properly
 * for clean shutdown when PM2 restarts or stops the process.
 */

const { spawn } = require('child_process');

console.log('[gateway-runner] Starting Clawdbot gateway...');
console.log('[gateway-runner] CWD:', process.cwd());
console.log('[gateway-runner] Time:', new Date().toISOString());

const clawdbot = spawn('clawdbot', ['gateway', 'run', '--force'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

clawdbot.on('error', (err) => {
  console.error('[gateway-runner] Failed to start:', err);
  process.exit(1);
});

clawdbot.on('exit', (code, signal) => {
  console.log(`[gateway-runner] Exited with code ${code}, signal ${signal}`);
  console.log('[gateway-runner] Time:', new Date().toISOString());
  process.exit(code || 1);
});

// Handle termination signals for clean shutdown
process.on('SIGINT', () => {
  console.log('[gateway-runner] Received SIGINT, shutting down...');
  clawdbot.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('[gateway-runner] Received SIGTERM, shutting down...');
  clawdbot.kill('SIGTERM');
});

// Log startup success
console.log('[gateway-runner] Gateway process spawned successfully');
