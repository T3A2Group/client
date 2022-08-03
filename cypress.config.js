const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '9eyfka',
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', // run allfiles
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-example'], // not run e2e sample
    setupNodeEvents(on,config) {
      //initPlugin(on,config);
      //on("task", percyHealthCheck);
      //return config;
    }
  }
})