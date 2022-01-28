const environmentUrl = process.env.HOST;

export default class Page {
    open (path) {
        browser.url(environmentUrl + path)
    }
}
