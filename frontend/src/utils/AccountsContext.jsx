// External dependencies
import axios from 'axios'
import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react'

export const AccountsContext = createContext();

export const AccountsProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [loadingAccounts, setLoadingAccounts] = useState(true);
    const [errorAccounts, setErrorAccounts] = useState(null);

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoadingAccounts(true);
            try {
                const response = await axios.get('/api/accounts/');
                setAccounts(response.data);
            } catch (err) {
                setErrorAccounts(err.message);
            } finally {
                setLoadingAccounts(false);
            }
        }

        fetchAccounts()
    }, []);

    return (
        <AccountsContext.Provider value={{ accounts, setAccounts, loadingAccounts, errorAccounts }}>
            {children}
        </AccountsContext.Provider>
    );
}
AccountsProvider.propTypes = {
    children: PropTypes.element,
}