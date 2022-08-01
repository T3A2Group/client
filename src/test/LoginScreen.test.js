import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'
import store from "../store"
import LoginScreen from '../screens/LoginScreen';
import userEvent from '@testing-library/user-event';

describe("The sign in screen", () => {
    
    it('should render page heading', () => {
        render(<Provider store={store}>
                <Router>
                    <LoginScreen />
                </Router>
            </Provider>)
        const heading = screen.getByRole('heading')
        expect(heading.textContent).toBe('Sign In')
    })

    it('should render text boxes to enter email and password', async () => {
        render(<Provider store={store}>
                <Router>
                    <LoginScreen />
                </Router>
            </Provider>)

        userEvent.type(screen.getByLabelText('Email Address'), "John")
        await waitFor(() => {
            expect(screen.getByLabelText('Email Address')).toHaveValue("John")
        })
        userEvent.type(screen.getByLabelText('Password'), "testPW")
        await waitFor(() => {
            expect(screen.getByLabelText('Password')).toHaveValue("testPW")
        })
    })
})