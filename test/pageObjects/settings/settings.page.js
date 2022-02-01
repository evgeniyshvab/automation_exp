import Page from '../page';

class SettingsPage extends Page {

    get editButton() { return $('button=Edit'); }
    get landedCostText() { return $(`span.MyBrandStyled__Percentage-f01gnz-10`); }
    get landedCostSlider() { return $(`[aria-labelledby='input-slider'][aria-orientation='horizontal']`); }
    get landedCostInput() { return $(`input[type='number']`); }
    get modalSaveButton() { return $$(`.MuiDialog-paper button`)[2]; }
    get companyNameInput() { return $(`#companyName`); }
    get editCompanyCategoryButton() { return $(`button=Edit company category`); }
    get brandSaveButton() { return $(`button[type='submit']`); }
    get companyCategoriesCheckboxes() { return $$(`input[type='checkbox']`); }
    // TODO: Ask to add normal identified to all buttons and update css afterwards
    get saveCategoriesButton() { return $$(`.MuiDialogActions-root button[type='button']`)[1]; }
    get uploadBrandLogoButton() { return $(`.long-brand-logo img`); }
    get exp() { return $$(`input[type='file']`)[0]; }
    get uploadBrandFile() { return $(`.long-brand-logo input[type='file']`); }
    
    open() {
        super.open('settings/my-brand');
    }

}

export default new SettingsPage();
