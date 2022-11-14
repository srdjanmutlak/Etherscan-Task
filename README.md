# Etherscan-Task
Testing registration form at https://etherscan.io/register . Test scenario done in TestLink, automation done in Cypress - 2 solutions, one by using Page Object Model, second solution done by using custom made commands and JS code for simplification.

*Two solutions are done on two different devices with two different Cypress versions.


Notes and suggestions on potential automation process are in TestLink document. Download and read it, because Git might not support some font changes that were done recently.


//  take notice: solveGoogleReCAPTCHA only exists in Custom commands solution. Usage of realHover also exists only in Custom commands solution. Login test is the last test in testingRegisterPage.
***
***
Few useful notes on Custom commands solution:

Some input fields have similar selectors that can be used for custom commands that can shorten the code.
For example:

 Cypress.Commands.add('getInputTypes', (value) => {
 return cy.xpath(`//input[@type='${value}']`)
 })

cy.getInputTypes('password').then(els => {
[...els].forEach(el => cy.wrap(el).type('PassExample1'));
})
 
This is used to write same password in both Password and Confirm Password fields. Same can be done with email input fields.
***
cy.realHover (cypress-real-events)     // This is used to confirm hovered CSS visuals.

Also:

cy.request(links.prop('href'))
.its('status')
.should('eq', 200)          // This is used to check if links are up and live at the moment.
***
Xpath is also used to create custom simplification. For example:

Cypress.Commands.add('getButtonOrLinkByText', (value) => {
return cy.xpath(`//a[.='${value}']`)
})

We use this in commands, and later on in the test as:

cy.getButtonOrLinkByText("Sign Out").should('be.visible')
***
Several behaviors of the app are conflicting as you will see in automation process and in manual execution notes.
