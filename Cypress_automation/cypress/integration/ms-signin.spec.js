Cypress.on('uncaught:exception', (err, runnable) => {
   return false;
 });

describe('Email Signin Flow tests',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

   it('Click App Logo in header', () => {
      cy
      .get('ion-app')
      .find('app-header', { includeShadowDom: true })
      .fnd('.logo-holder', { includeShadowDom: true })
      .find('img')
      .invoke('attr', 'src').should('contain', '/assets/logo.svg');
        
      cy
      .get('header', { includeShadowDom: true })
      .find('ion-app')
      .find('app-header', { includeShadowDom: true })
      .find('header', { includeShadowDom: true })
      .find('.logo-holder > img', { includeShadowDom: true }).eq(1)
      .click();
   });     

   it('Click ACCEPT button from privacy policy popup', () => {
      cy.wait(3000);
      cy
      .get('app-privacy', { includeShadowDom: true })
      .find('.privacy-message-button-container', { includeShadowDom: true })
      .find('together-button', { includeShadowDom: true })
      .click({force: true});
   });

   it('Check for Sorry bout that', () => {
      cy
      .get('#alert-1-hdr', { includeShadowDom: true })
      .should('contain',"Sorry 'bout that!")
      
      cy.get('button > .alert-button-inner', { includeShadowDom: true }).click();
   });

it('Click Log in link', () => {
   
   cy
   .get('ion-app')
   .find('app-header', { includeShadowDom: true })
   .find('header', { includeShadowDom: true })
   .find('.right-pane')
   .find('together-highlight-text', { includeShadowDom: true })
   .find('.together-highlight-text', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
   .contains('Log In') .click({force: true});
   cy.wait(5000);
   cy.location('href').should('eq', 'https://together-msb-stage-web.healthline.com/signin/SIGNIN');
});  

it('Enter email ID , Password and click Login button on SignIn page', () => {
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
   .find('input[name="name"]', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type('{selectall}{backspace}{selectall}{backspace}').type(Cypress.config('user')+'@gmail.com');
  
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

   cy.wait(5000);

}); 

it('Check for Sorry bout that after sign', () => {
   cy
   .get('#alert-1-hdr', { includeShadowDom: true })
   .should('contain',"Sorry 'bout that!")
   
   cy.get('button > .alert-button-inner', { includeShadowDom: true }).click();
});

});





