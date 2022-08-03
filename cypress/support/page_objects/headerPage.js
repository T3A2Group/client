
export class HeaderPage{
  homePage(){
    cy.contains('[class="active navbar-brand"]','Tasmania Resort')
      .click();
  }

  resortPage(){
    cy.contains('[class="nav-link"]',' Resort')
      .click();
  }

  foodPage(){
    cy.contains('[class="nav-link"]',' Food')
      .click();
  }

  specialtyPage(){
    cy.contains('[class="nav-link"]',' Specialties')
      .click();
  }

  travelPage(){
    cy.contains('[class="nav-link"]',' Travel')
      .click();
  }

  cartPage(){
    cy.contains('[class="nav-link"]',' Cart')
      .click();
  }

  singInPage(){
    if(cy.contains('[class="nav-link"]',' Sign In')){
      cy.contains('[class="nav-link"]',' Sign In')
        .click();
    } else {
      return 'no log in button'
    }
  }
}

export const headerTo = new HeaderPage();