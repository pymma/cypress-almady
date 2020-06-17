import BasePage from './BasePage'

export const env = {
    dev : 'http://localhost:3000/login',
    testing : 'https://almady.infra.pymma-software.net/',
    staging : 'https://almady.infra.pymma-software.net/',
    prod : ''
}

//en dev pour le moment au final faudra le mettre dans le testing
export const environment = ( Cypress.env('DEPLOYMENT_ENV') == null ? 'dev' : Cypress.env('DEPLOYMENT_ENV') );
export const URL = env[environment]

/*Cette classe engloble les fonctionnalités de base du site*/
export default class LoginPage{



    /*(void) charge la page d'acceuil*/
    static load(){
        cy.visit(URL)
    }

    /*log in a user account*/
    static login(username,password){
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        BasePage.Screenshot()
        cy.get('button.btn.btn-outline-info').contains('Sign in').click()
        BasePage.pause(1000)
    }


    /*logout from the current log account*/
    static logout(){
        cy.get('#dropdown-basic').click()
        cy.get('a').contains('Logout').click()
        cy.get('h3').contains('Sign in').should('be.visible')
        //BasePage.Screenshot()
    }

    /*Delete the current log account*/
    static DeleteAccout(){}

    /*Create an account for a user*/
    static createAccout(){}

    /*generate a random number*/
    static Generate_Number(nb_chiffre){
        let nombre = ''
        for (let index = 0; index < nb_chiffre; index++) {
            let chiffre = Math.floor(Math.random() * 10)
            nombre = nombre + chiffre 
        }
        return nombre
    }

    /*create a driver account from login page based on phone numer*/
    static CreateConfirmDriver(driveNumber){
        cy.get('button.btn.btn-primary').contains('Subscribe').click()
        BasePage.pause(1000)
        cy.get('[placeholder="Enter Your Phone Country Code"]').type("+33")
        cy.get('[placeholder="Enter Your Number Phone"]').type(driveNumber)
        BasePage.pause(1000)
        cy.get('button.btn.btn-primary').contains('Next').click()
        BasePage.pause(1000)
        cy.get('[placeholder="Enter Your Verification Code"]').type(driveNumber)
        cy.get('button.btn.btn-primary').contains('Next').click()
}

}