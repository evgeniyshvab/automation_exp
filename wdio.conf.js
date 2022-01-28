const moment = require('moment')
const fs = require('fs')
const del = require('del');
const screenshotsDir = './screenshots/'
const allureResultsDir = './allure-results/'
const path = require('path')
global.downloadDir = path.join(__dirname, 'tempDownload')

exports.config = {
    path: '/wd/hub',
    runner: 'local',
    specs: [
        './test/specs/**'
    ],
    // Patterns to exclude.
    exclude: [
    ],
    services: [
        ['selenium-standalone', {
            logPath: 'logs',
            installArgs: {
                drivers: {
                    chrome: { version: '96.0.4664.45' },
                    firefox: { version: '0.29.0' }
                }
            },
            args: {
                drivers: {
                    chrome: { version: '96.0.4664.45' },
                    firefox: { version: '0.29.0' }
                }
            },
        }]
    ],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            //args: ['--headless', '--window-size=1280,1700'],
            prefs: {
                'download.default_directory': downloadDir,
                'intl.accept_languages': 'en-US'
            }
        }
    }],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    bail: 0,
    //baseUrl: 'https://app.qa.tradeswell.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    // specFileRetries: 1,
    // specFileRetriesDelay: 2000,
    // specFileRetriesDeferred: true,
    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
    }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 9000000,
        compilers: ['@babel/register'],
    },
    before: function() {
        if (!fs.existsSync(screenshotsDir)){
            fs.mkdirSync(screenshotsDir);
        }
        const chai    = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();
    },
    beforeTest: function () {
        browser.maximizeWindow()
    },
    afterTest: function(test, context, { passed }) {
        if (passed === false) {
            browser.saveScreenshot('./screenshots/'+test.title+moment().format('YYYY-MM-DD')+'.png');
        }
    },
    onPrepare: function (config, capabilities) {
        del(screenshotsDir);
        del(allureResultsDir);
        if (!fs.existsSync(downloadDir)){
            fs.mkdirSync(downloadDir);
        }
    },
    onComplete: function () {
        del(downloadDir)
    },
}
