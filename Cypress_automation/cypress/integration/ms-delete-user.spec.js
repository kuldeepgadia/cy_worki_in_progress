Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Delete User flow tests',  {
   viewportHeight: 768,
   viewportWidth: 1366,
 }, () => {
   it('Click Delete Account link from left Nav', () => {
    cy.wait(5000);
    cy
    .get('together-group-list-item', { includeShadowDom: true })
    .find('.group-list-item-label', { includeShadowDom: true })
    .contains('Live Discussions').click({force: true});

      cy
      .get('.registered-options', { includeShadowDom: true })
      .find('.delete-link .together-highlight-text', { includeShadowDom: true })
      .contains('Delete Account').click({force: true});
     // cy.wait(5000);
    });

    it('Click Delete button from Delete Account popup', () => {

      cy.on('window:confirm', () => true);
      cy
      .get('.confirmation-footer > div', { includeShadowDom: true }).eq(1)
      .should('contain','Delete account')
      .invoke('show')
      .click();
      cy.wait(10000);
      cy
      .get('together-group-list-item', { includeShadowDom: true })
      .find('.group-list-item-label', { includeShadowDom: true })
      .contains('Live Discussions').click({force: true});
   
      cy.wait(3000);
  
    
  });
 })