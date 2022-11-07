

class registerEtherscan{
    get userName(){
        return cy.get("input[id='ContentPlaceHolder1_txtUserName']")
    }
    
    get emailAdress(){
        return  cy.get("input[id='ContentPlaceHolder1_txtEmail']")
    }

    get confirmEmaillAdress(){
        return cy.get("input[id='ContentPlaceHolder1_txtConfirmEmail']")
    }

    get password(){
        return cy.get("input[id='ContentPlaceHolder1_txtPassword']")
    }

    get confirmPassword(){
        return cy.get("#ContentPlaceHolder1_txtPassword2")
    }

    get termsAndConditionsCheckBox(){
        return cy.get("#ContentPlaceHolder1_MyCheckBox")
    }

    get reCAPTCHAbutton(){
        return cy.get("[style='width: 304px; height: 78px;'] > div > iframe")
    }

    get createAccountButton(){
        return cy.get("input[id='ContentPlaceHolder1_btnRegister']")
    }
	
	get allInputForms(){
        return cy.get(".form-control.form-control-sm")
    }

    register(userName, emailAdress , confirmEmaillAdress, password, confirmPassword){
        this.userName.type(userName);
        this.emailAdress.type(emailAdress);
        this.confirmEmaillAdress.type(confirmEmaillAdress);
        this.password.type(password);
        this.confirmPassword.type(confirmPassword);
        this.termsAndConditionsCheckBox.click({force: true});
        this.reCAPTCHAbutton.click();
        this.createAccountButton.click();
    }



    registerWithoutTermsAndCondtions(userName, emailAdress , confirmEmaillAdress, password, confirmPassword){
        this.userName.type(userName)
        this.emailAdress.type(emailAdress)
        this.confirmEmaillAdress.type(confirmEmaillAdress)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.reCAPTCHAbutton.click()
        this.createAccountButton.click()

    }
    registerWithoutReCAPTCHA(userName, emailAdress , confirmEmaillAdress, password, confirmPassword){
        this.userName.type(userName)
        this.emailAdress.type(emailAdress)
        this.confirmEmaillAdress.type(confirmEmaillAdress)
        this.password.type(password)
        this.confirmPassword.type(confirmPassword)
        this.termsAndConditionsCheckBox.click({force: true})
        this.createAccountButton.click()

    }

	registerForPotentialCssFail(userName, emailAdress , confirmEmaillAdress, password, confirmPassword){
        this.userName.type(userName);
        this.emailAdress.type(emailAdress);
        this.confirmEmaillAdress.type(confirmEmaillAdress);
        this.password.type(password);
        this.confirmPassword.type(confirmPassword);
        this.termsAndConditionsCheckBox.click({force: true});
    }




}
export const shipout = new registerEtherscan()