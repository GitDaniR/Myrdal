// External dependencies
import axios from 'axios';
import { useContext, useState } from 'react';
import { FaPencil, FaPlus, FaXmark } from "react-icons/fa6";

// Utils
import { AccountsContext } from '../../utils/AccountsContext';
import ToastContext from '../../utils/ToastContext';
import { TransactionsContext } from '../../utils/TransactionsContext';

// Components
import TransactionForm from '../TransactionForm'

const TransactionsTable = () => {
    const { accounts, setAccounts, loadingAccounts, errorAccounts } = useContext(AccountsContext);
    const showToast = useContext(ToastContext);
    const { transactions, setTransactions, loadingTranscations, errorTransactions } = useContext(TransactionsContext);

    const [ isAddVisible, setIsAddVisible ] = useState(false);
    const [ isEditVisible, setIsEditVisible ] = useState(false);
    const [ toEdit, setToEdit ] = useState(null);

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

    const handleAdd = () => {
        return async () => {
            if (isEditVisible) {
                setIsEditVisible(false);
                setToEdit(null);
            }
            setIsAddVisible(true);
        };
    };

    const handleEdit = (transaction) => {
        return async () => {
            if (isAddVisible) setIsAddVisible(false);
            setToEdit(transaction);
            setIsEditVisible(true);
        };
    };

    const handleDelete = (transaction) => {
        return async () => {
            if (isAddVisible || isEditVisible) return;
            try {
                await axios.delete(`/api/transactions/${transaction.id}/`);
                const response = await axios.get(`/api/accounts/${transaction.account}/`);
                setAccounts(accounts.map(account => (account.id == transaction.account) ? response.data : account));
                setTransactions(transactions.filter(tr => tr.id != transaction.id));
                setToEdit(null);
            } catch (err) {
                showToast("error", err.message);
            }
        };
    };

    if (loadingAccounts || loadingTranscations) {
        return (<div>Loading...</div>);
    }

    if (errorAccounts || errorTransactions) {
        return (<div>Error while loading accounts and transcations.</div>);
    }

    return (
        <>
            <div className="w-full my-5 p-2 border-2 border-black">
                <h1 className="text-xl">
                    Transactions
                    <button className="mr-24 float-right" onClick={handleAdd()} title="Add transaction"><FaPlus/></button>
                </h1>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <td>Account</td>
                            <td>Payee</td>
                            <td>Category</td>
                            <td>Date and time</td>
                            <td></td>
                            <td></td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{accounts.find(account => account.id == transaction.account).account_name}</td>
                                <td>{transaction.payee}</td>
                                <td>{CATEGORY_CHOICES[transaction.category]}</td>
                                <td>{transaction.date_time}</td>
                                <td><button title="Edit" onClick={handleEdit(transaction)}><FaPencil/></button></td>
                                <td><button onClick={handleDelete(transaction)} title="Delete"><FaXmark/></button></td>
                                <td>${transaction.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isAddVisible && (<TransactionForm setIsFormVisible={setIsAddVisible} toEdit={toEdit} setToEdit={setToEdit}/>)}
            {isEditVisible && (<TransactionForm setIsFormVisible={setIsEditVisible} toEdit={toEdit} setToEdit={setToEdit}/>)}
        </>
    );
};

export default TransactionsTable