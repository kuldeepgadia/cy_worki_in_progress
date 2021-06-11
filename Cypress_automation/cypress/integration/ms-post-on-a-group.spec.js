Cypress.on('uncaught:exception', (err, runnable) => {
   return false;
 });
 
describe('Post in a Group ',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {

it('Drill down to Healthline Group channel and post a message', () => {
   cy.wait(5000);
   cy
   .get('together-group-list-item', { includeShadowDom: true })
   .find('.group-list-item-label', { includeShadowDom: true })
   .contains('Live Discussions').click({force: true});

   cy.wait(3000);

   cy
   .get('together-response-input', { includeShadowDom: true })
   .find('.response', { includeShadowDom: true })
   .type('{selectall}{backspace}{selectall}{backspace}').type('This is a post in Healthline group using CY');
  
   cy
   .get('.post-button', { includeShadowDom: true })
   .find('.together-highlight-text', { includeShadowDom: true })
   .contains('Post')
   .click({force: true});

  
   cy.wait(3000);

}); 


});





