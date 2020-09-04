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
let entreprise = [
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
let extention = ["Innovation", "Corporate", "ECommerce", "Iservice"];
let warehouses = [
  "Kamsar",
  "Conakry",
  "Boston",
  "Atlanta",
  "Tokyo",
  "Seattle",
  "Londres",
  "Paris",
  "Lyon",
  "Marseille",
  "Antananarivo",
  "Malabo",
  "Rio de Janeiro",
  "Caire",
  "Manaus",
  "Dakar",
  "Séoul",
  "johannesburg",
  "Dallas",
  "Amsterdam",
  "Lille",
  "Dublin",
  "Niger",
  "Alger",
  "Djibouti",
  "Abuja",
  "Harare",
  "Bombay",
  "Bangalore",
  "Colombo",
  "Sidney",
  "Hobart",
];
let comments = [
  "Damien Marley - So a child may follow",
  "Elton John - High ft Young Thug",
  "Young Thug - Killed Before",
  "Young Thug - Just How It Is",
];
let warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
let company = entreprise[Math.floor(Math.random() * entreprise.length)];
let ext = extention[Math.floor(Math.random() * extention.length)];
let identifation = LoginPage.Generate_Number(3);
let prenom = Firstname[Math.floor(Math.random() * Firstname.length)];
let cell_phone_number = LoginPage.Generate_Number(10);
let addr = LoginPage.Generate_Number(5) + " " + warehouse;

let email =
  prenom.toLocaleLowerCase() +
  "@" +
  company.toLocaleLowerCase() +
  "-" +
  ext.toLocaleLowerCase() +
  ".com";
let name = company + "-" + ext + "-" + identifation;
let Registration = company + "-" + ext;

//----------------------------------------------------------------//

context.skip("Vendor[e-commerce include]", () => {
  //fonctionne
  describe("Vendor Registration", () => {
    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Register a Vendor", () => {
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Vendor", "Register a vendor");
      cy.get("#name").type(name);
      cy.get("#phoneCountryCode").type("+33");
      cy.get("#phoneNumber").type(cell_phone_number);
      cy.get("#email").type(email);
      cy.get("#registrationCertificate").type(Registration);
      cy.get("#defaultWarehouseName").type(warehouse);
      cy.get("#completeAddress").type(addr);
      cy.get("#details").type("Damien Marley - So a Child May Follow");
      BasePage.pause(2000);
      cy.get("button").contains("Register").click();
      BasePage.pause(2000);
    });

    it("New Registration should be visible in Vendors Section", () => {
      cy.reload();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Vendor", "Vendors list");
      BasePage.SearchByName(name);
      BasePage.pause(1500);
      cy.get("td").contains(name).should("be.visible");
    });
  });

  //fonctionne
  describe("Vendor List", () => {
    let ville = warehouses[Math.floor(Math.random() * warehouses.length)];
    let compAddr = LoginPage.Generate_Number(5);
    let new_r = "leave next to the door[" + LoginPage.Generate_Number(5) + "]";

    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Vendor", "Vendors list");
    });

    after(function () {
      BasePage.pause(700);
    });

    it("Click on a Vendor implies Information Visualisation | Create A WareHouse | Add a comment on a warehouse | Vendor Update a Vendor Information | Update a Vendor Information[any Comment] | Select a group implies group tab visualisation", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text();

        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const mail = $td.text();

          cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
            const phone = $td.text();
            const num_coup = phone.substr(3);

            BasePage.SearchByName(name);
            BasePage.getEye();

            cy.get("div").contains(name).should("be.visible");
            cy.get("div").contains(phone).should("be.visible");
            cy.get("div").contains(mail).should("be.visible");
            cy.get("button").contains("Disable").should("be.visible");
            cy.get("button")
              .contains("Create a warehouse")
              .should("be.visible");
            BasePage.pause(1000);
            ////
            cy.log("CREATE A WAREHOUSE");

            BasePage.Sidebar();
            BasePage.FromSidebarClick("Vendor", "Vendors list");
            BasePage.SearchByName(name);
            BasePage.getEye();

            cy.get("button").contains("Create a warehouse").click();
            BasePage.pause(1000);
            cy.get("div.modal-content").should("be.visible");
            cy.get("div.modal-title.h4")
              .contains("New warehouse")
              .should("be.visible");
            cy.get("#name").type(ville);
            cy.get("#details").type("Warehouse added during the Test session");
            cy.get("#completeAddress").type(compAddr);
            BasePage.pause(2000);
            cy.get("button").contains("Register").click();
            BasePage.pause(1000);
            //cy.reload();
            BasePage.pause(1000);
            cy.get("span").contains("Warehouse list").click();
            BasePage.pause(1000);
            cy.get(
              ":nth-child(1) > .card > .card-body > .row > .align-items-center > .input-group > .form-control"
            ).type(ville);
            BasePage.pause(1000);
            cy.get(
              ":nth-child(1) > .card > .card-body > .row > .align-items-center > :nth-child(2)"
            ).click();
            BasePage.pause(1000);
            cy.get("td").contains(ville).should("be.visible");

            ////
            cy.log("ADD A COMMENT WAREHOUSE");

            BasePage.Sidebar();
            BasePage.FromSidebarClick("Vendor", "Vendors list");
            BasePage.SearchByName(name);
            BasePage.getEye();

            cy.get("span").contains("Warehouse list").click();
            BasePage.pause(1000);
            cy.get(
              ":nth-child(1) > .card > .card-body > .row > .align-items-center > .input-group > .form-control"
            ).type(ville);
            cy.get(
              ":nth-child(1) > .card > .card-body > .row > .align-items-center > :nth-child(2)"
            ).click();
            BasePage.pause(1000);
            cy.get(
              ".collapse > :nth-child(2) > .card-body > .table-responsive > .table > tbody > tr > .hover-pointer > svg > path"
            ).click();
            BasePage.pause(1000);
            cy.get("h3").contains("Warehouse Information").should("be.visible");
            cy.get("div").contains(`Name: ${ville}`).should("be.visible");
            cy.get("#commentToDriver").type(
              `Commentaire pour la ville de ${ville} à l'addresse ${compAddr}`
            );
            cy.get("button").contains("Send").click();

            cy.log("UPDATE A VENDOR INFORMATION");
            cy.reload();
            BasePage.Sidebar();
            BasePage.FromSidebarClick("Vendor", "Vendors list");
            BasePage.SearchByName(name);
            BasePage.getEye();

            cy.get("button").contains("Change data").click();
            BasePage.pause(1000);
            cy.get("#details").clear().type(new_r);
            if (phone[0] === "+") {
              cy.get("#phoneNumber").clear().type(num_coup);
            }
            cy.get("button").contains("Save data").click();
            BasePage.pause(2000);
            BasePage.SearchByName(name);
            BasePage.getEye();
            cy.get("div").contains(`Details: ${new_r}`).should("be.visible");

            cy.log("SELECT GROUP IMPLIES VISUALISATION");
            BasePage.Sidebar();
            BasePage.FromSidebarClick("Vendor", "Vendors list");
            BasePage.SearchByName(name);
            BasePage.getEye();

            let opt1 = `${name}_admin`;
            let opt2 = `${name}_main`;

            cy.get("#groups").select(opt1);
            cy.get("option").contains(opt1).should("be.visible");

            cy.get("#groups").select(opt2);
            cy.get("option").contains(opt2).should("be.visible");
          });
        });
      });
    });

    it("Filter Test[Name | Email]", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text();
        cy.get("td").contains(name).should("be.visible");
      });
    });

    it("Disable/Enable Vendor", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text();
        BasePage.SearchByName(name);
        BasePage.getEye();
        cy.get("button").contains("Disable").click();
        BasePage.pause(2000);
        BasePage.Sidebar();
        BasePage.FromSidebarClick("Vendor", "Vendors list");
        BasePage.SearchByName(name);
        cy.get("td").contains("admin@almady.com").should("be.visible");
        BasePage.getEye();
        cy.get("button").contains("Enable").should("be.visible").click();
        BasePage.pause(3000);
      });
    });
  });

  //----------------------------------------------------------------------------------------------------------------------------------//

  // ne fonctionne pas
  describe.skip("E-Commerce Registration", () => {
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
    let entreprise = [
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
    ];
    let extention = ["Innovation", "Corporate", "ECommerce", "Iservice"];

    let company = entreprise[Math.floor(Math.random() * entreprise.length)];
    let ext = extention[Math.floor(Math.random() * extention.length)];
    let identifation = LoginPage.Generate_Number(3);
    let prenom = Firstname[Math.floor(Math.random() * Firstname.length)];
    let cell_phone = LoginPage.Generate_Number(10);

    let email =
      prenom.toLocaleLowerCase() +
      "@" +
      company.toLocaleLowerCase() +
      "-" +
      ext.toLocaleLowerCase() +
      ".com";
    let name = company + "-" + ext + "-" + identifation;
    let Registration = company + "-" + ext;
    let internal = Registration + "-ECommerce";

    before(function () {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Register a E-commerce bussiness & Verify registration accurancy", () => {
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Ecommerce", "Register e-commerce");
      cy.get("#name").type(name);
      cy.get("#phoneCountryCode").type("+33");
      cy.get("#phoneNumber").type(cell_phone);
      cy.get("#email").type(email);
      cy.get("#registrationName").type(Registration);
      cy.get("#internetName").type(internal);
      cy.get("#companyName").type(company);
      BasePage.pause(5000);
      cy.get("button.btn.btn-dark.btn-lg")
        .contains("Register e-commerce")
        .click();
      BasePage.pause(2000);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Ecommerce", "E-commerces list");
      BasePage.SearchByName(name)
      cy.get("td").contains(name).should("be.visible");
    });
  });

  //fonctionne
  describe("E-Commerce List", () => {
    function getTestContext(nom) {
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Ecommerce", "E-commerces list");
      BasePage.SearchByName(nom);
      BasePage.getEye();
    }

    let current_internet_name = LoginPage.Generate_Number(12);
    let alea2 = Math.floor(Math.random() * 2) + 1;

    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Ecommerce", "E-commerces list");
    });

    it("Click on a E-Commerce list element implies Information Visualisation | Filter test | Select a group implies group tab visualisation | Update a E-commerce Information", () => {
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text();

        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const mail = $td.text();

          cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
            const phone = $td.text();

            BasePage.SearchByName(name);
            BasePage.getEye();

            cy.get(
              ":nth-child(3) > .card > .card-body > :nth-child(1) > :nth-child(2) > .list-group > .list-group-item"
            ).then(($td) => {
              const comp_name = $td.text().substr(14).trim();

              cy.get("div").contains(name).should("be.visible");
              cy.get("div").contains(phone).should("be.visible");
              cy.get("div").contains(mail).should("be.visible");
              cy.get("button")
                .contains("Disable e-commerce")
                .should("be.visible");

              cy.log("FILTER TEST");

              BasePage.Sidebar();
              BasePage.FromSidebarClick("Ecommerce", "E-commerces list");
              BasePage.SearchByName(name);
              cy.get("table.table.table-striped.table-bordered.table-hover")
                .find("tr")
                .should("have.length", 2);

              cy.log("SELECT GROUP IMPLIES VISUALISATION");

              let opt1 = `${comp_name}_main`;
              let opt2 = `${comp_name}_admin`;

              getTestContext(name);

              cy.get("#groups").select(opt1);
              cy.get("option").contains(opt1).should("be.visible");
              cy.get("#groups").select(opt2);
              cy.get("option").contains(opt2).should("be.visible");

              cy.log("UPDATE INFORMATION");

              getTestContext(name);
              cy.get("button").contains("Change data").click();
              BasePage.pause(1000);
              cy.get("#internetName").clear().type(current_internet_name);
              cy.get("button").contains("Save change").click();
              BasePage.pause(1000);
              getTestContext(name);
              cy.get("div")
                .contains(current_internet_name)
                .should("be.visible");
            });
          });
        });
      });
    });

    it("Filter Test[Name | Email | Phone]", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;

      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text().trim();
        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const email = $td.text().trim();
          cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
            const phone = $td.text().trim();
            // By Name
            BasePage.SearchByName(name);
            cy.get("td").contains(name).should("be.visible");
            //By Email
            BasePage.pause(1000);
            BasePage.SearchByEmail(email);
            cy.get("td").contains(email).should("be.visible");
            //By Phone
            BasePage.pause(1000);
            BasePage.SearchByPhone(phone);
            cy.get("td").contains(phone).should("be.visible");
          });
        });
      });
    });
  });
});

context.skip("Company", () => {
  //fonctionne
  describe("Companies List", () => {
    beforeEach(() => {
      LoginPage.load();
      LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
      BasePage.Sidebar();
      BasePage.FromSidebarClick("Company", "Companies list");
    });

    after(function () {
      BasePage.pause(700);
      LoginPage.logout();
    });

    it("Click on a company should implies Information Visualisation | Group Visualisation", () => {
      let alea2 = Math.floor(Math.random() * 6) + 2;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text().trim();
        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const email = $td.text().trim();
          cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
            const phone = $td.text().trim();
            cy.get(`tbody > :nth-child(${alea2}) > :nth-child(4)`).then(
              ($td) => {
                const registration = $td.text().trim();

                BasePage.SearchByName(name);
                cy.get(":nth-child(1) > .hover-pointer > svg").click();
                BasePage.pause(1000);
                cy.get("h3")
                  .contains("Company information")
                  .should("be.visible");
                cy.get("div")
                  .contains(`Registration Certificate: ${registration}`)
                  .should("be.visible");
                cy.get("div")
                  .contains(`Company name: ${name}`)
                  .should("be.visible");
                cy.get("div").contains(`Email: ${email}`).should("be.visible");
                cy.get("div")
                  .contains(`Mobile number: ${phone}`)
                  .should("be.visible");

                //////
                cy.log("GROUP VISUALISATION");

                let option = [`${name}_main`, `${name}_admin`];
                cy.get("span").contains("List group").should("be.visible");
                for (let index = 0; index < option.length; index++) {
                  let value = option[index];
                  cy.get("option").contains(value);
                }
              }
            );
          });
        });
      });
    });

    it("Filter Test", () => {
      let alea2 = Math.floor(Math.random() * 6) + 1;
      cy.get(`tbody > :nth-child(${alea2}) > :nth-child(1)`).then(($td) => {
        const name = $td.text().trim();
        cy.get(`tbody > :nth-child(${alea2}) > :nth-child(2)`).then(($td) => {
          const email = $td.text().trim();
          cy.get(`tbody > :nth-child(${alea2}) > :nth-child(3)`).then(($td) => {
            const prefix = "+966";
            const phone = $td.text().trim().substring(prefix.length).trim();
            // By Name
            BasePage.SearchByName(name);
            cy.get("td").contains(name).should("be.visible");
            //By Email
            BasePage.pause(1000);
            BasePage.SearchByEmail(email);
            cy.get("td").contains(email).should("be.visible");
            //By Phone
            BasePage.pause(1000);
            BasePage.SearchByPhone(phone);
            cy.get("td").contains(phone).should("be.visible");
          });
        });
      });
    });
  });
});


