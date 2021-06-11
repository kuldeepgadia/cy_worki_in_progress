// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add('signin', (custname) => {
  cy
  .get('app-signin', { includeShadowDom: true })
  .find('.left-panel', { includeShadowDom: true })
  .find('.together-form-prompt', { includeShadowDom: true })
  .find('span', { includeShadowDom: true}).eq(0)
  .click({force: true});
  //cy.wait(1000);
  cy
  .get('app-signin', { includeShadowDom: true })
  .find('.left-panel', { includeShadowDom: true })
  .find('.together-input-field', { includeShadowDom: true })
  .find('input[name="name"]', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type('{selectall}{backspace}{selectall}{backspace}').type(custname+'@healthline.com');
 
  cy
  .get('app-signin', { includeShadowDom: true })
  .find('.together-input-field', { includeShadowDom: true })
  .find('span', { includeShadowDom: true}).eq(1)
  .click({force: true});

  cy
  .get('app-signin', { includeShadowDom: true })
  .find('input[name="password"]', { includeShadowDom: true }).type('12345678');
  
  cy
  .get('app-signin', { includeShadowDom: true })
  .find('.button-text', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
  .contains('Log in').click({force: true});
  cy.wait(15000);
})

Cypress.Commands.add('loginclick', () => {
  cy
  .get('ion-app')
  .find('app-header', { includeShadowDom: true })
  .find('header', { includeShadowDom: true })
  .find('.right-pane')
  .find('together-highlight-text', { includeShadowDom: true })
  .find('.together-highlight-text', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
  .contains('Log In') .click({force: true});
  cy.wait(5000);
  cy.location('href').should('contains', Cypress.config('baseUrl')+'/signin/SIGNIN');
})