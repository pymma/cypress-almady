import BasePage from "./BasePage";


export const env = {
  dev: "https://almady.dev.infra.pymma-software.net",
  testing: "https://almady.dev.infra.pymma-software.net/",
  staging: "https://almady.dev.infra.pymma-software.net/",
  prod: "https://almady.dev.infra.pymma-software.net/",
};

//en dev pour le moment au final faudra le mettre dans le testing
export const environment =
  Cypress.env("DEPLOYMENT_ENV") == null ? "dev" : Cypress.env("DEPLOYMENT_ENV");
export const URL = env[environment];

/*Cette classe engloble les fonctionnalités de base du site*/
export default class LoginPage {
  /*(void) charge la page d'acceuil*/
  static load() {
    cy.visit(URL);
  }

  /*log in a user account*/
  static login(username, password) {
    cy.get("#username").clear().type(username);
    cy.get("#password").clear().type(password);
    BasePage.Screenshot();
    cy.get("button.btn.btn-outline-info").contains("Sign in").click();
    BasePage.pause(1000);
  }

  /*logout from the current log account*/
  static logout() {
    cy.get("#dropdown-basic").click();
    BasePage.pause(1000);
    cy.get("a").contains("Logout").click();
    BasePage.pause(1000);
    cy.get("h3").contains("Sign in").should("be.visible");
    //BasePage.Screenshot()
  }

  /*generate a random number*/
  static Generate_Number(nb_chiffre) {
    let nombre = "";
    for (let index = 0; index < nb_chiffre; index++) {
      let chiffre = Math.floor(Math.random() * 10);
      nombre = nombre + chiffre;
    }
    return nombre;
  }

  /*create a driver account from login page based on phone numer*/
  static CreateConfirmDriver(driveNumber) {
    cy.get("button.btn.btn-primary").contains("Subscribe").click();
    BasePage.pause(1000);
    cy.get('[placeholder="Enter Your Phone Country Code"]').type("+33");
    cy.get('[placeholder="Enter Your Number Phone"]').type(driveNumber);
    BasePage.pause(1000);
    cy.get("button.btn.btn-primary").contains("Next").click();
    BasePage.pause(1000);
    cy.get('[placeholder="Enter Your Verification Code"]').type(driveNumber);
    cy.get("button.btn.btn-primary").contains("Next").click();
  }

  /*Fill Driver Personal Information based on given parameter*/
  static FillPersonalInformation(
    prenom,
    nom,
    cell_phone_number,
    email,
    job,
    addr,
    FirstTime
  ) {
    cy.get('[name="firstName"]').clear().type(prenom);
    cy.get('[name="lastName"]').clear().type(nom);
    if (FirstTime != true) {
      cy.get('[name="phoneCountryCode"]').clear().type("+33");
      cy.get('[name="mobileNumber"]').clear().type(cell_phone_number);
    }
    cy.get('[name="email"]').clear().type(email);
    cy.get('[name="currentPrevJob"]').clear().type(job);
    cy.get('[name="completeAddress"]').clear().type(addr);
  }

  /*Add drag and Drop Documents*/
  static AddDocument() {
    cy.upload_file("#idCard", "img.jpeg");
    cy.upload_file("#drivingLicenseDocument", "img.jpeg");
    cy.upload_file("#insuranceDocument", "img.jpeg");
    cy.upload_file("#residenceDocument", "img.jpeg");
    cy.upload_file("#pollutionControlDoc", "img.jpeg");
    cy.upload_file("#rcCopyDocument", "img.jpeg");
    cy.upload_file("#panCardDocument", "img.jpeg");
  }

  /*Fill vehicle information based on given parameters*/
  static FillVehiculeInformation(truck_regis, brand, Model) {
    cy.get('[name="truckRegistrationNumber"]').clear().type(truck_regis);
    cy.get('[name="truckBrand"]').clear().type(brand);
    cy.get('[name="truckModel"]').clear().type(Model);
    cy.get("#transportType").select("Small vehicle");
  }

  /*Fill The Transport Box based on given box parameter*/
  static FillTransportBox(box) {
    cy.get("#allTruckType").select(box);
    cy.get("#box").select(box);
    cy.get("button.btn.btn-primary.btn-sm").contains("Add").click();
  }

  /*Fill the Planning*/
  static FillThePlanning() {
    // MARDI 8h - 20h00
    cy.get("#day").select("Tuesday");
    cy.get("#start").type("08:00");
    cy.get("#end").type("20:00");
    BasePage.pause(500);
    cy.get("button.btn.btn-primary.btn-sm").contains("add").click();
    BasePage.pause(500);
    cy.get("td.delete-part-row").contains("08:00 - 20:00").should("be.visible");

    //JEUDI 15h - 22h00
    cy.get("#day").select("Thursday");
    BasePage.pause(500);
    cy.get("#start").type("15:00");
    cy.get("#end").type("22:00");
    BasePage.pause(500);
    cy.get("button.btn.btn-primary.btn-sm").contains("add").click();
    BasePage.pause(500);
    cy.get("td.delete-part-row").contains("15:00 - 22:00").should("be.visible");

    //SAMEDI 9h30 - 20H30
    cy.get("#day").select("Saturday");
    BasePage.pause(500);
    cy.get("#start").type("09:30");
    cy.get("#end").type("20:30");
    BasePage.pause(500);
    cy.get("button.btn.btn-primary.btn-sm").contains("add").click();
    BasePage.pause(500);
    cy.get("td.delete-part-row").contains("09:30 - 20:30").should("be.visible");
  }

  /*Unselect drag and drop documents*/
  static UnselectDocument() {
    cy.get("#idCard").click();
    cy.get("#drivingLicenseDocument").click();
    cy.get("#insuranceDocument").click();
    cy.get("#residenceDocument").click();
    cy.get("#pollutionControlDoc").click();
    cy.get("#rcCopyDocument").click();
    cy.get("#panCardDocument").click();
  }

  /*Click on the Submit Register Button*/
  static SubmitRegister() {
    BasePage.pause(1000);
    cy.get("button").contains("Register Driver").click();
    BasePage.pause(4000)
  }
}
