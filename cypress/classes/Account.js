import BasePage from './BasePage'
import { LOGIN_USERNAME,DATA } from './config'

/*
Cette classe engloble les fonctionnalités permmetttant d'agir/visualiser le compte d'un utilisateur courant
*/
export default class Account extends BasePage{

    /*(void) Change le mot de passe 
    (string) current_password : mot de passe courant
    (string) new_password : nouveau mot de passe
    */
    static changePassword(current_password,new_password){
        //recupérer la zone
        BasePage.MonEspace()
        BasePage.pause(500)
        cy.get(':nth-child(1) > moa-header-button.ng-scope > .moa-buttons-general > img').click()
        cy.get('#setting-tab').click()
        //modif des valeurs courantes
        cy.get('#actual-password').type(current_password) 
        cy.get('#password1').type(new_password)    
        cy.get('.settings-form > .button').click()
        BasePage.pause(300)
    }

    /*(void) Change l'avatar et verifie qu'il a bien été changé*/
    static verify_Change_Avatar(){
        BasePage.MonEspace()
        BasePage.pause(500)
        cy.get(':nth-child(1) > moa-header-button.ng-scope > .moa-buttons-general > img').click()
        cy.get('#setting-tab').click()
        cy.get('span.avatar-img-container.ng-binding.shadow.avatar-unavailable').should('be.visible')
        cy.get('#footer-avatar-name').should('have.attr','alt').should('include','shadow')
        cy.get('.slick-next').click()
        cy.get('span.avatar-img-container.ng-binding.robot.avatar-available').should('be.visible')
        cy.get('span.avatar-img-container.ng-binding.robot.avatar-available').click()
        BasePage.pause(300)
        cy.get('#footer-avatar-name').should('have.attr','alt').should('include','robot')
    }

    /*(void) Verifie les informations du compte selon le paramètre 
    (bool) param : True si informations du compte complète False sinon 
    */
    static verify(param){
        
        var prenom = ''
        var date = ''
        var etablissement = ''
        var code_postal = ''
        var email = ''

        if(param === true){
            prenom = DATA.name
            email = DATA.email
            date = DATA.birthday 
            etablissement = DATA.etablissement
            code_postal = DATA.CodePostal
        }        

        cy.get('#profil-account-name').should('have.value',LOGIN_USERNAME) //pseudo
        cy.get('#profil-link-folio').should('have.value',prenom) //prenom
        cy.get('#profil-civilite-MLLE').should('be.checked') //civilité
        cy.get('.bottom-container').scrollIntoView()
        cy.get('#date-of-birthday').should('have.value',date) //date
        cy.get('[ng-show="profileVm.isVisible.codePostal"] > .typeahead-container > .typeahead > #typeaheadInput').should('have.value',code_postal) //code Postal
        cy.get('[ng-show="profileVm.isVisible.etablissement"] > .typeahead-container > .typeahead > #typeaheadInput').should('have.value',etablissement) //etab
        cy.get('#studentClasse20').should('be.checked') //classe
    }

    /*(void) Remplit le formulaire afin de compléter les informations du compte*/
    static fillTheData(){
        var fill = false
        cy.get('#profil-link-folio').type(DATA.name)
        cy.get('#date-of-birthday').type(DATA.birthday)
        BasePage.pause(300)
        cy.get('.moa-profil').click( {force:true})
        BasePage.pause(500)
        cy.get('[ng-show="profileVm.isVisible.codePostal"] > .typeahead-container > .typeahead > #typeaheadInput').type(DATA.CodePostal)
        cy.get('.moa-profil').click( {force:true})
        cy.get('[ng-show="profileVm.isVisible.etablissement"] > .typeahead-container > .typeahead > #typeaheadInput').as('etabl')
        cy.get('@etabl').type('Collège bay', {delay : 400}).type('{downarrow}{enter}')
        BasePage.pause(800)
        cy.get('.ng-valid-email.ng-valid-pattern > .button').click()
        BasePage.pause(300)
    }
    
    /*(void) complète le formulaire pour la mise en place des suggestions*/
    static completeTheSuggestForm(){
        BasePage.pause(400)
        cy.get(':nth-child(4) > .cocher > .ng-scope').click()
        cy.get('div.ng-scope > .button').click()
        BasePage.pause(700)
        cy.get(':nth-child(5) > .cocher > .ng-scope').click()
        cy.get('div.ng-scope > .button').click()
        BasePage.pause(700)
        cy.get(':nth-child(5) > .cocher > .ng-scope').click()
        cy.get('div.ng-scope > .button').click()
        BasePage.pause(700)
        cy.get(':nth-child(7) > .cocher > .ng-scope').click()
        cy.get('div.ng-scope > .button').click()
        BasePage.pause(700)
        cy.get(':nth-child(5) > .cocher > .ng-scope').click()
        cy.get('div.ng-scope > .button').click()
        BasePage.pause(700)
        cy.get(':nth-child(1) > .cocher > .ng-scope').click()
        cy.get('div.ng-scope > .button').click()
        BasePage.pause(700)
        cy.get('div.ng-scope > .button').click()
    }
}