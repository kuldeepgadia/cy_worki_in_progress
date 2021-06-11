describe('Login', () => {
  it('Login through Google', () => {
    
    const username = 'prodigyinfosoft.p.ltd@gmail.com'
    const password = 'XYZ886699@'
    const loginUrl = 'https://together-msb-stage-web.healthline.com/registration/STEP_ONE'
    const cookieName = 'localStorageItem'
    const socialLoginOptions = {
      username: username,
      password: password,
      loginUrl: loginUrl,
      headless: false,
      isPopup: true,
      logs: false,
      loginSelector: '.together-social-button.google',
      postLoginSelector: 'app-registration'
    }

    return cy.task('GoogleSocialLogin', socialLoginOptions).then(({cookies}) => {
      cy.clearCookies()

      const cookie = cookies.filter(cookie => cookie.name === cookieName).pop()
      if (cookie) {
        cy.setCookie(cookie.name, cookie.value, {
          domain: cookie.domain,
          expiry: cookie.expires,
          httpOnly: cookie.httpOnly,
          path: cookie.path,
          secure: cookie.secure
        })

        Cypress.Cookies.defaults({
          preserve: cookieName
        })
      }
    })
  })
})