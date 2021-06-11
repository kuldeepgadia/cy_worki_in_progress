Cypress.on('uncaught:exception', (err, runnable) => {
   return false;
 });
 
describe('Email Signup Flow tests',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {
 
it('Click Sign up button', () => {
   cy
   .get('ion-app')
   .find('app-header', { includeShadowDom: true })
   .find('header', { includeShadowDom: true })
   .find('.right-pane')
   .find('together-button', { includeShadowDom: true })
   .find('.together-button', { includeShadowDom: true })
   .find('.button-text', { includeShadowDom: true,timeout: 10000 }).should('be.visible')
   .contains('Sign up') .click({force: true});
   cy.location('href').should('eq', 'https://together-msb-stage-web.healthline.com/registration/STEP_ONE');
});  

it('Enter email ID and click Continue button on Signup - STEP_ONE page', () => {
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
   .find('input', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type(Cypress.config('user')+'@gmail.com');
   cy
   .get('.together-input-container', { includeShadowDom: true })
   .find('.input-button', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
   .contains('Continue') .click({force: true});
   cy.location('href').should('eq', 'https://together-msb-stage-web.healthline.com/registration/STEP_TWO');
}); 

it('Fill form fields on Signup - STEP_TWO page', () => {
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

    cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('input[placeholder="Create a username"]', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type(Cypress.config('user'));

    
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
    cy.wait(5000);
 }); 

});





