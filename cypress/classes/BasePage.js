
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

    static FromSidebarClick(option_name){
        cy.get('div').contains(option_name).click()
        BasePage.pause(700)
    }

    static CloseSideBar(){
        cy.get('div.sidebar-button.button-close.hover-pointer-brighter').click()
        BasePage.pause(500)
    }


}