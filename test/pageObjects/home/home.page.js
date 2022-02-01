import Page from '../page';

class HomePage extends Page {

    get greetingText() { return $(`[class*=Greetings__GreetingsText]`); }
    get launchPadLink() { return $(`a[href*='/launchpad?']`); }
    get homeLink() { return $(`a[href*='/?brandId=']`); }
    get retailLink() { return $(`a[href*='/retail/product-details?']`); }
    get marketingLink() { return $(`a[href*='/marketing/product-details?']`); }
    get operationsLink() { return $(`a[href*='/operations/product-details?']`); }
    get financeLink() { return $(`a[href*='/finance/product-details?']`); }
    get goalsLink() { return $(`a[href*='/goals?']`); }
    get reportsLink() { return $(`a[href*='/reports?']`); }
    get settingsLink() { return $(`a[href*='/settings?']`); }
    get profileIcon() { return $(`button .MuiIconButton-label`); }
    get myProfileSubMenu() { return $(`a[href*='/my-profile?']`); }
    get notificationBar() { return $(`#notistack-snackbar`); }
    get companyNameControl() { return $(`header div p`); }
    get companySelector() { return $(`[class*=CompanyHeaderMenu__Active]`); }
    get companySearchInput() { return $(`input[placeholder='Search...']`); }
    get firstCompanyFromTheSearch() { return $$(`.MuiAutocomplete-groupUl li`)[0]; }
    get topInsightsCards() { return $$(`div[style='position: relative;']`); }
    get tableTitles() { return $$(`h3[data-testid='filterbar-title']`); }
    get cumulativeToGoalHeader() { return $(`[class*=ChartSummaryItems__ChartSummaryRoot]`); }
    get cumulativeRangeDropdown() { return $$(`.GlobalCumulativePerformance__ChartWrapper-sc-7856zd-0 [data-testid='dropdown-clickable']`)[2]; }
    get dailyOption() { return $(`li*=Daily`); }
    get weeklyOption() { return $(`li*=Weekly`); }
    get monthylOption() { return $(`li*=Monthly`); }
 

    open() {
        super.open('');
    }

getUserName() { 
    let greetingText = this.greetingText.getText();
    let firstName = greetingText.split(' ').pop().split('!')[0];
    return firstName;
}

}

export default new HomePage();
