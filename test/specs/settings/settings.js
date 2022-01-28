import LoginPage from "../../pageObjects/login.page";
import HomePage from "../../pageObjects/home/home.page";
import SettingsPage from "../../pageObjects/settings/settings.page";
import faker from "faker/locale/en_US";
const userName = process.env.USER;
// const pass = process.env.AUTOMATIONPASS
const pass = "Qwerty_123!";

describe("Tradeswell Settings page", () => {
  before(function () {
    LoginPage.open();
    LoginPage.login(userName, pass);
    HomePage.greetingText.waitForDisplayed({ timeout: 30000 });
  });
  it("Can change company name", () => {
    let newCompanyName = faker.lorem.words();
    HomePage.settingsLink.click();
    SettingsPage.companynameInput.waitForDisplayed();
    SettingsPage.companynameInput.setValue(newCompanyName);
    SettingsPage.brandSaveButton.click();
    HomePage.notificationBar.waitForDisplayed();
    expect(HomePage.notificationBar.getText()).to.be.equal(
      "Successfully saved!"
    );
    browser.waitUntil(() => {
        return HomePage.companyNameControl.getText() === newCompanyName
    }, {timeout: 15000, timeoutMsg: 'Company name was not updated'});
  });
  it.skip("can change Landed Cost Estimate", () => {
    SettingsPage.landedCostText.waitForDisplayed();
    let currentLandedCost = SettingsPage.landedCostText.getText();
    console.log(currentLandedCost);
    SettingsPage.editButton.click();
    SettingsPage.landedCostInput.waitForDisplayed();
    SettingsPage.landedCostInput.clearValue();
    browser.debug();
  });
});
