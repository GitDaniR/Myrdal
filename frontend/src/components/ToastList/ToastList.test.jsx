import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastList from './ToastList';

describe('ToastList Component', () => {
    it('does not render anything when data is empty', () => {
        render(<ToastList data={[]} removeToast={() => {}} />);

        expect(screen.queryByTestId('toast-list')).toBeNull();
    });

    it('renders one toast', () => {
        const data = [
          { id: 1, type: 'success', message: 'Single Toast' },
        ];
    
        render(<ToastList data={data} removeToast={() => {}} />);

        expect(screen.getByTestId('toast-list')).toBeInTheDocument();
        expect(screen.getByText('Single Toast')).toBeInTheDocument();
      });

    it('renders more than one toast', () => {
        const data = [
            { id: 1, type: 'success', message: 'Toast 1' },
            { id: 2, type: 'success', message: 'Toast 2' },
        ];

        render(<ToastList data={data} removeToast={() => {}} />);

        expect(screen.getByTestId('toast-list')).toBeInTheDocument();
        expect(screen.getByText('Toast 1')).toBeInTheDocument();
        expect(screen.getByText('Toast 2')).toBeInTheDocument();
    });

    it('calls removeToast when button is clicked', () => {
        const data = [
          { id: 1, type: 'success', message: 'Toast 1' },
        ];
        const removeToastMock = vi.fn();
        
        render(<ToastList data={data} removeToast={removeToastMock} />);
        fireEvent.click(screen.getByRole('button'));
  
        expect(screen.getByTestId('toast-list')).toBeInTheDocument();
        expect(screen.getByText('Toast 1')).toBeInTheDocument();
        expect(removeToastMock).toHaveBeenCalledTimes(1);
      });
  });