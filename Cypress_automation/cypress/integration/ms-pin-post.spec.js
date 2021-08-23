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
let randMsg="Test message "+Math.floor(Math.random() * 10000)+" for check the functionality of pin post";



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
    .contains('Wellness')
    .click({force: true});

    cy.wait(5000);

  });

  it('Post something to "Wellness group channel"', () => { 

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

  it('Do pin to first own post', () => {

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
  .contains('Pin')
  .click({force: true});


  cy.wait(3000);

  cy
  .get('.pinned-link-container', { includeShadowDom: true })
  .contains('Our guide recommends', { includeShadowDom: true })


  cy.wait(3000);

  cy
  .get('.pinned-link-container', { includeShadowDom: true })
  .find('ion-router-link', { includeShadowDom: true })
  .contains('(Read now)', { includeShadowDom: true })
  .click({force: true});

  cy.wait(3000);

  cy
  .get('.scroll-container', { includeShadowDom: true })
  .find('.together-back-button', { includeShadowDom: true })
  .contains('Back')
  .click({force: true});

  cy.wait(3000);

});

  it('Do un-pin to pinned post', () => {

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
    .contains('Unpin')
    .click({force: true});
  
  
    cy.wait(3000);
  
    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.comment', { includeShadowDom: true })
    .find('together-read-more-text', { includeShadowDom: true })
    .find('.read-more-content', { includeShadowDom: true })
    .contains(randMsg);

    cy.get('.pinned-link-container').should('not.exist');
  
    cy.wait(3000);

    });

});

