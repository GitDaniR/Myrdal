import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastContext from '../../utils/ToastContext'
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

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

describe('LoginForm Component', () => {
    beforeEach(() => {
        render(
            <ToastContext.Provider value={showToastMock}>
                <MemoryRouter>
                    <LoginForm />
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
        expect(screen.getByText('Create new account')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('sends correct request', async () => {
        postMock.mockResolvedValueOnce({
            data: {
                access: 'token',
            },
        });

        fireEvent.change(screen.queryByPlaceholderText('Enter your email'), {target: {value: 'test@example.com'}});
        fireEvent.change(screen.queryByPlaceholderText('Enter your password'), {target: {value: 'password123'}});
        fireEvent.click(screen.getByRole('button'));

        await Promise.resolve();

        expect(postMock).toHaveBeenCalledWith('/api/auth/jwt/create/', {
            email: 'test@example.com',
            password: 'password123',
        });
        expect(showToastMock).toHaveBeenCalledWith('success', "Login successful.");
        expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });

    it('sends wrong request', async () => {
        postMock.mockRejectedValueOnce('Wrong request');

        fireEvent.change(screen.queryByPlaceholderText('Enter your email'), {target: {value: 'test@example.com'}});
        fireEvent.change(screen.queryByPlaceholderText('Enter your password'), {target: {value: 'wrongPass123'}});
        fireEvent.click(screen.getByRole('button'));

        await Promise.resolve();
        await Promise.resolve();

        expect(postMock).toHaveBeenCalledWith('/api/auth/jwt/create/', {
            email: 'test@example.com',
            password: 'wrongPass123',
        });
        expect(showToastMock).toHaveBeenCalledWith('error', "Wrong email or password.");
        expect(navigateMock).not.toBeCalled();
    });
});