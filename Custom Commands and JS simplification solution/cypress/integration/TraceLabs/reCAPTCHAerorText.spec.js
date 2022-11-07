describe('Testing reCAPTCHA', () => {
	
	before(() => {

        cy.intercept("GET", "https://www.recaptcha.net/recaptcha/api2/anchor").as("reCAPTCHAreloaded")
		
		cy.intercept("GET", "https://www.gstatic.com/recaptcha/api2/logo_48.png").as("reCAPTCHAlogo")

      })
	
    it('tests a negative test case, reCAPTCHA expires after clicking on it and we get a warning message after', () => {
		
		cy.visit('https://etherscan.io/register')
		
        cy.solveGoogleReCAPTCHA()     
		
	//	cy.wait("@reCAPTCHAreloaded", { timeout: 100000 })    //wait one minute to catch the text (this test is separated because it take 1 minute to reload reCAPTCHA)
        
        cy.getReCAPTCHAerrorText()

      //  getReCAPTCHAerrorText('Verification expired. Check the checkbox again.')
    })
})
