import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'
import store from "../store"
import Header from '../components/Header'

describe("The Header component", () => {
    const setup = () => {
        render(<Provider store={store}>
                <Router>
                    <Header />
                </Router>
            </Provider>)
    }
    
    it('should display the brand Tasmania Resort', () => {
        setup()
        const brandName = screen.getByText(/Tasmania Resort/)
        expect(brandName).toBeInTheDocument()
    })

    it('should navigate to the home page (path="/") when the brand is clicked', () => {
        setup()
        const brandName = screen.getByText(/Tasmania Resort/)
        expect(brandName).toHaveAttribute('href', '/')
    })
    
    it('should navigate to relevant page when link in navbar is clicked', () => {
        setup()
        const villaLink = screen.getByText('Resort')
        const foodLink = screen.getByText('Food')
        const specialtyLink = screen.getByText('Specialties')
        const travelLink = screen.getByText('Travel')
        const cartLink = screen.getByText('Cart')
        const loginLink = screen.getByText('Sign In')
        expect(villaLink).toHaveAttribute('href', '/villa')
        expect(foodLink).toHaveAttribute('href', '/food')
        expect(specialtyLink).toHaveAttribute('href', '/specialty')
        expect(travelLink).toHaveAttribute('href', '/travel')
        expect(cartLink).toHaveAttribute('href', '/cart')
        expect(loginLink).toHaveAttribute('href', '/login')
    })

})