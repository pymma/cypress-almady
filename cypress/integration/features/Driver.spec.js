import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

context('Driver', () => {

    describe('Register a Driver',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it.skip('Personal Information Completion',() => {
            //TODO//
        })

        it.skip('Add Documents',() => {
            //TODO//
        })

        it.skip('Select Vendor',() => {
            //TODO//
        })

        it.skip('Vehicule Information Completion',() => {
            //TODO//
        })

        it.skip('Transport Box Completion',() => {
            //TODO//
        })

        it.skip('Planning Completion',() => {
            //TODO//
        })


        it.skip('Submit the Register',() => {
            //TODO//
        })

        /*
        */

    })

    describe('Register Location',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it.skip('Select a Fleet implies Map Visualisation',() => {
            //TODO//
        })

        it.skip('Check a Driver<->Fleet association[driver selected from the map]',() => {
            //verifier que ce driver à bien pour fleet le fleet selectionner plus haut
            //TODO//
        })

        it.skip('Select Vendor',() => {
            //TODO//
        })

        it.skip('Vehicule Information Completion',() => {
            //TODO//
        })

        /*
        */


    })

    describe('Driver List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it.skip('Select a Driver',() => {
            //TODO//
        })

        it.skip('Check a Driver Information',() => {
            //TODO//
        })

        it.skip('Change a Driver Information',() => {
            //TODO//
        })

        it.skip('Disable a Driver',() => {
            //TODO//
        })

        it.skip('Vehicule Information Completion',() => {
            //TODO//
        })


        /*
        */


    })

})