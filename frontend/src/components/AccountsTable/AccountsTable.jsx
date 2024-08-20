// External dependencies
import axios from 'axios'
import { useContext, useState } from 'react'
import { FaPencil, FaPlus, FaXmark } from "react-icons/fa6";

// Utils
import { AccountsContext } from '../../utils/AccountsContext';
import ToastContext from "../../utils/ToastContext";
import { TransactionsContext } from '../../utils/TransactionsContext';

// Components
import AccountForm from '../AccountForm';

const AccountsTable = () => {
    const { accounts, setAccounts, loadingAccounts, errorAccounts } = useContext(AccountsContext);
    const { transactions, setTransactions } = useContext(TransactionsContext);
    const showToast = useContext(ToastContext);

    const [ isAddVisible, setIsAddVisible ] = useState(false);
    const [ isEditVisible, setIsEditVisible ] = useState(false);
    const [ toEdit, setToEdit ] = useState(null);

    const handleAdd = () => {
        return async () => {
            setIsEditVisible(false);
            setToEdit(null);
            setIsAddVisible(true);
        };
    };

    const handleEdit = (account) => {
        return async () => {
            setIsAddVisible(false);
            setToEdit({ id: account.id, account_name: account.account_name });
            setIsEditVisible(true);
        }
    };

    const handleDelete = (id) => {
        return async () => {
            if (isAddVisible || isEditVisible) return;
            try {
                await axios.delete(`/api/accounts/${id}/`);
                setAccounts(accounts.filter(account => account.id != id));
                setTransactions(transactions.filter(transaction => transaction.account != id));
                setToEdit(null);
            } catch(err) {
                showToast("error", err.message);
            }
        }
    };

    if (loadingAccounts) {
        return <div>Loading...</div>;
    }

    if (errorAccounts) {
        return <div>Error: {errorAccounts}</div>;
    }

    const totalBalance = accounts.reduce((acc, account) => acc + Number.parseFloat(account.current_balance), 0);

    return (
        <>
        <div className="accounts-container">
            <h1 className="text-2xl">
                <b>
                    Total Balance
                    <span className="float-right">${Number.parseFloat(totalBalance).toFixed(2)}</span>
                </b>
            </h1>
            <h2 className="text-xl">
                Accounts
                <button className="float-right my-1" onClick={handleAdd()} title="Add account"><FaPlus className="green-icon"/></button>
            </h2>
            <table className="data-table">
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.id} className="even:bg-[var(--dun)] odd: bg-[var(--bone-light)]">
                            <td className="w-7/12 truncate hover:overflow-visible hover:text-wrap">{account.account_name}</td> 
                            <td className="px-5"><button onClick={handleEdit(account)} title="Edit"><FaPencil className="yellow-icon"/></button> </td>
                            <td className="px-8"><button onClick={handleDelete(account.id)} title="Delete"><FaXmark className="red-icon"/></button> </td>
                            <td className="w-3/12 text-right">${Number.parseFloat(account.current_balance).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {isAddVisible && (<AccountForm setIsFormVisible={setIsAddVisible} toEdit={toEdit} setToEdit={setToEdit}/>)}
        {isEditVisible && (<AccountForm setIsFormVisible={setIsEditVisible} toEdit={toEdit} setToEdit={setToEdit}/>)}
        </>
    );
};

export default AccountsTable