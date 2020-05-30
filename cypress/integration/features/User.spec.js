import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

context('User', () => {

    describe('User List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it.skip('Click on a user implies Information Visualisation',() => {
            //TODO//
        })

        it.skip('Filter test',() => {
            //TODO//
        })

        it.skip('Check the Next Button And the Number of displayable users',() => {
            //TODO//
        })

        it.skip('',() => {
            //TODO//
        })

        /*
        */


    })

    describe('User Creation',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it.skip('Choose a Company among those proposed',() => {
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
        c'est quoi le groupe Name
        */

    })

})