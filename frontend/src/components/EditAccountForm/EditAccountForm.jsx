// External dependencies
import axios from 'axios'
import PropTypes from 'prop-types';
import { useContext } from 'react'

// Utils
import ToastContext from "../../utils/ToastContext";

const EditAccountForm = ({ setIsEditVisible, refreshAccounts, toEdit }) => {
    const showToast = useContext(ToastContext);

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const new_account = Object.fromEntries(formData.entries());

            if (new_account.account_name == toEdit.account_name) {
                showToast("error", "New account name cannot be the same as previous.");
                return;
            }

            await axios.put(`api/accounts/${toEdit.id}/`, new_account);

            refreshAccounts();
            setIsEditVisible(false);
        } catch(err) {
            showToast("error", err.message);
        }
    };

    return (
        <div className="border w-1/3 h-[28%] p-3 static m-auto text-lg">
            <form className="relative h-full block align-middle" onSubmit={handleEditSubmit}>
                <button onClick={(e) => {e.preventDefault(); setIsEditVisible(false)}} className="absolute top-0 right-0">Close</button>
                <p className="block pt-6">Previous account name</p>
                <p className="block">{toEdit.account_name}</p>
                <label htmlFor="accountName" className="block">New account name</label>
                <input id="accountName" name="account_name" required className="block w-full"></input>
                <button type="submit" className="block mx-auto mt-2">Save</button>
            </form>
        </div>
    );
}
EditAccountForm.propTypes = {
    setIsEditVisible: PropTypes.func.isRequired,
    refreshAccounts: PropTypes.func.isRequired,
    toEdit: PropTypes.shape({
        id: PropTypes.number.isRequired,
        account_name: PropTypes.string.isRequired,
    })
}

export default EditAccountForm