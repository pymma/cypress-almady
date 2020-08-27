import BasePage from "../../classes/BasePage";
import LoginPage from "../../classes/LoginPage";
import { LOGIN_USERNAME, LOGIN_PASSWORD } from "../../classes/config";

//verified the 08/20/2020
context("User", () => {
  //fonctionnne
  describe("User List", () => {
    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Click on a user implies Information Visualisation | Filter Test", () => {
      cy.log("Click on a user implies Information Visualisation");
      BasePage.Sidebar();
      BasePage.FromSidebarClick("User", "Users list");

      let i = Math.floor(Math.random() * 14) + 1;
      cy.get(`tbody > :nth-child(${i}) > :nth-child(2)`).then(($td) => {
        const email = $td.text();
        cy.get(`tbody > :nth-child(${i}) > :nth-child(3)`).then(($td) => {
          const user_type = $td.text();
          BasePage.SearchByEmail(email)
          cy.get(":nth-child(1) > .hover-pointer > svg").click();
          //cy.get(".hover-pointer > svg").click();
          BasePage.pause(1000);
          cy.get("div").contains(`Email: ${email}`).should("be.visible");
          /////
          cy.log("Filter test");
          BasePage.Sidebar();
          BasePage.FromSidebarClick("User", "Users list");
          BasePage.SearchByEmail(email)
          cy.get("td").contains(email).should("be.visible");
          BasePage.pause(1000);
        });
      });
    });
  });
  
  describe("User Creation", () => {
    let comp = "Almady company";
    let numero = LoginPage.Generate_Number(3);
    let email = "maintener." + numero + "@almady.com";
    let user_types = [
      "user",
      "driver",
      "e-commerce",
      "fleets",
      "vendors",
      "driver admin",
      "e-commerce admin",
      "fleets admin",
      "vendor admin",
      "driver api",
      "driver api user",
      "e-commerce api",
      "fleet api",
      "VENDOR_API",
      "admin user",
      "admin user api",
      "administrator",
    ];
    let indice = LoginPage.Generate_Number(1);
    let user_type = user_types[indice];

    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    });

    after(function () {
      BasePage.pause(700);
    });

    it("Create a Random User[Randomly]", () => {
      ////
      cy.log("Choose a Company among those proposed");
      BasePage.Sidebar();
      BasePage.FromSidebarClick("User", "Create user");
      BasePage.SearchByName(comp)
      BasePage.pause(1000);
      cy.get("td").contains(comp).should("be.visible");
      cy.get(".hover-pointer > svg").click();
      BasePage.pause(500);
      ////
      cy.log("Choose User Groups");
      cy.get("td")
        .contains("Administrators")
        .prev()
        .get('input[type="checkbox"]')
        .first()
        .check();
      ////
      cy.log("User Form");
      cy.get(".accordion > :nth-child(1) > :nth-child(5)").click();
      BasePage.pause(500);
      cy.get("#email").type(email);
      cy.get("#userType").select(user_type);
      cy.get("#newPassword").type("Utilisateur10+");
      cy.get("#repeatNewPassword").type("Utilisateur10+");
      BasePage.pause(1000);
      ////
      cy.log("Submit the register");
      cy.get("button").contains("register user").click();
    });

    it("New User should be visible in user list section", () => {
      cy.reload();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("User", "Users list");
      BasePage.SearchByEmail(email)
      cy.get("td").contains(email).should("be.visible");
    });
  });
});
