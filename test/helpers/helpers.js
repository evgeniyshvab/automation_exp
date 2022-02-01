let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let moment = require('moment')
const path = require('path');
const fs = require('fs')
const userName = process.env.USER;

exports.cssLength = (css) => {
    return browser.execute(table => $(table).length, css)
}

exports.waitForDisplayedElement = (css, ms) => {
    try {
        $(css).waitForDisplayed({ timeout: ms })
    } catch (error) {
        console.error(error)
    }
    return $(css).isDisplayed()
}

exports.waitForClickableElement = (css, ms) => {
    try {
        $(css).waitForClickable({ timeout: ms })
    } catch (error) {
        console.error(error)
    }
    return $(css).isClickable()
}

exports.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

exports.deleteValue = function (css) {
    $(css).setValue('')
    $(css).waitForClickable()
    $(css).click()
    while ($(css).getValue() != 0) {
        browser.keys("Backspace")
    }
    return
}


exports.fileUpload = (inputSelector, pathToFile) => {
    const filePath = path.join(__dirname, pathToFile);
    const remoteFilePath = browser.uploadFile(filePath)
    inputSelector.setValue(remoteFilePath)
};

exports.readFile = (path) => {
    let content =
        fs.readFileSync(path, 'utf8', (err, data) => {
            if (err) {
                return console.error(err)
            }
            else { return data; }
        });
    return content;
};

exports.manualDeleteValue = function(css) {
    $(`${css}`).click()
    if ($(`${css}`).getValue() != '') {
        while ($(`${css}`).getValue() != '') {
            browser.keys("ArrowRight")
            browser.keys("Backspace")
        }
        return
    }
    while ($(`${css}`).getText() != '') {
        browser.keys("ArrowRight")
        browser.keys("Backspace")
    }
}

exports.matchRuleExpl = (str, rule) => {
    let escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    rule = rule.split("*").map(escapeRegex).join(".*");
    rule = "^" + rule + "$"
    let regex = new RegExp(rule);
    return regex.test(str);
};

exports.getTableNamesArray = (cssSelector) => {
    let tableNames = []
    let recordsCount = cssSelector.length
    for (let i = 0; i < recordsCount; i++) {
        tableNames.push(`${cssSelector[i].getText()}`)
    }
    return tableNames
};

exports.getTableRowAttributesArray = (cssSelector, attributeName) => {
    let attributeValues = []
    let recordsCount = cssSelector.length
    for (let i = 0; i < recordsCount; i++) {
        attributeValues.push(`${cssSelector[i].getAttribute(attributeName)}`)
    }
    return attributeValues
};

exports.checkExistsWithTimeout = async function (filePath, timeout) {
    await this.sleep(3000)
    return new Promise(function (resolve, reject) {
        var timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);

        fs.access(filePath, fs.constants.R_OK, function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });

        var dir = path.dirname(filePath);
        var basename = path.basename(filePath);
        var watcher = fs.watch(dir, function (eventType, filename) {
            if ($(`a*=${filename}`).isDisplayed()) {
                $(`a*=${filename}`).click()
            }
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });
    });
};

exports.jQuerySetValue = (css, val) => {
    browser.execute(
        (cssElement, valueElement) => $(`${cssElement}`).val(valueElement), css, val
    );
};

exports.jQueryClick = (css) => {
    browser.execute(
        cssElement => $(`${cssElement}`).click(), css
    );
};

exports.waitForPageLoad = () => {
    browser.waitUntil(function () {
        const state = browser.execute(function () {
            return document.readyState;
        });
        return state === 'complete';
    },
        {
            timeout: 60000,
            timeoutMsg: 'WTF ! page is still not loaded ?',
            interval: 500
        });
};
