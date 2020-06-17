import 'cypress-file-upload' //add by me 
import BasePage from '../../classes/BasePage'
import LoginPage from '../../classes/LoginPage'
import { LOGIN_USERNAME, LOGIN_PASSWORD, DRIVER_DEFAULT_PASSWORD } from '../../classes/config'


//Information
let FirstName = ["Tennesse", "Francois", "Abdoulaye","Kevin","Ilias", "Ramatoulaye", "Emmanuel", "Nicolas", "Alois", "Maxime", "Francine","Abdelhay","Pierre", "Paul","Boubacar","Mohamed","Kafeng","Lewis","Jeffery","Angelina","Helgy","Ousmane","Kelvin","Princia","Mouctar","Marie","Kanye","Samuel","Habib","Sayghin","George","Roddy","Zakaria","Loris","Sean","Bao","Fabio","Ruben","Maxime","Hussein","Thibault","Cyril","Theo","Basil","Maeven","Lucile","Othilie","Melanie","Aisha","Elodie"]
let LastName = ["BEN ABDELAZIZ","BA","OKENDZA","DURAND","LEROY","DIALLO","FONTAINE","LAMBER","MARLEY","HAMILTON","NAVET","MOREL","MAES","CLAES","WILLEMS","ABAR","OLIVEIRA","TRAORE","BOUTTELIER","KINGSTON","SMITH","BROWN","THOMPSON","FORD","GONZALEZ","HERNANDEZ","PRICE","COLEMAN","BROOKS","WOOD","LUO","ZHAO","ZHOU","LIANG","YANG","ZUMA","FOFANA","BARRY","ABAKOUMOV","GALIMOV","GOULINE","RODRIGUEZ","GARCIA","WEST","MAYWEATHER","DJILAL","DAACH","WILLIAMS","RENAULT","MERCEDES"]
let Jobs = ["Global Web Supervisor","Customer Implementation Technician","Customer Ideation Engineer","Corporate Assurance Architect","Corporate Implementation Officer","Investor Tactics Engineer","Lead Intranet Architect","Senior Mobility Specialist","Dynamic Program Technician","Central Resonance Specialist","Investor Accountability Manager","Human Response Developer","Dynamic Intranet Manager","Forward Functionality Planner","Human Web Planner","National Web Analyst","International Brand Designer","Future Interactions Liason","Customer Configuration Coordinator","Future Tactics Strategist","Relational Metrics Consultant","Senior Tactics Associate","Product Integration Associate","Principal Configuration Producer","Investor Optimization Strategist"]
let email_tail = ["@gmail.com","@yahoo.com","@live.fr","@pymma-software.com","@hotmail.com","@email.com"] 
let Adresses = ["9 rue du Chef de Ville 77440 ARMENTIERES EN BRIE","1 rue de la Mairie 77410 CHARNY","85 rue Sommeville	77380 COMBS LA VILLE","6 rue de la fileuse 77310 ST FARGEAU PONTHIERRY","42 quai DION BOUTON 92800 PUTEAUX","45 avenue Sainte Marie	94000 CRETEIL","19 rue des Ecoles 91510 LARDY","11 rue Jean Jaurès 91100 VILLABE","37 rue Saint Roch 75001 PARIS","32 rue Geoffroy Saint Hilaire 75005 PARIS","8 rue de Vouillé	75015 PARIS","72 rue Raynouard 75016 PARIS","77 rue Truffaut 75017 PARIS","8 rue Championnet 75018 PARIS","73 rue de la Mare 75020 PARIS","18 rue Ampère 75017 PARIS","83 avenue du Général Bizot 75012 PARIS","1 RUE LEVERT 75020 PARIS","40 bis rue Manin	75019 PARIS","2 rue Pierre Brossolette 75005 PARIS","8 rue Pierre Foncin 75020 PARIS","11 RUE DE LA PLAINE 75020 PARIS","293 rue des Pyrénées 75020 PARIS","8 rue Robert Estienne 75008 PARIS","57 rue de Romainville 75019 PARIS","22 rue Saint Maur 75011 PARIS","38 rue Vandrezanne 75013 PARIS","3 passage Josseaume 75020 PARIS","13 rue Vulpian 75013 PARIS","55 rue Baudricourt 75013 PARIS","10 RUE BOURSAULT 75017 PARIS","12 bis rue Fourcroy	75017 PARIS","7 rue du Général Brunet 75019 PARIS","15 rue Houdon 75018 PARIS","9 rue de Lesseps 75020 PARIS","2 AVENUE LEON JOUHAUX 93270 SEVRAN","27 A rue de la Liberté 93230 ROMAINVILLE","8 bis rue George Sand 94510 LA QUEUE EN BRIE","10 square Jean Goujon	94500 CHAMPIGNY SUR MARNE"]
let Truck_Brandz = ["Mercedes","Renault","MAN","Iveco","Volvo","DAF","Scania","Nissan","MITSUBISHI","GINAF","FIAT","ISUZU","ASTRA","FORD","OPEL"]
let Truck_Models = ["Model-1","Model-2","Model-3","Model-4","Model-5","Model-6","Model-7","Model-8","Model-9"]

let cell_phone_number = LoginPage.Generate_Number(10)
let pren = FirstName[Math.floor(Math.random() * FirstName.length)]
let prenom = pren + '-' + LoginPage.Generate_Number(4)
let nom = LastName[Math.floor(Math.random() * LastName.length)]
let email = pren.toLocaleLowerCase() + '.' + nom.toLocaleLowerCase() + email_tail[Math.floor(Math.random() * email_tail.length)]
let job = Jobs[Math.floor(Math.random() * Jobs.length)] 
let addr = Adresses[Math.floor(Math.random() * Adresses.length)]
let truck_regis = LoginPage.Generate_Number(6)
let brand = Truck_Brandz[Math.floor(Math.random() * Truck_Brandz.length)]
let Model = Truck_Models[Math.floor(Math.random() * Truck_Models.length)]




context('Driver', () => {
    
    describe('Register a Driver[As Driver]',() => {
         
        before(function(){
            LoginPage.load()
            BasePage.pause(1000)
        })

        after(function(){
            BasePage.pause(500)
            LoginPage.logout()
        })

        it('Create A Driver[based on Phone Number process]', () => {
            LoginPage.CreateConfirmDriver(cell_phone_number)
        })

        it('Personal Information Completion',() => {
            cy.get('[name="firstName"]').type(prenom)
            cy.get('[name="lastName"]').type(nom)
            cy.get('[name="email"]').type(email)
            cy.get('[name="currentPrevJob"]').type(job)
            cy.get('[name="completeAddress"]').type(addr)
        })

        it('Fill The Planning', () => {
            // LUNDI 8h - 19h30
            cy.get('#start').type('08:00')
            cy.get('#end').type('19:30')
            BasePage.pause(500)
            cy.get("button.btn.btn-primary.btn-sm").contains("add").click()
            BasePage.pause(500)
            cy.get('td.delete-part-row').contains('08:00 - 19:30').should('be.visible')
        
            //JEUDI 7h - 18h00
            cy.get('#day').select('Friday')
            BasePage.pause(500)
            cy.get('#start').type('07:00')
            cy.get('#end').type('18:00')
            BasePage.pause(500)
            cy.get("button.btn.btn-primary.btn-sm").contains("add").click()
            BasePage.pause(500)
            cy.get('td.delete-part-row').contains('07:00 - 18:00').should('be.visible')

            //MERCREDI 7h30 - 15h

            cy.get('#day').select('Wednesday')
            BasePage.pause(500)
            cy.get('#start').type('07:30')
            cy.get('#end').type('15:00')
            BasePage.pause(500)
            cy.get("button.btn.btn-primary.btn-sm").contains("add").click()
            BasePage.pause(500)
            cy.get('td.delete-part-row').contains('07:30 - 15:00').should('be.visible')
        })

        it('Add Documents',() => {
            cy.upload_file('#idCard', 'img.jpeg')
            cy.upload_file('#drivingLicenseDocument', 'img.jpeg')
            cy.upload_file('#insuranceDocument', 'img.jpeg')
            cy.upload_file('#residenceDocument', 'img.jpeg')
            cy.upload_file('#pollutionControlDoc', 'img.jpeg')
            cy.upload_file('#rcCopyDocument', 'img.jpeg')
            cy.upload_file('#panCardDocument', 'img.jpeg')
        })

        it('Vehicule Information Completion',() => {
           cy.get('[name="truckRegistrationNumber"]').type(truck_regis)
           cy.get('[name="truckBrand"]').type(brand)
           cy.get('[name="truckModel"]').type(Model)
           cy.get('#transportType').select('Medium truck')
        })

        it('Transport Box Completion',() => {
            cy.get('#containerType').select("Container")
            cy.get("#productType").select("hot")
            cy.get("button.btn.btn-primary.btn-sm").contains('Add').click()
        })

        it('Submit the Register',() => {
            BasePage.pause(1000)
            cy.get("button.btn.btn-primary.btn-lg").contains("Register Driver").click()
            BasePage.pause(10000)
        })

        it('Driver Registration should be visible in the tasks section', () => {
            BasePage.pause(1000)
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Task','Tasks')
            cy.get('td').contains(prenom).should('be.visible')
            cy.get('td').contains(nom).should('be.visible')
            cy.get('td').contains('Verify Driver data before final validation').should('be.visible')
        })

    })
    
})



context('Tasks', () => {
    
    describe('Tasks Verification',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.pause(1000)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Task','Tasks')
        })


        
        //Les comptes des drivers à validé
        it(`Verify the driver ${prenom} ${nom} is visible and not processed`,() => {
            cy.get('td').contains(prenom).should('be.visible')
            cy.get('td').contains(nom).should('be.visible')
            cy.get('td').contains('Verify Driver data before final validation').should('be.visible')
            LoginPage.logout()
            //Ready non vérifié pour le moment
        })

        it('Verify the Data from the precedent driver',() => {
            BasePage.pause(1000)
            cy.reload()
            BasePage.pause(500)
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.pause(1000)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Task','Tasks')
            cy.get('td').contains(prenom).next().contains(nom).click()
            BasePage.pause(500)
            //Contact
            cy.get('span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock').contains(`First-name : ${prenom}`).should('be.visible')
            cy.get('span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock').contains(`Last-name : ${nom}`).should('be.visible')
            cy.get('span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock').contains(`Phone : (+33) ${cell_phone_number}`).should('be.visible')
            //Personal Information
            cy.get('[name="firstName"]').should('have.value',prenom)
            cy.get('[name="lastName"]').should('have.value',nom)
            cy.get('[name="phoneCountryCode"]').should('have.value','+33')
            cy.get('[name="mobileNumber"]').should('have.value',cell_phone_number)
            cy.get('[name="email"]').should('have.value',email)
            cy.get('[name="currentPrevJob"]').should('have.value',job)
            cy.get('[name="completeAddress"]').should('have.value',addr)
            //Document
            cy.get('#idCard').should('have.class','fileSavedColor')
            cy.get('#drivingLicenseDocument').should('have.class','fileSavedColor');
            cy.get('#insuranceDocument').should('have.class','fileSavedColor')
            cy.get('#residenceDocument').should('have.class','fileSavedColor')
            cy.get('#pollutionControlDoc').should('have.class','fileSavedColor')
            cy.get('#rcCopyDocument').should('have.class','fileSavedColor')
            cy.get('#panCardDocument').should('have.class','fileSavedColor')
            //Planning
            cy.get('td.delete-part-row').contains("08:00 - 19:30").should('be.visible')
            cy.get('td.delete-part-row').contains("07:30 - 15:00").should('be.visible')
            cy.get('td.delete-part-row').contains("07:00 - 18:00").should('be.visible')
            //Vehicule Information
            cy.get('[name="truckRegistrationNumber"]').should('have.value',truck_regis)
            cy.get('[name="truckBrand"]').should('have.value',brand)
            cy.get('[name="truckModel"]').should('have.value',Model)
            cy.get('#transportType').should('have.value','VMTruck') //correspond à Medium truck
            //transport Box
            cy.get('#containerType').should("have.value","box")
            cy.get("#productType").should("have.value","HOT")
            cy.get('input.col-md-12').should("have.value","1")
        })

        it('Claim The Task',() => {
            BasePage.pause(1000)
            LoginPage.load()
            cy.reload()
            BasePage.pause(1000)
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.pause(1000)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Task','Tasks')
            cy.get('td').contains(prenom).click()
            BasePage.pause(1000)
            cy.get('button.btn.btn-primary.btn-lg').contains("Claim Task").click()
            BasePage.pause(1000)
            cy.get('button').contains('Release Task').should('be.visible').and('have.class','btn-primary')
            cy.get('button').contains('Start the task').should('be.visible').and('have.class','btn-primary')
            cy.get("svg.MuiSvgIcon-root").click()
            BasePage.pause(3500)
            cy.get('td').contains('Reserved').should('be.visible')
            cy.get('td').contains('admin@almady.com').should('be.visible')

        })

        it('Start The Task',() => {
            BasePage.pause(1000)
            LoginPage.load()
            cy.reload()
            BasePage.pause(1000)
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.pause(1000)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Task','Tasks')
            cy.get('td').contains(prenom).click()
            BasePage.pause(1000)
            cy.get('button').contains('Start the task').click()
            BasePage.pause(1000)
            cy.get('button').contains('Stop the task').should('be.visible').and('have.class','btn-primary')
            cy.get('button').contains('Validation').should('be.visible').and('have.class','btn-primary')
            cy.get("svg.MuiSvgIcon-root").click()
            BasePage.pause(3500)
            cy.get('td').contains('InProgress').should('be.visible')
        })

        it('Stop The Task',() => {
            BasePage.pause(1000)
            LoginPage.load()
            cy.reload()
            BasePage.pause(1000)
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.pause(1000)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Task','Tasks')
            cy.get('td').contains(prenom).click()
            BasePage.pause(1000)
            cy.get('button').contains('Stop the task').click()
            BasePage.pause(1000)
            cy.get('button').contains('Release Task').should('be.visible').and('have.class','btn-primary')
            cy.get('button').contains('Start the task').should('be.visible').and('have.class','btn-primary')
            cy.get("svg.MuiSvgIcon-root").click()
            BasePage.pause(3500)
            cy.get('td').contains('Reserved').should('be.visible')
            cy.get('td').contains('admin@almady.com').should('be.visible')
        })


        it('Validate The Task & Save Profile',() => {
            BasePage.pause(1000)
            LoginPage.load()
            cy.reload()
            BasePage.pause(1000)
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.pause(1000)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Task','Tasks')
            cy.get('td').contains(prenom).click()
            BasePage.pause(1000)
            cy.get('button').contains('Start the task').click()
            BasePage.pause(1000)
            cy.get('button').contains('Validation').click()
            BasePage.pause(1500)
            cy.get('button.save-button.btn.btn-success.btn-lg').contains('Save profile').click()
            BasePage.pause(3000)
        })

    })

})

context('Registration Verification', () => {

    describe('Registration Verification[As Driver]',() => {
         
        before(function(){
            LoginPage.load()
            BasePage.pause(1000)
        })

        after(function(){
            BasePage.pause(500)
            LoginPage.logout()
        })

        it('Driver Change Password after The Admin Validation',() => {
            LoginPage.login(cell_phone_number,cell_phone_number)
            BasePage.pause(1000)
            cy.get('input[name="newPassword"]').type(DRIVER_DEFAULT_PASSWORD)
            cy.get('input[name="repeatNewPassword"]').type(DRIVER_DEFAULT_PASSWORD)
            cy.get('button.btn.btn-primary').contains("Submit").click()
        })

        it('Connect The New Driver after All Steps And Verify General Information', () => {
            BasePage.pause(1000)
            LoginPage.load()
            cy.reload()
            BasePage.pause(1000)
            LoginPage.login(cell_phone_number,DRIVER_DEFAULT_PASSWORD)
            BasePage.pause(1000)
            cy.get('h3.card-header').contains('General Information').should('be.visible')
        })

    }) 

})


//-------------------------------------------------------------------------------------------------






/*

context('Driver', () => {

    describe('Register a Driver[As Admin]',() => {


        let cell_phone_number = LoginPage.Generate_Number(10)
        let pren = FirstName[Math.floor(Math.random() * FirstName.length)]
        let prenom = pren + '-' + LoginPage.Generate_Number(4)
        let nom = LastName[Math.floor(Math.random() * LastName.length)]
        let email = pren.toLocaleLowerCase() + '.' + nom.toLocaleLowerCase() + email_tail[Math.floor(Math.random() * email_tail.length)]
        let job = Jobs[Math.floor(Math.random() * Jobs.length)] 
        let addr = Adresses[Math.floor(Math.random() * Adresses.length)]
        let truck_regis = LoginPage.Generate_Number(6)
        let brand = Truck_Brandz[Math.floor(Math.random() * Truck_Brandz.length)]
        let Model = Truck_Models[Math.floor(Math.random() * Truck_Models.length)]

        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.pause(1000)
            BasePage.Sidebar()
            BasePage.FromSidebarClick("Register driver")
        })

        after(function(){
            BasePage.pause(700)
            LoginPage.logout()
        })

        it('Personal Information Completion',() => {
            //Personal Information
            cy.get('[name="firstName"]').clear().type(prenom)
            cy.get('[name="lastName"]').clear().type(nom)
            cy.get('[name="phoneCountryCode"]').clear().type('+33')
            cy.get('[name="mobileNumber"]').clear().type(cell_phone_number)
            cy.get('[name="email"]').clear().type(email)
            cy.get('[name="currentPrevJob"]').clear().type(job)
            cy.get('[name="completeAddress"]').clear().type(addr)
        })

        it('Add Documents',() => {
            //unselect current Document
            cy.get('#idCard').click()
            cy.get('#drivingLicenseDocument').click()
            cy.get('#insuranceDocument').click()
            cy.get('#residenceDocument').click()
            cy.get('#pollutionControlDoc').click()
            cy.get('#rcCopyDocument').click()
            cy.get('#panCardDocument').click() 
            //Select Document
            cy.upload_file('#idCard', 'id-card.png')
            cy.upload_file('#drivingLicenseDocument', 'driver-licence.jpg')
            cy.upload_file('#insuranceDocument', 'insurance.jpeg')
            cy.upload_file('#residenceDocument', 'resident.jpg')
            cy.upload_file('#pollutionControlDoc', 'pollution-control.png')
            cy.upload_file('#rcCopyDocument', 'RRCopy.png')
            cy.upload_file('#panCardDocument', 'pan-card.jpg')
        })

        it.skip('Select Vendor',() => {
            //TODO//
        })

        it('Vehicule Information Completion',() => {
            //Vehicule Information
            cy.get('[name="truckRegistrationNumber"]').clear().type(truck_regis)
            cy.get('[name="truckBrand"]').clear().type(brand)
            cy.get('[name="truckModel"]').clear().type(Model)
            cy.get('#transportType').select('Small vehicle')
            
        })

        it('Fill The Planning', () => {// MARDI 8h - 20h00 
            cy.get('#day').select('Tuesday')
            cy.get('#start').type('08:00')
            cy.get('#end').type('20:00')
            BasePage.pause(500)
            cy.get("button.btn.btn-primary.btn-sm").contains("add").click()
            BasePage.pause(500)
            cy.get('td.delete-part-row').contains('08:00 - 20:00').should('be.visible')
        
            //JEUDI 15h - 22h00
            cy.get('#day').select('Thursday')
            BasePage.pause(500)
            cy.get('#start').type('15:00')
            cy.get('#end').type('22:00')
            BasePage.pause(500)
            cy.get("button.btn.btn-primary.btn-sm").contains("add").click()
            BasePage.pause(500)
            cy.get('td.delete-part-row').contains('15:00 - 22:00').should('be.visible')
            
            //SAMEDI 9h30 - 20H30
            cy.get('#day').select('Saturday')
            BasePage.pause(500)
            cy.get('#start').type('09:30')
            cy.get('#end').type('20:30')
            BasePage.pause(500)
            cy.get("button.btn.btn-primary.btn-sm").contains("add").click()
            BasePage.pause(500)
            cy.get('td.delete-part-row').contains('09:30 - 20:30').should('be.visible')
            })

        it('Transport Box Completion',() => {
            //transport Box
            cy.get('#containerType').select("Entire vehicle")
            cy.get("#productType").select("COLD")
            cy.get("button.btn.btn-primary.btn-sm").contains('Add').click()
        })

        
        it('Submit the Register',() => {
            BasePage.pause(1000)
            cy.get("button.btn.btn-primary.btn-lg").contains("Register Driver").click()
            BasePage.pause(4000)
        })

        it('Driver Registration should be visible in the tasks section', () => {
            BasePage.pause(1000)
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick('Tasks')
            cy.get('td').contains(prenom).next().contains(nom).should('be.visible')
            cy.get('td').contains('Verify Driver data before final validation').should('be.visible')
        })
    })

})// A supprimer avec le temps*/
/*
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



    })

    describe('Driver List',() => {
        before(function(){
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick("Drivers list")
            BasePage.CloseSideBar()
        })

        it('Select a Driver[Owen Mathis]',() => {
            cy.get('td').contains('botsford.reynold@breitenberg.com').click()
            BasePage.pause(1000)
            cy.get('h3').contains('General Information').should('be.visible')
            
        })

        it('Check a Driver Information',() => {
            cy.get('div').contains('Mathis').should('be.visible')
            cy.get('div').contains('Owen').should('be.visible')
            cy.get('div').contains('16 rue Pierre Geofroix 92700 Colombes').should('be.visible')
            cy.get('div').contains('jobless').should('be.visible')
            cy.get('div').contains('botsford.reynold@breitenberg.com').should('be.visible')
        })

        it('Change Vehicule Information',() => {
            cy.get('button.btn.btn-primary').contains('Change data').click()
            BasePage.pause(1000)
            cy.get('[name="truckBrand"]').clear().type("Lamborghini")
            cy.get('[name="truckModel"]').clear().type("Urus")
            cy.get('button.btn.btn-primary').contains('Save change').click()
            BasePage.pause(1000)
            cy.get('div').contains('Lamborghini').should('be.visible')
            cy.get('div').contains('Urus').should('be.visible')
        })



        it('Change a Driver Information',() => {
            let new_job = "Zoologist"
            cy.get('button.btn.btn-secondary.btn-lg').contains('Change data').click()
            BasePage.pause(1000)
            cy.get('[name="currentPrevJob"]').should('have.value','jobless')
            cy.get('[name="currentPrevJob"]').clear().type(new_job)
            BasePage.pause(500)
            cy.get('button.btn.btn-primary.btn-lg').contains('Save Change').click()
            BasePage.pause(1000)
            cy.get('div').contains(new_job).should('be.visible')
        })

        it('Reset Default previous job', () => {
            cy.get('button.btn.btn-secondary.btn-lg').contains('Change data').click()
            BasePage.pause(1000)
            cy.get('[name="currentPrevJob"]').clear().type('jobless')
            BasePage.pause(500)
            cy.get('button.btn.btn-primary.btn-lg').contains('Save Change').click()
            
        })
    
        it('Disable a Driver',() => {
            cy.get('button.btn.btn-outline-danger.btn-lg').contains('Disable driver').click()
            LoginPage.load()
            LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD)
            BasePage.Sidebar()
            BasePage.FromSidebarClick("Drivers list")
            BasePage.CloseSideBar()
            cy.get('td').contains("admin@almady.com").should('be.visible')
            cy.get('td').contains('botsford.reynold@breitenberg.com').click()
            cy.get('button.btn.btn-outline-success.btn-lg').contains('Enable driver').click()
        })

    })

})*/
