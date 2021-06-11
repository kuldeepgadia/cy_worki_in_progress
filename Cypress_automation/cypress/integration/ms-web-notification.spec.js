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


describe('Notification flow',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

it('Sign in for user-1', () => {
  cy.loginclick(); 
  cy.signin(user1);
});

it('Click notification icon', () => {
   cy.get('.desktop together-notifications-container .button').click({force: true});

   cy.get('.together-popover-menu', { includeShadowDom: true })
   .should('be.visible');

 });

 it('Click Mark all as read', () => {
   cy.get('.together-popover-menu', { includeShadowDom: true })
   .find('#options .together-highlight-text').contains('Mark all as read')
   .should('be.visible');
  
   cy.get('.together-popover-menu', { includeShadowDom: true })
   .find('#options .together-highlight-text').contains('Mark all as read')
   .click({force: true});
 });

it('User-1 Drill down to Healthline Group channel and post a message', () => {
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
   .type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('This is a post in Healthline group using CY '+custname, { force: true });
  
   cy
   .get('.post-button', { includeShadowDom: true })
   .find('.together-highlight-text', { includeShadowDom: true })
   .contains('Post')
   .click({force: true});

  
   cy.wait(3000);

});

it('User should log out', () => {
  cy
  .get('.registered-options', { includeShadowDom: true })
  .find('.logout-link .together-highlight-text', { includeShadowDom: true })
  .contains('Log out').click({force: true});
  cy.wait(15000);
});

it('Sign in for user-2', () => {
  cy.loginclick(); 
  cy.signin(user2);
});

it("User-2 Drill down to Healthline Group channel and react on user-1's message", () => {
  cy.wait(5000);
  cy
  .get('together-group-list-item', { includeShadowDom: true })
  .find('.group-list-item-label', { includeShadowDom: true })
  .contains('Healthline').click({force: true});

  cy.wait(3000);

  let mm = cy
  .get('together-comment', { includeShadowDom: true }).eq(0)
  .find('.together-reactions-footer', { includeShadowDom: true })
  .find('.icon-inner', { includeShadowDom: true }).eq(0)
  .click(); 
 
  cy.wait(5000);

});

it('User should log out', () => {
  cy
  .get('.registered-options', { includeShadowDom: true })
  .find('.logout-link .together-highlight-text', { includeShadowDom: true })
  .contains('Log out').click({force: true});
  cy.wait(15000);
});

it('Sign in for user-1 again', () => {
  cy.loginclick(); 
  cy.signin(user1);
});

it('Click notification icon again', () => {
  cy.get('.desktop together-notifications-container .button').click({force: true});

  cy.get('.together-popover-menu', { includeShadowDom: true })
  .should('be.visible');
  cy.wait(5000);
});

it('Check User-2 username exist in latest notification', () => {
  cy.get('.together-popover-menu', { includeShadowDom: true })
  .find('together-notification', { includeShadowDom: true }).eq(0)
  .find('.message').should('contain','UserB');
  cy.wait(5000);

});

});








