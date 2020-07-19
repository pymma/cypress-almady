import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD } from '../../classes/config'

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

/*
Vendor
------
input-name-search --> dont work[cypress]
comment update in a vendor --> dont work
E-commerce
----------
front in e-commerce list must be revisited
*/
context('Vendor[e-commerce include]', () => {
    //fonctionne
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
            cy.get('input[name="search"]').clear().type(name)
            cy.get('#inputGroupPrepend').click()
            BasePage.pause(1500)
            cy.get('td').contains(name).should('be.visible')
            })

        })
    
    //fonctionne 
    describe('Vendor List',() => {

        let town = 'Séoul'
        let name = "Le Confort D'innover À L'état Pur"
        let phone = "+96614490"
        let num_coup = "14490"
        let regis_name = "6077840140"
        let mail = "vendor0@vendor-0.com"
        let ville  = warehouses[Math.floor(Math.random() * warehouses.length)]
        let compAddr = LoginPage.Generate_Number(5)

        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
        })

        it('Click on a Vendor implies Information Visualisation',() => {
            
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
            BasePage.pause(1000)
        })
        
        it('Create a Warehouse',() => {
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')
            cy.get('td').contains(name).click()
            cy.get('button').contains("Create a warehouse").click()
            BasePage.pause(1000)
            cy.get('div.modal-content').should('be.visible')
            cy.get('div.modal-title.h4').contains('New warehouse').should('be.visible')
            cy.get('#name').type(ville)
            cy.get('#details').type("Warehouse added during the Test session")
            cy.get('#completeAddress').type(compAddr)
            cy.get('button').contains('Register').click()
            BasePage.pause(1000)
            cy.reload()
            BasePage.pause(1000)
            cy.get('span').contains('WAREHOUSE LIST').click()
            BasePage.pause(1000)
            cy.get('td').contains(ville).should('be.visible')
        })

        it('Add a comment on a warehouse', () => {
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')
            cy.get('td').contains(name).click()
            BasePage.pause(1000)
            cy.get('span').contains(' WAREHOUSE LIST ').click()
            BasePage.pause(1000)
            cy.get('td').contains(town).click()
            BasePage.pause(1000)
            cy.get('h3').contains('Warehouse Information').should('be.visible')
            cy.get('div').contains(`Name: ${town}`).should('be.visible')
            cy.get('#commentToDriver').type(`Commentaire pour la ville de ${town} à l'addresse ${compAddr}`)
            cy.get('button').contains('Send').click()
        })

        it('Disable/Enable a Vendor',() => {
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')
            BasePage.pause(1000)
            cy.get('td').contains(name).click()
            cy.get('button').contains('Disable').click()
            BasePage.pause(1000)
            cy.get('input[name="search"]').type(name)
            cy.get('#inputGroupPrepend').click()
            BasePage.pause(1000)
            cy.get('td').contains('admin@almady.com').should('be.visible').click()
            BasePage.pause(1000)
            cy.get('button').contains('Enable').should('have.class','btn-outline-success').click()
        })

        it('Select a group implies group tab visualisation',() => {

            let opt1 = `${name}_admin`
            let opt2 = `${name}_admin`

            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')    

            cy.get('td').contains(name).click()
            cy.get('select').select(opt1)
            cy.get('option').contains(opt1).should('be.visible')

            cy.get('#groups').select(opt2)
            cy.get('option').contains(opt2).should('be.visible')
        })

        it('Update a Vendor Information[any Comment]',() => { //signalement update commentaire dont work
            let new_r = 'leave next to the door[' + LoginPage.Generate_Number(5) + ']'
            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')
          
            cy.get('td').contains(name).click()
            BasePage.pause(1000)
            cy.get('button').contains('Update').click()
            BasePage.pause(1000)
            cy.get('#details').clear().type(new_r)
            cy.get("#phoneNumber").clear().type(num_coup)
            cy.get('button').contains('Update e-commerce').click()
            BasePage.pause(1000)
            cy.get('td').contains(name).click()
            BasePage.pause(1000)

            //cy.get('div').contains(new_r).should('be.visible')
        })

        it('Filter test',() => {
            //cy.get('span[d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"]').click() //boutton retour
            BasePage.pause(1000)
            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Vendor','Vendors list')


            BasePage.pause(1000)
            cy.get('input[name="search"]').clear().type(name)
            cy.get('#inputGroupPrepend').click()
            BasePage.pause(1500)
            cy.get('table.table.table-striped.table-bordered.table-hover').find('tr').should('have.length', 2)
            cy.get('td').contains(name).should('be.visible')
        })

    })

    //----------------------------------------------------------------------------------------------------------------------------------//
  
    //fonctionne
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
                cy.get('#name').type(name)
                cy.get('#phoneCountryCode').type("+33")
                cy.get('#phoneNumber').type(cell_phone)
                cy.get('#email').type(email)
                cy.get('#registrationName').type(Registration)
                cy.get('#internetName').type(internal)
                cy.get('#companyName').type(company)
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

    //fonctionne
    describe('E-Commerce List',() => {

        let name = 'Magento ecommerce 1'
        let phone = "0144944221"
        let regis_name = "12457898"
        let mail = "magento@ecommerce.com"
        let comp_name = "Main Magento company 1"
        let option = "Name"
        let current_internet_name = LoginPage.Generate_Number(12)



        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
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
            
            let opt1 = `${comp_name}_main`
            let opt2 = `${comp_name}_admin`

            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Ecommerce','E-commerces list')    

            cy.get('td').contains(name).click()
            cy.get('#groups').select(opt1)
            cy.get('option').contains(opt1).should('be.visible')
            cy.get('#groups').select(opt2)
            cy.get('option').contains(opt2).should('be.visible')

        })

        it('Disable a E-commerce bussiness',() => {
            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Ecommerce','E-commerces list')    

            cy.get('td').contains(name).click()
            cy.get('button').contains('Disable e-commerce').should('be.visible').click()
        })

        it('Update a E-commerce Information',() => {
            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Ecommerce','E-commerces list') 
            cy.get('td').contains(name).click()
            BasePage.pause(1000)
            cy.get('button').contains('Update e-commerce').click()
            BasePage.pause(1000)
            
            cy.get('#internetName').clear().type(current_internet_name)
            cy.get('button').contains('Update e-commerce').click()
            BasePage.pause(1000)
            cy.get('td').contains(name).click()
            BasePage.pause(1000)
            cy.get('div').contains(current_internet_name).should('be.visible')
        })

        it('Enable a E-commerce bussiness',() => {
            
            cy.get('button').contains('Enable e-commerce').click()
            BasePage.pause(1000)
            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Ecommerce','E-commerces list')    
            cy.get('td').contains(name).click()
            BasePage.pause(1000)
            cy.reload()
            cy.get('button').contains('Enable e-commerce').click()
        })
    })

    })


context('Company', () => {
    //fonctionne
    describe('Companies List', () => {

        let name1 = 'Almady company'
        let phone1 = "+96614492122"
        let regis_name1 = "12457898"
        let email1 = "almady@company.com"



        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it('Click on a company should implies Information Visualisation', () => {
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Company','Companies list')
            cy.get('td').contains(email1).should('be.visible').click()
            BasePage.pause(1000)
            cy.get('h3').contains('Company Information').should('be.visible')
            cy.get('div').contains(`Registration Certificate: ${regis_name1}`).should('be.visible')
            cy.get('div').contains(`Company name: ${name1}`).should('be.visible')
            cy.get('div').contains(`Email: ${email1}`).should('be.visible')
            cy.get('div').contains(`Mobile number: ${phone1}`).should('be.visible')
        })

        it('Groups Visualisation', () => {
            let option = ['Administrators',' almadymain']
            cy.get('span').contains('Groups').should('be.visible')
            for (let index = 0; index < option.length; index++) {
                let value = option[index]
                cy.get('option').contains(value)
            }
        })

        it('Filter Test', () => {
            cy.reload()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Company','Companies list')
            cy.get('select[name="choose"]').select("Name")
            cy.get('input[name="search"]').clear().type(name1)
            cy.get('#inputGroupPrepend').click()
            cy.get('table.table.table-striped.table-bordered.table-hover').find('tr').should('have.length', 2)
            cy.get('td').contains(name1).should('be.visible')
            cy.get('select[name="choose"]').select("Email")
            cy.get('input[name="search"]').clear().type(email1)
            cy.get('#inputGroupPrepend').click()
            cy.get('table.table.table-striped.table-bordered.table-hover').find('tr').should('have.length', 2)
            cy.get('td').contains(email1).should('be.visible')
        })

    })
})
