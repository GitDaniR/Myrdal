import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from './Toast';

describe('Toast Component', () => {
    it('renders success toast with correct icon and message', () => {
        render(<Toast type="success" message="Success!" closeToast={() => {}} />);
        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    });

    it('renders info toast with correct icon and message', () => {
        render(<Toast type="info" message="Information!" closeToast={() => {}} />);
        expect(screen.getByText('Information!')).toBeInTheDocument();
        expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('renders error toast with correct icon and message', () => {
        render(<Toast type="error" message="Error!" closeToast={() => {}} />);
        expect(screen.getByText('Error!')).toBeInTheDocument();
        expect(screen.getByTestId('error-icon')).toBeInTheDocument();
    });

    it('renders toast with no icon and correct message', () => {
        render(<Toast type="not-an-icon" message="No icon!" closeToast={() => {}} />);
        expect(screen.getByText('No icon!')).toBeInTheDocument();
        expect(document.getElementsByTagName('svg').length).toBe(1);
    });

    it('calls closeToast function when close button is clicked', () => {
        const closeToastMock = vi.fn();
        render(<Toast type="success" message="Success!" closeToast={closeToastMock} />);
        fireEvent.click(screen.getByRole('button'));
        expect(closeToastMock).toHaveBeenCalledTimes(1);
    });
});
