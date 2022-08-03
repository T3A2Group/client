/// <reference types="cypress" />
import { headerTo } from '../../support/page_objects/headerPage.js';
import { formLayoutPage } from '../../support/page_objects/formLayoutPage.js';

const userUrl = 'http://localhost:4000/api/users';

describe('User Login', () => {
  it('should login as user', () => {
    cy.visit('/');
    headerTo.singInPage();
    formLayoutPage.submitLogInFormWithEmailAndPassword('test@example.com', '123456');
    cy.get(".user_image").should('be.visible');
  })
})

describe('select item add to cart and check out', () => {
  it('should select food from food page', () => {
    headerTo.foodPage();
    cy.contains('h1', 'Our Restaurant').should('exist');
  });

  it('should check the food details by click image', () => {
    cy.get('.card-img-top').first().parents('a').click({force: true});
    cy.get('h3').should('be.visible');
  })

  it('should add food to cart', () => {
    cy.contains('Add to Cart').click();
    cy.contains('h1', 'Cart').should('exist')
  })

  it('should check out when click check out button', () => {
    cy.contains('Check Out').click();
    cy.contains('h1', 'Shipping').should('exist')
  })

  it('should take the type in as shipping address', () => {
    cy.get('[placeholder="Please Enter Your Address"]').type('test address 1');
    cy.get('[placeholder="Please Enter Your City"]').type('Melbourne');
    cy.get('[placeholder="Please Enter Your Postcode"]').type('1234');
    cy.get('[placeholder="Please Enter Your Country"]').type('Australia');
    cy.contains('button', 'Continue').click();
    cy.contains('h1', 'Payment').should('exist')
  })

  it('should tick the checkbox and continue to payment page', () => {
    cy.contains('PayPal or Credit Card').click({force: true});
    cy.contains('button', 'Continue').click();
    cy.contains('Order Summary').should('exist')
  })

  it('should click the place order button to comfire order', () => {
    cy.contains('button','Place Order').click({force:true});
    cy.contains('Order ID').should('exist')
  })
})

describe('Login User should be able to check their profile', () => {
  it('should go to login page when click profile button', () => {
    cy.get('#username[aria-expanded="false"]').click();
    cy.contains('Profile').click();
    cy.contains('User Profile').should('exist')
  })
})

describe('Login User Should be about to logout', () => {
  it('should logout when click logout button', () => {
    cy.get('#username[aria-expanded="false"]').click();
    cy.contains('Logout').click();
    cy.contains('Sign In').should('exist')
  })
})