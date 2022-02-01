import helpers from "../../helpers/helpers";
import LoginPage from "../../pageObjects/login.page";
import HomePage from "../../pageObjects/home/home.page";
import SettingsTeamPage from "../../pageObjects/settings/team.page";
import faker from "faker/locale/en_US";
const userName = process.env.USER;
// const pass = process.env.AUTOMATIONPASS
const pass = "Qwerty_123!";

describe("Tradeswell Settings: Team page", () => {
    const userRoles = [
        'Company Admin',
        'Retail Viewer',
        'Operations Viewer',
        'Marketing Viewer',
        'Finance Viewer',
        'Home Viewer',
        'Goals Viewer',
        'Goals Manager'
    ]
  
  
    before(function () {
    LoginPage.open();
    LoginPage.login(userName, pass);
    HomePage.greetingText.waitForDisplayed({ timeout: 30000 });
  });

  beforeEach(function () {
    SettingsTeamPage.open();
    helpers.waitForPageLoad();
  });

  it("Can invite new team member", () => {
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = firstName + "." + lastName + "@example.com"
    SettingsTeamPage.inviteUserButton.waitForDisplayed()
    SettingsTeamPage.inviteUserButton.click()
    SettingsTeamPage.saveInviteButton.waitForDisplayed()
    SettingsTeamPage.inviteFirstNameInput.setValue(firstName)
    SettingsTeamPage.inviteLastNameInput.setValue(lastName)
    SettingsTeamPage.inviteEmailInput.setValue(email)
    // Select random Role
    let randomRole = userRoles[Math.floor(Math.random()*userRoles.length)];
    SettingsTeamPage.selectUserRole(randomRole).click()
    SettingsTeamPage.saveInviteButton.click()
    SettingsTeamPage.saveInviteButton.waitForDisplayed({reverse: true})
    expect(HomePage.notificationBar.getText()).to.be.equal(
        "Success! You just invited a new user."
      );
    // Confirm user was added
    expect(SettingsTeamPage.userFirstNameByEmail(email.toLowerCase()).getText()).to.be.equal(firstName);
    expect(SettingsTeamPage.userLastNameByEmail(email.toLowerCase()).getText()).to.be.equal(lastName);
  });
});
