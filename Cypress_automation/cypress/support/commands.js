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
 // cy.wait(5000);
  cy.location('href').should('contains', Cypress.config('baseUrl')+'/signin/SIGNIN');
})

Cypress.Commands.add('posttogroup', (custmsg) => {
cy.wait(5000);
cy
.get('together-group-list-item', { includeShadowDom: true })
.find('.group-list-item-label', { includeShadowDom: true })
.contains('Healthline').click({force: true});

cy.wait(3000);

cy
.get('together-response-input', { includeShadowDom: true })
.find('.response', { includeShadowDom: true })
.click(); 

cy
.get('together-response-input', { includeShadowDom: true })
.find('.response', { includeShadowDom: true })
.type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type(custmsg, { force: true });

cy
.get('.post-button', { includeShadowDom: true })
.find('.together-highlight-text', { includeShadowDom: true })
.contains('Post')
.click({force: true});


cy.wait(3000);
})

Cypress.Commands.add('signup', (custname) => {
  cy
  .get('ion-app')
  .find('app-header', { includeShadowDom: true })
  .find('header', { includeShadowDom: true })
  .find('.right-pane')
  .find('together-button', { includeShadowDom: true })
  .find('.together-button', { includeShadowDom: true })
  .find('.button-text', { includeShadowDom: true,timeout: 10000 }).should('be.visible')
  .contains('Sign up') .click({force: true});

  cy
   .get('app-registration', { includeShadowDom: true})
   .find('.left-panel', { includeShadowDom: true,timeout: 10000 }).should('be.visible')
   .find('.together-input-field', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
   .find('.together-form-prompt', { includeShadowDom: true}).click({force: true});
   cy.wait(1000);
   cy
   .get('app-registration', { includeShadowDom: true })
   .find('.left-panel', { includeShadowDom: true })
   .find('.together-input-field', { includeShadowDom: true })
   .find('input', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type(custname+'@healthline.com');
   //cy.wait(5000);
   cy
   .get('.together-input-container', { includeShadowDom: true })
   .find('.input-button', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
   .contains('Continue') .click({force: true});
   cy.wait(5000);

   cy
   .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
   .find('.together-input-field', { includeShadowDom: true })
   .find('span', { includeShadowDom: true})
   .contains('Create a password (8+ characters)').click({force: true});

   cy
   .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
   .find('input[name="password"]', { includeShadowDom: true }).type('12345678');
   
   cy
   .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
   .find('.together-input-field', { includeShadowDom: true})
   .contains('username') .click({force: true});
    
   if(custname=="b"){
     custname="UserB";
   }
    cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('input[placeholder="Create a username"]', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type(custname);

    
    cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('input[placeholder="Where do you call home?"]', { includeShadowDom: true }).click({force: true});

    cy
    .get('.single-select-menu-container', { includeShadowDom: true })
    .find('.radio-item', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').eq(0).click({force: true});

    cy
    .get('.checkbox-container', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').click({force: true});

    cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('.together-button', { includeShadowDom: true,timeout: 10000 }).should('be.visible').click({force: true});
    cy.wait(15000);

})

Cypress.Commands.add('deleteuser', () => {
  cy.wait(5000);
  cy
  .get('together-group-list-item', { includeShadowDom: true })
  .find('.group-list-item-label', { includeShadowDom: true })
  .contains('Live Discussions').click({force: true});

    cy
    .get('.registered-options', { includeShadowDom: true })
    .find('.delete-link .together-highlight-text', { includeShadowDom: true })
    .contains('Delete Account').click({force: true});
    cy.wait(15000);

    cy
    .get('.confirmation-footer > div', { includeShadowDom: true }).eq(1)
    .should('contain','Delete account')
    .invoke('show')
    .click();
    cy.wait(10000);

})