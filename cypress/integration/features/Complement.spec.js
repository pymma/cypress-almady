import BasePage from "../../classes/BasePage";
import LoginPage from "../../classes/LoginPage";
import { LOGIN_USERNAME, LOGIN_PASSWORD } from "../../classes/config";
/**
ENSEMBLE DE FONCTION LOCAL 
**/

/*Filtre en fonction de l'attribut passé en paramètre et de l'input saisie */
function inputInFilterByNameAttribute(nameAttribut, input) {
  cy.get(`[name="${nameAttribut}"]`).type(input);
  BasePage.ResearchButton()
}

/*Crée un status*/
function createStatus(code, status, button_name) {
  cy.get("#code").type(code);
  cy.get("#description").type(status);
  BasePage.pause(1000);
  cy.get("button").contains(button_name).click();
  BasePage.pause(1000);
}

/*Crée un nouveau type*/
function createNewType(name) {
  cy.get("#name").type(name);
  cy.get("#numberKMPerLiter").type(LoginPage.Generate_Number(2));
  cy.get("#weight").type(LoginPage.Generate_Number(3));
  cy.get("#gasPricePerLiter").type(LoginPage.Generate_Number(1));
  cy.get("#minPricePerHour").type(LoginPage.Generate_Number(2));
  cy.get("#firstStopPrice").type(LoginPage.Generate_Number(1));
  cy.get("#pricePerNumberOfStops").type(LoginPage.Generate_Number(2));
  cy.get("#cargoLength").type(LoginPage.Generate_Number(3));
  cy.get("#cargoWidth").type(LoginPage.Generate_Number(2));
  cy.get("#cargoHeight").type(LoginPage.Generate_Number(2));
  cy.get("#maxNumberStops").type(LoginPage.Generate_Number(2));
  cy.get("#maxTotalTripDuration").type(LoginPage.Generate_Number(2));
  cy.get("#maxDistanceKM").type(LoginPage.Generate_Number(4));
  BasePage.pause(1000);
  cy.get("button").contains("Create new type").click();
}

/*Filtre en fonction du nom dans la section Transport*/
function filterByNameTransport(name) {
  cy.get('.input-group > .form-control').type(name);
  BasePage.ResearchButton()
}

/*Filtre en fonction de la description saisie*/
function filterByDescription(description) {
  cy.get('.input-group > [name="description"]').type(description);
  BasePage.ResearchButton()
}

/*Filtre en fonction du code saisie*/
function filterBycode(code) {
  cy.get('.input-group > [name="code"]').type(code);
  BasePage.ResearchButton()
}

//---------------------------------------------------------------------*/

//verified the 03/09/2020
context("Order", () => {
  //fonctionnne
  describe("Order List", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Click on an order implies Information Visualisation", () => {
      cy.log("Click on an order implies Information Visualisation");
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Order", "order list[main]");

      let i = Math.floor(Math.random() * 14) + 1;
      cy.get(`tbody > :nth-child(${i}) > :nth-child(2)`).then(($td) => {
        const cust_email = $td.text();
        cy.get(`tbody > :nth-child(${i}) > :nth-child(3)`).then(($td) => {
          const first_name = $td.text();
          cy.get(`tbody > :nth-child(${i}) > :nth-child(4)`).then(($td) => {
            const last_name = $td.text();
            BasePage.getEyeByRowNumber(i);
            cy.get("h3")
              .contains("Customer's information")
              .should("be.visible");
            cy.get("h3").contains("Ordere's information").should("be.visible");
            cy.get("div").contains(`Customr First name: ${first_name}`);
            cy.get("div").contains(`Customr last name: ${last_name}`);
            cy.get("div").contains(`Customer email: ${cust_email}`);

            cy.log("Click on an order line implies table visualisation");
            cy.get("#orders-tab-orderLines").click();
            BasePage.pause(1000);
            cy.get("#orders-tabpane-orderLines").should("be.visible");
          });
        });
      });
    });

    it("Filter Test[First Name | Last Name | Email]", () => {
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Order", "order list[main]");

      let i = Math.floor(Math.random() * 14) + 1;
      cy.get(`tbody > :nth-child(${i}) > :nth-child(2)`).then(($td) => {
        const cust_email = $td.text();
        cy.get(`tbody > :nth-child(${i}) > :nth-child(3)`).then(($td) => {
          const first_name = $td.text();
          cy.get(`tbody > :nth-child(${i}) > :nth-child(4)`).then(($td) => {
            const last_name = $td.text();
            //filter my first name
            inputInFilterByNameAttribute("customerFirstName", first_name);
            cy.get("td").contains(first_name).should("be.visible");
            //filter my last name
            BasePage.Sidebar();
            BasePage.FromSidebarClick("Order", "order list[main]");
            inputInFilterByNameAttribute("customerLastName", last_name);
            cy.get("td").contains(last_name).should("be.visible");
            //filter my email
            BasePage.Sidebar();
            BasePage.FromSidebarClick("Order", "order list[main]");
            inputInFilterByNameAttribute("customerEmail", cust_email);
            cy.get("td").contains(cust_email).should("be.visible");
          });
        });
      });
    });
  });
});

//verified the 03/09/2020
context("Manage", () => {
  let codes = ["NEW", "UPDATE", "COMPLETE", "CLOSE", "PROCESS"];
  let date = new Date();
  let hoy = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  let sections = [
    "Order status",
    "Step status",
    "Trip status",
    "Product type",
    "Parcel status",
  ];

  for (let test = 0; test < sections.length; test++) {
    let current_section = sections[test];
    //fonctionnne
    describe(current_section, () => {
      let code = `${
        codes[Math.floor(Math.random() * codes.length)]
      }-${LoginPage.Generate_Number(2)}[${hoy}]`;
      let description = `[${hoy}]Create by Cypress Test[id-${LoginPage.Generate_Number(
        3
      )}]`;

      beforeEach(() => {
        LoginPage.load();
        LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
        BasePage.Sidebar();
        BasePage.FromSidebarClick("manage", current_section);
      });

      after(function () {
        BasePage.pause(700);
        LoginPage.logout();
      });

      it("Create a New status/type", () => {
        if (current_section === "Product type") {
          createStatus(code, description, "Create new type");
        } else {
          createStatus(code, description, "Create new status");
        }
        filterBycode(code);
        cy.get("td").contains(code).should("be.visible");
      });

      it("Filter [code | description]", () => {
        filterBycode(code);
        cy.get("td").contains(code).should("be.visible");
        BasePage.Sidebar();
        BasePage.FromSidebarClick("manage", current_section);
        filterByDescription(description);
        cy.get("td").contains(description).should("be.visible");
      });

      it("Update Test", () => {
        let i = Math.floor(Math.random() * 6) + 6;
        cy.get(`tbody > :nth-child(${i}) > :nth-child(1)`).then(($td) => {
          const code = $td.text();
          cy.get(`tbody > :nth-child(${i}) > :nth-child(2)`).then(($td) => {
            const description = $td.text();
            const update = `[Update during test ${hoy}]`;
            BasePage.getEyeByRowNumber(i);
            cy.get(
              ".modal-body > form > :nth-child(2) > .align-items-center > .input-size > #description"
            )
              .clear()
              .type(update);
            if (current_section === "Step status"){
              cy.get("button").contains("Change data").click();
            }else{
              cy.get("button").contains("Change Data").click();
            } 
            
            BasePage.pause(1000);
            filterByDescription(update);
            cy.get("td").contains(update).should("be.visible");
          });
        });
      });
    });
  }

  describe("Transport type", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("manage", "Transport type");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Create a new Type", () => {
      let name = `Vtest-${LoginPage.Generate_Number(4)}`;
      createNewType(name);
      filterByNameTransport(name);
      cy.get("td").contains(name).should("be.visible");
    });

    it("Filter Test[Name]", () => {
      let i = Math.floor(Math.random() * 5) + 1;
      cy.get(`tbody > :nth-child(${i}) > :nth-child(1)`).then(($td) => {
        const name = $td.text();
        filterByNameTransport(name);
        cy.get("td").contains(name).should("be.visible");
      });
    });

    it("Update Test", () => {
      let i = Math.floor(Math.random() * 5) + 1;
      cy.get(`tbody > :nth-child(${i}) > :nth-child(1)`).then(($td) => {
        const name = $td.text();
        BasePage.getEyeByRowNumber(i)
        let update = LoginPage.Generate_Number(1)
        //modifying max number stop
        cy.get(".container > form > :nth-child(4) > :nth-child(2) > .align-items-center > .input-size > #maxNumberStops").clear().type(update)
        BasePage.pause(1000)
        cy.get('button').contains('Change Data').click()
        BasePage.pause(1000)
        filterByNameTransport(name)
        //correspond to max number stop column
        cy.get('tbody > tr > :nth-child(10)').should('contain',update)
      });
    });
  });
});
