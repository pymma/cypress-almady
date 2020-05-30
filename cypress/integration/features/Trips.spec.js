import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD,CURRENT_ADRESSE } from '../../classes/config'

context('Trips', () => {

    describe('Available Trips',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

    
    
        it('Set an current position for Available Trips[Location]',() => {
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Available Trips')
            BasePage.CloseSideBar()
            cy.get('input.form-control').type(CURRENT_ADRESSE)
            cy.get('button.btn.btn-primary').contains('Valid').click()
            BasePage.pause(2000)
            cy.get('[style="z-index: 3; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px; touch-action: pan-x pan-y;"]').as('map')
            cy.get('@map').should('be.visible')
            cy.get('li.breadcrumb-item.active').should('be.visible')
            cy.get('div.trips-list').should('be.visible')
            cy.get('#range-form').should('be.visible')
            cy.get('#pagination').should('be.visible')
            cy.get('#list').should('be.visible')
        })

        //Problème
        it.skip('Select a trip [Using Map]',() => {
            cy.get('[style="position: absolute; left: 0px; top: 0px; width: 43px; height: 59px; user-select: none; border: 0px; padding: 0px; margin: 0px; max-width: none;"]').as('position')
            cy.get('@position').click()
            //TODO//
        })


        it('Select a trip [Using Side Menu]',() => {
            cy.get(':nth-child(1) > .trip-overview > .steps-overview > :nth-child(1) > .justify-content-center > :nth-child(3) > :nth-child(1) > span').as('baliseAddrdebut')
            cy.get(':nth-child(1) > .trip-overview > .steps-overview > :nth-child(2) > .justify-content-center > :nth-child(3) > :nth-child(1) > span').as('baliseAddrfin')
            cy.get('@baliseAddrdebut').click()
            BasePage.pause(1000)
            cy.get('.modal-body').should('be.visible')
            cy.get('@baliseAddrdebut').should('be.visible')
            cy.get('@baliseAddrfin').should('be.visible')
            cy.get('button.btn.btn-outline-primary').contains('Choose a fleet').should('be.visible')
            cy.get('button.btn.btn-outline-primary').contains('Choose a driver').should('be.visible')
            cy.get('button.btn.btn-outline-success').contains('Assign driver').should('be.visible')

            //temporaire à supprimer dès demain
            cy.get('.close > [aria-hidden="true"]').click()
            BasePage.pause(500)
        })
        
        it.skip('Choose a fleet[filter test include]',() => {
            cy.get('button.btn.btn-outline-primary').contains('Choose a fleet').should('be.visible')
        })

        it.skip('Choose a driver[filter test include]',() => {
            cy.get('button.btn.btn-outline-primary').contains('Choose a driver').click()
        })

        //problème
        it.skip('Assign Driver',() => {
            cy.get('button.btn.btn-outline-primary').contains('Assign driver').click()
        })

        it.skip('Number of available trips depends on Radius', () => {
            //TODO//
        })

        /*
        Assign driver --
        next button sur les trips --
        */


    })

    describe('Trips List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it.skip('Click on a Trip implies Information Visualisation',() => {
            //TODO//
        })

        it.skip('Filter by Status',() => {
            //TODO//
        })

        it.skip('Filter by Date',() => {
            //TODO//
        })

        it.skip('Filter by Location',() => {
            //TODO//
        })

        it.skip('Checking informations accurancy[Status]',() => {
            //TODO//
        })

        /*
        */


    })

})