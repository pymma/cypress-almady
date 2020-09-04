import BasePage from "../../classes/BasePage";
import LoginPage from "../../classes/LoginPage";
import { LOGIN_USERNAME, LOGIN_PASSWORD } from "../../classes/config";
/**
VARIABLES/CONSTANTES
**/
let Firstname = [
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
let frstnm = Firstname[Math.floor(Math.random() * Firstname.length)];
let entreprises = [
  "Wihox",
  "Denzel",
  "Ox",
  "Onix",
  "Nix",
  "Cristal",
  "Bonaparte",
  "Home",
  "Dadhi",
  "Ulix",
  "Texudo",
  "Mapress",
  "Chaux",
  "Dreax",
  "Zino",
  "FightClub",
  "Frost",
  "ClimbHill",
  "Hilux",
  "Droux",
  "Aux",
];
let numero = LoginPage.Generate_Number(3);
let entreprise = entreprises[Math.floor(Math.random() * entreprises.length)];
let name = entreprise + "-Fleet-" + numero;
let phone = LoginPage.Generate_Number(10);
let email = frstnm + "@" + entreprise.toLocaleLowerCase() + ".com";
let regis = LoginPage.Generate_Number(7);

//verified 03/09/2020
context("Fleet", () => {
  //fonctionne
  describe("Fleet List", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Fleet", "Fleets list");
    });

    it("Click on a Fleet implies information Visualisation | Select a group implies group tab visualisation | Update Fleet Information", () => {
      let alea2 = Math.floor(Math.random() * 5) + 1;

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        let queue = "_fleet";
        const nom = $td.text().trim();
        const comp_nom = nom.substring(0, nom.length - queue.length);

        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const ema = $td.text().trim();

          BasePage.SearchByName(nom);
          BasePage.getEye();

          cy.get(
            `:nth-child(1) > :nth-child(1) > .card > .card-body > :nth-child(1) > :nth-child(1) > .list-group > .list-group-item`
          ).then(($td) => {
            let tete = "Registration Certificate:";
            const regis = $td.text().trim().substring(tete.length).trim();

            cy.get("h3").contains("Fleet information").should("be.visible");
            cy.get("div.list-group-item")
              .contains(`Fleet name: ${nom}`)
              .should("be.visible");
            cy.get("div.list-group-item")
              .contains(`Company name: ${comp_nom}`)
              .should("be.visible");
            cy.get("div.list-group-item")
              .contains(`Email: ${ema}`)
              .should("be.visible");
            cy.get("div.list-group-item")
              .contains(`Registration Certificate: ${regis}`)
              .should("be.visible");

            /////
            cy.log("SELECT A GROUP IMPLIES VISUALISATION");

            let opt1 = `${comp_nom}_admin`;
            cy.get("#groups").select(opt1);
            cy.get("option").contains(opt1).should("be.visible");

            ////
            cy.log("UPDATE FLEET INFORMATION");

            let nouveau = LoginPage.Generate_Number(7);
            BasePage.pause(1000);
            cy.get("button").contains("Change data").click();
            BasePage.pause(1000);
            cy.get("#phoneNumber").clear().type(nouveau);
            cy.get("button").contains("Save change").click();
            BasePage.pause(3000);
            cy.get(":nth-child(3) > .list-group > .list-group-item").should(
              "contain",
              nouveau
            );

            ////
            cy.log("Tab Visualisation")
            cy.get('#fleets-tab-trips').click()
            BasePage.pause(1000)
            cy.get('select').should('be.visible')
            cy.get('div.card-body').should('be.visible')
          });
        });
      });
    });

    it("Filter Test", () => {
      let alea2 = Math.floor(Math.random() * 5) + 1;

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text().trim();
        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const email = $td.text().trim();
          //By name
          BasePage.SearchByName(name);
          cy.get("td").contains(name).should("be.visible");
          //By mail
          BasePage.Sidebar();
          BasePage.FromSidebarClick("Fleet", "Fleets list");
          BasePage.SearchByEmail(email);
          cy.get("td").contains(email).should("be.visible");
        });
      });
    });

    it("Disable fleet implies side Effect", () => {
      let alea2 = Math.floor(Math.random() * 5) + 1;

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text().trim();

        BasePage.SearchByName(name);
        BasePage.getEye();
        cy.get("button").contains("Disable fleet").should("be.visible").click();
        BasePage.pause(3000);
        BasePage.SearchByName(name);
        cy.get("td").contains("admin@almady.com").should("be.visible");
        BasePage.getEye();
        cy.get("button").contains("Enable fleet").should("be.visible").click();
        BasePage.pause(3000);
      });
    });
  });

  //fonctionne
  describe("Fleet Registration", () => {
    let ph = "+33";

    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Register a fleet", () => {
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Fleet", "Register a fleet");
      BasePage.Screenshot("Register-Fleet-0");
      cy.get("#name").clear().type(name);
      cy.get("#phoneCountryCode").clear().type(ph);
      cy.get("#phoneNumber").clear().type(phone);
      cy.get("#email").clear().type(email);
      cy.get("#registrationCertificate").clear().type(regis);
      BasePage.Screenshot("Register-Fleet-1");
      cy.get("button").contains("Register fleet").click();
      BasePage.pause(1000);
    });

    it("New Fleet should be visible in fleet list section", () => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Fleet", "Fleets list");
      BasePage.SearchByName(name);
      cy.get("td").contains(name).should("be.visible");
    });
  });
});

context("Shipment", () => {

  describe("Shipment List", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Shipment", "Shipments List");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Click on a Shipment implies Information Visualisation[General Information/Shipment Comments]", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const delivery_day = $td.text().trim();
        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const pick_up_addr = $td.text().trim();

          cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
            const delivery_addr = $td.text().trim();

            BasePage.getEyeByRowNumber(alea2);
            cy.get("div")
              .contains("Delivering informations")
              .should("be.visible");
            cy.get("div")
              .contains(`Delivering Day: ${delivery_day}`)
              .should("be.visible");
            cy.get("div")
              .contains(`Pick up Address: ${pick_up_addr}`)
              .should("be.visible");
            cy.get("div")
              .contains(`Deliver Address: ${delivery_addr}`)
              .should("be.visible");
          });
        });
      });
    });
    it("Filter test", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const delivery_day = $td.text().trim();
        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const pickupAddr = $td.text().trim();
        cy.get('input[name="deliveryDate"]').type(delivery_day);
        BasePage.pause(1000)
        cy.get('.align-items-center > :nth-child(2)').click(); //bouton recherche
        BasePage.pause(1000);
        cy.get('td').contains(pickupAddr).should('be.visible')
      });
    });
    });

    //pas testable car plus de commentaire 
    it.skip("Check shipment comments and Pagination", () => {
      let addr = "5 place de l'Eglise 95380 Chennevières-lès-Louvres";

      cy.get("td").contains(addr).click();
      BasePage.pause(1000);
      cy.get("#shipmentsTabs-tab-shipmentComment").should("be.visible").click();
      for (let index = 0; index < 3; index++) {
        cy.get(":nth-child(1) > .media-body > .card > .card-header").should(
          "be.visible"
        );
        cy.get(":nth-child(2) > .media-body > .card > .card-header").should(
          "be.visible"
        );
        cy.get(":nth-child(3) > .media-body > .card > .card-header").should(
          "be.visible"
        );
        cy.get(":nth-child(3) > .page-link").click();
      }

      cy.get("#choose-size").select("5");
      BasePage.pause(1000);
      cy.get(":nth-child(1) > .media-body > .card > .card-header").should(
        "be.visible"
      );
      cy.get(":nth-child(2) > .media-body > .card > .card-header").should(
        "be.visible"
      );
      cy.get(":nth-child(3) > .media-body > .card > .card-header").should(
        "be.visible"
      );
      cy.get(":nth-child(5) > .media-body > .card > .card-header").should(
        "be.visible"
      );
      cy.get(":nth-child(4) > .media-body > .card > .card-header").should(
        "be.visible"
      );
    });

  });
});
