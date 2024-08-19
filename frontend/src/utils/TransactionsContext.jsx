// External dependencies
import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loadingTranscations, setLoadingTransactions] = useState(true);
    const [errorTransactions, setErrorTransactions] = useState(null);

    useEffect(() => {
        const fetchTranscations = async () => {
            setLoadingTransactions(true);
            try {
                const response = await axios.get("/api/transactions/");
                setTransactions(response.data);
            } catch (err) {
                setErrorTransactions(err.message);
            } finally {
                setLoadingTransactions(false);
            }
        };

        fetchTranscations();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, setTransactions, loadingTranscations, errorTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};
TransactionsProvider.propTypes = {
    children: PropTypes.element,
};