Cypress.on('uncaught:exception', (err, runnable) => {
   return false;
 });
var user1="a";
var user2="b";
var custname="boss"+Math.floor(Math.random() * 10000);
var URL=Cypress.config('baseUrl');
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


describe('Post to a group from FEED screen',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

it('Sign in for user-1', () => {
  cy.loginclick(); 
  cy.signin(user1);
});

it('post to a group', () => {
   cy.wait(15000);
   cy.get('together-feed-post-group-button', { includeShadowDom: true,timeout: 10000 }).should('be.visible')
   .find('.response-input', { includeShadowDom: true,timeout: 10000 }).click({force: true});
   cy.wait(9000);
   cy.get('together-post-to-group', { includeShadowDom: true })
   .find('.feed-post-group-header', { includeShadowDom: true,timeout: 10000 }).contains('Post to a Group');

   cy.get('together-post-to-group', { includeShadowDom: true })
   .find('textarea', { includeShadowDom: true,timeout: 10000 }).click({force: true}).type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('This is a post in Healthline group using CY '+custname, { force: true });
   
   cy.get('together-post-to-group', { includeShadowDom: true }) 
  .find('.feed-post-group-select', { includeShadowDom: true })
  .find('ion-icon', { includeShadowDom: true,timeout: 10000 }).click({force: true});

  cy.get('together-post-to-group', { includeShadowDom: true })
  .find('.groups-list-container', { includeShadowDom: true })
  .find('together-group-list-item', { includeShadowDom: true }).eq(11).click({force: true});
  

   cy.get('together-post-to-group', { includeShadowDom: true })
   .find('.feed-post-group-footer', { includeShadowDom: true })
   .find('.together-highlight-text', { includeShadowDom: true }).contains('Post').click({force: true});
   cy.wait(5000); 

 });

 

});








