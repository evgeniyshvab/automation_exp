import LoginPage from '../../pageObjects/login.page'
import HomePage from '../../pageObjects/home/home.page'
const userName = process.env.USER;
// const pass = process.env.AUTOMATIONPASS
const pass = 'Qwerty_123!'

describe('Tradeswell login page', () => {

    beforeEach(function () {
        LoginPage.open()
        expect(browser.getTitle()).to.be.equal('Tradeswell - Log In');
    })

    it('bad password', () => {
        LoginPage.login(userName, 'test')
        LoginPage.alertElement.waitForDisplayed({timeout: 2000});
        expect(LoginPage.alertElement.getText()).to.be.equal('Wrong email or password.');
        expect(browser.getUrl()).to.deep.include('/login');
    });
    it('correct data', () => {
        LoginPage.login(userName, pass)
        HomePage.greetingText.waitForDisplayed({timeout: 30000})
    });
});
