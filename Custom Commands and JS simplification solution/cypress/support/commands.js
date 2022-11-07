// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Example of Custom Command

//
//     
//     
//     
//     -------------------Trace Labs commands start from here--------------------
//     
//     
//  
//   

Cypress.Commands.add("clickRecaptcha", () => {
    cy.window().then(win => {
      win.document
        .querySelector("iframe[src*='recaptcha']")
        .contentDocument.getElementById("recaptcha-token")
        .click();
    });
  });

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

Cypress.Commands.add('getDivByText', (value) => {
    return cy.xpath(`//div[.='${value}']`)
})

Cypress.Commands.add('getSpanByText', (value) => {
    return cy.xpath(`//span[.='${value}']`)
})
  
Cypress.Commands.add('getInputTypes', (value) => {
    return cy.xpath(`//input[@type='${value}']`)
})

Cypress.Commands.add('registerEtherscan', (username, email, confirmEmail, password, confirmPassword,) => {
    cy.visit('https://etherscan.io/register')

    cy.get('#ContentPlaceHolder1_txtUserName')
        .clear()
        .type(username)

    cy.get('#ContentPlaceHolder1_txtEmail')
        .clear()
        .type(email)

    cy.get('#ContentPlaceHolder1_txtConfirmEmail')
        .clear()
        .type(confirmEmail)

    cy.get('#ContentPlaceHolder1_txtPassword')
        .clear()
        .type(password)

    cy.get('#ContentPlaceHolder1_txtPassword2')
        .clear()
        .type(confirmPassword)
        
    cy.get('#ContentPlaceHolder1_MyCheckBox')
        .click({force: true})

    cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
        .click({force: true})

    cy.solveGoogleReCAPTCHA()

    cy.get('#ContentPlaceHolder1_btnRegister')
        .click()
});

Cypress.Commands.add('registerEtherscanForVisualTest', (username, email, confirmEmail, password, confirmPassword,) => {
    cy.visit('https://etherscan.io/register')

    cy.get('#ContentPlaceHolder1_txtUserName')
        .clear()
        .type(username)

    cy.get('#ContentPlaceHolder1_txtEmail')
        .clear()
        .type(email)

    cy.get('#ContentPlaceHolder1_txtConfirmEmail')
        .clear()
        .type(confirmEmail)

    cy.get('#ContentPlaceHolder1_txtPassword')
        .clear()
        .type(password)

    cy.get('#ContentPlaceHolder1_txtPassword2')
        .clear()
        .type(confirmPassword)
     /*   
    cy.get('#ContentPlaceHolder1_MyCheckBox')
        .click({force: true})

    cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
        .click({force: true})

    cy.solveGoogleReCAPTCHA()
    */
    cy.get('#ContentPlaceHolder1_btnRegister')
        .click()
});

Cypress.Commands.add('registerEtherscanAllfieldsBlank', (username, email, confirmEmail, password, confirmPassword,) => {
    cy.visit('https://etherscan.io/register')

    cy.get('#ContentPlaceHolder1_txtUserName')
        .clear()
        .click()

    cy.get('#ContentPlaceHolder1_txtEmail')
        .clear()
        .click()

    cy.get('#ContentPlaceHolder1_txtConfirmEmail')
        .clear()
        .click()

    cy.get('#ContentPlaceHolder1_txtPassword')
        .clear()
        .click()

    cy.get('#ContentPlaceHolder1_txtPassword2')
        .clear()
        .click()
    /*    
    cy.get('#ContentPlaceHolder1_MyCheckBox')
        .click({force: true})

    cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
        .click({force: true})

    cy.solveGoogleReCAPTCHA()
    */
    cy.get('#ContentPlaceHolder1_btnRegister')
        .click()
});

Cypress.Commands.add('registerEtherscanWithoutVisit', (username, email, confirmEmail, password, confirmPassword,) => {

    cy.get('#ContentPlaceHolder1_txtUserName')
        .clear()
        .type(username)

    cy.get('#ContentPlaceHolder1_txtEmail')
        .clear()
        .type(email)

    cy.get('#ContentPlaceHolder1_txtConfirmEmail')
        .clear()
        .type(confirmEmail)

    cy.get('#ContentPlaceHolder1_txtPassword')
        .clear()
        .type(password)

    cy.get('#ContentPlaceHolder1_txtPassword2')
        .clear()
        .type(confirmPassword)
        
    cy.get('#ContentPlaceHolder1_MyCheckBox')
        .click({force: true})

    cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
        .click({force: true})

    cy.solveGoogleReCAPTCHA()

    cy.get('#ContentPlaceHolder1_btnRegister')
        .click()
});

Cypress.Commands.add('registerEtherscanShort', (username, sameEmails, samePasswords, ) => {

    cy.get('#ContentPlaceHolder1_txtUserName')
        .clear()
        .type(username)

    cy.getInputTypes('email').then(els => {
  [...els].forEach(el => cy.wrap(el).type(sameEmails));
	})
	
	cy.getInputTypes('password').then(els => {
  [...els].forEach(el => cy.wrap(el).type(samePasswords));
	})
        
    cy.get('#ContentPlaceHolder1_MyCheckBox')
        .click({force: true})

    cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
        .click({force: true})
		
    cy.solveGoogleReCAPTCHA()
		
	cy.get('#ContentPlaceHolder1_btnRegister')
        .click()
});

Cypress.Commands.add('registerEtherscanAllTheFieldsSameValue', (oneCharacter, ) => {
	
    cy.visit('https://etherscan.io/register')
    
    cy.get('.form-control.form-control-sm').then(els => {
  [...els].forEach(el => cy.wrap(el).type(oneCharacter));
	})
    /*     
    cy.get('#ContentPlaceHolder1_MyCheckBox')
        .click({force: true})

    cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
        .click({force: true})
		
    cy.solveGoogleReCAPTCHA()
	*/ 
	cy.get('#ContentPlaceHolder1_btnRegister')
        .click()
});

Cypress.Commands.add('registerEtherscanShortForVisuals', (username, sameEmails, samePasswords, ) => {

    cy.get('#ContentPlaceHolder1_txtUserName')
        .clear()
        .type(username)

    cy.getInputTypes('email').then(els => {
  [...els].forEach(el => cy.wrap(el).type(sameEmails));
	})
	
	cy.getInputTypes('password').then(els => {
  [...els].forEach(el => cy.wrap(el).type(samePasswords));
	})
     /*   
    cy.get('#ContentPlaceHolder1_MyCheckBox')
        .click({force: true})

    cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
        .click({force: true})
		
	cy.solveGoogleReCAPTCHA()
	*/
	cy.get('#ContentPlaceHolder1_btnRegister')
        .click()
});

Cypress.Commands.add('registerEtherscanShort2', (username, sameEmails, samePasswords, ) => {

    cy.visit('https://etherscan.io/register')

    cy.get('#ContentPlaceHolder1_txtUserName')
        .clear()
        .type(username)

    cy.getInputTypes('email').then(els => {
  [...els].forEach(el => cy.wrap(el).type(sameEmails));
	})
	
	cy.getInputTypes('password').then(els => {
  [...els].forEach(el => cy.wrap(el).type(samePasswords));
	})
        
    cy.get('#ContentPlaceHolder1_MyCheckBox')
        .click({force: true})

    cy.get('#ContentPlaceHolder1_SubscribeNewsletter')
        .click({force: true})
		
    cy.solveGoogleReCAPTCHA()
		
	cy.get('#ContentPlaceHolder1_btnRegister')
        .click()
});

Cypress.Commands.add('getButtonOrLinkByText', (value) => {
    return cy.xpath(`//a[.='${value}']`)
  })
  
  Cypress.Commands.add('loginEtherscan', (username, password) => {

    cy.visit("https://etherscan.io/login")
  
      cy.get('#ContentPlaceHolder1_txtUserName')
          .clear()
          .type(username)
  
      cy.get('#ContentPlaceHolder1_txtPassword')
          .clear()
          .type(password)
  
      cy.solveGoogleReCAPTCHA()
          
      cy.get('#ContentPlaceHolder1_btnLogin')
          .click()
  });

Cypress.Commands.add('getReCAPTCHAerrorText', () => {
    cy.get('.g-recaptcha *> iframe')
      .then($iframe => {
        const $body = $iframe.contents().find('body');
        cy.wrap($body)
          .find('.rc-anchor-error-msg', { timeout: 100000 })
          .should('be.visible')
          .and('have.text', 'Verification expired. Check the checkbox again.')
      });
  });


require('cypress-iframe');

import 'cypress-file-upload';

import '@4tw/cypress-drag-drop'

import "cypress-real-events/support";


