/// <reference types="cypress-xpath" />

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


describe('Blocking User flow',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

it('Sign in for user-1', () => {
  cy.loginclick(); 
  cy.signin(user1);
});

it('User-1 Drill down to Healthline Group channel and post a message', () => {
  cy.posttogroup('This is a post in Healthline group to test blocking functionality using CY '+custname);
});

it('User1 should log out', () => {
  //cy.wait(15000);
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

it("User-2 Drill down to Healthline Group channel and post a message", () => {
  cy.posttogroup('This is a post in Healthline group to test blocking functionality using CY '+custname);
});

it('User-2 checking user-1 post in healthline group channel', () => {
  cy.get('.author-name', { includeShadowDom: true })
  .contains('a59');

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

it('User-1 checking user-2 post in healthline group channel', () => {
  cy.wait(5000);
  cy
  .get('together-group-list-item', { includeShadowDom: true })
  .find('.group-list-item-label', { includeShadowDom: true })
  .contains('Healthline').click({force: true});

  cy.get('.author-name', { includeShadowDom: true })
  .should('contain','UserB').eq(1);

});

it('User-1 click reply link , click kebab menu and block UserB From the all reply screen', () => {
  cy.get('.author-name', { includeShadowDom: true })
  .contains('.author-name','UserB').parents('.app-group-comment', { includeShadowDom: true }).find('.reply-link', { includeShadowDom: true }).click({force: true});

  cy.get('.thread-content-container .together-card', { includeShadowDom: true }).find('.kebab-icon', { includeShadowDom: true }).find('ion-icon', { includeShadowDom: true }).click({force: true});
  cy.wait(5000);

  cy.get('.thread-content-container', { includeShadowDom: true })
  .find('.together-popover-menu', { includeShadowDom: true })
  .find('.menu-option', { includeShadowDom: true })
  .contains('Block member').click({force: true});
  cy.wait(5000);
  cy
    .get('.confirmation-footer > div', { includeShadowDom: true }).eq(1)
    .should('contain','Block')
    .invoke('show')
    .click();
    cy.wait(10000);
});

it('After blocking User-2 posts should not visible to user-1 in healthline group channel', () => {
  cy.wait(5000);
  cy
  .get('together-group-list-item', { includeShadowDom: true })
  .find('.group-list-item-label', { includeShadowDom: true })
  .contains('Healthline').click({force: true});

  cy.get('.author-name', { includeShadowDom: true })
  .contains('UserB').should('not.exist');

 });

 it('User-1 log out', () => {
  cy
  .get('.registered-options', { includeShadowDom: true })
  .find('.logout-link .together-highlight-text', { includeShadowDom: true })
  .contains('Log out').click({force: true});
  cy.wait(15000);
});

 it('Deleteing user-2 and signup again with user-2', () => {
  cy.loginclick();
  cy.signin(user2);
  cy.deleteuser();
  cy.signup("b");
 });




});








