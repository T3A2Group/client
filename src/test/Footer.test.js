import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import '@testing-library/jest-dom'

describe("The Footer component", () => {
    it('should display the copyright text for Tasmania Resort', () => {
        render(<Footer />)
        const copyrightText = screen.getByText('Copyright © Tasmania Resort')
        expect(copyrightText).toBeInTheDocument()
    })
})