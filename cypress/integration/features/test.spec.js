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
    LoginPage.login(LOGIN_USERNAME, LOGIN_PASSWORD);
    BasePage.Sidebar();
    BasePage.FromSidebarClick("Trip", "Available Trips");
  });

});
