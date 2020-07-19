import { SCREEN } from "./config";

export const env = {
    dev : 'developpement',
    testing : 'test',
    staging : 'stage',
    prod : 'production'
}
export const environment = ( Cypress.env('DEPLOYMENT_ENV') == null ? 'testing' : Cypress.env('DEPLOYMENT_ENV') );
export const URL = env[environment]


/*Cette classe engloble les fonctionnalités pour la page d'acceuil*/
export default class BasePage {


    /*(void) met en pause l'execution des tests pendants x ms
    (int) x : temps en millisecondes
    */ 
    static pause(x){
        cy.wait(x)
    }

    static Sidebar(){
        cy.get('div.sidebar-button.button-open').click()
        BasePage.pause(500)
    }

    static FromSidebarClick(option_name,expr){
        cy.get('div').contains(option_name).click()
        BasePage.pause(1000)
        switch (expr) {
            case 'Companies list':
                cy.get(':nth-child(1) > [style="background-color: gray;"] > a > .hover-pointer-darker > div').click()
                break;

            case 'Register driver':
                cy.get('[href="/drivers/register"] > .hover-pointer-darker > div').click()
                break;

            case 'Drivers location':
                cy.get('[href="/drivers/location"] > .hover-pointer-darker > div').click()
                break;

            case 'Drivers list':
                cy.get('[href="/drivers"] > .hover-pointer-darker > div').click()
                break;

            case 'Shipments List':
                cy.get(':nth-child(5) > [style="background-color: gray;"] > a > .hover-pointer-darker > div').click()
                break;

            case 'E-commerces list':
                cy.get('[href="/ecommerces"] > .hover-pointer-darker').click()
                break;

            case 'Register e-commerce':
                cy.get('[href="/ecommerces/create"] > .hover-pointer-darker > div').click()
                break;

            case 'Fleets list':
                cy.get('[href="/fleets"] > .hover-pointer-darker > div').click()
                break;
            
            case 'Register a fleet':
                cy.get('[href="/fleets/create"] > .hover-pointer-darker').click()
                break;

            case 'Tasks':
                cy.get(':nth-child(6) > [style="background-color: gray;"] > a > .hover-pointer-darker > div').click()
                //cy.get('a[href="/tasks"]').click()
                break;

            case 'Available Trips':
                cy.get('[href="/trips"] > .hover-pointer-darker').click()
                break;
     
            case 'Trip list':
                cy.get('[href="/trips_list"] > .hover-pointer-darker > div').click()
                break;

            case 'Users list':
                cy.get('[href="/users"] > .hover-pointer-darker > div').click()
                break;

            case 'Create user':
                cy.get('[href="/users/create"] > .hover-pointer-darker > div').click()
                break;
            
            case 'Vendors list':
                cy.get('[href="/vendors"] > .hover-pointer-darker').click()
                break;

            case 'Register a vendor':
                cy.get('[href="/vendors/create"] > .hover-pointer-darker').click()
                break;

            default: break;
          }
        BasePage.pause(3500)
        cy.get('div').contains(option_name).click()
        BasePage.CloseSideBar()
    }

    static CloseSideBar(){
        cy.get('div.sidebar-button.button-close.hover-pointer-brighter').click()
        BasePage.pause(500)
    }

    static Screenshot(name){
        if (SCREEN === true){
            cy.screenshot(name)
        }
    }

}