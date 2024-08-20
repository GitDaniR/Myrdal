// External dependencies
import axios from 'axios'
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react'

// Utils
import { AccountsContext } from "../../utils/AccountsContext";
import ToastContext from "../../utils/ToastContext";
import { TransactionsContext } from "../../utils/TransactionsContext";

const TransactionForm = ({ setIsFormVisible, toEdit, setToEdit }) => {
    const { accounts, setAccounts } = useContext(AccountsContext);
    const { transactions, setTransactions } = useContext(TransactionsContext);
    const showToast = useContext(ToastContext);

    // TODO: Export const.
    const CATEGORY_CHOICES = {
        unspecified: "",
        food: "Food",
        shopping: "Shopping",
        travel: "Travel",
        healthcare: "Healthcare",
        entertainment: "Entertainment",
        utilities: "Utilities",
        education: "Education",
        gifts_donations: "Gifts/Donations",
    };

    const [formData, setFormData] = useState({
        id: toEdit?.id || null,
        account: toEdit?.account || (accounts.length > 0 ? accounts[0].id : undefined),
        payee: toEdit?.payee,
        date_time: toEdit?.date_time,
        amount: toEdit?.amount,
        description: toEdit?.description,
        category: toEdit?.category || "unspecified",
    });

    useEffect(() => {
        setFormData({
            id: toEdit?.id || null,
            account: toEdit?.account || (accounts.length > 0 ? accounts[0].id : undefined),
            payee: toEdit?.payee,
            date_time: toEdit?.date_time,
            amount: toEdit?.amount,
            description: toEdit?.description,
            category: toEdit?.category || "unspecified",
        });
    }, [accounts, toEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const transaction_response = await axios.post("/api/transactions/", formData);
            const account_response = await axios.get(`/api/accounts/${transaction_response.data.account}`);

            setAccounts(accounts.map(account => (account.id == account_response.data.id) ? account_response.data : account));
            setTransactions([...transactions, transaction_response.data]);
            setIsFormVisible(false);
            setToEdit(null);
        } catch(err) {
            showToast("error", err.message);
        }
    };


    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: Compare toEdit and formData.
            const transaction_response = await axios.put(`/api/transactions/${formData.id}/`, formData);

            if (toEdit.account != formData.account) {
                const old_account_response = await axios.get(`/api/accounts/${toEdit.account}/`);
                const new_account_respnse = await axios.get(`/api/accounts/${formData.account}/`);
                setAccounts(accounts.map((acc) => {
                    if (acc.id == old_account_response.data.id) {
                        return old_account_response.data;
                    } else if (acc.id == new_account_respnse.data.id) {
                        return new_account_respnse.data;
                    }
                    return acc;
                }));
            } else {
                const account_response = await axios.get(`/api/accounts/${formData.account}/`);
                setAccounts(accounts.map(account => (account.id == account_response.data.id) ? account_response.data : account));
            }
            setTransactions(transactions.map(transaction => 
                (transaction.id == transaction_response.data.id) ? transaction_response.data : transaction));
            setIsFormVisible(false);
            setToEdit(null);
        } catch(err) {
            showToast("error", err.message);
        }
    };

    const getSubmitFunction = () => {
        if (toEdit == null) return handleAddSubmit;
        return handleEditSubmit;
    };

    const closeForm = (e) => {e.preventDefault(); setIsFormVisible(false)};

    return (
        <div className="data-form-container">
            <form className="data-form" onSubmit={getSubmitFunction()}>
                <button onClick={closeForm} className="data-form-btn absolute top-0 right-0">Close</button>
                <label htmlFor="account" className="pt-6">Account</label>
                <select id="account" name="account" required value={formData.account} onChange={handleChange}>
                    {accounts.map((account) => (
                        <option key={account.id} value={account.id}>{account.account_name}</option>
                    ))}
                </select>
                <label htmlFor="payee">Payee</label>
                <input id="payee" name="payee" required value={formData.payee} onChange={handleChange}></input>
                <label htmlFor="date_time">Date and time</label>
                <input id="date_time" name="date_time" required type="datetime-local" 
                        value={formData.date_time?.slice(0, 16)} onChange={handleChange}></input>
                <label htmlFor="amount">Amount</label>
                <input id="amount" name="amount" required type="number" step=".01" 
                        value={formData.amount} onChange={handleChange}></input>
                <label htmlFor="description">Description</label>
                <input id="description" name="description" required type="text" 
                        value={formData.description} onChange={handleChange}></input>
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange}>
                    {Object.entries(CATEGORY_CHOICES).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>
                <button type="submit" className="data-form-btn block mx-auto mt-2">Save</button>
            </form>
        </div>
    );
};
TransactionForm.propTypes = {
    setIsFormVisible: PropTypes.func.isRequired,
    toEdit: PropTypes.object,
    setToEdit: PropTypes.func.isRequired,
}

export default TransactionForm;