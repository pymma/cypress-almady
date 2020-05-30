import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

context('Tasks', () => {

    describe('Tasks Verification',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

    
        /*Les comptes des drivers à validé*/
        it.skip('',() => {
            //TODO//
        })

        it.skip('',() => {
            //TODO//
        })

        it.skip('',() => {
            //TODO//
        })

        it.skip('',() => {
            //TODO//
        })

        /*
        */


    })

})