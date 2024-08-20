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
            if (accounts.length == 0) {
                showToast('info', "Please add an account first.");
                return;
            }
            setIsEditVisible(false);
            setToEdit(null);
            setIsAddVisible(true);
        };
    };

    const handleEdit = (transaction) => {
        return async () => {
            setIsAddVisible(false);
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
            <div className="transactions-container">
                <h1 className="text-xl">
                    <b>Transaction History</b>
                    <button className="mr-8 float-right" onClick={handleAdd()} title="Add transaction"><FaPlus className="green-icon"/></button>
                </h1>
                <table className="data-table mt-2">
                    <thead>
                        <tr className="text-lg">
                            <td className="w-1/12">Date</td>
                            <td className="w-3/12" >Account</td>
                            <td className="w-3/12">Payee</td>
                            <td className="w-2/12">Category</td>
                            <td className="w-2/12">Amount</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="even:bg-white odd:bg-slate-50">
                                <td>{transaction.date_time.slice(0, 10)}</td>
                                <td className="truncate hover:overflow-visible hover:text-wrap">
                                    {accounts.find(account => account.id == transaction.account).account_name}
                                </td>
                                <td className="truncate hover:overflow-visible hover:text-wrap">
                                    {transaction.payee}
                                </td>
                                <td>{CATEGORY_CHOICES[transaction.category]}</td>
                                <td>${transaction.amount}</td>
                                <td><button title="Edit" onClick={handleEdit(transaction)}><FaPencil className="yellow-icon"/></button></td>
                                <td><button onClick={handleDelete(transaction)} title="Delete"><FaXmark className="red-icon"/></button></td>
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