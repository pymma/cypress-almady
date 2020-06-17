import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

//cy.get('.datatable').find('tr').should('have.length', 4)
let Firstname = ["Tennesse", "Francois", "Abdoulaye","Kevin","Ilias", "Ramatoulaye", "Emmanuel", "Nicolas", "Alois", "Maxime", "Francine","Abdelhay","Pierre", "Paul","Boubacar","Mohamed","Kafeng","Lewis","Jeffery","Angelina","Helgy","Ousmane","Kelvin","Princia","Mouctar","Marie","Kanye","Samuel","Habib","Sayghin","George","Roddy","Zakaria","Loris","Sean","Bao","Fabio","Ruben","Maxime","Hussein","Thibault","Cyril","Theo","Basil","Maeven","Lucile","Othilie","Melanie","Aisha","Elodie"]
let entreprise = ["Wihox","Denzel","Ox","Onix","Nix","Cristal","Bonaparte","Home","Dadhi","Ulix","Texudo","Mapress","Chaux","Dreax","Zino","FightClub","Frost","ClimbHill","Hilux","Droux","Aux"]
let extention = ["Innovation","Corporate","ECommerce","Iservice"]
let warehouses = ["Kamsar","Conakry","Boston","Atlanta","Tokyo","Seattle","Londres","Paris","Lyon","Marseille","Antananarivo","Malabo","Rio de Janeiro","Caire","Manaus","Dakar","Séoul","johannesburg","Dallas","Amsterdam","Lille","Dublin","Niger","Alger","Djibouti","Abuja","Harare","Bombay","Bangalore","Colombo","Sidney","Hobart"]
let comments = ['Damien Marley - So a child may follow','Elton John - High ft Young Thug','Young Thug - Killed Before','Young Thug - Just How It Is']
let warehouse = warehouses[Math.floor(Math.random() * warehouses.length)] 
let company = entreprise[Math.floor(Math.random() * entreprise.length)]
let ext = extention[Math.floor(Math.random() * extention.length)]
let identifation = LoginPage.Generate_Number(3)
let prenom = Firstname[Math.floor(Math.random() * Firstname.length)] 
let cell_phone_number = LoginPage.Generate_Number(10)
let addr = LoginPage.Generate_Number(5) + " " + warehouse
let comment = comments[Math.floor(Math.random() * comments.length)] 

let email = prenom.toLocaleLowerCase() + '@' + company.toLocaleLowerCase() + '-' + ext.toLocaleLowerCase() + '.com'
let name = company + "-" + ext + "-" + identifation
let Registration = company + "-" + ext

context('Vendor[e-commerce include]', () => {

    describe('Vendor Registration',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it('Register a Vendor',() => {
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Register a vendor')
            cy.get('#name').type(name)
            cy.get('#phoneCountryCode').type("+33")
            cy.get('#phoneNumber').type(cell_phone_number)
            cy.get('#email').type(email)
            cy.get('#registrationCertificate').type(Registration)
            cy.get('#defaultWarehouseName').type(warehouse)
            cy.get('#completeAddress').type(addr)
            cy.get("#details").type("Damien Marley - So a Child May Follow")
            cy.get('button').contains('Register').click()
        })

        it('New Registration should be visible in Vendors Section', () => {
            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')
            cy.get('td').contains(name).should('be.visible')
            })

        })

    })

    describe('Vendor List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it('Click on a Vendor implies Information Visualisation',() => {
            let name = 'La Liberté De Concrétiser Vos Projets De Manière Efficace'
            let phone = "+96614490"
            let regis_name = "8264936290"
            let mail = "vendor0@vendor-0.com"

            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')
            cy.get('td').contains(name).should('be.visible').click()
            BasePage.pause(1000)
            cy.get('div').contains(name).should('be.visible')
            cy.get('div').contains(phone).should('be.visible')
            cy.get('div').contains(regis_name).should('be.visible')
            cy.get('div').contains(mail).should('be.visible')
            cy.get('button').contains("Disable").should('be.visible')
            cy.get('button').contains("Create a warehouse").should('be.visible')
        })
        
        it.skip('Create a Warehouse',() => {
            let ville  = warehouses[Math.floor(Math.random() * warehouses.length)]
            let compAddr = LoginPage.Generate_Number(5)

            cy.get('button').contains("Create a warehouse").click()
            BasePage.pause(1000)
            cy.get('div.modal-content').should('be.visible')
            cy.get('div.modal-title.h4').contains('New warehouse').should('be.visible')
            cy.get('input[name="name"]').type(ville)
            cy.get('input[name="details"]').type("Warehouse added during the Test session")
            cy.get('input[name="completeAddress"]').type(compAddr)
            cy.get('button').contains('Register').click()
            BasePage.pause(1000)
            cy.get('span').contains('x').click()
            BasePage.pause(1000)
            cy.reload()
            BasePage.pause(1000)
            cy.get('span').contains('WAREHOUSE LIST').click()
            BasePage.pause(1000)
            cy.get('td').contains(ville).should('be.visible')
        })

        it.skip('Disable/Enable a Vendor',() => {
            cy.get('button').contains('Disable').click()
            BasePage.pause(1000)
            cy.get('div.card-body').should('be.visible')
            cy.get('td').contains('phone').next().should('contain','admin@almady.com').click()
            cy.get('button').contains('Enable').should('have.class','btn-outline-success').click()
            cy.get('td').contains('6189143121').next().should('contain','').click()

        })

        it.skip('Select a group implies group tab visualisation',() => {

            let opt1 = `${name}_admin`
            let opt2 = `${name}_admin`

            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')    

            cy.get('td').contains(name).click()
            cy.get('select').select(opt1)
            cy.get('option').contains(opt1).should('be.visible')
            cy.get('select').select(opt2)
            cy.get('option').contains(opt2).should('be.visible')
        })

        it.skip('Update a Vendor Information[any Comment]',() => {
            cy.get('button').contains('Update').click()
            BasePage.pause(1000)
            cy.get('#details').type(comment)
            cy.get('button').contains('Update e-commerce').click()
            BasePage.pause(1000)
            cy.get('td').contains('6189143121').click()
            BasePage.pause(1000)
            cy.get('div.list-group-item').contains(`Details: ${comment}`).should('be.visible')
        })

        it.skip('Filter test',() => {
            cy.get('span[d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"]').click() //boutton retour
            BasePage.pause(1000)
            cy.get('select[name="choose"]').select('Email')
            cy.get('input[name="search"]').clear().type('abdelhay@zino-ecommerce.com')
            cy.get('#inputGroupPrepend').click()
            BasePage.pause(1500)
            cy.get('table.table.table-striped.table-bordered.table-hover').find('tr').should('have.length', 2)
            cy.get('td').contains('abdelhay@zino-ecommerce.com').should('be.visible')
        })

    })

    //----------------------------------------------------------------------------------------------------------------------------------//
  
    describe('E-Commerce Registration',() => {

            let Firstname = ["Tennesse", "Francois", "Abdoulaye","Kevin","Ilias", "Ramatoulaye", "Emmanuel", "Nicolas", "Alois", "Maxime", "Francine","Abdelhay","Pierre", "Paul","Boubacar","Mohamed","Kafeng","Lewis","Jeffery","Angelina","Helgy","Ousmane","Kelvin","Princia","Mouctar","Marie","Kanye","Samuel","Habib","Sayghin","George","Roddy","Zakaria","Loris","Sean","Bao","Fabio","Ruben","Maxime","Hussein","Thibault","Cyril","Theo","Basil","Maeven","Lucile","Othilie","Melanie","Aisha","Elodie"]
            let entreprise = ["Wihox","Denzel","Ox","Onix","Nix","Cristal","Bonaparte","Home","Dadhi","Ulix","Texudo","Mapress","Chaux","Dreax","Zino","FightClub","Frost","ClimbHill"]
            let extention = ["Innovation","Corporate","ECommerce","Iservice"]
        
            let company = entreprise[Math.floor(Math.random() * entreprise.length)]
            let ext = extention[Math.floor(Math.random() * extention.length)]
            let identifation = LoginPage.Generate_Number(3)
            let prenom = Firstname[Math.floor(Math.random() * Firstname.length)] 
            let cell_phone = LoginPage.Generate_Number(10)
        
            let email = prenom.toLocaleLowerCase() + '@' + company.toLocaleLowerCase() + '-' + ext.toLocaleLowerCase() + '.com'
            let name = company + "-" + ext + "-" + identifation
            let Registration = company + "-" + ext
            let internal = Registration + "-ECommerce"

            before(function(){
                LoginPage.load()
                LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            })
    
            after(function(){
                BasePage.pause(700)
                LoginPage.logout()
            })
    
            it('Register a E-commerce bussiness',() => {

                BasePage.Sidebar()
                BasePage.FromSidebarClick('Ecommerce','Register e-commerce')
                cy.get('[name="name"]').type(name)
                cy.get('[name="phoneCountryCode"]').type("+33")
                cy.get('[name="phoneNumber"]').type(cell_phone)
                cy.get('[name="email"]').type(email)
                cy.get('[name="registrationName"]').type(Registration)
                cy.get('[name="internetName"]').type(internal)
                cy.get('[name="companyName"]').type(company)
                cy.get('button.btn.btn-dark.btn-lg').contains('register e-commerce').click()
                BasePage.pause(4000)
            })
    
            it('New Registration should be visible in E-Commerce Section', () => {
                cy.reload()
                LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
                BasePage.Sidebar()
                BasePage.FromSidebarClick('Ecommerce','E-commerces list')
                cy.get('td').contains(name).should('be.visible')
            })
        })

    describe('E-Commerce List',() => {

        let name = 'Linux-Corporate-667'
        let phone = "6567686969"
        let regis_name = "linux-ECommerce"
        let mail = "albert@linux.com"
        let option = "Name"
        let current_internet_name = LoginPage.Generate_Number(12)



        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })


        it('Click on a E-Commerce list element implies Information Visualisation',() => {
            

            BasePage.Sidebar()
            BasePage.FromSidebarClick('Ecommerce','E-commerces list')
            cy.get('td').contains(name).should('be.visible').click()
            BasePage.pause(1000)
            cy.get('div').contains(name).should('be.visible')
            cy.get('div').contains(phone).should('be.visible')
            cy.get('div').contains(regis_name).should('be.visible')
            cy.get('div').contains(mail).should('be.visible')
            cy.get('button').contains("Disable e-commerce").should('be.visible')
        })

        it('Filter test',() => {
            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Ecommerce','E-commerces list')
            cy.get('select[name="choose"]').select(option)
            cy.get('input[name="search"]').clear().type(name)
            cy.get('#inputGroupPrepend').click()
            BasePage.pause(1500)
            cy.get('table.table.table-striped.table-bordered.table-hover').find('tr').should('have.length', 2)

        })

        it('Select a group implies group tab visualisation',() => {
            
            let opt1 = 'Linux_main'
            let opt2 = 'Linux_admin'

            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Ecommerce','E-commerces list')    

            cy.get('td').contains(name).click()
            cy.get('select').select(opt1)
            cy.get('option').contains(opt1).should('be.visible')
            cy.get('select').select(opt2)
            cy.get('option').contains(opt2).should('be.visible')

        })

        it.skip('Disable a E-commerce bussiness',() => {
            //!\\ Disable ne marche pas
            //cy.reload()
            cy.get('button').contains('Disable e-commerce').should('be.visible').click()
            BasePage.pause(1000)//
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Ecommerce','E-commerces list')
            cy.get('select[name="choose"]').select(option)
            cy.get('input[name="search"]').clear().type(name)
            cy.get('#inputGroupPrepend').click()
            BasePage.pause(1500)
            cy.get('td').contains('6567686969').next().should('contain','admin@almady.com')
        })

        it.skip('Enable a E-commerce bussiness',() => {
            
            cy.get('button').contains('Enable e-commerce').should('be.visible').click()
            BasePage.pause(1000)
            cy.get('td').contains(name).should('be.visible')
        })

        it.skip('Update a E-commerce Information',() => {

            cy.get('td').contains(name).click()
            BasePage.pause(1000)
            cy.get('button').contains('Update e-commerce').click()
            BasePage.pause(1000)
            
            cy.get('[name="internetName"]').type(current_internet_name)
            cy.get('button').contains('Update e-commerce').click()
            BasePage.pause(1000)
            cy.get('td').contains(name).click()
            BasePage.pause(1000)
            cy.get('div').contains(current_internet_name).should('be.visible')
        })
    })
