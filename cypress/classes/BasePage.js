import { SCREEN } from "./config";

export const env = {
  dev: "developpement",
  testing: "test",
  staging: "stage",
  prod: "production",
};
export const environment =
  Cypress.env("DEPLOYMENT_ENV") == null
    ? "testing"
    : Cypress.env("DEPLOYMENT_ENV");
export const URL = env[environment];

/*Cette classe engloble les fonctionnalités pour la page d'acceuil*/
export default class BasePage {
  /*(void) met en pause l'execution des tests pendants x ms
    (int) x : temps en millisecondes
    */

  static pause(x) {
    cy.wait(x);
  }

  /*Click on the Reseach button*/
  static ResearchButton(){
    BasePage.pause(1000);
    cy.get('.align-items-center > :nth-child(2)').click();
    BasePage.pause(1000);
  }

  /*Show the Sidebar*/
  static Sidebar() {
    cy.get("div.sidebar-button.button-open").click();
    BasePage.pause(500);
  }

  /*Search by name & display the results*/
  static SearchByName(name) {
    cy.get('[name="name"]').clear().type(name);
    BasePage.ResearchButton()
  }

  /*Search by phone number & display the results*/
  static SearchByPhone(name) {
    cy.get('[name="phoneNumber"]').clear().type(name);
    BasePage.ResearchButton()
  }

  /*Search by email & display the results*/
  static SearchByEmail(name) {
    cy.get('[name="email"]').clear().type(name);
    BasePage.ResearchButton()
  }

  /*Click on the table line given as parameter & display the profile of a driver*/
  static getEyeByRowNumber(number) {
    cy.get(`:nth-child(${number}) > .hover-pointer > svg`).click();
    BasePage.pause(1000);
  }

  /*Click on the first profile of the given table*/
  static getEye() {
    cy.get(":nth-child(1) > .hover-pointer > svg").click();
    BasePage.pause(1000);
  }

  /*Click on the Section & open a subsection based on given parameters*/
  static FromSidebarClick(option_name, expr) {
    cy.get("span").contains(option_name).click();
    BasePage.pause(1000);
    switch (expr) {
      case "Companies list":
        cy.get(
          ':nth-child(1) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
        ).click();
        break;

      case "Register driver":
        cy.get(
          '[href="/drivers/register"] > .hover-pointer-darker > div'
        ).click();
        break;

      case "order list[main]":
        cy.get(
          ':nth-child(6) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
        ).click();
        break;

      case "Drivers location":
        cy.get(
          '[href="/drivers/location"] > .hover-pointer-darker > div'
        ).click();
        break;

      case "Drivers list":
        cy.get('[href="/drivers"] > .hover-pointer-darker > div').click();
        break;

      case "Shipments List":
        cy.get(
          ':nth-child(7) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
        ).click();
        break;

      case "E-commerces list":
        cy.get('[href="/ecommerces"] > .hover-pointer-darker').click();
        break;

      case "Register e-commerce":
        cy.get(
          '[href="/ecommerces/create"] > .hover-pointer-darker > div'
        ).click();
        break;

      case "Fleets list":
        cy.get('[href="/fleets"] > .hover-pointer-darker > div').click();
        break;

      case "Register a fleet":
        cy.get('[href="/fleets/create"] > .hover-pointer-darker').click();
        break;

      case "Tasks":
        cy.get(
          ':nth-child(8) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
        ).click();
        break;

      case "Available Trips":
        cy.get('[href="/trips"] > .hover-pointer-darker').click();
        break;

      case "Trip list":
        cy.get('[href="/trips_list"] > .hover-pointer-darker > div').click();
        break;

      case "Users list":
        cy.get('[href="/users"] > .hover-pointer-darker > div').click();
        break;

      case "Create user":
        cy.get('[href="/users/create"] > .hover-pointer-darker > div').click();
        break;

      case "Vendors list":
        cy.get('[href="/vendors"] > .hover-pointer-darker').click();
        break;

      case "Register a vendor":
        cy.get('[href="/vendors/create"] > .hover-pointer-darker').click();
        break;

      case "customer list":
        cy.get(
          ':nth-child(1) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
        ).click();
        break;
      case "order list":
        cy.get(
          ':nth-child(2) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
        ).click();
        break;
      case "Dashboard":
        cy.get(":nth-child(1) > .hover-pointer-colormain > span").click();
        break;
      case "products list":
        cy.get(
          ':nth-child(3) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
        ).click();
        break;
      case "products list[E-Commerce]":
        cy.get(
          ':nth-child(3) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
        ).click();
        break;
      case "Order status":
        cy.get(
          '[href="/manage-order-status"] > .hover-pointer-darker > div'
        ).click();
        break;
      case "Step status":
        cy.get(
          '[href="/manage-step-status"] > .hover-pointer-darker > div'
        ).click();
        break;
      case "Trip status":
        cy.get(
          '[href="/manage-trip-status"] > .hover-pointer-darker > div'
        ).click();
        break;
      case "Product type":
        cy.get(
          '[href="/manage-product-type"] > .hover-pointer-darker > div'
        ).click();
        break;
      case "Parcel status":
        cy.get(
          '[href="/manage-parcel-status"] > .hover-pointer-darker > div'
        ).click();
        break;
      case "Transport type":
        cy.get(
          '[href="/manage-transport-type"] > .hover-pointer-darker > div'
        ).click();
        break;
      default:
        break;
    }
    BasePage.pause(3500);
    cy.get("span").contains(option_name).click();
    BasePage.CloseSideBar();
  }

  /*Close the sidebar*/
  static CloseSideBar() {
    cy.get("div.sidebar-button.button-close.hover-pointer-brighter").click();
    BasePage.pause(500);
  }

  /*Make a Screenshot based on the attribute SCREEN in config.js file*/
  static Screenshot(name) {
    if (SCREEN === true) {
      cy.screenshot(name);
    }
  }
}
