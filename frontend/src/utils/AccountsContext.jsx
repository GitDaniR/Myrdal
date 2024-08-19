import axios from 'axios'
import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react'

export const AccountsContext = createContext();

export const AccountsProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('api/accounts/');
                setAccounts(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAccounts()
    }, [refresh]);

    const refreshAccounts = () => {
        setRefresh(prev => !prev);
    }

    return (
        <AccountsContext.Provider value={{ accounts, loading, error, refreshAccounts }}>
            {children}
        </AccountsContext.Provider>
    );
}
AccountsProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}