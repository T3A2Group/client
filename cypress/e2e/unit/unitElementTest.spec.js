

/*
        //by Tag Name
        cy.get('input');

        //by ID
        cy.get('#search-input');

        //by Class Name
        cy.get('.search-input');

        //by attribute Name
        cy.get('[type]');

        //by attribute name and value
        cy.get('[type="text"][name="search"]');

        //by class value
        cy.get('[class="search-input"]');

        //by Tag Name and attribute name and value
        cy.get('input[type="text"][name="search"]');

        //by two different attributes
        cy.get('[type="text"][name="search"]');

        //by tag name, attribute name and value, ID and class name
        cy.get('input[type="text"][name="search"]#search-input.search-input');

        //the most recommended way by cypress
        cy.get('[data-cy="search-input"]');

        cy.contains('[status="warning"]','Submit')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Submit')
            .parents('form')
            .find('nb-checkbox')
            .cleck();


*/

// describe('Our first test', () => {


//     it('Visits the app root url', () => {
//         cy.visit('/');
//         cy.contains(' Sign In').click();

//     })
// })


/// <reference types="cypress" />
import { headerTo } from '../../support/page_objects/headerPage.js';
import { formLayoutPage } from '../../support/page_objects/formLayoutPage.js';

describe('Test NavBar link is correct render to correct pages', () => {

    beforeEach('open application', () => {
        cy.visit('/');
    })

    it('verify navigation across the pages', () => {
        headerTo.homePage();
        headerTo.resortPage();
        headerTo.foodPage();
        headerTo.specialtyPage();
        headerTo.travelPage();
        headerTo.cartPage();
        headerTo.singInPage();   
    })

    it('should open home page when click logo or Tasmania Resort', () => {
        headerTo.homePage();
        cy.contains('h1', 'Popular Villas').should('exist')
    })

    it('should open resort page when click on resort', () => {
        headerTo.resortPage();
        cy.contains('h1', 'Our Villas').should('exist')
    })

    it('should open food page when click on food', () => {
        headerTo.foodPage();
        cy.contains('h1', 'Our Restaurant').should('exist')
    })

    it('should open specialty page when click on specialty', () => {
        headerTo.specialtyPage();
        cy.contains('h1', 'Our Specialties').should('exist')
    })

    it('should open travel page when click on travel', () => {
        headerTo.travelPage();
        cy.contains('h1', 'Our Travel Plans').should('exist')
    })

    it('should open cart page when click on cart', () => {
        headerTo.cartPage();
        cy.contains('h1', 'Cart').should('exist')
    })

    it('should open sign in page when click on sign in', () => {
        headerTo.singInPage();
        cy.contains('h1', 'Sign In').should('exist')
    })
})

describe('Test Login form', () => {

    beforeEach('open application', () => {
        cy.visit('/');
    } )

    it('should pop login success', () => {
        headerTo.singInPage();
        formLayoutPage.submitLogInFormWithEmailAndPassword('test@example.com', '123456');
    })

    it('should pop login fail', () => {
        headerTo.singInPage();
        formLayoutPage.submitLogInFormWithEmailAndPassword('abc@abc.com', '123456');
    })
})