import Page from '../page';

class SettingsTeamPage extends Page {

    get inviteUserButton() { return $('button=Invite user'); }
    get inviteFirstNameInput() { return $(`#firstName`); }
    get inviteLastNameInput() { return $(`#lastName`); }
    get inviteEmailInput() { return $(`#email`); }
    get saveInviteButton() { return $(`[form='invite-user-form'][type='submit']`); }


    // user roles
    selectUserRole(roleName) { return $(`span=${roleName}`).parentElement()}

    // user details
    userFirstNameByEmail(email) { return $$(`[title='${email}']`)[0]}
    userLastNameByEmail(email) { return $$(`[title='${email}']`)[1]}


    open() {
        super.open('settings/team');
    }

}

export default new SettingsTeamPage();
