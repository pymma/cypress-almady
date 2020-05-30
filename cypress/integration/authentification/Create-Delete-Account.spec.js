import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD,URL } from '../../classes/config'

context('Authentification', () => {

    describe('Account',() => {
 
        before(function(){
            LoginPage.load()
            BasePage.pause(700)
        })

        it.skip('Create An account',() => {
            LoginPage.createAccout()
        })
        
        it.skip('Delete Account', () => {
        })
        
    })
})


