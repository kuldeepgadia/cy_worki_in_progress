Cypress.on('uncaught:exception', (err, runnable) => {
   return false;
 });

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



describe('Test React/Un-react & Reply functionality with user A',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

it('User A react on own post', () => {

  cy.loginclick();
  cy.signin('a');
  cy.posttogroup('This is a post in Healthline group to test Reaction/Reply using CY');

});

  it('Click on all reactions from the post', () => {
    cy.wait(5000);

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.reactions-reply-container', { includeShadowDom: true }).should('have.value', '');
   
    cy.wait(5000);

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.together-reactions-footer', { includeShadowDom: true })
    .find('.icon-inner', { includeShadowDom: true }).eq(0).click();
    cy.wait(3000);
    
    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.together-reactions-footer', { includeShadowDom: true })
    .find('.icon-inner', { includeShadowDom: true }).eq(1).click();
    cy.wait(3000);

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.together-reactions-footer', { includeShadowDom: true })
    .find('.icon-inner', { includeShadowDom: true }).eq(2).click();
    cy.wait(3000);

    cy.screenshot('reaction');

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.reactions-reply-container', { includeShadowDom: true })
    .find('.reactions-container', { includeShadowDom: true })
    .find('.reaction-counts', { includeShadowDom: true })
    .contains('3');
    cy.wait(5000);


  });
 

   it('Do reply by clicking on Reply link', () => {
    cy.wait(5000);

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.reply-link', { includeShadowDom: true })
    .contains('Reply') .click({force: true});
   
    cy.wait(5000);

    cy
    .get('together-response', { includeShadowDom: true })
    .find('together-response-input', { includeShadowDom: true })
    .find('.response', { includeShadowDom: true }).eq(1)
    .type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('This is a reply-post in Healthline group using CY', { force: true });
    cy.wait(3000);
    
    cy
    .get('.together-response-container', { includeShadowDom: true })
    .get('.response-container', { includeShadowDom: true })
    .find('together-highlight-text', { includeShadowDom: true }).eq(0)
    .click({force: true});
    cy.wait(3000);


  });

 });


 describe('Logout user A',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {
  it('User A should log out', () => {
   cy
   .get('.registered-options', { includeShadowDom: true })
   .find('.logout-link .together-highlight-text', { includeShadowDom: true })
   .contains('Log out').click({force: true});
   cy.wait(7000);
 });
});



 describe('Signin using another user',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

  
it('Signin using user B', () => {

    cy.loginclick();
    cy.signin('b');
    
  });


it('Drill down to Healthline Group channel & React/Reply on post of user A', () => {
   cy.wait(5000);
   cy
   .get('together-group-list-item', { includeShadowDom: true })
   .find('.group-list-item-label', { includeShadowDom: true })
   .contains('Healthline').click({force: true});

   cy.wait(5000);


   cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.together-reactions-footer', { includeShadowDom: true })
    .find('.icon-inner', { includeShadowDom: true }).eq(0).click();
    cy.wait(3000);
    
    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.together-reactions-footer', { includeShadowDom: true })
    .find('.icon-inner', { includeShadowDom: true }).eq(1).click();
    cy.wait(3000);

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.together-reactions-footer', { includeShadowDom: true })
    .find('.icon-inner', { includeShadowDom: true }).eq(2).click();
    cy.wait(3000);

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(0)
    .find('.reply-link', { includeShadowDom: true })
    .contains('Reply') .click({force: true});
   
    cy.wait(5000);

    cy
    .get('together-response', { includeShadowDom: true })
    .find('together-response-input', { includeShadowDom: true })
    .find('.response', { includeShadowDom: true }).eq(1)
    .type('{selectall}{backspace}{selectall}{backspace}', { force: true }).type('This is a 2nd reply post in Healthline group using CY', { force: true });
    cy.wait(3000);
    
    cy
    .get('.together-response-container', { includeShadowDom: true })
    .get('.response-container', { includeShadowDom: true })
    .find('together-highlight-text', { includeShadowDom: true }).eq(0)
    .click({force: true});
    cy.wait(3000);
    

}); 


   it('Verify Reactions counts on post', () => {
    cy.wait(5000);

    cy
    .get('.together-card', { includeShadowDom: true })
    .find('.reactions-reply-container', { includeShadowDom: true })
    .find('.reactions-container', { includeShadowDom: true })
    .find('.reaction-counts', { includeShadowDom: true })
    .contains('6');
    cy.wait(5000);
   })

    it('Verify Replies counts on post', () => {
      cy.wait(5000);
  
      cy
      .get('.together-card', { includeShadowDom: true })
      .find('.reactions-reply-container', { includeShadowDom: true })
      .find('.reactions-container', { includeShadowDom: true })
      .find('.reply-counts', { includeShadowDom: true })
      .contains('2 replies');
      cy.wait(5000);

  });

   it('Un-react from user B on the post', () => {
    cy.wait(5000);

    cy
      .get('.together-card', { includeShadowDom: true })
      .find('together-reactions-footer', { includeShadowDom: true })
      .find('.icon-inner', { includeShadowDom: true }).eq(0).click();
      cy.wait(3000);

    cy
      .get('.together-card', { includeShadowDom: true })
      .find('together-reactions-footer', { includeShadowDom: true })
      .find('.icon-inner', { includeShadowDom: true }).eq(1).click();
      cy.wait(3000);
    
      cy
      .get('.together-card', { includeShadowDom: true })
      .find('together-reactions-footer', { includeShadowDom: true })
      .find('.icon-inner', { includeShadowDom: true }).eq(2).click();
      cy.wait(3000);
    
   })

    it('Verify Reaction counts on post after un-reacting from user B', () => {
      cy.wait(5000);
  
      cy
      .get('.together-card', { includeShadowDom: true })
      .find('.reactions-reply-container', { includeShadowDom: true })
      .find('.reactions-container', { includeShadowDom: true })
      .find('.reaction-counts', { includeShadowDom: true })
      .contains('3');
      cy.wait(5000);

  });
 });