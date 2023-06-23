module.exports = {
  apps: [
    {
      name: 'PCC',
      script: 'pm2 start index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true,
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log',
      log_file: 'logs/pm2-combined.log',
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
