const {Builder, Browser, By } = require('selenium-webdriver');
 
const screen = {
  width: 1920,
  height: 1080
};
 
(async function buttonRender() {
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .build();
 
  try {
    await driver.get('http://localhost:8080');
    let didSendButtonRender = await driver.findElement(By.id('sendbutton')).isDisplayed()
    if (!didSendButtonRender){
      throw new Error(`Send button was not rendered properly.`);
    }
  
  } finally {
    await driver.quit();
  }
})();