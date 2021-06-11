Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
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
   cy.wait(3000);
 });
})


 





