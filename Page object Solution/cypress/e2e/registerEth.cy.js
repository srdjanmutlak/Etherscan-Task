/// <reference types="Cypress" />

import { shipout } from "../page_objects/registerObject";
import { faker } from '@faker-js/faker';
import { general } from "../page_objects/general";
import data from '../fixtures/data.json'

const fakedData = {
    userName: faker.name.firstName(12),
    email: faker.internet.email(),
    password: faker.datatype.string(12),
    tooShortPassword: faker.datatype.string(2),
}

describe ("Register Etherscan - testing positive and negative test cases POM", () => {

    beforeEach ( () => {
        cy.visit ('https://etherscan.io/register')
        cy.url().should('contain', 'https://etherscan.io/register')
        general.headerTitle.should('be.visible')
        .and('contain', data.header.registerNewAccount)

    })
    
	it ('tests a negative test case -  register with all empty fields ', () => {
        shipout.register ('{backspace}', '{backspace}', '{backspace}', '{backspace}', '{backspace}');
        general.errorMessageUserName.should('be.visible')
        .and('have.text', 'Username is invalid.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
		general.errorMessageValidEmaillAdress.should('be.visible')
        .and('have.text' , 'Please enter a valid email address.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
		general.errorMessageConfirmEmaillAdress.should('be.visible')
        .and('have.text' , 'Please re-enter your email address.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
		general.errorMessagePassword.should('be.visible')
        .and('have.text' , 'Your password must be at least 5 characters long.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
		general.errorMessagePasswordConfirm.should('be.visible')
        .and('have.text' , 'Your password must be at least 5 characters long.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
		general.errorMessageTermsAndConditions.should('be.visible')
        .and('have.text' , 'Please accept our Terms and Conditions.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
		
    it ('tests a negative test case -  register with empty user name field ', () => {
        shipout.register ('{backspace}', fakedData.email, fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageUserName.should('be.visible')
        .and('have.text', 'Username is invalid.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
    })

    it ('tests a negative test case -  register with empty email adress field ', () => {
        shipout.register (fakedData.userName, '{backspace}', fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageValidEmaillAdress.should('be.visible')
        .and('have.text' , 'Please enter a valid email address.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
    })

    it ('tests a negative test case -  register with empty Confirm email adress field ', () => {
        shipout.register (fakedData.userName, fakedData.email, '{backspace}', fakedData.password, fakedData.password);
        general.errorMessageConfirmEmaillAdress.should('be.visible')
        .and('have.text' , 'Please re-enter your email address.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
    })

    it ('tests a negative test case -  register with empty password field ', () => {
        shipout.register(fakedData.userName, fakedData.email, fakedData.email, '{backspace}', fakedData.password);
        general.errorMessagePassword.should('be.visible')
        .and('have.text' , 'Your password must be at least 5 characters long.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
        
    })

    it ('tests a negative test case -  register with empty confirm password field ', () => {
        shipout.register (fakedData.userName, fakedData.email, fakedData.email, fakedData.password, '{backspace}');
        general.errorMessagePasswordConfirm.should('be.visible')
        .and('have.text' , 'Your password must be at least 5 characters long.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
    } )

    it ('tests a negative test case -  register while leaving i agree Terms And Conditions unchecked ', () => {
        shipout.registerWithoutTermsAndCondtions(fakedData.userName, fakedData.email, fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageTermsAndConditions.should('be.visible')
        .and('have.text' , 'Please accept our Terms and Conditions.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
    });

    it ('tests a negative test case -  register while leaving reCAPTCHA unchecked ', () => {
        shipout.registerWithoutReCAPTCHA(fakedData.userName, fakedData.email, fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageCaptcha.should('be.visible')
        .and('have.text' , 'Error! Invalid captcha response.  Please Try Again')
        .and('have.css' , 'color', 'rgb(115, 35, 29)')
    })

    it ('tests a negative test case -  register with short Username less than 5 chars ', () => {
        shipout.register ('aaaa', fakedData.email, fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageUserName.should('be.visible')
        .and('have.text' , 'Username is invalid.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
    });

    it ('tests a negative test case -  register with Username that has more than 30 chars ', () => {
        shipout.registerForPotentialCssFail ('aaaaasssssaaaaasssssaaaaasssss1', fakedData.email, fakedData.email, fakedData.password, fakedData.password);
		shipout.userName.should('be.visible')
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
            .and('have.value', 'aaaaasssssaaaaasssssaaaaasssss')         //it shows only 30 chars
    })

    it ('tests a negative test case -  register with @ plus alphanumeric chars in Username ', () => {
        shipout.register ('aaaa@' , fakedData.email, fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageUserName.should('be.visible')
        .and('have.text' , 'Username is invalid.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')  
    })
	
	it ('tests a negative test case -  register with empty space between chars in user name field ', () => {
        shipout.register ('aaaaaa a', fakedData.email, fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageUserName.should('be.visible')
        .and('have.text', 'Username is invalid.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
    })

    it ('tests a negative test case -  register with non-latin Username ', () => {
        shipout.register ('Мирослав' , fakedData.email, fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageUserName.should('be.visible')
        .and('have.text' , 'Username is invalid.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')       
    })

    it ('tests a negative test case -  register with invalid email format field', () => {
        shipout.register(fakedData.userName, 'bebop@bebop.', fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageValidEmaillAdress.should('be.visible')
        .and('have.text' , 'Please enter a valid email address.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)') 
    })
	
	it ('tests a negative test case -  register with invalid email format field, a space in between', () => {
        shipout.register(fakedData.userName, 'bebop @gmail.com', fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageValidEmaillAdress.should('be.visible')
        .and('have.text' , 'Please enter a valid email address.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)') 
    })
	
	it ('tests a negative test case -  register with invalid email format field 2', () => {
        shipout.register(fakedData.userName, 'p@g', 'p@g', fakedData.password, fakedData.password);
        general.errorMessageValidEmaillAdress.should('be.visible')
        .and('have.text' , 'Please enter a valid email address.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)')              //This test fails. Message for incorrect email appears in a different place.
    })

    it('tests a negative test case -  register with adequate form, email does not match ', () => {
        shipout.register (fakedData.userName, 'bebop@gmail.com', 'bebopA@gmail.com', fakedData.password, fakedData.password)
        general.errorMessageConfirmEmaillAdress.should('be.visible')
        .and('have.text' , 'Email address does not match.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)') 
    });
	
    it ('tests a negative test case -  register with Email that has 101 chars ', () => {
        shipout.registerForPotentialCssFail (fakedData.userName, "GDT6cl9H8qhtrV2Bj4tP753bAcfoeST2qKjwPtx6Z1ZAyOOhVuIAvpFOqn6EqJlAyPZBgZ4VLVZKTqb2is6JrtppSHI9oLXpCVzp+", "GDT6cl9H8qhtrV2Bj4tP753bAcfoeST2qKjwPtx6Z1ZAyOOhVuIAvpFOqn6EqJlAyPZBgZ4VLVZKTqb2is6JrtppSHI9oLXpCVzp+", fakedData.password, fakedData.password);
		shipout.emailAdress.should('be.visible')
            .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')
            .and('have.value', "GDT6cl9H8qhtrV2Bj4tP753bAcfoeST2qKjwPtx6Z1ZAyOOhVuIAvpFOqn6EqJlAyPZBgZ4VLVZKTqb2is6JrtppSHI9oLXpCVzp")         //it shows only 100 chars
			
		shipout.confirmEmaillAdress.should('be.visible')
            .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')
            .and('have.value', "GDT6cl9H8qhtrV2Bj4tP753bAcfoeST2qKjwPtx6Z1ZAyOOhVuIAvpFOqn6EqJlAyPZBgZ4VLVZKTqb2is6JrtppSHI9oLXpCVzp")         //it shows only 100 chars
    })
	
	it ('tests a negative test case -   confirm that max length is 75 chars in both password fields and confirm that password are hidden while being typed ', () => {
        shipout.password.type ("c7kDXh0CyW1wMR1WbZSgCzallSZsLCvWgrRpCzDphFRVBaLjcBTrEbVAOTQX3pk8qvZtMcyffUpH");       //type in 76 chars
		shipout.password.should('be.visible')
            .and('have.value', 'c7kDXh0CyW1wMR1WbZSgCzallSZsLCvWgrRpCzDphFRVBaLjcBTrEbVAOTQX3pk8qvZtMcyffUp')    //it shows only 75 chars
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')  
			.and('have.attr', 'type', 'password')          //input type is password - password is hidden while being typed
			
		shipout.confirmPassword.type ("c7kDXh0CyW1wMR1WbZSgCzallSZsLCvWgrRpCzDphFRVBaLjcBTrEbVAOTQX3pk8qvZtMcyffUpH");   //type in 76 chars
		shipout.confirmPassword.should('be.visible')
            .and('have.value', 'c7kDXh0CyW1wMR1WbZSgCzallSZsLCvWgrRpCzDphFRVBaLjcBTrEbVAOTQX3pk8qvZtMcyffUp')    //it shows only 75 chars
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')    
			.and('have.attr', 'type', 'password')          //input type is password - password is hidden while being typed
			
    })

    it('tests a negative test case -  register with password that is less than 5 chars ', () => {
        shipout.register (fakedData.userName, fakedData.email, fakedData.email, fakedData.tooShortPassword, fakedData.tooShortPassword);
        general.errorMessagePassword.should('be.visible')
        .and('have.text' , 'Your password must be at least 5 characters long.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)') 
		
		general.errorMessagePasswordConfirm.should('be.visible')
        .and('have.text' , 'Your password must be at least 5 characters long.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)') 
    });
	
	it('tests a positive test case -  register with password that is 5 chars long ', () => {
        shipout.register (fakedData.userName, fakedData.email, fakedData.email, '12345', '12345');
        general.registrationHasBeenSubmittedMessage.should('be.visible')
        .and('contain' , 'Your account registration has been submitted and is pending email verification')    //This fails. Message appears informing us that we need a longer password(6 chars). 
    });

    it('tests a negative test case -  register with confirm password field different than password field ', () => {
        shipout.register (fakedData.userName , fakedData.email, fakedData.email, fakedData.password, faker.datatype.string(8));
        general.errorMessagePasswordConfirm.should('be.visible')
        .and('have.text' , 'Password does not match, please check again.')
        .and('have.css' , 'color', 'rgb(222, 68, 55)') 
    })
	
	it('tests a positive test case, password strength div - colors, adeqacy ', () => {
        shipout.password.type ('1234567');
        general.weakStrengthMessagePasswordConfirm.should('have.text', 'Strength: Weak!')
            .and('have.css' , 'color', 'rgb(219, 154, 4)')
			
		shipout.password.clear().type ("zccSDAF2DDSD");
        general.mediumStrengthMessagePasswordConfirm.should('have.text', 'Strength: Medium!')
            .and('have.css' , 'color', 'rgb(165, 42, 42)')
			
		shipout.password.clear().type ("$V5mcC)VbN)gn75Q");
        general.strongStrengthMessagePasswordConfirm.should('have.text', 'Strength: Strong!')
            .and('have.css' , 'color', 'rgb(0, 201, 167)')
    })
	
	it('tests a negative test case -  register with adequate green css form, turns out that email does not have an adequate form after all ', () => {
        shipout.register (fakedData.userName, 'p@g', 'p@g', fakedData.password, fakedData.password)   
        general.errorMessageAfterCssFail.should('be.visible')
        .and('have.text' , 'Invalid email format. p@g')) 
    });
	
	it('tests a negative test case -  register with adequate green css form, turns out that password does not have an adequate form after all ', () => {
        shipout.register (fakedData.userName, fakedData.email, fakedData.email, '12345', '12345')
        general.errorMessageAfterCssFail.should('be.visible')
        .and('have.text' , 'Password too short. Minimum of 6 characters required')) 
    });
	
	it('tests a negative test case -  register with adequate green css form, turns out that username already exists ', () => {
        shipout.register ('bebop' , fakedData.email, fakedData.email, fakedData.password, fakedData.password);
        general.errorMessageAfterCssFail.should('be.visible')
        .and('have.text' , 'Sorry! The username you entered is already in use.')) 
    });


    it('tests a positive test case - register using adequate data, populate all requiered fields ', () => {
        shipout.register (fakedData.userName , fakedData.email, fakedData.email, fakedData.password, fakedData.password);
		general.registrationHasBeenSubmittedMessage.should('be.visible')
        .and('contain' , 'Your account registration has been submitted and is pending email verification')
    });
	
	it('tests a negative test case that is currently positive - register using p@g for email, 12345 for password ', () => {
        shipout.registerForPotentialCssFail (fakedData.userName , 'p@g', 'p@g', '12345', '12345');    //this test could be useful later on, after we fix the bugs
		
		shipout.emailAdress.should('be.visible')
        .and('have.css' , 'border-color', 'rgb(222, 68, 55)')
        .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
		
		shipout.confirmEmaillAdress.should('be.visible')
        .and('have.css' , 'border-color', 'rgb(222, 68, 55)')
        .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
		
		shipout.password.should('be.visible')
        .and('have.css' , 'border-color', 'rgb(222, 68, 55)')
        .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
		
		shipout.confirmPassword.should('be.visible')
        .and('have.css' , 'border-color', 'rgb(222, 68, 55)')
        .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')     //colors are reversed
		
    // this fails, and it should not fail. When we enable final registration clicks, warning message appears informing us that our email form is invalid
    });

    it('tests a positive test case - register using adequate data, populate all requiered fields and check CSS color ', () => {
        shipout.registerForPotentialCssFail (fakedData.userName , fakedData.email, fakedData.email, fakedData.password, fakedData.password);     //we use registerForPotentialCssFail for testing visuals also
		shipout.allInputForms.should('be.visible')
		.and('have.length', 5)
		.and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')   //green
    });
	
	it('tests a negative test case - register using inadequate data, populate all requiered fields and check CSS color ', () => {
        shipout.registerForPotentialCssFail ('1' , '1', '1', '1', '1');
		shipout.allInputForms.should('be.visible')
		.and('have.length', 5)
		.and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')    //red
    });
	
	it('tests a negative test case that is currently positive - password fields should not accept empty space + chars + empty space ', () => {
        shipout.registerForPotentialCssFail (fakedData.userName , fakedData.email, fakedData.email, '               1   ', '               1   ');
		
		shipout.password.should('be.visible')
        .and('have.css' , 'border-color', 'rgb(222, 68, 55)')
        .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
		
		shipout.confirmPassword.should('be.visible')
        .and('have.css' , 'border-color', 'rgb(222, 68, 55)')
        .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')     //colors are reversed
		
    // this fails, and it should not fail. When we enable final registration clicks, warning message appears informing us that password is too short
    });
	
	it('tests a negative test case - password fields accept empty space + chars + empty space, css border color turns green, later we get a warning message ', () => {
        shipout.register (fakedData.userName , fakedData.email, fakedData.email, '               1   ', '               1   ');
		
		general.errorMessageAfterCssFail.should('be.visible')
        .and('have.text' , 'Password too short. Minimum of 6 characters required'))
    });





} )