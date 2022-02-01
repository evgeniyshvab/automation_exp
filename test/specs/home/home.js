import LoginPage from '../../pageObjects/login.page'
import HomePage from '../../pageObjects/home/home.page'
import $$ from 'webdriverio/build/commands/browser/$$';
//const userName = process.env.USER;
// const pass = process.env.AUTOMATIONPASS
const userName = 'gkhmaladze@tradeswell.com';
const pass = 'ChangeMe2020';

describe('Tradeswell Home page', () => {

    before(function () {
        LoginPage.open();
        LoginPage.login(userName, pass);
        HomePage.greetingText.waitForDisplayed({ timeout: 30000 });
    })

    it('can see correct data on the Home Page', () => {
        let tableTitles = []
        HomePage.companySelector.click()
        HomePage.companySearchInput.waitForDisplayed()
        HomePage.companySearchInput.setValue('Kodiak Cakes')
        HomePage.firstCompanyFromTheSearch.waitForClickable()
        HomePage.firstCompanyFromTheSearch.click()
        HomePage.greetingText.waitForDisplayed({ timeout: 30000 });
        let initialCumulativeToGoalData = HomePage.cumulativeToGoalHeader.getText()
        // Confirm that Top Insights section has 7 cards
        expect(HomePage.topInsightsCards.length).to.be.equal(7)
        let tablesCount = HomePage.tableTitles.length
        for(let i = 0; i < tablesCount; i++) {
            tableTitles.push(HomePage.tableTitles[i].getText())
        }
        expect(tableTitles).to.include('Cumulative Performance to Goal', 'Channel Overview')
        // Change Time Range For Cumulative Chart
        HomePage.cumulativeRangeDropdown.click()
        HomePage.weeklyOption.waitForClickable()
        HomePage.weeklyOption.click()
        browser.waitUntil(() => {
            return HomePage.cumulativeToGoalHeader.getText() == initialCumulativeToGoalData
        }, { timeout: 90000, timeoutMsg: 'Something went wrong and data was not displayed OR different' });
    });
});
