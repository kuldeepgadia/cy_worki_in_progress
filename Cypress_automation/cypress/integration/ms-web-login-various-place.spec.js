Cypress.on('uncaught:exception', (err, runnable) => {
   return false;
 });

//const URL1="https://ms.healthline.com/";
var URL=Cypress.config('baseUrl');
var GRurl="";
if(Cypress.config('baseUrl').indexOf("stage")>0){
  GRurl="/group/general-jb";
 }else{
  GRurl="/group/2d1532c0-4bf7-11e9-898a-0a2fc972f10a"
}




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


 describe('Signin from reaction',  {
  viewportHeight: 768,
  viewportWidth: 1366,
}, () => {



  it('Click on reaction from first post from feed screen', () => {

    cy
    .get('.scroll-container', { includeShadowDom: true })
    .find('.together-card', { includeShadowDom: true }).eq(0)
    .find('.together-reactions-footer', { includeShadowDom: true })
    .find('.icon-inner', { includeShadowDom: true }).eq(0)
    .click({force: true});
   
    cy.wait(5000);

  });

  it('Login with User A', () => {

    cy
    .get('app-registration', { includeShadowDom: true })
    .find('.signin-links', { includeShadowDom: true }).eq(0)
    .find('ion-router-link', { includeShadowDom: true })
    .click({force: true});
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.left-panel', { includeShadowDom: true })
    .find('.together-input-field', { includeShadowDom: true })
    .find('input[name="name"]', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type('{selectall}{backspace}{selectall}{backspace}').type('a'+'@healthline.com');
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.together-input-field', { includeShadowDom: true })
    .find('span', { includeShadowDom: true}).eq(1)
    .click({force: true});
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('input[name="password"]', { includeShadowDom: true }).type('12345678');
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.button-text', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
    .contains('Log in').click({force: true});
  
    cy.wait(15000);
    
  //console.log(cy.location('href'));
    cy.location('href').should('eq', URL+"/");
  
  });


  it('User should log out', () => {

    cy
   .get('.registered-options', { includeShadowDom: true })
   .find('.logout-link', { includeShadowDom: true })
   .click({force: true});

  });

});



describe('Signin from Group channel',  {
  viewportHeight: 768,
  viewportWidth: 1366,
}, () => {


  it('Click on group channel from left navigation bar', () => {
    cy.wait(5000);
   
    cy
    .get('together-group-list-item', { includeShadowDom: true })
    .find('.group-list-item-label', { includeShadowDom: true })
    .contains('Live Discussions')
    .click({force: true});

    cy.wait(5000);
    //GRurl=cy.location("href");
    //console.log(GRurl);

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(1)
    .find('.reply-link', { includeShadowDom: true })
    .contains('Reply').click({force: true});
   
    cy.wait(5000);

  });


  it('Login with User A', () => {

    cy
    .get('app-registration', { includeShadowDom: true })
    .find('.signin-links', { includeShadowDom: true }).eq(0)
    .find('ion-router-link', { includeShadowDom: true })
    .click({force: true});
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.left-panel', { includeShadowDom: true })
    .find('.together-input-field', { includeShadowDom: true })
    .find('input[name="name"]', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type('{selectall}{backspace}{selectall}{backspace}').type('a'+'@healthline.com');
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.together-input-field', { includeShadowDom: true })
    .find('span', { includeShadowDom: true}).eq(1)
    .click({force: true});
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('input[name="password"]', { includeShadowDom: true }).type('12345678');
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.button-text', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
    .contains('Log in').click({force: true});
  
    cy.wait(15000);
    console.log(cy.location("href"));
    cy.location('href').should('eq', URL + GRurl);
  
  });


  it('User should log out', () => {

    cy
   .get('.registered-options', { includeShadowDom: true })
   .find('.logout-link', { includeShadowDom: true })
   .click({force: true});

  });


});



describe.skip('Signin from thread',  {
  viewportHeight: 768,
  viewportWidth: 1366,
}, () => {


  it('Click on "See all replies" link from thread in Live Discussions group channel', () => {
    cy.wait(5000);
   
    cy
    .get('together-group-list-item', { includeShadowDom: true })
    .find('.group-list-item-label', { includeShadowDom: true })
    .contains('Live Discussions')
    .click({force: true});

    cy.wait(5000);

    cy
    .get('.group-content-container', { includeShadowDom: true })
    .find('.app-group-comment', { includeShadowDom: true }).eq(1)
    .find('.more-link', { includeShadowDom: true })
    .contains('See all replies...').click({force: true});
   
    cy.wait(5000);

    cy
    .get('.together-card', { includeShadowDom: true })
    .find('.reply-link', { includeShadowDom: true })
    .contains('Reply').click({force: true});
   
    cy.wait(5000);

  });


  it('Login with User A', () => {

    cy
    .get('app-registration', { includeShadowDom: true })
    .find('.signin-links', { includeShadowDom: true }).eq(0)
    .find('ion-router-link', { includeShadowDom: true })
    .click({force: true});
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.left-panel', { includeShadowDom: true })
    .find('.together-input-field', { includeShadowDom: true })
    .find('input[name="name"]', { includeShadowDom: true ,timeout: 10000 }).should('be.visible').type('{selectall}{backspace}{selectall}{backspace}').type('a'+'@healthline.com');
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.together-input-field', { includeShadowDom: true })
    .find('span', { includeShadowDom: true}).eq(1)
    .click({force: true});
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('input[name="password"]', { includeShadowDom: true }).type('12345678');
  
    cy
    .get('app-signin', { includeShadowDom: true })
    .find('.button-text', { includeShadowDom: true ,timeout: 10000 }).should('be.visible')
    .contains('Log in').click({force: true});
  
    cy.wait(15000);
    
  
  });


  it('User should log out', () => {

    cy
   .get('.registered-options', { includeShadowDom: true })
   .find('.logout-link', { includeShadowDom: true })
   .click({force: true});

  });


});
