import helpers from "../../helpers/helpers";
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

  beforeEach(function () {
    SettingsPage.open();
    helpers.waitForPageLoad();
  });

  it("Can change company name", () => {
    let newCompanyName = faker.lorem.words();
    HomePage.settingsLink.click();
    SettingsPage.companyNameInput.waitForDisplayed();
    SettingsPage.companyNameInput.setValue(newCompanyName);
    SettingsPage.brandSaveButton.click();
    HomePage.notificationBar.waitForDisplayed();
    expect(HomePage.notificationBar.getText()).to.be.equal(
      "Successfully saved!"
    );
    browser.waitUntil(
      () => {
        return HomePage.companyNameControl.getText() === newCompanyName;
      },
      { timeout: 15000, timeoutMsg: "Company name was not updated" }
    );
  });
  it("can change company category", () => {
    let randomIndex;
    HomePage.settingsLink.click();
    SettingsPage.landedCostText.waitForDisplayed();
    SettingsPage.editCompanyCategoryButton.click();
    // Select random category
    do {
      randomIndex = faker.datatype.number({
        min: 0,
        max: SettingsPage.companyCategoriesCheckboxes.length - 1,
      });
      SettingsPage.companyCategoriesCheckboxes[randomIndex].click();
    } while (
      SettingsPage.companyCategoriesCheckboxes[randomIndex].isSelected() ==
      false
    );
    SettingsPage.saveCategoriesButton.click();
    SettingsPage.editCompanyCategoryButton.click();
    expect(SettingsPage.companyCategoriesCheckboxes[randomIndex].isSelected())
      .to.be.true;
  });
  it.skip("can upload company brand image - KNOWN ISSUE ON FE SIDE", () => {
    // It's impossible to write test using webdriverio while input for file upload has multiple type meta 
    // https://stackoverflow.com/questions/46429810/how-to-upload-a-file-using-webdriverio#:~:text=As%20you%20can%20see%20the,%2C%20()%20%3D%3E%20%7B%20browser.
    HomePage.settingsLink.click();
    SettingsPage.landedCostText.waitForDisplayed();
    helpers.fileUpload(SettingsPage.exp, "../testData/company_brand.gif");
    browser.debug()
  });
  it.skip("can change Landed Cost Estimate", () => {
    HomePage.settingsLink.click();
    SettingsPage.landedCostText.waitForDisplayed();
    let currentLandedCost = SettingsPage.landedCostText.getText();
    console.log(currentLandedCost);
    SettingsPage.editButton.click();
    SettingsPage.landedCostInput.waitForDisplayed();
    SettingsPage.landedCostInput.click()
    SettingsPage.landedCostInput.clearValue()
    helpers.jQuerySetValue(SettingsPage.landedCostInput.selector, 5)
    //SettingsPage.landedCostInput.setValue(55)
    browser.debug();
  });
});
