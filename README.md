# Tradeswell E2E Automation test 

Tradeswell E2E Automation test with smoke package. Tests are created for **staging** and **production** environments.

### Prepare local machine

1. Download and install [Node.js](https://nodejs.org/en/download/)
2. Download and install [Git](https://git-scm.com/download)
3. Download and install [Visual Studio Code](https://code.visualstudio.com/download) or any other JS GUI
4. Install Yarn globally `npm install -g yarn`

### Download and Install

1. Clone repository `git clone git@github.com:tradeswell/tw_e2e_test.git`
2. Go to `tw_e2e_test` folder and install all dependencies `yarn install` `npm install`

### Execute test

Script list:

1.`test` - execute locally on staging  

Every test are located in `test/specs/` folder. Each Tradeswell tab have separate folder (Marketing, Goals etc.). Folder `elements` have only test cases for check displayed elements.

1. Execute all test: `yarn test`
2. Execute test for one tab: `yarn test --spec ./test/specs/goals/`
3. Execute test from one file: `yarn test --spec ./test/specs/goals/goals.js`

### Generate HTML Report

After each failed test screenshots is saved in `/screenshots`
Allure report is generated manually

1. Generate report `yarn reportGenerate`
2. Open report `allure open`
 
### WebdriverIO Reply Interface

For debug purpose WebdriverIO provide [reply Interface](https://webdriver.io/docs/repl.html)

1. Download latest version of [selenium server](https://www.selenium.dev/downloads/)
2. Execute selenium server: `java -jar selenium-server-standalone-<selenium_version>.jar`
3. Execute Repl Interface: `./node_modules/.bin/wdio repl chrome`
