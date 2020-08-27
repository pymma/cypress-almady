const { default: LoginPage } = require("../../classes/LoginPage");
const {
  LOGIN_USERNAME,
  LOGIN_PASSWORD,
  CURRENT_ADRESSE,
} = require("../../classes/config");
const { default: BasePage } = require("../../classes/BasePage");

context("Fleet", () => {
  it("LOLO", () => {
    let info = {};

    LoginPage.load();
    LoginPage.login(LOGIN_USERNAME,LOGIN_PASSWORD);
   
    BasePage.Sidebar();
    BasePage.FromSidebarClick("Shipment", "Shipments List");
  });

});


// Change default warehouse [dont work]
// shipment|(order) filter in vendor/e-commerce admin[By date]
// driver creation 
//Profil fleet dont work