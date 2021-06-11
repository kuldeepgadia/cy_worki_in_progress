Cypress.on('uncaught:exception', (err, runnable) => {
   return false;
 });
var custname="boss"+Math.floor(Math.random() * 10000);
var URL="https://ms.healthline.com/";
before( {
   viewportHeight: 768,
   viewportWidth: 1366,
 },() => {
   cy.visit(URL);
   cy.title().should('eq', 'MS Healthline');
   cy.wait(5000);
   //Click ACCEPT button from privacy policy popup
   cy
   .get('app-privacy', { includeShadowDom: true })
   .find('.privacy-message-button-container', { includeShadowDom: true })
   .find('together-button', { includeShadowDom: true })
   .click({force: true});

 })

 beforeEach(() => {
   cy.restoreLocalStorage();
 });
 
 afterEach(() => {
   cy.saveLocalStorage();
 });

describe('Feedback Download prompt & Learn More popup tests',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

it('Check for Sorry bout that', () => {
   cy.get('body').then(($body) => {
      // synchronously ask for the body's text
      // and do something based on whether it includes
      // another string
      if ($body.text().includes("Sorry 'bout that")) {
       console.log("found");
       cy.get('button > .alert-button-inner', { includeShadowDom: true }).click();
      } else {
         console.log("not found");
      }
    })
});

it('Drill down to a Live Discussion Group Channel', () => {
    
   cy
   .get('together-group-list-item', { includeShadowDom: true })
   .find('.group-list-item-label', { includeShadowDom: true })
   .contains('Live Discussions').click({force: true});

   cy.wait(3000);
  // cy.get('main', { includeShadowDom: true }).scrollTo(900,890);
 
   cy
   .get('together-reply', { includeShadowDom: true })
   .find('.more-link', { includeShadowDom: true })
   .contains('See all replies...').click({force: true});

   //cy
   //.get('together-thread-title', { includeShadowDom: true })
   //.find('.thread-title-label', { includeShadowDom: true })
   //.should('contain', 'All replies');
   //commented because logged ticket for the issue
  
   cy
   .get('ion-router-link', { includeShadowDom: true })
   .find('together-nav-item', { includeShadowDom: true })
   .find('.nav-item-label', { includeShadowDom: true })
   .should('contain', 'Home').click({force: true});

});  


it('Feedcard Download prompt should display for Unregistered flow', () => {
   cy.wait(3000);
   cy.get('main', { includeShadowDom: true }).scrollTo(900,890);
   
   cy
   .get('together-download-card', { includeShadowDom: true })
   .find('.download-card-heading', { includeShadowDom: true })
   .should('contain', 'Download the MS Healthline app');
});  

it('Click Learn More link from Feedcard Download prompt', () => {
   cy
   .get('together-download-card', { includeShadowDom: true })
   .find('.together-highlight-text', { includeShadowDom: true })
   .contains('Learn More').click({force: true});
   cy.wait(3000);

   cy
   .get('app-learn-more', { includeShadowDom: true })
   .find('.email-form-heading', { includeShadowDom: true })
   .should('contain','Want to see more?');

   cy
   .get('app-learn-more', { includeShadowDom: true })
   .find('.together-form-prompt', { includeShadowDom: true })
   .click({force: true});

   cy
   .get('app-learn-more', { includeShadowDom: true })
   .find('input[placeholder="Enter your email"]', { includeShadowDom: true }).type('abc@xyz.com');

   cy
   .get('app-learn-more', { includeShadowDom: true })
   .find('.together-button', { includeShadowDom: true,timeout: 10000 }).should('be.visible').click({force: true});
   cy.wait(3000);

   cy
   .get('app-learn-more', { includeShadowDom: true })
   .find('.signup-thanks-heading', { includeShadowDom: true })
   .should('contain','Thanks for signing up');

   cy
   .get('app-learn-more', { includeShadowDom: true })
   .find('together-close-icon', { includeShadowDom: true })
   .click({force: true});

   cy.wait(3000);
}); 

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
   cy.location('href').should('eq', URL+'registration/STEP_ONE');
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
   .find('input', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type(custname+'@healthline.com');
   cy
   .get('.together-input-container', { includeShadowDom: true })
   .find('.input-button', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
   .contains('Continue') .click({force: true});
   cy.wait(5000);
   cy.location('href').should('eq', URL+'registration/STEP_TWO');
}); 

it('Fill form fields on Signup - STEP_TWO page', () => {
   cy.wait(12000);
  // cy
  // .get('app-registration.ion-page.hydrated.can-go-back', { includeShadowDom: true })
  // .find('input[placeholder="Enter your email address"]', { includeShadowDom: true ,timeout: 10000 }).eq(1).should('be.visible').type('{selectall}{backspace}{selectall}{backspace}').type(custname+'@gmail.com');

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
    cy.location('href').should('eq', URL);
 }); 

});


describe('Logout Flow tests',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {
  it('User should log out', () => {
   cy
   .get('.registered-options', { includeShadowDom: true })
   .find('.logout-link .together-highlight-text', { includeShadowDom: true })
   .contains('Log out').click({force: true});
   cy.wait(7000);
 });
});



describe('Email Signin Flow tests',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

  
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
   cy.location('href').should('eq', URL+'signin/SIGNIN');
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
   }); 

it('Check for Sorry bout that after sign', () => {
   cy.get('body').then(($body) => {
      // synchronously ask for the body's text
      // and do something based on whether it includes
      // another string
      if ($body.text().includes("Sorry 'bout that")) {
       console.log("found");
       cy.get('button > .alert-button-inner', { includeShadowDom: true }).click();
       cy.reload();
      } else {
         console.log("not found");
      }
    })
 });

});

describe('Post in a Group ',  {
   viewportHeight: 868,
   viewportWidth: 1366,
 }, () => {

it('Drill down to Healthline Group channel and post a message', () => {
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
   .type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('This is a post in Healthline group using CY', { force: true });
  
   cy
   .get('.post-button', { includeShadowDom: true })
   .find('.together-highlight-text', { includeShadowDom: true })
   .contains('Post')
   .click({force: true});

  
   cy.wait(3000);

}); 


});

describe('Delete User flow tests',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {
   it('Click Delete Account link from left Nav', () => {
    cy.wait(25000);
    cy
    .get('together-group-list-item', { includeShadowDom: true })
    .find('.group-list-item-label', { includeShadowDom: true })
    .contains('Live Discussions').click({force: true});

      cy
      .get('.registered-options', { includeShadowDom: true })
      .find('.delete-link .together-highlight-text', { includeShadowDom: true })
      .contains('Delete Account').click({force: true});
      cy.wait(15000);
    });

    it('Click Delete button from Delete Account popup', () => {

     // cy.on('window:confirm', () => true);
      cy
      .get('.confirmation-footer > div', { includeShadowDom: true }).eq(1)
      .should('contain','Delete account')
      .invoke('show')
      .click();
      cy.wait(10000);
     
    
  });
 });