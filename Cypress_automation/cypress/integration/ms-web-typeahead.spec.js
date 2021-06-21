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


describe('Typeahead from Group screen',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

it('Sign in for user-1', () => {
  cy.loginclick(); 
  cy.signin(user1);
});

it('Mention another user and check typeahead popup in group', () => {
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
  .type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('@harr', { force: true });
  cy.wait(3000);
  cy.get('.typeahead-popover', { includeShadowDom: true }).contains('harr', { includeShadowDom: true }).its('length').should('be.gte', 1);
 
  cy.get('.typeahead-popover', { includeShadowDom: true }).contains('harry30', { includeShadowDom: true }).click({ force: true });

  cy
   .get('together-response-input', { includeShadowDom: true })
   .find('.response', { includeShadowDom: true })
   .should('contain','@harry30');

   cy
   .get('together-response-input', { includeShadowDom: true })
   .find('.response', { includeShadowDom: true })
   .type(' mention test from web using typeahead and CY', { force: true });

   cy
   .get('.post-button', { includeShadowDom: true })
   .find('.together-highlight-text', { includeShadowDom: true })
   .contains('Post')
   .click({force: true});

   cy.wait(3000);

 });

 

});








