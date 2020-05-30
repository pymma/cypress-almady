import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

context('Vendor[e-commerce include]', () => {

    describe('Vendor List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
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

        it.skip('',() => {
            //TODO//
        })

        /*
        */


    })

    describe('Vendor Registration',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it.skip('Click on a Vendor implies Information Visualisation',() => {
            //TODO//
        })

        it.skip('Filter test',() => {
            //TODO//
        })

        it.skip('Select a group implies group tab visualisation',() => {
            //TODO//
        })

        it.skip('Disable a Vendor',() => {
            //TODO//
        })

        it.skip('Create a Warehouse',() => {
            //TODO//
        })


        it.skip('Update a Vendor Information',() => {
            //TODO//
        })

        /*
        */

    })

    describe('E-Commerce List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it.skip('Click on a E-Commerce list element implies Information Visualisation',() => {
            //TODO//
        })

        it.skip('Filter test',() => {
            //TODO//
        })

        it.skip('Select a group implies group tab visualisation',() => {
            //TODO//
        })

        it.skip('Disable a E-commerce bussiness',() => {
            //TODO//
        })

        it.skip('Update a E-commerce Information',() => {
            //TODO//
        })

        /*
        */

    })

    describe('E-Commerce Registration',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it.skip('Register a E-commerce bussiness',() => {
            //TODO//
        })

        
        /*
        */

    })

})