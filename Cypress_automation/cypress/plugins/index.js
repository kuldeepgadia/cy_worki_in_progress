/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
 const {GoogleSocialLogin} = require('cypress-social-logins').plugins
 const fs = require('fs-extra');
 const path = require('path');
 const { renameSync } = require('fs');

 function getConfigurationByFile(file) {
   const pathToConfigFile = path.resolve(
     '..',
     'Cypress_automation/cypress/config-files',
     `${file}.json`
   );
 
   return fs.readJson(pathToConfigFile);
 }
 
 module.exports = (on, config) => {
  on('task', {
    GoogleSocialLogin: GoogleSocialLogin
  });

  on('after:screenshot', ({ path }) => {
    renameSync(path, path.replace(/ \(\d*\)/i, ''));
  });
   const file = config.env.fileConfig || 'development';
 
   return getConfigurationByFile(file);

 };

 

