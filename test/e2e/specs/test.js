// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .setValue('input[name="totalPayment"]', 2000)
      .setValue('input[name="inputUser"]', 'Mrs.Takaya')
      .click('body')
      .waitForElementVisible('.user-list .list-group-item', 5000)
      .assert.containsText('.user-list li:nth-child(1) .user-info', 'Mrs.Takayaさん 支払額：2000')
      .setValue('input[name="inputUser"]', 'OG-Takaya')
      .click('body')
      // 追加まち
      .waitForElementVisible('.user-list li:nth-child(2) .user-info', 5000)
      .assert.containsText('.user-list li:nth-child(1) .user-info', 'OG-Takayaさん 支払額：1000')
      .end()
  }
}
