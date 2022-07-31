import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'
import store from "../store"
import Header from '../components/Header'

describe("The Header component", () => {
    render(<Provider store={store}>
            <Router>
                <Header />
            </Router>
        </Provider>)
    it('should display the brand Tasmania Resort', () => {
        const brandName = screen.getByText(/Tasmania Resort/)
        expect(brandName).toBeInTheDocument()
    })
})