const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        fileExists({ filePath, initialContent }) {
          return new Promise((resolve, reject) => {
            if (fs.existsSync(filePath)) {
              resolve(true);
            } else {
              fs.writeFile(filePath, initialContent, 'utf8', (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(false);
                }
              });
            }
          });
        }
      });
    },
    baseUrl: 'http://localhost:3000',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/index.js'
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false
});
