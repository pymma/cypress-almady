import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

let Firstname = ["Tennesse", "Francois", "Abdoulaye","Kevin","Ilias", "Ramatoulaye", "Emmanuel", "Nicolas", "Alois", "Maxime", "Francine","Abdelhay","Pierre", "Paul","Boubacar","Mohamed","Kafeng","Lewis","Jeffery","Angelina","Helgy","Ousmane","Kelvin","Princia","Mouctar","Marie","Kanye","Samuel","Habib","Sayghin","George","Roddy","Zakaria","Loris","Sean","Bao","Fabio","Ruben","Maxime","Hussein","Thibault","Cyril","Theo","Basil","Maeven","Lucile","Othilie","Melanie","Aisha","Elodie"]
let frstnm = Firstname[Math.floor(Math.random() * Firstname.length)] 
let entreprises = ["Wihox","Denzel","Ox","Onix","Nix","Cristal","Bonaparte","Home","Dadhi","Ulix","Texudo","Mapress","Chaux","Dreax","Zino","FightClub","Frost","ClimbHill","Hilux","Droux","Aux"]
let numero = LoginPage.Generate_Number(3)
let entreprise = entreprises[Math.floor(Math.random() * entreprises.length)] 
let name = entreprise + '-Fleet-' + numero 
let phone = LoginPage.Generate_Number(10)
let email = frstnm + "@" + entreprise.toLocaleLowerCase() + 'com'
let regis = LoginPage.Generate_Number(7) 


context('Fleet', () => {

    let nom = 'fleet-0-name'
    let ema = 'fleet@fleet0.com'
    let ema1 = 'margaret.grondin@voisin.com'
    let mobile = '11110'
    let ph = '+966'
    let regis = '4554540'

    describe('Fleet List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it('Click on a Fleet implies information Visualisation',() => {
          BasePage.Sidebar()
          BasePage.FromSidebarClick('Fleet','Fleets list')
          cy.get('td').contains(nom).should('be.visible').click()
          BasePage.pause(1000)
          cy.get('h3').contains('Fleet Information').should('be.visible')
          cy.get('div.list-group-item').contains(`Fleet name: ${nom}`).should('be.visible')
          cy.get('div.list-group-item').contains(`Company name: ${nom}`).should('be.visible')
          cy.get('div.list-group-item').contains(`Email: ${ema}`).should('be.visible')
          cy.get('div.list-group-item').contains(`Email: ${ema1}`).should('be.visible')
          cy.get('div.list-group-item').contains(`Phone country code: ${ph}`).should('be.visible')
          cy.get('div.list-group-item').contains(`Mobile: ${mobile}`).should('be.visible') 
          cy.get('div.list-group-item').contains(`Mobile number: ${mobile}`).should('be.visible') 
          cy.get('div.list-group-item').contains(`Registration Certificate: ${regis}`).should('be.visible') 
        })

        it('Select a group implies group tab visualisation',() => {

          BasePage.pause(1000)
          let opt1 = 'LaPossibiliteDeChangerPlusRapidement.com_admin'
          let opt2 = 'LaPossibiliteDeChangerPlusRapidement.com_main'

          cy.get('select').select(opt1)
          cy.get('option').contains(opt1).should('be.visible')

          LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
          BasePage.Sidebar()
          BasePage.FromSidebarClick('Fleet','Fleets list')
          
          cy.get('td').contains(nom).should('be.visible').click()
          BasePage.pause(1000)
          cy.get('select').select(opt2)
          cy.get('option').contains(opt2).should('be.visible')
        })

        it('Disable fleet implies side Effect',() => {
            cy.get('button').contains('Disable Fleet').should('be.visible').click()
            BasePage.pause(1000)//
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Fleet','Fleets list')
            cy.get('input[name="search"]').clear().type(nom)
            cy.get('#inputGroupPrepend').click()
            BasePage.pause(1500)
            cy.get('td').contains(ema).next().should('contain','admin@almady.com')
        })

        it.skip('Filter Test',() => {
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Fleet','Fleets list')
            cy.get('input[name="search"]').clear().type()
            cy.get('#inputGroupPrepend').click()
            BasePage.pause(1500)
            cy.get('table.table.table-striped.table-bordered.table-hover').find('tr').should('have.length', 2)
            cy.get('td').contains(nom).should('be.visible')
        })

        it.skip('Update Fleet Information',() => {
            let ancien = regis
            let nouveau = LoginPage.Generate_Number(7) 
            cy.get('td').contains(nom).click()
            BasePage.pause(1000)
            cy.get('button').contains("Update fleet").click()
            BasePage.pause(1000)
            cy.get('input[name="registrationCertificate"]').clear().type(nouveau)
            cy.get('button').contains('Update fleet').click()
            BasePage.pause(2000)
            cy.get('td').contains(nom).click()
            cy.get('div').contains(nouveau).should('be.visible')
            cy.get('button').contains("Update fleet").click()
            cy.get('input[name="registrationCertificate"]').clear().type(ancien)
            cy.get('button').contains('Update fleet').click()
            
        })



    })

    describe.skip('Fleet Registration',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it('Register a fleet',() => {
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Fleet','Register a fleet')
            cy.get('input[name="name"]').clear().type(name)
            cy.get('input[name="phoneCountryCode"]').clear().type(ph)
            cy.get('input[name="phoneNumber"]').clear().type(phone)
            cy.get('input[name="email"]').clear().type(email)
            cy.get('input[name="registrationCertificate"]').clear().type(regis)
        })

        it('New Fleet should be visible in fleet list section',() => {
            //je ne sais pas ca apparait ou
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Fleet','Fleets list')
            cy.get('td').contains(name).should('be.visible')
        })

    })

})