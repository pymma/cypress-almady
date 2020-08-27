import "cypress-file-upload"; //add by me
import BasePage from "../../classes/BasePage";
import LoginPage from "../../classes/LoginPage";
import {
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  DRIVER_DEFAULT_PASSWORD,
  LOGIN_FLEET,
  FLEET_PASSWORD
} from "../../classes/config";

//Information
let FirstName = [
  "Tennesse",
  "Francois",
  "Abdoulaye",
  "Kevin",
  "Ilias",
  "Ramatoulaye",
  "Emmanuel",
  "Nicolas",
  "Alois",
  "Maxime",
  "Francine",
  "Abdelhay",
  "Pierre",
  "Paul",
  "Boubacar",
  "Mohamed",
  "Kafeng",
  "Lewis",
  "Jeffery",
  "Angelina",
  "Helgy",
  "Ousmane",
  "Kelvin",
  "Princia",
  "Mouctar",
  "Marie",
  "Kanye",
  "Samuel",
  "Habib",
  "Sayghin",
  "George",
  "Roddy",
  "Zakaria",
  "Loris",
  "Sean",
  "Bao",
  "Fabio",
  "Ruben",
  "Maxime",
  "Hussein",
  "Thibault",
  "Cyril",
  "Theo",
  "Basil",
  "Maeven",
  "Lucile",
  "Othilie",
  "Melanie",
  "Aisha",
  "Elodie",
];
let LastName = [
  "ABDELAZIZ",
  "BA",
  "OKENDZA",
  "DURAND",
  "LEROY",
  "DIALLO",
  "FONTAINE",
  "LAMBER",
  "MARLEY",
  "HAMILTON",
  "NAVET",
  "MOREL",
  "MAES",
  "CLAES",
  "WILLEMS",
  "ABAR",
  "OLIVEIRA",
  "TRAORE",
  "BOUTTELIER",
  "KINGSTON",
  "SMITH",
  "BROWN",
  "THOMPSON",
  "FORD",
  "GONZALEZ",
  "HERNANDEZ",
  "PRICE",
  "COLEMAN",
  "BROOKS",
  "WOOD",
  "LUO",
  "ZHAO",
  "ZHOU",
  "LIANG",
  "YANG",
  "ZUMA",
  "FOFANA",
  "BARRY",
  "ABAKOUMOV",
  "GALIMOV",
  "GOULINE",
  "RODRIGUEZ",
  "GARCIA",
  "WEST",
  "MAYWEATHER",
  "DJILAL",
  "DAACH",
  "WILLIAMS",
  "RENAULT",
  "MERCEDES",
];
let Jobs = [
  "Global Web Supervisor",
  "Customer Implementation Technician",
  "Customer Ideation Engineer",
  "Corporate Assurance Architect",
  "Corporate Implementation Officer",
  "Investor Tactics Engineer",
  "Lead Intranet Architect",
  "Senior Mobility Specialist",
  "Dynamic Program Technician",
  "Central Resonance Specialist",
  "Investor Accountability Manager",
  "Human Response Developer",
  "Dynamic Intranet Manager",
  "Forward Functionality Planner",
  "Human Web Planner",
  "National Web Analyst",
  "International Brand Designer",
  "Future Interactions Liason",
  "Customer Configuration Coordinator",
  "Future Tactics Strategist",
  "Relational Metrics Consultant",
  "Senior Tactics Associate",
  "Product Integration Associate",
  "Principal Configuration Producer",
  "Investor Optimization Strategist",
];
let email_tail = [
  "@gmail.com",
  "@yahoo.com",
  "@live.fr",
  "@pymma-software.com",
  "@hotmail.com",
  "@email.com",
];
let Adresses = [
  "9 rue du Chef de Ville 77440 ARMENTIERES EN BRIE",
  "1 rue de la Mairie 77410 CHARNY",
  "85 rue Sommeville	77380 COMBS LA VILLE",
  "6 rue de la fileuse 77310 ST FARGEAU PONTHIERRY",
  "42 quai DION BOUTON 92800 PUTEAUX",
  "45 avenue Sainte Marie	94000 CRETEIL",
  "19 rue des Ecoles 91510 LARDY",
  "11 rue Jean Jaurès 91100 VILLABE",
  "37 rue Saint Roch 75001 PARIS",
  "32 rue Geoffroy Saint Hilaire 75005 PARIS",
  "8 rue de Vouillé	75015 PARIS",
  "72 rue Raynouard 75016 PARIS",
  "77 rue Truffaut 75017 PARIS",
  "8 rue Championnet 75018 PARIS",
  "73 rue de la Mare 75020 PARIS",
  "18 rue Ampère 75017 PARIS",
  "83 avenue du Général Bizot 75012 PARIS",
  "1 RUE LEVERT 75020 PARIS",
  "40 bis rue Manin	75019 PARIS",
  "2 rue Pierre Brossolette 75005 PARIS",
  "8 rue Pierre Foncin 75020 PARIS",
  "11 RUE DE LA PLAINE 75020 PARIS",
  "293 rue des Pyrénées 75020 PARIS",
  "8 rue Robert Estienne 75008 PARIS",
  "57 rue de Romainville 75019 PARIS",
  "22 rue Saint Maur 75011 PARIS",
  "38 rue Vandrezanne 75013 PARIS",
  "3 passage Josseaume 75020 PARIS",
  "13 rue Vulpian 75013 PARIS",
  "55 rue Baudricourt 75013 PARIS",
  "10 RUE BOURSAULT 75017 PARIS",
  "12 bis rue Fourcroy	75017 PARIS",
  "7 rue du Général Brunet 75019 PARIS",
  "15 rue Houdon 75018 PARIS",
  "9 rue de Lesseps 75020 PARIS",
  "2 AVENUE LEON JOUHAUX 93270 SEVRAN",
  "27 A rue de la Liberté 93230 ROMAINVILLE",
  "8 bis rue George Sand 94510 LA QUEUE EN BRIE",
  "10 square Jean Goujon	94500 CHAMPIGNY SUR MARNE",
];
let Truck_Brandz = [
  "Mercedes",
  "Renault",
  "MAN",
  "Iveco",
  "Volvo",
  "DAF",
  "Scania",
  "Nissan",
  "MITSUBISHI",
  "GINAF",
  "FIAT",
  "ISUZU",
  "ASTRA",
  "FORD",
  "OPEL",
];
let Truck_Models = [
  "Model-1",
  "Model-2",
  "Model-3",
  "Model-4",
  "Model-5",
  "Model-6",
  "Model-7",
  "Model-8",
  "Model-9",
];

let cell_phone_number = LoginPage.Generate_Number(10);
let pren = FirstName[Math.floor(Math.random() * FirstName.length)];
let prenom = pren + "-" + LoginPage.Generate_Number(4);
let nom = LastName[Math.floor(Math.random() * LastName.length)];
let email =
  pren.toLocaleLowerCase() +
  "." +
  nom.toLocaleLowerCase() +
  email_tail[Math.floor(Math.random() * email_tail.length)];
let job = Jobs[Math.floor(Math.random() * Jobs.length)];
let addr = Adresses[Math.floor(Math.random() * Adresses.length)];
let truck_regis = LoginPage.Generate_Number(6);
let brand = Truck_Brandz[Math.floor(Math.random() * Truck_Brandz.length)];
let Model = Truck_Models[Math.floor(Math.random() * Truck_Models.length)];

//context functions

function SearchByNameAndVerifyExistence(prenom, nom) {
  cy.get('input[name="search"]').clear().type(prenom);
  cy.get("#inputGroupPrepend").click();
  BasePage.pause(1000);
  cy.get("td").contains(prenom).next().contains(nom).should("be.visible");
}
function VerifData(prenom,nom, cell_phone_number, email, job, addr, brand, Model){
  //Contact
  cy.get(
    "span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock"
  )
    .contains(`First-name : ${prenom}`)
    .should("be.visible");
  cy.get(
    "span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock"
  )
    .contains(`Last-name : ${nom}`)
    .should("be.visible");
  cy.get(
    "span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock"
  )
    .contains(`Phone : (+33) ${cell_phone_number}`)
    .should("be.visible");
  //Personal Information
  cy.get('[name="firstName"]').should("have.value", prenom);
  cy.get('[name="lastName"]').should("have.value", nom);
  cy.get('[name="phoneCountryCode"]').should("have.value", "+33");
  cy.get('[name="mobileNumber"]').should("have.value", cell_phone_number);
  cy.get('[name="email"]').should("have.value", email);
  cy.get('[name="currentPrevJob"]').should("have.value", job);
  cy.get('[name="completeAddress"]').should("have.value", addr);
  //Document
  cy.get("#idCard").should("have.class", "fileSavedColor");
  cy.get("#drivingLicenseDocument").should("have.class", "fileSavedColor");
  cy.get("#insuranceDocument").should("have.class", "fileSavedColor");
  cy.get("#residenceDocument").should("have.class", "fileSavedColor");
  cy.get("#pollutionControlDoc").should("have.class", "fileSavedColor");
  cy.get("#rcCopyDocument").should("have.class", "fileSavedColor");
  cy.get("#panCardDocument").should("have.class", "fileSavedColor");
  //Planning
  cy.get("td.delete-part-row")
    .contains("08:00 - 20:00")
    .should("be.visible");
  cy.get("td.delete-part-row")
    .contains("15:00 - 22:00")
    .should("be.visible");
  cy.get("td.delete-part-row")
    .contains("15:00 - 22:00")
    .should("be.visible");
  //Vehicule Information
  cy.get('[name="truckRegistrationNumber"]').should(
    "have.value",
    truck_regis
  );
  cy.get('[name="truckBrand"]').should("have.value", brand);
  cy.get('[name="truckModel"]').should("have.value", Model);
  cy.get("#transportType").should("have.value", "Vsmall"); 

}

//fonctionne 25/08/2020
context.skip("Driver", () => {
  describe("Register a Driver[As Driver]", () => {
    before(function () {
      LoginPage.load();
      BasePage.pause(1000);
    });

    after(function () {
      BasePage.pause(500);
      LoginPage.logout();
    });

    it("Create A Driver[based on Phone Number process]", () => {
      LoginPage.CreateConfirmDriver(cell_phone_number);
    });

    it("Personal Information Completion", () => {
      LoginPage.FillPersonalInformation(
        prenom,
        nom,
        cell_phone_number,
        email,
        job,
        addr,
        true
      );
    });

    it("Fill The Planning", () => {
      LoginPage.FillThePlanning();
    });

    it("Add Documents", () => {
      LoginPage.AddDocument();
    });

    it("Vehicule Information Completion", () => {
      LoginPage.FillVehiculeInformation(truck_regis, brand, Model);
    });

    it("Transport Box Completion", () => {
      let box = "fragile";
      LoginPage.FillTransportBox(box);
    });

    it("Check the Terms & Conditions", () => {
      cy.get('label[for="acceptTermsAndConditions"]').click();
    });

    it("Submit the Register", () => {
      LoginPage.SubmitRegister();
    });

    it("Driver Registration should be visible in the tasks section", () => {
      BasePage.pause(4000);
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Task", "Tasks");
      SearchByNameAndVerifyExistence(prenom, nom);
    });
  });

  describe("Tasks Verification", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.pause(1000);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Task", "Tasks");
    });

    //Les comptes des drivers à validé
    it(`Verify the driver ${prenom} ${nom} is visible and not processed`, () => {
      SearchByNameAndVerifyExistence(prenom,nom)
      cy.get("td")
        .contains("Verify Driver data before final validation")
        .should("be.visible");
    });

    it("Verify the Data from the precedent driver", () => {
      SearchByNameAndVerifyExistence(prenom,nom)
      cy.get('td').contains(prenom).click()
      BasePage.pause(1000)
      VerifData(prenom,nom, cell_phone_number, email, job, addr, brand, Model)
      });

    //non verifier
    it("Claim The Task", () => {
      SearchByNameAndVerifyExistence(prenom,nom)
      cy.get('td').contains(prenom).click()
      BasePage.pause(1000)
      cy.get("button.btn.btn-primary.btn-lg").contains("Claim Task").click();
      BasePage.pause(1000);
      cy.get("button")
        .contains("Release Task")
        .should("be.visible")
        .and("have.class", "btn-primary");
      cy.get("button")
        .contains("Start the task")
        .should("be.visible")
        .and("have.class", "btn-primary");
      cy.get("svg.MuiSvgIcon-root").click();
      BasePage.pause(3500);
    });

    it("Start The Task", () => {
      SearchByNameAndVerifyExistence(prenom,nom)
      cy.get('td').contains(prenom).click()
      BasePage.pause(1000)
      cy.get("button").contains("Start the task").click();
      BasePage.pause(1000);
      cy.get("button")
        .contains("Stop the task")
        .should("be.visible")
        .and("have.class", "btn-primary");
      cy.get("button")
        .contains("Validation")
        .should("be.visible")
        .and("have.class", "btn-primary");
      cy.get("svg.MuiSvgIcon-root").click();
      BasePage.pause(3500);
    });

    it("Stop The Task", () => {
      SearchByNameAndVerifyExistence(prenom,nom)
      cy.get('td').contains(prenom).click()
      BasePage.pause(1000)
      cy.get("button").contains("Stop the task").click();
      BasePage.pause(1000);
      cy.get("button")
        .contains("Release Task")
        .should("be.visible")
        .and("have.class", "btn-primary");
      cy.get("button")
        .contains("Start the task")
        .should("be.visible")
        .and("have.class", "btn-primary");
      cy.get("svg.MuiSvgIcon-root").click();
      BasePage.pause(3500);
    });

    it("Validate The Task & Save Profile & Change Password", () => {
      SearchByNameAndVerifyExistence(prenom,nom)
      cy.get('td').contains(prenom).click()
      BasePage.pause(1000)
      cy.get("button").contains("Start the task").click();
      BasePage.pause(1000);
      cy.get("button.save-button.btn.btn-success.btn-lg")
        .contains("Save profile")
        .click();
      BasePage.pause(3000);
      LoginPage.logout()
      cy.log("Mot de passe")
      LoginPage.load()
      LoginPage.login(cell_phone_number,cell_phone_number)
      BasePage.pause(1000)
      cy.get('input[name="newPassword"]').type(DRIVER_DEFAULT_PASSWORD)
      cy.get('input[name="repeatNewPassword"]').type(DRIVER_DEFAULT_PASSWORD)
      cy.get('button.btn.btn-primary').contains("Submit").click()
    });

  });

  describe("Registration Verification[As Driver]", () => {
    before(function () {
      LoginPage.load();
      BasePage.pause(1000);
    });

    after(function () {
      BasePage.pause(500);
      LoginPage.logout();
    });

    it("Connect The New Driver after All Steps And Verify General Information", () => {
      BasePage.pause(1000);
      LoginPage.load();
      BasePage.pause(1000);
      LoginPage.login(cell_phone_number, DRIVER_DEFAULT_PASSWORD);
    });
  });
});

//-------------------------------------------------------------------------------------------------
//change vehicule info ne fonctionne pas
context.skip("Driver", () => {
  describe.skip("Register a Driver[As Admin]", () => {
    let cell_phone_number = LoginPage.Generate_Number(10);
    let pren = FirstName[Math.floor(Math.random() * FirstName.length)];
    let prenom = pren + "-" + LoginPage.Generate_Number(4);
    let nom = LastName[Math.floor(Math.random() * LastName.length)];
    let email =
      pren.toLocaleLowerCase() +
      "." +
      nom.toLocaleLowerCase() +
      email_tail[Math.floor(Math.random() * email_tail.length)];
    let job = Jobs[Math.floor(Math.random() * Jobs.length)];
    let addr = Adresses[Math.floor(Math.random() * Adresses.length)];
    let truck_regis = LoginPage.Generate_Number(6);
    let brand = Truck_Brandz[Math.floor(Math.random() * Truck_Brandz.length)];
    let Model = Truck_Models[Math.floor(Math.random() * Truck_Models.length)];

    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.pause(1000);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Driver", "Register driver");
    });

    it("Personal Information Completion & Add Documents & Vehicule Information Completion & Fill The Planning/Transport & Submit Register", () => {
      //Personal Information
      LoginPage.FillPersonalInformation(
        prenom,
        nom,
        cell_phone_number,
        email,
        job,
        addr,
        true
      );
      //unselect current Document
      LoginPage.UnselectDocument();
      LoginPage.AddDocument();
      LoginPage.FillVehiculeInformation(truck_regis, brand, Model);
      LoginPage.FillThePlanning();
      let box = "hot";
      LoginPage.FillTransportBox(box);
      BasePage.pause(1000)
      LoginPage.SubmitRegister();
      BasePage.pause(3000);
    });

    it("Driver Registration should be visible in the tasks section", () => {
      BasePage.pause(1000);
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Task", "Tasks");
      SearchByNameAndVerifyExistence(prenom, nom);
    });
  });

  describe("Driver List", () => {

    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Driver", "Drivers list");
    });

    it("Select a Driver & Check a Driver Information", () => {
      let alea2 = Math.floor(Math.random() * 13) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const firstN = $td.text()
        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const LastN = $td.text()
          cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
            const email = $td.text()
            cy.get(`tbody > :nth-child(${alea2}) > :nth-child(5)`).then(($td) => {
              BasePage.getEyeByRowNumber(alea2)
              cy.get("h3").contains("General Information").should("be.visible");
              cy.get("div").contains(firstN).should("be.visible");
              cy.get("div").contains(LastN).should("be.visible");
              cy.get("div").contains(email).should("be.visible");
            })
          })
        })
      })
    });

    it("Change Vehicule Information", () => {
      let alea2 = Math.floor(Math.random() * 13) + 1;
      BasePage.getEyeByRowNumber(alea2)
      cy.get("button.btn.btn-primary").contains("Change data").click();
      BasePage.pause(1000);
      cy.get('[name="truckBrand"]').clear().type("Lamborghini");
      cy.get('[name="truckModel"]').clear().type("Urus");
      cy.get('#transportType').select('Small vehicle')
      cy.get('#allTruckType').select('fragile')
      cy.get('#box').select('fragile')
      cy.get('button').contains('Add').click()
      BasePage.pause(1000)
      cy.get("button.btn.btn-primary").contains("Save change").click();
      BasePage.pause(1000);
      cy.get("div").contains("Lamborghini").should("be.visible");
      cy.get("div").contains("Urus").should("be.visible");
    });

    it("Change a Driver Information & Reset Default values after test", () => {
      let new_job = "Zoologist";
      let alea2 = Math.floor(Math.random() * 13) + 1;
      BasePage.getEyeByRowNumber(alea2)
      cy.get(":nth-child(2) > :nth-child(1) > .card > .card-body > :nth-child(3) > :nth-child(1) > .list-group > .list-group-item").then(($td) => {
        const Job = $td.text()
        const entete = "Previous job: "
        const pvJob = Job.substring(entete.length).trim()
        cy.get("center > .btn").contains("Change data").click();
        BasePage.pause(1000);
        cy.get('#currentPrevJob').should("have.value", pvJob);
        cy.get('#currentPrevJob').clear().type(new_job);
        BasePage.pause(500);
        cy.get("button.btn.btn-primary.btn-lg").contains("Save Change").click();
        BasePage.pause(1000);
        cy.get("div").contains(new_job).should("be.visible");
        cy.get("center > .btn").contains("Change data").click();
        BasePage.pause(1000);
        cy.get('#currentPrevJob').clear().type(pvJob);
        BasePage.pause(500);
        cy.get("button.btn.btn-primary.btn-lg").contains("Save Change").click();
      })
    });

    it("Disable/Enable a Driver", () => {
      let alea2 = Math.floor(Math.random() * 13) + 1;
      BasePage.getEyeByRowNumber(alea2)
      cy.get("button.btn.btn-outline-danger.btn-lg")
        .contains("Disable driver")
        .click();
      BasePage.pause(3000)
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(7)`).should('contain','admin@almady.com')
      BasePage.getEyeByRowNumber(alea2)
      cy.get("button.btn.btn-outline-success.btn-lg")
        .contains("Enable driver")
        .should("be.visible")
        .click();
    });
  });
});

//--------------------------------------------------------------------------------------------------------------------------

context("Driver - Fleet", () => {

  //ne fonctionne pas
  describe.skip("Register a Driver[Linked to a Fleet]", () => {
    let cell_phone_number = LoginPage.Generate_Number(10);
    let pren = FirstName[Math.floor(Math.random() * FirstName.length)];
    let prenom = pren + "-" + LoginPage.Generate_Number(4);
    let nom = LastName[Math.floor(Math.random() * LastName.length)];
    let email =
      pren.toLocaleLowerCase() +
      "." +
      nom.toLocaleLowerCase() +
      email_tail[Math.floor(Math.random() * email_tail.length)];
    let job = Jobs[Math.floor(Math.random() * Jobs.length)];
    let addr = Adresses[Math.floor(Math.random() * Adresses.length)];
    let truck_regis = LoginPage.Generate_Number(6);
    let brand = Truck_Brandz[Math.floor(Math.random() * Truck_Brandz.length)];
    let Model = Truck_Models[Math.floor(Math.random() * Truck_Models.length)];

    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.pause(1000);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Driver", "Register driver");
    });

    after(function () {
      BasePage.pause(700);
      //LoginPage.logout()
    });

    //sa bloque ici
    it(`Choose a Fleet[${LOGIN_FLEET}]`, () => {
      cy.get("button").contains("Choose a fleet").click();
      BasePage.pause(1000)
      BasePage.SearchByName(LOGIN_FLEET)
      BasePage.getEye()
      //BasePage.pause(1000)
    });

    it("Personal Information Completion", () => {
      //Personal Information
      LoginPage.FillPersonalInformation(prenom,nom,cell_phone_number,email,job,addr,true)
    });

    it("Vehicule Information Completion", () => {
      //Vehicule Information
      LoginPage.FillVehiculeInformation(truck_regis, brand, Model)
    });

    it("Transport Box Completion", () => {
      //transport Box
      let box = "fragile";
      LoginPage.FillTransportBox(box)
    });

    it("Add Documents", () => {
      //unselect current Document
      LoginPage.UnselectDocument()
      //Select Document
      LoginPage.AddDocument()
    });

    it("Fill The Planning", () => {
      LoginPage.FillThePlanning()
    });

    it("Submit the Register", () => {
      LoginPage.SubmitRegister()
    });

    it("Validate The Task & Save Profile", () => {
      LoginPage.load();
      BasePage.pause(1000);
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.pause(1000);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Task", "Tasks");
      cy.get("td").contains(prenom).click();
      BasePage.pause(1000);
      cy.get("button").contains("Start the task").click();
      BasePage.pause(1000);
      cy.get("button").contains("Validation").click();
      BasePage.pause(1500);
      cy.get("button.save-button.btn.btn-success.btn-lg")
        .contains("Save profile")
        .click();
      BasePage.pause(3000);
    });

    it("Driver Registration should be visible in the Driver section[In Fleet Account]", () => {
      BasePage.pause(1000);
      LoginPage.load();
      LoginPage.login(LOGIN_FLEET, FLEET_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Driver", "Driver list");
      BasePage.SearchByName(prenom)
      BasePage.getEye()
      cy.get("td").contains(prenom).next().contains(nom).should("be.visible");
    });
  });

  describe("Register a driver[as Fleet admin]", () => {
    let cell_phone_number = LoginPage.Generate_Number(10);
    let pren = FirstName[Math.floor(Math.random() * FirstName.length)];
    let prenom = pren + "-" + LoginPage.Generate_Number(4);
    let nom = LastName[Math.floor(Math.random() * LastName.length)];
    let email =
      pren.toLocaleLowerCase() +
      "." +
      nom.toLocaleLowerCase() +
      email_tail[Math.floor(Math.random() * email_tail.length)];
    let job = Jobs[Math.floor(Math.random() * Jobs.length)];
    let addr = Adresses[Math.floor(Math.random() * Adresses.length)];
    let truck_regis = LoginPage.Generate_Number(6);
    let brand = Truck_Brandz[Math.floor(Math.random() * Truck_Brandz.length)];
    let Model = Truck_Models[Math.floor(Math.random() * Truck_Models.length)];

    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_FLEET, FLEET_PASSWORD);
      BasePage.Sidebar(); 
    });

    after(function () {
      BasePage.pause(500);
      LoginPage.logout();
    });

    it("Personal Information Completion & Add Documents & Vehicule Information Completion & Fill The Planning/Transport & Submit Register", () => {
      //Personal Information
      BasePage.FromSidebarClick("Driver", "Register driver");
      LoginPage.FillPersonalInformation(
        prenom,
        nom,
        cell_phone_number,
        email,
        job,
        addr,
        true
      );
      //unselect current Document
      LoginPage.UnselectDocument();
      LoginPage.AddDocument();
      LoginPage.FillVehiculeInformation(truck_regis, brand, Model);
      LoginPage.FillThePlanning();
      let box = "hot";
      LoginPage.FillTransportBox(box);
      BasePage.pause(1000)
      LoginPage.SubmitRegister();
    });

    it("Driver Registration should be visible in the tasks section", () => {
      BasePage.FromSidebarClick("Task", "Tasks");
      SearchByNameAndVerifyExistence(prenom, nom);
    });
  });
});
