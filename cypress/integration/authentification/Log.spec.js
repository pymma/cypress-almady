import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

context('Authentification', () => {

    describe('Log',() => {
        before(function(){
            LoginPage.load()
            BasePage.pause(1000)
            //LoginPage.createAccout()
            //BasePage.pause(1000)
            //LoginPage.logout()
            //BasePage.pause(1000)
            //cy.reload()
        })

        after(function(){
            BasePage.pause(700)
            cy.reload()
        })

        /*stop the test if one of theses tests fail*/
        afterEach(function() {
            if (this.currentTest.state === 'failed') {
              Cypress.runner.stop()
            }
          });
    
        it('Login',() => {
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        it('Logout',() => {
            LoginPage.logout()
        })

        it.skip('Forgot Password', () => {

        })


    })

})