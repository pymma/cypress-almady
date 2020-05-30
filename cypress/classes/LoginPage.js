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
        cy.get('button.btn.btn-outline-info').contains('Sign in').click()
        BasePage.pause(1000)
    }


    /*logout from the current log account*/
    static logout(){
        cy.get('svg.hover-pointer-brighter').click()
        cy.get('h3').should('contain','Sign in')
    }

    /*Delete the current log account*/
    static DeleteAccout(){}

    /*Create an account for a user*/
    static createAccout(){}

}