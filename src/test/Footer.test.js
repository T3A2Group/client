import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import '@testing-library/jest-dom'


// describe(Footer, () => {
//     it('should display the brand Tasmania Resort', () => {
//         render(<Footer />)
//         const brandName = screen.getByText()
//         expect(brandName).toBeInTheDocument()
//     })
// })

describe("The Footer component", () => {
    it('should display the copyright text for Tasmania Resort', () => {
        render(<Footer />)
        const brandName = screen.getByText('Copyright © Tasmania Resort')
        expect(brandName).toBeInTheDocument()
    })
})