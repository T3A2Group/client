/// <reference types="cypress" />
import { headerTo } from '../../support/page_objects/headerPage.js';
import { formLayoutPage } from '../../support/page_objects/formLayoutPage.js';

const userUrl = 'http://localhost:4000/api/users';

describe('Admin User Login', () => {
  it('should login as admin user', () => {
    cy.visit('/');
    headerTo.singInPage();
    formLayoutPage.submitLogInFormWithEmailAndPassword('admin@example.com', '123456');
    cy.get(".user_image").should('be.visible');
  })
})

describe('Login Admin User should be able to check their profile', () => {
  it('should go to login page when click profile button', () => {
    cy.get('#username[aria-expanded="false"]').click();
    cy.contains('Profile').click();
    cy.contains('User Profile').should('exist')
  })
})

describe('Admin User should be able to motify users data.', () => {
  it('Admin User should be able to check all users data list', () => {
    cy.get('#adminmenu[aria-expanded="false"]').click();
    cy.contains('Users').click();
    cy.contains('h1','Users').should('exist');
  })

  // it('Admin User should be able to check each user data', () => {
  //   cy.get('[href="/admin/user/62e1cf22d3b326caf90071de/edit"]').click();
  //   cy.contains('h1','Edit User').should('exist');
  // })

  // it('Admin User should be able to modify user data', () => {
  //   cy.contains('Update').click();
  //   cy.contains('h1','Users').should('exist');
  // })
})

describe('Admin User should be able to check all Villas data list', () => {
  it('Admin User should be able to check all villa data list', () => {
    cy.get('#adminmenu[aria-expanded="false"]').click();
    cy.contains('Modify Villas').click();
    cy.contains('h1','Villa List').should('exist');
  })

  it('Admin User should be able to Create new Villas', () => {
    cy.contains('Create Villa').click();
    cy.contains('h1','Edit Villa').should('exist');
  })

  it('Admin User should be able to modify Villa data', () => {
    cy.contains('Update').click();
    cy.contains('h1','Villa List').should('exist');
  })
})

describe('Admin User should be able to check all Foods data list', () => {
  it('Admin User should be able to check all Food data list', () => {
    cy.get('#adminmenu[aria-expanded="false"]').click();
    cy.contains('Modify Food').click();
    cy.contains('h1','Food List').should('exist');
  })

  it('Admin User should be able to Create new Foods', () => {
    cy.contains('Create Food').click();
    cy.contains('h1','Edit Food').should('exist');
  })

  it('Admin User should be able to modify Food data', () => {
    cy.contains('Update').click();
    cy.contains('h1','Food List').should('exist');
  })
})

describe('Admin User should be able to check all Specialty data list', () => {
  it('Admin User should be able to check all Specialties data list', () => {
    cy.get('#adminmenu[aria-expanded="false"]').click();
    cy.contains('Modify Specialties').click();
    cy.contains('h1','Specialty List').should('exist');
  })

  it('Admin User should be able to Create new Specialtiess', () => {
    cy.contains('Create Specialty').click();
    cy.contains('h1','Edit Specialty').should('exist');
  })

  it('Admin User should be able to modify Specialties data', () => {
    cy.contains('Update').click();
    cy.contains('h1','Specialty List').should('exist');
  })
})

describe('Admin User should be able to check all Travel data list', () => {
  it('Admin User should be able to check all Travel data list', () => {
    cy.get('#adminmenu[aria-expanded="false"]').click();
    cy.contains('Modify Travel').click();
    cy.contains('h1','Travel Plan List').should('exist');
  })

  it('Admin User should be able to Create new Travels', () => {
    cy.contains('Create Travel').click();
    cy.contains('h1','Edit Travel').should('exist');
  })

  it('Admin User should be able to modify Travel data', () => {
    cy.contains('Update').click();
    cy.contains('h1','Travel Plan List').should('exist');
  })
})

describe('Admin User should be able to check all Order data list', () => {
  it('Admin User should be able to check all Order data list', () => {
    cy.get('#adminmenu[aria-expanded="false"]').click();
    cy.contains('Orders').click();
    cy.contains('h1','Orders').should('exist');
  })
})

describe('Login User Should be about to logout', () => {
  it('should logout when click logout button', () => {
    cy.get('#username[aria-expanded="false"]').click();
    cy.contains('Logout').click();
    cy.contains('Sign In').should('exist')
  })
})