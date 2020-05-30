import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

context('Fleet', () => {

    describe('Fleet List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it.skip('Click on a Fleet implies information Visualisation',() => {
            //TODO//
        })

        it.skip('Select a group implies group tab visualisation',() => {
            //TODO//
        })

        it.skip('Disable fleet implies side Effect',() => {
            //TODO//
        })

        it.skip('',() => {
            //TODO//
        })

        /*
        */


    })

    describe('Fleet Registration',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it.skip('Register a fleet',() => {
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