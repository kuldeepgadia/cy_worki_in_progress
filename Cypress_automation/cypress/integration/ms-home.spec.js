describe('home page tests', () => {
  it('should open home page', () => {
    cy.visit('https://ms.healthline.com');
 cy.wait(3000);
 });

 it('Click ACCEPT buuton from privacy policy popup', () => {
   cy
   .get('app-privacy', { includeShadowDom: true })
   .find('.privacy-message-button-container', { includeShadowDom: true })
   .find('together-button', { includeShadowDom: true })
   .click({force: true});
});

it('Logo is not broken', () => {
   cy
   .get('ion-app')
   .find('app-header', { includeShadowDom: true })
   .find('header', { includeShadowDom: true })
   .find('.left-pane')
   .find('.desktop .logo-holder', { includeShadowDom: true })
   .find('img')
   .invoke('attr', 'src').should('contain', '/assets/logo.svg');
     
});  


it('Click Sign up button', () => {
   cy
   .get('ion-app')
   .find('app-header', { includeShadowDom: true })
   .find('header', { includeShadowDom: true })
   .find('.right-pane')
   .find('together-button', { includeShadowDom: true })
   .find('.together-button', { includeShadowDom: true })
   .find('.button-text', { includeShadowDom: true })
   .contains('Sign up') .click({force: true});
     
});  

it('Enter email ID and click Continue button on Signup - STEP_ONE page', () => {
  cy
   .get('app-registration', { includeShadowDom: true })
   .find('.left-panel', { includeShadowDom: true })
   .find('.together-input-field', { includeShadowDom: true })
   .find('.together-form-prompt').click({force: true});
   cy.wait(1000);
   cy
   .get('app-registration', { includeShadowDom: true })
   .find('.left-panel', { includeShadowDom: true })
   .find('.together-input-field', { includeShadowDom: true })
   .find('input', { includeShadowDom: true }).type('boss87980@healthline.com');
   cy
   .get('.together-input-container', { includeShadowDom: true })
   .find('.input-button', { includeShadowDom: true })
   .contains('Continue') .click({force: true});
}); 

it('Fill form fields on Signup - STEP_TWO page', () => {
   cy.wait(3000);
   cy
   .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
   .find('.together-input-field', { includeShadowDom: true })
   .find('span', { includeShadowDom: true })
   .contains('Create a password (8+ characters)') .click({force: true});
   cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('input[name="password"]', { includeShadowDom: true }).type('12345678');
   
    cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('.together-input-field', { includeShadowDom: true })
    .contains('username') .click({force: true});

    cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('input[placeholder="Create a username"]', { includeShadowDom: true }).type('boss87980');

    
    cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('input[placeholder="Where do you call home?"]', { includeShadowDom: true }).click({force: true});

    cy
    .get('.single-select-menu-container', { includeShadowDom: true })
    .find('.radio-item', { includeShadowDom: true }).eq(0).click({force: true});

    cy
    .get('.checkbox-container', { includeShadowDom: true }).click({force: true});

    cy
    .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
    .find('.together-button', { includeShadowDom: true }).click({force: true});

 }); 

 

});





