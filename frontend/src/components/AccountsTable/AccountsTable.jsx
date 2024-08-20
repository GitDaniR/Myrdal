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
            if (isEditVisible) {
                setIsEditVisible(false);
                setToEdit(null);
            }
            setIsAddVisible(true);
        };
    };

    const handleEdit = (account) => {
        return async () => {
            if (isAddVisible) setIsAddVisible(false);
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
        <div className="w-1/3 h-1/3 p-1 space-y-5 border-2 border-black overflow-y-scroll">
            <h1 className="text-2xl">
                Total Balance
                <span className="float-right">${Number.parseFloat(totalBalance).toFixed(2)}</span>
            </h1>
            <h2 className="text-xl">
                Accounts
                <button className="float-right my-1" onClick={handleAdd()} title="Add account"><FaPlus/></button>
            </h2>
            <table className="w-full table-fixed">
                <tbody>
                    {accounts.map(account => (
                        <tr key={account.id}>
                            <td className="w-3/5 truncate hover:overflow-visible hover:text-wrap">{account.account_name}</td> 
                            <td><button onClick={handleEdit(account)} title="Edit"><FaPencil/></button> </td>
                            <td><button onClick={handleDelete(account.id)} title="Delete"><FaXmark/></button> </td>
                            <td className="w-1/5 text-right">${Number.parseFloat(account.current_balance).toFixed(2)}</td>
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