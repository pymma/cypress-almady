import BasePage from "../../classes/BasePage";
import LoginPage from "../../classes/LoginPage";
import { LOGIN_USERNAME, LOGIN_PASSWORD } from "../../classes/config";

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

context("Fleet", () => {
  let nom = "fleet-0-name";
  let ema = "fleet@fleet0.com";

  let mobile = "11110";
  let ph = "+966";
  let regis = "4554540";
  //fonctionne
  describe("Fleet List", () => {
    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Fleet", "Fleets list");
    });

    it("Click on a Fleet implies information Visualisation", () => {
      BasePage.Screenshot("Visualisation-Fleet-Information-0");
      cy.get("td").contains(nom).should("be.visible").click();
      BasePage.pause(1000);
      cy.get("h3").contains("Fleet Information").should("be.visible");
      cy.get("div.list-group-item")
        .contains(`Fleet name: ${nom}`)
        .should("be.visible");
      cy.get("div.list-group-item")
        .contains(`Company name: ${nom}`)
        .should("be.visible");
      cy.get("div.list-group-item")
        .contains(`Email: ${ema}`)
        .should("be.visible");
      cy.get("div.list-group-item")
        .contains(`Phone country code: ${ph}`)
        .should("be.visible");
      cy.get("div.list-group-item")
        .contains(`Mobile: ${mobile}`)
        .should("be.visible");
      cy.get("div.list-group-item")
        .contains(`Mobile number: ${mobile}`)
        .should("be.visible");
      cy.get("div.list-group-item")
        .contains(`Registration Certificate: ${regis}`)
        .should("be.visible");
      BasePage.Screenshot("Visualisation-Fleet-Information-1");
    });

    it("Select a group implies group tab visualisation", () => {
      BasePage.pause(1000);
      let opt1 = "LePlaisirDeConcretiserVosProjetsPlusRapidement.com_admin";

      cy.get("#groups").select(opt1);
      cy.get("option").contains(opt1).should("be.visible");
    });

    it("Update Fleet Information", () => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Fleet", "Fleets list");
      cy.get("td").contains(nom).click();

      BasePage.Screenshot("Update-Fleet-Information-0");
      let nouveau = LoginPage.Generate_Number(7);
      BasePage.pause(1000);
      cy.get("button").contains("Update fleet").click();
      BasePage.pause(1000);
      cy.get("#registrationCertificate").clear().type(nouveau);
      cy.get("button").contains("Update fleet").click();
      BasePage.Screenshot("Update-Fleet-Information-0");
    });

    it("Filter Test", () => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Fleet", "Fleets list");
      cy.get('input[name="search"]').clear().type(nom);
      BasePage.Screenshot("Filter-Test-0");
      cy.get("#inputGroupPrepend").click();
      BasePage.pause(1500);
      cy.get("td").contains(nom).should("be.visible").click();
    });

    it("Disable fleet implies side Effect", () => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Fleet", "Fleets list");
      cy.get('input[name="search"]').clear().type(nom);
      cy.get("#inputGroupPrepend").click();
      BasePage.pause(1000);
      cy.get("td").contains(nom).should("be.visible").click();
      BasePage.pause(1000);
      BasePage.Screenshot("Disable-Fleet-0");
      cy.get("button").contains("Disable fleet").should("be.visible").click();
      BasePage.pause(2000);
      BasePage.Screenshot("Disable-Fleet-1");
      cy.get("td").contains("admin@almady.com").should("be.visible");
      cy.get("td").contains(nom).should("be.visible").click();
      BasePage.pause(1000);
      BasePage.Screenshot("Enable-Fleet-2");
      cy.get("button").contains("Enable fleet").should("be.visible").click();
    });
  });
  //fonctionne
  describe("Fleet Registration", () => {
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
      cy.get("button").contains("register fleet").click();
      BasePage.pause(1000);
    });

    it("New Fleet should be visible in fleet list section", () => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Fleet", "Fleets list");
      cy.get('input[name="search"]').clear().type(name);
      cy.get("#inputGroupPrepend").click();
      BasePage.pause(1500);
      cy.get("td").contains(name).should("be.visible");
      BasePage.Screenshot("Register-Fleet-2");
    });
  });
});

context("Shipment", () => {
  let pick_up_addr = "22 rue Marie Curie 77310 Saint-Fargeau-Ponthierry";
  let delivery_addr = "03 rue DES ECUYERS 78100 Saint-Germain-en-Laye";
  let delivery_day = "2020-07-09";

  let nom = "fleet-0-name";
  let ema = "fleet@fleet0.com";

  let mobile = "11110";
  let ph = "+966";
  let regis = "4554540";
  //fonctionne
  describe("Shipment List", () => {
    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Shipment", "Shipments List");
    });

    it("Click on a Shipment implies Information Visualisation[General Information/Shipment Comments]", () => {
      cy.get("td")
        .contains(pick_up_addr)
        .next()
        .should("contain", delivery_addr)
        .click();
      BasePage.pause(1000);
      cy.get("div").contains("Delivering informations").should("be.visible");
      cy.get("div")
        .contains(`Delivering Day: ${delivery_day}`)
        .should("be.visible");
      cy.get("div")
        .contains(`Pick up Address: ${pick_up_addr}`)
        .should("be.visible");
      cy.get("div")
        .contains(`Deliver Address: ${delivery_addr}`)
        .should("be.visible");

      //Shipment comments
      //cy.get('#shipmentsTabs-tab-shipmentComment').click()
    });

    it("Filter test", () => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Shipment", "Shipments List");
      cy.get('input[name="search"]').type(delivery_day);
      cy.get("#inputGroupPrepend").click();
      BasePage.pause(1000);
    });

    after(function () {
      BasePage.pause(700);
      //LoginPage.logout()
    });
  });
});
/*
 *commentaire pour les warehouses
 *filtres
 *Create User
 *Pagination
 */
