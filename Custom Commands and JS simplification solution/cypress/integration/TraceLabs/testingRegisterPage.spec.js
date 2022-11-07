describe('Testing Etherscan register page', () => {
    it('tests a negative test case, red css color feedback on all inputs and all invalid feedback texts, all fields empty', () => {
        
        //all fields are empty
        cy.registerEtherscanAllTheFieldsSameValue('{backspace}') 
// I use [...els] that converts Cypress array to normal array, so that I can forEach(input form) in commands.js
// So basically I use 5 input fields to write in them the same string of chars
        
        //all form control and invalid feedback have adequate css colors (red)
        cy.get(".form-control.form-control-sm")
        .should('be.visible')
        .and('have.length', 5)
        .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')

        cy.get(".invalid-feedback")
        .should('be.visible')
        .and('have.length', 6)
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
        
        //invalid feedback should be visible bellow all the inputs and bellow Terms and Conditions offer
        cy.get("#ContentPlaceHolder1_txtUserName-error")
        .should('be.visible')
        .and('have.text', 'Username is invalid.')

        cy.get("#ContentPlaceHolder1_txtEmail-error")
        .should('be.visible')
        .and('have.text', 'Please enter a valid email address.')

        cy.get("#ContentPlaceHolder1_txtConfirmEmail-error")
        .should('be.visible')
        .and('have.text', 'Please re-enter your email address.')

        cy.getDivByText("Your password must be at least 5 characters long.")
        .should('be.visible')
        .and('have.length', 2)    //we test both password fields this way
        .and('have.text', 'Your password must be at least 5 characters long.Your password must be at least 5 characters long.')

        cy.getDivByText("Please accept our Terms and Conditions.")
        .should('be.visible')
        .and('have.text', 'Please accept our Terms and Conditions.')

    })

    it('tests a negative test case, red css color feedback on all inputs and all invalid feedback texts, boundary value 1', () => {
        
        //all fields have only one alphanumeric character
        cy.registerEtherscanAllTheFieldsSameValue('1') 
        
        //all form control and invalid feedback have adequate css colors (red)
        cy.get(".form-control.form-control-sm")
        .should('be.visible')
        .and('have.length', 5)
        .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')

        cy.get(".invalid-feedback")
        .should('be.visible')
        .and('have.length', 6)
        .and('have.css' , 'color', 'rgb(222, 68, 55)')
        
        //invalid feedback should be visible bellow all the inputs and bellow Terms and Conditions offer
        cy.get("#ContentPlaceHolder1_txtUserName-error")
        .should('be.visible')
        .and('have.text', 'Username is invalid.')

        cy.get("#ContentPlaceHolder1_txtEmail-error")
        .should('be.visible')
        .and('have.text', 'Please enter a valid email address.')

        cy.get("#ContentPlaceHolder1_txtConfirmEmail-error")
        .should('be.visible')
        .and('have.text', 'Please re-enter your email address.')

        cy.getDivByText("Your password must be at least 5 characters long.")
        .should('be.visible')
        .and('have.length', 2)    //we test both password fields this way
        .and('have.text', 'Your password must be at least 5 characters long.Your password must be at least 5 characters long.')

        cy.getDivByText("Please accept our Terms and Conditions.")
        .should('be.visible')
        .and('have.text', 'Please accept our Terms and Conditions.')

    })

    it('tests input field for Username: Invalid and valid username', () => {

        cy.visit('https://etherscan.io/register')

        //-------------------------------------------------------------------------------
        cy.get('#ContentPlaceHolder1_txtUserName')
            .clear()
            .type('aaaaaaa ')        //space at the end

        cy.get("#ContentPlaceHolder1_txtUserName")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')
        cy.get('#ContentPlaceHolder1_txtUserName-error')
            .should('have.text', 'Username is invalid.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
        //---------------------------------------------------

        //-------------------------------------------------------------------------------
        cy.get('#ContentPlaceHolder1_txtUserName')
            .clear()
            .type('aa aaaaaaaa')        //with space between
        
        cy.get("#ContentPlaceHolder1_txtUserName")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')
        cy.get('#ContentPlaceHolder1_txtUserName-error')
            .should('have.text', 'Username is invalid.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')

        //-------------------------------------------------------------------------------
        cy.get('#ContentPlaceHolder1_txtUserName')
            .clear()
            .type('Мирослав')        //non latin name

        cy.get("#ContentPlaceHolder1_txtUserName")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')
        cy.get('#ContentPlaceHolder1_txtUserName-error')
            .should('have.text', 'Username is invalid.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')

        //-------------------------------------------------------------------------------

        cy.get('#ContentPlaceHolder1_txtUserName')
            .clear()
            .type('aaaa')        //4 chars

        cy.get("#ContentPlaceHolder1_txtUserName")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')
        cy.get('#ContentPlaceHolder1_txtUserName-error')
            .should('have.text', 'Username is invalid.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
        //-------------------------------------------------------------------------------
        cy.get('#ContentPlaceHolder1_txtUserName')
            .clear()
            .type('aaaaa')        //5 chars

        cy.get("#ContentPlaceHolder1_txtUserName")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
        //-------------------------------------------------------------------------------
        cy.get('#ContentPlaceHolder1_txtUserName')
            .clear()
            .type('aaaa@')        //4 chars + something that is not aplhanumeric

        cy.get('#ContentPlaceHolder1_txtUserName-error')
            .should('have.text', 'Username is invalid.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
        //-------------------------------------------------------------------------------
        cy.get('#ContentPlaceHolder1_txtUserName')
            .clear()
            .type('aaaaasssssaaaaasssssaaaaasssss1')        //31 chars

        cy.get("#ContentPlaceHolder1_txtUserName")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
            .and('have.value', 'aaaaasssssaaaaasssssaaaaasssss')         //it shows only 30 chars

        //-------------------------------------------------------------------------------
            //username field empty, all other fields adequatly populated
        cy.registerEtherscanShort2('{backspace}','crickeeets@gmail.com','$V5mcC)VbN)gn75Q') 
// I use [...els] that converts Cypress array to normal array, so that I can forEach(email,password) in commands.js
// So basically I use 2 input fields (email and password) to write in them the same string of chars

        cy.get('#ContentPlaceHolder1_txtUserName-error')
			.should('have.text', 'Username is invalid.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
        //-------------------------------------------------------------------------------
        
        cy.registerEtherscanShort2('bebop','crickeeets@gmail.com','$V5mcC)VbN)gn75Q') 

        cy.getDivByText("Sorry! The username you entered is already in use.")     //entered username is already in use
            .should('have.text', 'Sorry! The username you entered is already in use.')

    })

    it('tests input for both email fields: Invalid and valid emails', () => {

        cy.visit('https://etherscan.io/register')

        cy.getInputTypes('email')
			.eq(0)
            .clear()
            .type('bebop@gmail.com')    

        cy.getInputTypes('email')
			.eq(1)
            .clear()
            .type('bebopA@gmail.com') 

        cy.get('#ContentPlaceHolder1_txtConfirmEmail-error')
            .should('have.text', 'Email address does not match.')  //proper form in second input, email does not match
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
			
        cy.getInputTypes('email')
			.eq(1)
            .type('b@.b') 

        cy.get('#ContentPlaceHolder1_txtConfirmEmail-error')
            .should('have.text', 'Please re-enter your email address.')  //improper form in second input, email does not match
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
        //-------------------------------------------------------------------------------
		
        cy.get('#ContentPlaceHolder1_txtEmail')
            .clear()
            .type('bebopgmail.com')        //no "@"

        cy.get('#ContentPlaceHolder1_txtEmail-error')
            .should('have.text', 'Please enter a valid email address.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
        //-------------------------------------------------------------------------------
		
        cy.get('#ContentPlaceHolder1_txtEmail')
            .clear()
            .realType('bebop @gmail.com')        //a space between

        cy.get('#ContentPlaceHolder1_txtEmail-error')
            .should('have.text', 'Please enter a valid email address.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
        //-------------------------------------------------------------------------------
        
        cy.getInputTypes('email').clear().then(els => {
            [...els].forEach(el => cy.wrap(el).type("@gmail.comsfssfseffeeeeeeeeeeeeeef222@@sfs@gmail.comsfssfseffeeeeeeeeeeeeeef222@@sfs@gmail.eeeeeeeee+"));
              }) 
            //we type 101 chars in both email inputs

        cy.getInputTypes("email")
            .should('be.visible')
			.and('have.length', 2)
			.and('have.value', '@gmail.comsfssfseffeeeeeeeeeeeeeef222@@sfs@gmail.comsfssfseffeeeeeeeeeeeeeef222@@sfs@gmail.eeeeeeeee')    //it shows only 100 chars
            .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')         
			
		cy.getDivByText("Please enter a valid email address.")        //we also test if warning message appeared as it should because there were spaces after .com
			.should('have.text', 'Please enter a valid email address.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
		
		cy.getDivByText("Please re-enter your email address.")
			.should('have.text', 'Please re-enter your email address.')  //this is questionable. invalid email has been entered and repeated adequatly.
            .and('have.css' , 'color', 'rgb(222, 68, 55)')

        //-------------------------------------------------------------------------------
            //both email fields empty, all other fields adequatly populated
        cy.registerEtherscanShort2('bebbopian','{backspace}',"$V5mcC)VbN)gn75Q") 

		cy.getDivByText("Please enter a valid email address.")        
			.should('have.text', 'Please enter a valid email address.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
		
		cy.getDivByText("Please re-enter your email address.")
			.should('have.text', 'Please re-enter your email address.')  
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
        //-------------------------------------------------------------------------------
             //first email field is empty, all other fields adequatly populated
        cy.registerEtherscan('bebbopian','{backspace}','crickeeets@gmail.com','$V5mcC)VbN)gn75Q','$V5mcC)VbN)gn75Q') 

		cy.getDivByText("Please enter a valid email address.")        
			.should('have.text', 'Please enter a valid email address.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
		
		cy.getDivByText("Email address does not match.")
			.should('have.text', 'Email address does not match.')  
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
			
        //-------------------------------------------------------------------------------
             //second email field is empty, all other fields adequatly populated
        cy.registerEtherscan('bebbopian','crickeeets@gmail.com','{backspace}','$V5mcC)VbN)gn75Q','$V5mcC)VbN)gn75Q') 

        cy.get("#ContentPlaceHolder1_txtEmail")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
		
		cy.getDivByText("Please re-enter your email address.")
			.should('have.text', 'Please re-enter your email address.')  
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
    })

    it('tests a negative test case, email field should not accept suggested form but it turns green and later on we get a warning message', () => {
		
        //check visual testing for visual failing of this test
        cy.registerEtherscanShort2('BabyBlue','crickets@1','$V5mcC)VbN)gn75Q')      
    
        cy.getDivByText("Invalid email format. crickets@1")     
            .should('have.text', 'Invalid email format. crickets@1')
    })

    it('tests a negative test case, password fields should not accept 5 chars but it turns green and later on we get a warning message', () => {
		
        //check visual testing for visual failing of this test
        cy.registerEtherscanShort2('BabyBlue','crickets@gmail.com','12345')      
    
        cy.getDivByText("Password too short. Minimum of 6 characters required")     
            .should('have.text', 'Password too short. Minimum of 6 characters required')
    })

    it('tests a positive test case, password Strength div - colors, adeqacy', () => {
		
        cy.visit('https://etherscan.io/register')
        
        //weak password
        cy.getInputTypes('password').then(els => {
            [...els].forEach(el => cy.wrap(el).type('1234567'));
              })

   
        cy.get(".text-warning")     
            .should('have.text', 'Strength: Weak!')
            .and('have.css' , 'color', 'rgb(219, 154, 4)')
        cy.getInputTypes("password") 
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')

        //medium password
        cy.getInputTypes('password').clear().then(els => {
            [...els].forEach(el => cy.wrap(el).type("zccSDAF2DDSD"));
              })

   
        cy.getSpanByText("Strength: Medium!")     
            .should('have.text', 'Strength: Medium!Strength: Medium!') 
            .and('have.length', 2)     //notice! there are two of these, one is hidden
        cy.getInputTypes("password") 
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
        cy.get('#passstrength > span')
        .should('have.text', 'Strength: Medium!') 
        .and('have.css' , 'color', 'rgb(165, 42, 42)')

        //strong password
        cy.getInputTypes('password').clear().then(els => {
            [...els].forEach(el => cy.wrap(el).type("$V5mcC)VbN)gn75Q"));
              })

        cy.getSpanByText("Strength: Strong!")     
            .should('have.text', 'Strength: Strong!Strength: Strong!') 
            .and('have.length', 2)     //notice! there are two of these, one is hidden
        cy.getInputTypes("password") 
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
        cy.get('#passstrength > span')
        .should('have.text', 'Strength: Strong!') 
        .and('have.css' , 'color', 'rgb(0, 201, 167)')


    })

    it('tests a negative test case, password fields should not accept 76 chars', () => {
        
        cy.visit('https://etherscan.io/register')

        cy.getInputTypes('password').clear().then(els => {
            [...els].forEach(el => cy.wrap(el).type("c7kDXh0CyW1wMR1WbZSgCzallSZsLCvWgrRpCzDphFRVBaLjcBTrEbVAOTQX3pk8qvZtMcyffUpH"));
              }) 
            //we type 76 chars in both password inputs

        cy.getInputTypes("password")
            .should('be.visible')
			.and('have.length', 2)
			.and('have.value', 'c7kDXh0CyW1wMR1WbZSgCzallSZsLCvWgrRpCzDphFRVBaLjcBTrEbVAOTQX3pk8qvZtMcyffUp')    //it shows only 75 chars
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)') 
    })

    it('tests a negative test case, password fields should not accept empty space + chars + empty space', () => {
        
        cy.visit('https://etherscan.io/register')

        cy.getInputTypes('password').clear().then(els => {
            [...els].forEach(el => cy.wrap(el).type("               1   "));
              }) 

        cy.getInputTypes("password")
            .should('be.visible')
            .and('have.length', 2)
            .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')
            .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)') //colors are reversed. this one fails
    })

    it('tests a negative test case, password fields should not accept empty space + chars + empty space, this time we populate rest of the fields adequately and we Create an Account ', () => {
        
        cy.registerEtherscanShort2('bebop','crickeeets@gmail.com','               1   ')

        cy.getDivByText("Password too short. Minimum of 6 characters required")     
            .should('have.text', 'Password too short. Minimum of 6 characters required')


    })

    it('tests empty inputs for both password fields: try to register with empty password input(s)', () => {

        //-------------------------------------------------------------------------------
            //both password fields empty, all other fields adequatly populated
        cy.registerEtherscanShort2('bebbopian1','bebop@gmail.com',"{backspace}") 

		cy.getDivByText("Your password must be at least 5 characters long.")        
			.should('have.text', 'Please enter a valid email address.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
            .and('have.length', 2)
		
        //-------------------------------------------------------------------------------
             //first password field is empty, all other fields adequatly populated
        cy.registerEtherscan('bebbopian','crickeeets@gmail.com','crickeeets@gmail.com','{backspace}','$V5mcC)VbN)gn75Q') 

		cy.getDivByText("Your password must be at least 5 characters long.")        
			.should('have.text', 'Your password must be at least 5 characters long.')
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
		
		cy.getDivByText("Password does not match, please check again.")
			.should('have.text', 'Password does not match, please check again.')  
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
			
        //-------------------------------------------------------------------------------
             //second password field is empty, all other fields adequatly populated
        cy.registerEtherscan('bebbopian','crickeeets@gmail.com','crickeeets@gmail.com','$V5mcC)VbN)gn75Q','{backspace}') 

        cy.get("#ContentPlaceHolder1_txtPassword")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
		
		cy.getDivByText("Your password must be at least 5 characters long.")
			.should('have.text', 'Your password must be at least 5 characters long.')  
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
    })
	
	it('tests different inputs for both password fields: try to register with different password input(s)', () => {


        //-------------------------------------------------------------------------------
             //first password field has adequate number of chars but it's input is different than the confirm pasword input by one char, all other fields adequatly populated
        cy.registerEtherscan('bebbopian','crickeeets@gmail.com','crickeeets@gmail.com','$V5mcC)VbN)gn75','$V5mcC)VbN)gn75Q') 

		cy.getSpanByText("Strength: Strong!")     
			.should('have.text', 'Strength: Strong!')
        
		cy.get("#ContentPlaceHolder1_txtPassword")
            .should('be.visible')
            .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
		
		cy.getDivByText("Password does not match, please check again.")
			.should('have.text', 'Password does not match, please check again.')  
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
			
        //-------------------------------------------------------------------------------
             //second password field has adequate number of chars but it's input is different than the first pasword, first input has only 3 chars, all other fields adequatly populated
        cy.registerEtherscan('bebbopian','crickeeets@gmail.com','crickeeets@gmail.com','$V5','$V5mcC)VbN)gn75') 
		
		cy.getDivByText("Your password must be at least 5 characters long.")
			.should('have.text', 'Your password must be at least 5 characters long.')  
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
			
		cy.getDivByText("Password does not match, please check again.")
			.should('have.text', 'Password does not match, please check again.')  
            .and('have.css' , 'color', 'rgb(222, 68, 55)')
    })

    	/*
	
	//account already made
	it('tests a positive test case, register with known data', () => {
		
     
        cy.registerEtherscanShort2('srdjan123','mutlaksrdjan@gmail.com','1234567')      
    
        cy.getDivByText("Your account registration has been submitted and is pending email verification ")     
            .should('have.text', 'Your account registration has been submitted and is pending email verification ')
    })
	*/
	
	it('tests a positive test case, we login with previusly noted credentials', () => {
		
        cy.loginEtherscan('srdjan123','1234567')      
    
        cy.url().should('eq', 'https://etherscan.io/myaccount')
		
		cy.getButtonOrLinkByText("Sign Out").should('be.visible')
		
		cy.getDivByText("Usage of account features such as address watch list, address name tags, and API keys.")     
            .should('have.text', 'Usage of account features such as address watch list, address name tags, and API keys.')
    })

})
