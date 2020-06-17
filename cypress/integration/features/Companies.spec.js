import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

context('Companies', () => {

    describe('Companies List',() => {
        before(function(){

            LoginPage.load()
            BasePage.Screenshot()
            //LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            //BasePage.pause(700)
            //LoginPage.logout()
        })

    
        it.skip('Click on a company implies Information Visualisation',() => {
            //TODO//
        })

        it.skip('Select a group implies group tab visualisation',() => {
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