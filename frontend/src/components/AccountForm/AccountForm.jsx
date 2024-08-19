// External dependencies
import axios from 'axios'
import PropTypes from 'prop-types';
import { useContext } from 'react'

// Utils
import { AccountsContext } from "../../utils/AccountsContext";
import ToastContext from "../../utils/ToastContext";

const AccountForm = ({ setIsFormVisible, toEdit, setToEdit }) => {
    const { accounts, setAccounts } = useContext(AccountsContext);
    const showToast = useContext(ToastContext);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const account = Object.fromEntries(formData.entries());

            const response = await axios.post("api/accounts/", account);

            setAccounts([...accounts, response.data]);
            setIsFormVisible(false);
            setToEdit(null);
        } catch(err) {
            showToast("error", err.message);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const new_account = Object.fromEntries(formData.entries());

            if (new_account.account_name == toEdit.account_name) {
                showToast("error", "New account name cannot be the same as previous.");
                return;
            }

            const response = await axios.put(`api/accounts/${toEdit.id}/`, new_account);

            setAccounts(accounts.map(account => (account.id == response.data.id) ? response.data : account));
            setIsFormVisible(false);
            setToEdit(null);
        } catch(err) {
            showToast("error", err.message);
        }
    };

    const getSubmitFunction = () => {
        if (toEdit == null) return handleAddSubmit;
        return handleEditSubmit;
    }

    const closeForm = (e) => {e.preventDefault(); setIsFormVisible(false)};

    return (
        <div className="border w-1/3 h-auto p-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg bg-slate-200">
            <form className="relative h-full block align-middle" onSubmit={getSubmitFunction()}>
                <button onClick={closeForm} className="absolute top-0 right-0">Close</button>
                <div className="pt-6"></div>
                {toEdit != null && (
                    <>
                        <p className="block">Previous account name</p>
                        <p className="block text-blue-600">{toEdit.account_name}</p>
                    </>
                )}
                <label htmlFor="accountName" className="block">New account name</label>
                <input id="accountName" name="account_name" required className="block w-full"></input>
                <button type="submit" className="block mx-auto mt-2">Save</button>
            </form>
        </div>
    );
}
AccountForm.propTypes = {
    setIsFormVisible: PropTypes.func.isRequired,
    toEdit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        account_name: PropTypes.string.isRequired,
    }),
    setToEdit: PropTypes.func.isRequired,
}

export default AccountForm