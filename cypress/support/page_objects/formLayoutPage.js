
export class FormLayoutPage{
  
  submitLogInFormWithEmailAndPassword(email, password){
    cy.get('[placeholder="Please Enter Your Email"]')
      .type(email);
    cy.get('[placeholder="Please Enter Your Password"]')
      .type(password);
    cy.get('[type="submit"]')
      .click();
  }

}

export const formLayoutPage = new FormLayoutPage();