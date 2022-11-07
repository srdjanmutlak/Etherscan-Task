# Etherscan-Task
Testing registration form. Test scenario done in TestLink, automation done in Cypress - 2 solutions, one in Page Object, second solution done by using custom made commands and JS code for simplification.

*Two solutions are done on two different devices with two different Cypress versions.


Notes and suggestions on potential automation process:

Some input fields have similar selectors that can be used for custom commands that can shorten the code.
For example:
This could be used to write same password in both Password and Confirm Password fields. Same can be done
with email input fields.
***
***
Full registration process is completed for username srdjan123. Login can be also tested to confirm that
whole registration process is working:
***
***
Also:
***
***
Some emails and passwords in test go through the first time (CSS turns green, there is no warning message)
Suggestion: Automate and document both failures and the ones with afterward warning messages as failed
tests and as passed functional tests. Report defects and figure out what solution to choose in the meeting with
developers.
***
***
Xpath could be also used to create custom simplification. For example:
This could be used in commands, and later on in the test as:
but later on it turns out they were too short or it turns out that they have an invalid form.
*(Test Scenario with passed and failed Test cases follows bellow.)
Automate tests in Cypress while using Page Object Model or while using custom Commands.
1.1.Test Suite : Register Etherscan - Suggestions and notes before execution
 Cypress.Commands.add('getInputTypes', (value) => {
 return cy.xpath(`//input[@type='${value}']`)
})
cy.getInputTypes('password').then(els => {
 [...els].forEach(el => cy.wrap(el).type('PassExample1'));
 })
1.Visit https://etherscan.io/login 2. Click into Username input field, enter "srdjan123". 3. Click into Password
input field, enter "1234567". 4. Solve Captcha. 5. Click "LOGIN" button.
Expected result: URL is https://etherscan.io/myaccount ; Sign out button is visible ; Confirmation text is visible:
"Usage of account features such as address watch list, address name tags, and API keys."
cy.realHover (cypress-real-events) could be used to confirm hovered CSS visuals.
cy.request(links.prop('href'))
 .its('status')
 .should('eq', 200) // This could be used to check if links are up and live at the moment.
Cypress.Commands.add('getButtonOrLinkByText', (value) => {
 return cy.xpath(`//a[.='${value}']`)
})
cy.getButtonOrLinkByText("Sign Out").should('be.visible')
