import Page from './page';
import helpers from "../helpers/helpers";
const environmentUrl = process.env.HOST;
const userName = process.env.USER;

class LoginPage extends Page {

    get username() { return $(`input[name='username']`); }
    get password() { return $(`input[name='password']`); }
    get submitBtn() { return $(`.btn[type='submit']`); }
    get alertElement() { return $(`.error`); }

    open() {
        super.open('');
    }

    submit() {
        this.submitBtn.click();
    }

    login(user, pass) {
        this.username.setValue(user)
        this.password.setValue(pass)
        this.submit()
    }
}

export default new LoginPage();
