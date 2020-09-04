import BasePage from "../../classes/BasePage";
import LoginPage from "../../classes/LoginPage";
import {
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  CURRENT_ADRESSE,
} from "../../classes/config";

  //verified the 02/09/2020
context("Trips", () => {
  describe("Available Trips", () => {
    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    });
    //fonctionne pas
    it("Set an current position for Available Trips[Location] | Take a Trip [Whole process] | Verification[Process]", () => {
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Trip", "Available Trips");
      cy.get("input.form-control").type(CURRENT_ADRESSE);
      cy.get("button.btn.btn-primary").contains("Valid").click();
      BasePage.pause(2000);
      cy.get("#trips-view").should("be.visible");
      cy.get(
        '[style="z-index: 3; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px; touch-action: pan-x pan-y;"]'
      ).as("map");
      cy.get("@map").should("be.visible");
      cy.get("#range-form").should("be.visible");
      cy.get("#pagination").should("be.visible");
      cy.get("#list").should("be.visible");

      cy.log("Select a trip [Using Side Menu]");

      cy.get(":nth-child(1) > .trip-overview").click();
      BasePage.pause(1000);
      cy.get(".modal-body").should("be.visible");
      cy.get("button.btn.btn-outline-primary")
        .contains("Choose a fleet")
        .should("be.visible");
      cy.get("button.btn.btn-outline-primary")
        .contains("Choose a driver")
        .should("be.visible");
      cy.get("button.btn.btn-outline-success")
        .contains("Assign driver")
        .should("be.visible");

      cy.log("Choose a fleet[Randomly]");

      cy.get("button.btn.btn-outline-primary")
        .contains("Choose a fleet")
        .click();

      BasePage.pause(1000);
      let i = Math.floor(Math.random() * 5) + 1; //25 correspond au nombre de choix | 5 driver pour les 5 premiers, 2 sinon
      cy.get(`:nth-child(${i}) > .hover-pointer > svg`).click();

      cy.log("Choose a driver[Randomly]");
      cy.get("button.btn.btn-outline-primary")
        .contains("Choose a driver")
        .click();
      BasePage.pause(1000);

      let j = Math.floor(Math.random() * 5) + 1; //5 drivers
      cy.get(`:nth-child(${j}) > .hover-pointer > svg`).click();

      cy.log("Assign a driver[Randomly]");

      cy.get(
        ":nth-child(1) > :nth-child(1) > .justify-content-center > :nth-child(3) > :nth-child(1) > span"
      ).as("depart");
      cy.get(
        ":nth-child(1) > :nth-child(2) > .justify-content-center > :nth-child(3) > :nth-child(1) > span"
      ).as("arrive");
      cy.get(".col-start > :nth-child(1) > div").as("fleet");
      cy.get(".col-start > :nth-child(2) > div").as("driver");

      cy.get("@driver").then(($div) => {
        const driver = $div.text();

        cy.get("@fleet").then(($div) => {
          const fleet = $div.text();

          cy.get("@depart").then(($div) => {
            const depart = $div.text();

            cy.get("@arrive").then(($div) => {
              const arrive = $div.text();

              cy.get("button").contains("Assign driver").click();
              BasePage.pause(1000);
              //cy.get('.close > [aria-hidden="true"]').click();

              BasePage.pause(1000);

              cy.log("Verify the Accurancy");
              cy.reload();
              BasePage.Sidebar();
              BasePage.FromSidebarClick("Trip", "Trip list");
              cy.get('select[name="choose"]').select("LOCATION");

              BasePage.pause(500);
              cy.get('input[name="locationFrom"]').type(depart);
              BasePage.pause(500);
              cy.get('input[name="locationTo"]').type(arrive);
              BasePage.pause(500);
              cy.get("#inputGroupPrepend").click();
              BasePage.pause(1000);
              cy.get("td").contains(driver).should("be.visible");
              cy.get("td").contains(driver).next().should("contain", fleet);
              cy.get("td")
                .contains(driver)
                .prev()
                .should("contain", "ASSIGNED");
            });
          });
        });
      });
    });
  });

  describe("Trips List", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Trip", "Trip list");
    });

    after(function () {
      BasePage.pause(700);
    });

    it("Click on a Trip implies Map Visualisation", () => {
      cy.get("tbody > :nth-child(1) > :nth-child(2)").then(($td) => {
        const name = $td.text();
        cy.get("td").contains(name).should("be.visible");
        BasePage.getEyeByRowNumber(1);
        cy.get("div.modal-body").should("be.visible");
      });
    });

    it("Filter Test [Status | Date | Location]", () => {
      cy.get("tbody > :nth-child(1) > :nth-child(1)").then(($td) => {
        const status = $td.text();
        cy.get("tbody > :nth-child(1) > :nth-child(2)").then(($td) => {
          const name = $td.text();
          cy.get("tbody > :nth-child(1) > :nth-child(8)").then(($td) => {
            const date = $td.text();

            cy.get("td").contains(name).should("be.visible");
            BasePage.getEyeByRowNumber(1);
            BasePage.pause(1000);

            cy.get(
              ":nth-child(1) > :nth-child(1) > .justify-content-center > :nth-child(3) > :nth-child(1) > span"
            ).as("depart");
            cy.get(
              ":nth-child(1) > :nth-child(2) > .justify-content-center > :nth-child(3) > :nth-child(1) > span"
            ).as("arrive");

            cy.get("@depart").then(($div) => {
              const depart = $div.text();

              cy.get("@arrive").then(($div) => {
                const arrive = $div.text();
                //Ferme la fenetre
                cy.get('.close > [aria-hidden="true"]').click()
                BasePage.pause(1000)
                BasePage.Sidebar();
                BasePage.FromSidebarClick("Trip", "Trip list");
                cy.get('select[name="choose"]').select("STATUS");
                BasePage.pause(500);
                cy.get('select[name="status"]').select(status);
                BasePage.pause(500);
                cy.get("#inputGroupPrepend").click();
                BasePage.pause(1000);
                cy.get("td").contains(name).should("be.visible");
                //// dont work
                cy.log("Filter by Date")
                BasePage.Sidebar();
                BasePage.FromSidebarClick("Trip", "Trip list");
                cy.get('select[name="choose"]').select("DATE");
                BasePage.pause(500);
                cy.get('input[name="date"]').type(date);
                BasePage.pause(500);
                cy.get("#inputGroupPrepend").click();
                BasePage.pause(1000);
                cy.get("td").contains(name).should("be.visible");
                ////
                cy.log("Filter by Location");
                cy.get('select[name="choose"]').select("LOCATION");
                BasePage.pause(500);
                cy.get('input[name="locationFrom"]').type(depart);
                cy.get('input[name="locationTo"]').type(arrive);
                cy.get("#inputGroupPrepend").click();
              });
            });
          });
        });
      });
    });
  });
});
