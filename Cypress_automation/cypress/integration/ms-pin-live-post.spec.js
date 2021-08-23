Cypress.on('uncaught:exception', (err, runnable) => {
   return false;
 });

//const URL1="https://ms.healthline.com/";
var admin="m";
var URL=Cypress.config('baseUrl');
var GRurl="";
if(Cypress.config('baseUrl').indexOf("stage")>0){
  GRurl="/group/general-jb";
 }else{
  GRurl="/group/2d1532c0-4bf7-11e9-898a-0a2fc972f10a"
}
let randMsg="Test message "+Math.floor(Math.random() * 10000)+" for check the functionality of pin-live";


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


 describe('Signin with Admin user',  {
  viewportHeight: 768,
  viewportWidth: 1366,
}, () => {


  it('SignIn with minAdmin user', () => {
    cy.loginclick();
    cy.signin(admin);
   });
  
  it('Open Symptoms group channel', () => {

    cy
    .get('together-group-list-item', { includeShadowDom: true })
    .find('.group-list-item-label', { includeShadowDom: true })
    .contains('Symptoms')
    .click({force: true});

    cy.wait(5000);

  });

  it('Post something to "Symptoms group channel"', () => { 

   cy.wait(3000);

   cy
   .get('together-response-input', { includeShadowDom: true })
   .find('.response', { includeShadowDom: true })
   .click(); 

   cy
  .get('together-response-input', { includeShadowDom: true })
  .find('.response', { includeShadowDom: true })
  .type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type(randMsg, { force: true });

  cy
  .get('.post-button', { includeShadowDom: true })
  .find('.together-highlight-text', { includeShadowDom: true })
  .contains('Post')
  .click({force: true});

  cy.wait(3000);

});

  it('Do pin-live to first own post', () => {

  cy
  .get('.group-content-container', { includeShadowDom: true })
  .find('.app-group-comment', { includeShadowDom: true }).eq(0)
  .find('.comment', { includeShadowDom: true })
  .find('together-read-more-text', { includeShadowDom: true })
  .find('.read-more-content', { includeShadowDom: true })
  .contains(randMsg);

  cy
  .get('.group-content-container', { includeShadowDom: true })
  .find('.app-group-comment', { includeShadowDom: true }).eq(0)
  .find('.comment', { includeShadowDom: true })
  .find('.kebab-icon', { includeShadowDom: true })
  .find('.icon-inner', { includeShadowDom: true })
  .click({force: true});

  cy.wait(3000);

  cy
  .get('.together-popover-menu', { includeShadowDom: true })
  .find('together-menu-option', { includeShadowDom: true })
  .contains('Pin live')
  .click({force: true});

  cy.wait(3000);

  });

});

describe('Check LIVE NOW text on live post and Join the conversation text on group-header',  {
  viewportHeight: 768,
  viewportWidth: 1366,
}, () => {
  
  it('Check LIVE NOW text on live post', () => {

  cy
  .get('.group-content-container', { includeShadowDom: true })
  .find('.app-group-comment', { includeShadowDom: true }).eq(0)
  .find('.live-label', { includeShadowDom: true })
  .contains('LIVE NOW');
  
  cy.wait(3000);

  });

  it('Check LIVE NOW badge and Join the conversation text on group-header', () => {

  cy
  .get('.group-title-container', { includeShadowDom: true })
  .find('.pinned-link-container', { includeShadowDom: true })
  .find('.badge', { includeShadowDom: true })
  .contains('• Live Now');

  cy.wait(3000);

  cy
  .get('.group-title-container', { includeShadowDom: true })
  .find('.pinned-link-container', { includeShadowDom: true })
  .find('ion-router-link', { includeShadowDom: true })
  .contains('Join the conversation')
  .click({force: true});

  cy.wait(3000);

  cy
  .get('.thread-content-container', { includeShadowDom: true })
  .find('.highlighted-label', { includeShadowDom: true })
  .contains('• Live Now');

  cy.wait(3000);

  cy
  .get('.scroll-container', { includeShadowDom: true })
  .find('.together-back-button', { includeShadowDom: true })
  .contains('Back')
  .click({force: true});

  cy.wait(3000);

  });

});

    describe('Did refresh by clicking on Brand logo and un-pin post from feed screen',  {
      viewportHeight: 768,
      viewportWidth: 1366,
    }, () => {
      
      it('Click on ms healthline logo', () => {
    
      cy
      .get('.app-container', { includeShadowDom: true })
      .find('.logo-holder', { includeShadowDom: true })
      .click({force: true});    
    
      cy.wait(15000);
    
      });

      it('Click pin live post on feed screen', () => {
    
        cy
        .get('.scroll-container', { includeShadowDom: true })
        .find('.feed-post-container', { includeShadowDom: true }).eq(0)
        .find('.together-card', { includeShadowDom: true })
        .find('.highlighted-label', { includeShadowDom: true })
        .contains('• Live Now');
            
        cy.wait(5000);

        cy
        .get('.scroll-container', { includeShadowDom: true })
        .find('.feed-post-container', { includeShadowDom: true }).eq(0)
        .find('.together-card', { includeShadowDom: true })
       .find('.read-more-container', { includeShadowDom: true })
       .find('.read-more-content', { includeShadowDom: true })
       .contains(randMsg);

        /*cy
        .get('.scroll-container', { includeShadowDom: true })
        .find('.feed-post-container', { includeShadowDom: true }).eq(0)
        .find('.together-card', { includeShadowDom: true })
        .find('.highlighted-label').should('not.exist');*/
      
      });

      it('Do un-pin to pinned post', () => {

        cy
        .get('.scroll-container', { includeShadowDom: true })
        .find('.feed-post-container', { includeShadowDom: true }).eq(0)
        .find('.together-card', { includeShadowDom: true })
        .find('.kebab-icon', { includeShadowDom: true })
        .find('.icon-inner', { includeShadowDom: true })
        .click({force: true});
        
        cy.wait(3000);
      
        cy
        .get('.together-popover-menu', { includeShadowDom: true })
        .find('together-menu-option', { includeShadowDom: true })
        .contains('Unpin')
        .click({force: true});
      
        cy.wait(3000);

        cy
        .get('.scroll-container', { includeShadowDom: true })
        .find('.feed-post-container', { includeShadowDom: true }).eq(0)
        .find('.together-card', { includeShadowDom: true })
        .find('.highlighted-label').should('not.exist');

        cy.wait(5000);
           
        });
    
});
