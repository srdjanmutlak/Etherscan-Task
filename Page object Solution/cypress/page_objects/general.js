class General {
    get headerTitle(){
        return cy.get('h1')
    }

    get errorMessageUserName(){
        return cy.get('div[id="ContentPlaceHolder1_txtUserName-error"]')
    }

    get errorMessageValidEmaillAdress(){
        return cy.get('div[id="ContentPlaceHolder1_txtEmail-error"]')
    }

    get errorMessageConfirmEmaillAdress(){
        return cy.get('div[id="ContentPlaceHolder1_txtConfirmEmail-error"]')
    }

    get errorMessagePassword(){
        return cy.get('div[id="ContentPlaceHolder1_txtPassword-error"]')
    }
    
    get errorMessagePasswordConfirm(){
        return cy.get('div[id="ContentPlaceHolder1_txtPassword2-error"]')
    }
	
	get weakStrengthMessagePasswordConfirm(){
        return cy.get('.text-warning')
    }
	
	get mediumStrengthMessagePasswordConfirm(){
        return cy.get("span[id='passstrength'] span")
    }
	
	get strongStrengthMessagePasswordConfirm(){
        return cy.get('.text-success')
    }
    
    get errorMessageTermsAndConditions(){
        return cy.get('div[id="ctl00$ContentPlaceHolder1$MyCheckBox-error"]')
    }


    get errorMessageCaptcha(){
        return cy.get('#ctl00 > .alert')
    }

    get errorMessageAfterCssFail(){
        return cy.get('div[class="alert alert-danger"]')
    }
	
	get registrationHasBeenSubmittedMessage(){
        return cy.get("div[class='alert alert-info']")
    }
	
	get getTermsAndCondLink(){
        return cy.get("a[href$='/terms']")
    }
	
	get getUnsubscribeLink(){
        return cy.get("a[href='https://info.etherscan.com/how-to-subscribe-unsubscribe-newsletter/']")
    }

}

export const general = new General()
