describe('Testing visuals on Etherscan register page', () => {
    it('tests positive and negative test cases, red and green feedback on input form control, invalid feedback text, placeholder texts and it checks if passwords are hidden', () => {
		
        cy.visit('https://etherscan.io/register')
        
        cy.get("#ContentPlaceHolder1_txtUserName")
        .should('have.attr', 'placeholder', 'Username has to be from 5 to 30 characters in length, only alphanumeric characters allowed.')
        
		cy.getInputTypes("email")
        .should('have.attr', 'placeholder', 'A confirmation code will be sent to this address')
        .and('have.length', 2)
        .eq(1)
        .should('have.attr', 'placeholder', 'Re-enter your email address')
        
		cy.getInputTypes("password")                   
        .should('have.attr', 'placeholder', '******')
        .and('have.attr', 'type', 'password')          //input type is password - password is hidden while being typed
        .and('have.length', 2)
        
        // I use [...els] that converts Cypress array to normal array, so that I can forEach(email,password) in commands.js
        // So I use 2 input fields (email and password) to write in them the same word
        cy.registerEtherscanShortForVisuals('1','1','1')    
        
        cy.get(".form-control.form-control-sm")
        .should('be.visible')
        .and('have.length', 5)
        .and('have.css' , 'border-color', 'rgba(222, 68, 55, 0.5)')

        cy.get(".invalid-feedback")
        .should('be.visible')
        .and('have.length', 6)
        .and('have.css' , 'color', 'rgb(222, 68, 55)')

        cy.registerEtherscanShortForVisuals('BabyBlue','crickets@gmail.com','$V5mcC)VbN)gn75Q')      
        
        cy.get(".form-control.form-control-sm")
        .should('be.visible')
        .and('have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')

    })

    it('tests a negative test case, email should not accept suggested form and input form control border color does not turn green', () => {
		
    
        cy.registerEtherscanShort2('BabyBlue','crickets@1','$V5mcC)VbN)gn75Q')      
    
        cy.getInputTypes("email")
        .should('be.visible')
        .and('have.css' , 'border-color', 'rgb(222, 68, 55)')
        .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
    // this fails, and it should not fail. When we enable clicks on capthca and terms and conditions, warning message appears informing us that our email form is invalid
    })

    it('tests a negative test case, password should not accept 5 chars and input form control border color does not turn green', () => {
		
    
        cy.registerEtherscanShort2('BabyBlue','crickets@gmail.com','12345')     
    
        cy.getInputTypes("password")
        .should('be.visible')
        .and('have.css' , 'border-color', 'rgb(222, 68, 55)')
        .and('not.have.css' , 'border-color', 'rgba(0, 201, 167, 0.5)')
    // this fails, and it should not fail. When we enable clicks on capthca and terms and conditions, warning message appears informing us that we need at least 6 chars for our password
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

    it('tests if Terms and Conditions and unsubscribe links are live and functional and it also check hovered css color and box shadow', () => {
        
        cy.visit('https://etherscan.io/register')
    
        cy.get(".link-muted").realHover()
        .should('have.length', 2)
        .and('have.css' , 'color', 'rgb(29, 111, 165)')   //changes its css color while hovered

        .then((links) => {

        cy.request(links.prop('href'))
        .its('status')
        .should('eq', 200)
        //we check if 2 for Terms and Conditions and unsubscribe links are up and running 
       })

        cy.get("a")
        .then((links) => {

        cy.request(links.prop('href'))
        .its('status')
        .should('eq', 200)
        //we check if all the links are up and running 

        cy.contains("Click to Sign In").realHover()
        .should('have.css' , 'color', 'rgb(29, 111, 165)')
        // Click to Sign In button changes its css color while hovered
        
        cy.get("#ContentPlaceHolder1_btnRegister").realHover()
        .should('have.css' , 'box-shadow', 'rgba(52, 152, 219, 0.008) 0px 0.0786976px 0.216418px 0px')
        // Create an Account button changes its css box-shadow while hovered

       })
    })
})
