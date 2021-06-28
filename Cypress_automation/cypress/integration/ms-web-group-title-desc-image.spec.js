Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

let title = null;
//['Come say "hello!"', 'Live Discussions', 'Clinical Trials', 'Coping With COVID-19', 'Escape From MS', 'Symptoms', 'Personal Community', 'Wellness', 'Treatments', 'Daily Living', 'MS and Career'];
let subtitle = null;
let stageImgURL= null;
//const stageImgURL=['https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/welcome.png?ts=1614631727382','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/general.png?ts=1614631727362','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/clinical-trials.png?ts=1614631727372','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/covid.png?ts=1614631727371','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/inspiration.png?ts=1614631727392','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/symptoms.png?ts=1614631727372','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/personal-community.png?ts=1614631727397','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/wellness.png?ts=1614631727369','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/treatments.png?ts=1614631727369','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/daily-living.png?ts=1614631727363','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/ms-and-career.png?ts=1614631727396']
if(Cypress.config('baseUrl').indexOf("stage")>0){
title = ['Come say "hello!"', 'Live Discussions', 'Clinical Trials', 'Coping With COVID-19', 'Escape From MS', 'Symptoms', 'Personal Community', 'Wellness', 'Treatments', 'Daily Living', 'MS and Career'];
  subtitle=['Introduce yourself and share your story.', 'Nightly live chats and general discussion', 'Demystifying through shared experiences', 'Expert-led chats, updates, discussion', 'An MS-free zone', 'Cog fog, fatigue, spasticity, etc.', 'Family, friends, coworkers', 'Nutrition, fitness, alternative therapies', 'DMDs, stem cell therapy, etc.', 'Home services, transportation, hacks, aids', 'Working from home, insurance, disclosure'];
  stageImgURL=['https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/welcome.png?ts=1614631727382','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/general.png?ts=1614631727362','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/clinical-trials.png?ts=1614631727372','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/covid.png?ts=1614631727371','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/inspiration.png?ts=1614631727392','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/symptoms.png?ts=1614631727372','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/personal-community.png?ts=1614631727397','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/wellness.png?ts=1614631727369','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/treatments.png?ts=1614631727369','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/daily-living.png?ts=1614631727363','https://s3-us-west-2.amazonaws.com/together-admin-stage/stage/Group/msb/ms-and-career.png?ts=1614631727396'];
}else{
 title = ['Come say "hello!"', 'Live Discussions', 'Clinical Trials', 'Coping with COVID-19', 'Escape from MS', 'Symptoms', 'Personal Community', 'Wellness', 'Treatments', 'Daily Living', 'MS and Career'];
 
  subtitle=['Introduce yourself and share your story.', 'Sundays at 4pm PT and Mon-Thurs at 1pm PT', 'Demystifying through sharing', 'Expert-led chats, updates, discussion', 'An MS-free zone', 'Cog fog, fatigue, spasticity, etc.', 'Family, friends, coworkers', 'Nutrition, fitness, alternative therapies', 'DMDs, stem cell therapy, etc.', 'Home services, transportation, hacks, aids', 'Working from home, insurance, disclosure'];
   stageImgURL=['https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/welcome.png?ts=1616647134146','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/general.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/clinical-trials.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/covid.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/inspiration.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/symptoms.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/personal-community.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/wellness.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/treatments.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/daily-living.png?ts=1616647134147','https://s3-us-west-2.amazonaws.com/together-admin-prod/prod/Group/msb/ms-and-career.png?ts=1616647134147'];
}

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


describe('Verify group-order, title and sub-title in unregistered flow',  {
 viewportHeight: 768,
 viewportWidth: 1366,
}, () => {


it('Check titles, desc and images for all Group channels', () => {
  cy.wait(5000);

  cy
  .get('together-app-nav', { includeShadowDom: true })
  .find('together-nav-item', { includeShadowDom: true })
  .find('.nav-item-container', { includeShadowDom: true })
  .find('.nav-item-label', { includeShadowDom: true })

  .contains('Group');
 
  cy.wait(5000);

 //iterate through each group items and checking title, desc
  cy
  .get('together-group-list-item', { includeShadowDom: true })
  .each(($el, index) => {
   cy.wrap($el).find('.group-list-item-label', { includeShadowDom: true })
   .contains(title[index]);

  })

  cy.wait(3000);

 
});

it('Check desc for all Group channels', () => {
    cy.wait(3000);

  cy
  .get('together-group-list-item', { includeShadowDom: true })
  .each(($el, index) => {
   cy.wrap($el).find('.group-list-item-sublabel', { includeShadowDom: true })
   .contains(subtitle[index]);

  })

});

it('Check image for all Group channels', () => {
  cy.wait(3000);

cy
.get('together-group-list-item', { includeShadowDom: true })
.each(($el, index) => {
 cy.wrap($el).find('.circle-image', { includeShadowDom: true }).should('have.css', 'background-image', 'url("'+stageImgURL[index]+'")');
 cy.request(stageImgURL[index]).then((resp) => {
  //  status code is 200
  expect(resp.status).to.eq(200);
  
})

})

});

});