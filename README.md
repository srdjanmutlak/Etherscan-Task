# Etherscan-Task
Testing registration form. Test scenario done in TestLink, automation done in Cypress - 2 solutions, one in Page Object, second solution done by using custom made commands and JS code for simplification.

*Two solutions are done on two different devices with two different Cypress versions.


Notes and suggestions on potential automation process are in TestLink document. Download and read it, because Git might not support some changes that were being made in it.


//  take notice: solveGoogleReCAPTCHA only exists in Custom commands solution. Usage of realHover also exists only in Custom commands solution.

Cypress.Commands.add('solveGoogleReCAPTCHA', () => {
    // Wait until the iframe (Google reCAPTCHA) is totally loaded
    cy.wait(500);
    cy.get('.g-recaptcha *> iframe')
      .then($iframe => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .find('.recaptcha-checkbox-border')
          .should('be.visible')
          .click();
      });
  });
