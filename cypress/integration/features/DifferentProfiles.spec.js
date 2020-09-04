import BasePage from "../../classes/BasePage";
import LoginPage from "../../classes/LoginPage";
import {
  LOGIN_PASSWORD,
  LOGIN_NUM,
  DRIVER_PASSWORD,
  PASSWORD_ECOMMERCE,
  LOGIN_VENDOR,
  LOGIN_E_VENDOR,
  LOGIN_FLEET,
  FLEET_PASSWORD,
} from "../../classes/config";

context.skip("Driver", () => {
  let curent_date = new Date();

  //fonctionne
  describe("Driver Dashboard", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_NUM, DRIVER_PASSWORD);
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Earning Page Should be visible", () => {
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Dashboard", "earnings");
      cy.get("h5").contains("Total Earnings").should("be.visible");
      cy.get("h5").contains("Total Deliveries").should("be.visible");
      cy.get("h5")
        .contains(`Total Earnings ${curent_date.getFullYear()}`)
        .should("be.visible");
      cy.get("h5")
        .contains(`Total Earnings ${curent_date.getFullYear()}`)
        .should("be.visible");
    });

    it("Get Offline", () => {
      cy.get("#dropdown-basic").click();
      BasePage.pause(1000);
      cy.get("a").contains("Get Offline").click();
      BasePage.pause(1000);
      cy.get("p")
        .contains(
          "Do you want to be invisible, if the status changed you can't affect to any trip?"
        )
        .should("be.visible");
      cy.get("button").contains("Yes").click();
      BasePage.pause(1000);
    });

    it("Reset Online", () => {
      cy.get("#dropdown-basic").click();
      BasePage.pause(1000);
      cy.get("a").contains("Get Offline").click();
      BasePage.pause(1000);
      cy.get("p")
        .contains(
          "Do you want to activat your status to affect for a new trip?"
        )
        .should("be.visible");
      cy.get("button").contains("Yes").click();
      BasePage.pause(1000);
    });

    it("Check driver Profile", () => {
      cy.get("#dropdown-basic").click();
      BasePage.pause(1000);
      cy.get("a").contains("Profil").click();
      BasePage.pause(1000);
      cy.get("h3").contains("General information").should("be.visible");
      cy.get("h3").contains("Vehicule information").should("be.visible");
      cy.get("button").contains("Change data").should("be.visible");
      cy.get("h3").contains("Documents").should("be.visible");
      cy.get("h3").contains("Fleet information").should("be.visible");
      cy.get("h3").contains("Availability time").should("be.visible");
    });
  });
});

context.skip("Vendor", () => {
  //fonctionne
  describe("Vendor Customer", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_VENDOR, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Customer", "customer list");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("customer Table Should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Click on a customer should implies information visualisation", () => {
      let alea = Math.floor(Math.random() * 15) + 1;
      BasePage.getEyeByRowNumber(alea);
      cy.get("h3").contains("General Information").should("be.visible");
      cy.get("h3").contains("places information").should("be.visible");
    });

    it("Filter Test[Randomly]", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;

      BasePage.Sidebar();
      BasePage.FromSidebarClick("Customer", "customer list");

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
        const email = $td.text();
        BasePage.SearchByEmail(email);
        cy.get("td").contains(email).should("be.visible");
      });
    });
  });

  //fonctionne
  describe("Vendor Products", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_VENDOR, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Product", "products list");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Product Table Should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Click on a product should implies information visualisation", () => {
      let alea = Math.floor(Math.random() * 7) + 1;
      BasePage.getEyeByRowNumber(alea);

      cy.get("h3").contains("Information").should("be.visible");
    });

    it("Filter Test[Date]", () => {
      let alea2 = Math.floor(Math.random() * 7) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const product = $td.text();
        cy.get('[name="name"]').type(product);
        BasePage.ResearchButton()
        cy.get("td").contains(product).should("be.visible");
      });
    });
  });
  //fonctionne[sauf filtre]
  describe("Shipment", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_VENDOR, LOGIN_PASSWORD);
      BasePage.Sidebar();
      //FromSidebar(shipmentList) traduit si dessous
      cy.get("span").contains("Shipment").click();
      BasePage.pause(1000);
      cy.get(
        ':nth-child(4) > [style="background-color: gray;"] > a > .hover-pointer-darker'
      ).click();
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Shipment table should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Click on a shipment should implies information visualisation[General Information/Product Details/Shipments Information]", () => {
      let alea = Math.floor(Math.random() * 7) + 1;
      BasePage.getEyeByRowNumber(alea);
      cy.get("div").contains("Delivering informations").should("be.visible");
      cy.get("#shipmentsTabs-tab-productDetails").should("be.visible").click();
      cy.get("div").contains(" Product details").should("be.visible");
      cy.get("#shipmentsTabs-tab-shipmentComment").should("be.visible"); //pas de click pour le moment car pas de comment
    });

    it("Filter Test[Date]", () => {
      let alea2 = Math.floor(Math.random() * 7) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const product = $td.text();
        cy.get('[name="deliveryDate"]').type(product);
        BasePage.ResearchButton()
        cy.get("td").contains(product).should("be.visible");
      });
    });
  });
});

context.skip("E-Commerce Vendor", () => {
  describe("E-Commerce Customer", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_E_VENDOR, PASSWORD_ECOMMERCE);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Customer", "customer list");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("customer Table Should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Click on a customer should implies information visualisation", () => {
      let alea = Math.floor(Math.random() * 15) + 1;
      BasePage.getEyeByRowNumber(alea);
      cy.get("h3").contains("General Information").should("be.visible");
      cy.get("h3").contains("places information").should("be.visible");
    });

    it("Filter Test[Randomly]", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;

      BasePage.Sidebar();
      BasePage.FromSidebarClick("Customer", "customer list");

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
        const email = $td.text();
        BasePage.SearchByEmail(email);
        cy.get("td").contains(email).should("be.visible");
      });
    });
  });

  describe("E-Commerce Products", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_E_VENDOR, PASSWORD_ECOMMERCE);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Product", "products list[E-Commerce]");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Product Table Should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Click on a product should implies information visualisation", () => {
      let alea = Math.floor(Math.random() * 7) + 1;
      BasePage.getEyeByRowNumber(alea);
      cy.get("h3").contains("Information").should("be.visible");
    });

    it.skip("Filter Test[Name|Type]", () => {
      let alea2 = Math.floor(Math.random() * 7) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const product = $td.text();
        cy.get("input.form-control").type(product);
        BasePage.pause(1000);
        cy.get("#inputGroupPrepend").click();
        BasePage.pause(1000);
        cy.get("td").contains(product).should("be.visible");
      });
    });
  });

  //fonctionne
  describe("Order", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_E_VENDOR, PASSWORD_ECOMMERCE);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Order", "order list");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Shipment table should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Click on a Order should implies information visualisation[General Information/Product Details/Shipments Information]", () => {
      let alea = Math.floor(Math.random() * 7) + 1;
      BasePage.getEyeByRowNumber(alea);
      cy.get("div").contains("Customer's information").should("be.visible");
      cy.get("div").contains("Ordere's information").should("be.visible");
      cy.get("#orders-tab-orderLines").should("be.visible").click();
      BasePage.pause(1000);
      cy.get("#orders-tabpane-orderLines").should("be.visible"); //pas de click pour le moment car pas de comment
    });

    it("Filter Test[order Email]", () => {
      let alea2 = Math.floor(Math.random() * 7) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
        const order = $td.text();
        //filter by email
        cy.get('[name="customerEmail"]').type(order);
        BasePage.ResearchButton()
        cy.get("td").contains(order).should("be.visible");
      });
    });
  });

  //fonctionne
  describe("Shipment", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_E_VENDOR, PASSWORD_ECOMMERCE);
      BasePage.Sidebar();
      //FromSidebar(shipmentList) traduit si dessous
      cy.get("span").contains("Shipment").click();
      BasePage.pause(1000);
      cy.get(
        ':nth-child(4) > [style="background-color: gray;"] > a > .hover-pointer-darker'
      ).click();
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Shipment table should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Click on a shipment should implies information visualisation[General Information/Product Details/Shipments Information]", () => {
      let alea = Math.floor(Math.random() * 7) + 1;
      BasePage.getEyeByRowNumber(alea);
      cy.get("div").contains("Delivering informations").should("be.visible");
      cy.get("#shipmentsTabs-tab-productDetails").should("be.visible").click();
      cy.get("div").contains(" Product details").should("be.visible");
      cy.get("#shipmentsTabs-tab-shipmentComment").should("be.visible"); //pas de click pour le moment car pas de comment
    });

    it("Filter Test[Name|Type]", () => {
      let alea2 = Math.floor(Math.random() * 7) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const product = $td.text();
        cy.get('[name="deliveryDate"]').type(product);
        BasePage.ResearchButton()
        cy.get("td").contains(product).should("be.visible");
      });
    });
  });
});

context.skip("Fleet", () => {
  //fonctionne
  describe("Fleet Driver", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_FLEET, FLEET_PASSWORD);
      BasePage.Sidebar();
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Driver table should be visible", () => {
      BasePage.FromSidebarClick("Driver", "Drivers list");
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Associated driver should be visible in table | associated to the current fleet", () => {
      let alea2 = 1;

      BasePage.FromSidebarClick("Driver", "Drivers list");
      BasePage.getEyeByRowNumber(alea2)
      cy.get("h3").contains("Fleet Information").should("be.visible");
        cy.get("div.list-group-item")
          .contains(`Email: ${LOGIN_FLEET}`)
          .should("be.visible");
    });

    it("Disable/Enable a Driver as Fleet admin", () => {
      BasePage.FromSidebarClick("Driver", "Drivers list");
      let alea2 = 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const driver2 = $td.text();
        BasePage.getEyeByRowNumber(alea2)
        BasePage.pause(1000);
        cy.get("button")
          .contains("Disable driver")
          .should("be.visible")
          .click();
        BasePage.pause(2000);
        BasePage.SearchByName(driver2)
        cy.get("td").contains(LOGIN_FLEET).should('be.visible')
        BasePage.getEye()
        BasePage.pause(1000);
        cy.get("button").contains("Enable driver").should("be.visible").click();
        BasePage.pause(2000);
      });
    });

    it("Filter Test[Randomly]", () => {
      let alea2 = 1;
      BasePage.FromSidebarClick("Driver", "Drivers list");
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const driver3 = $td.text();
        BasePage.SearchByName(driver3)
        BasePage.pause(1000);
        cy.get("td").contains(driver3).should("be.visible");
      });
    });
  });

  //fonctionne
  describe("Tasks[Fleet]", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_FLEET, FLEET_PASSWORD);
      BasePage.Sidebar();
      // Get the tasks in the sidebar
      cy.get("div").contains("Task").click();
      BasePage.pause(1000);
      cy.get(
        ':nth-child(2) > [style="background-color: gray;"] > a > .hover-pointer-darker > div'
      ).click();
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Task Table Should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });
  });

  //fonctionne
  describe("Trip", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_FLEET, FLEET_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Trip", "Trip list");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Trip table should be visible", () => {
      cy.get("table.table.table-striped.table-bordered.table-hover").should(
        "be.visible"
      );
    });

    it("Click on a trip should implies information visualisation[Map/trip board]", () => {
      let alea = 1;

      BasePage.getEyeByRowNumber(alea)
      cy.get("div.modal-body").should("be.visible");
      cy.get("button").contains("Delete trip").should("be.visible");
    });

    it("Random driver in trip list should be associated to the current fleet", () => {
      let alea2 = 1;

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
        const driver1 = $td.text().split(" ");
        const firstN = driver1[0];
        const LastN = driver1[1];
        BasePage.Sidebar();
        BasePage.FromSidebarClick("Driver", "Drivers list");
        BasePage.SearchByName(firstN)
        cy.get("td")
          .contains(firstN)
          .next()
          .should("contain", LastN)
          .should("be.visible");
      });
    });

    it("Filter Test[Status]", () => {
      let longeur = 5;
      let status = "ASSIGNED";
      cy.get('select[name="choose"]').select("STATUS");
      BasePage.pause(500);
      cy.get('select[name="status"]').select(status);
      BasePage.pause(500);
      cy.get("#inputGroupPrepend").click();
      BasePage.pause(1000);

      for (let index = 1; index <= longeur; index++) {
        cy.get(`tbody > :nth-child(${index}) > :nth-child(1)`).should(
          "contain",
          status
        );
      }
    });
  });
});
