import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastContext from '../../utils/ToastContext'
import { MemoryRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

const showToastMock = vi.fn();
const navigateMock = vi.hoisted(() => vi.fn());
const postMock = vi.hoisted(() => vi.fn());
vi.mock('react-router-dom', async () => {
    const mod = await vi.importActual('react-router-dom')
    return {
        ...mod,
        useNavigate: () => navigateMock,
    }
});
vi.mock('axios', async () => {
    const mod = await vi.importActual('axios');
    return {
        default: {
            ...mod.default,
            post: postMock,
        }, 
    }
});
vi.useFakeTimers();

describe('RegistrationForm Component', () => {
    beforeEach(() => {
        render(
            <ToastContext.Provider value={showToastMock}>
                <MemoryRouter>
                    <RegistrationForm />
                </MemoryRouter>
            </ToastContext.Provider>
        );
      });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders form correctly', async () => {
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Enter your email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Enter your password')).toBeInTheDocument();
        expect(screen.getByLabelText('First name')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Enter your first name')).toBeInTheDocument();
        expect(screen.getByLabelText('Last name')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Enter your last name')).toBeInTheDocument();
        expect(screen.getByLabelText('Date of birth')).toBeInTheDocument();
        expect(screen.getByText('Back to login')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('sends correct request', async () => {
        postMock.mockResolvedValueOnce('Success');

        fireEvent.change(screen.queryByPlaceholderText('Enter your email'), {target: {value: 'test@example.com'}});
        fireEvent.change(screen.queryByPlaceholderText('Enter your password'), {target: {value: 'password123'}});
        fireEvent.change(screen.queryByPlaceholderText('Enter your first name'), {target: {value: 'John'}});
        fireEvent.change(screen.queryByPlaceholderText('Enter your last name'), {target: {value: 'Doe'}});
        fireEvent.change(screen.queryByLabelText('Date of birth'), {target: {value: '1990-01-01'}});
        fireEvent.click(screen.getByRole('button'));

        await Promise.resolve();
        vi.advanceTimersByTime(1);

        expect(postMock).toHaveBeenCalledWith('/api/auth/users/', {
            email: 'test@example.com',
            password: 'password123',
            first_name: 'John',
            last_name: 'Doe',
            date_of_birth: '1990-01-01',
        });
        expect(showToastMock).toHaveBeenCalledWith('success', "Registration successful.");
        expect(showToastMock).toHaveBeenCalledWith('info', "Now you can login.");
        expect(navigateMock).toHaveBeenCalledWith('/');
    });

    it('sends wrong request', async () => {
        postMock.mockRejectedValueOnce({message: 'Wrong request'});

        fireEvent.change(screen.queryByPlaceholderText('Enter your email'), {target: {value: 'test@example.com'}});
        fireEvent.change(screen.queryByPlaceholderText('Enter your password'), {target: {value: 'wrongPass123'}});
        fireEvent.change(screen.queryByPlaceholderText('Enter your first name'), {target: {value: 'John'}});
        fireEvent.change(screen.queryByPlaceholderText('Enter your last name'), {target: {value: 'Doe'}});
        fireEvent.change(screen.queryByLabelText('Date of birth'), {target: {value: '1990-01-01'}});
        fireEvent.click(screen.getByRole('button'));

        await Promise.resolve();
        await Promise.resolve();

        expect(postMock).toHaveBeenCalledWith('/api/auth/users/', {
            email: 'test@example.com',
            password: 'wrongPass123',
            first_name: 'John',
            last_name: 'Doe',
            date_of_birth: '1990-01-01',
        });
        expect(showToastMock).toHaveBeenCalledWith('error', "Wrong request");
    });
});