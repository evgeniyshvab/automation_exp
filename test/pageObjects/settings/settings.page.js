import Page from '../page';

class SettingsPage extends Page {

    get editButton() { return $('button=Edit'); }
    get landedCostText() { return $(`span.MyBrandStyled__Percentage-f01gnz-10`); }
    get landedCostSlider() { return $(`[aria-labelledby='input-slider'][aria-orientation='horizontal']`); }
    get landedCostInput() { return $(`input[type='number']`); }
    get modalSaveButton() { return $$(`.MuiDialog-paper button`)[2]; }
    get companynameInput() { return $(`#companyName`); }
    get brandSaveButton() { return $(`button[type='submit']`); }

    open() {
        super.open('');
    }

}

export default new SettingsPage();
