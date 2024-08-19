// External dependencies
import axios from 'axios'
import PropTypes from 'prop-types';
import { useContext } from 'react'

// Utils
import ToastContext from "../../utils/ToastContext";

const NewAccountForm = ({ setIsAddVisible, refreshAccounts }) => {
    const showToast = useContext(ToastContext);

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const account = Object.fromEntries(formData.entries());

            await axios.post("api/accounts/", account);

            refreshAccounts();
            setIsAddVisible(false);
        } catch(err) {
            showToast("error", err.message);
        }
    };

    return (
        <div className="border w-1/3 h-1/5 p-3 static m-auto text-lg">
            <form className="relative h-full block align-middle" onSubmit={handleAddSubmit}>
                <button onClick={(e) => {e.preventDefault(); setIsAddVisible(false)}} className="absolute top-0 right-0">Close</button>
                <label htmlFor="accountName" className="block pt-6">Account name</label>
                <input id="accountName" name="account_name" required className="block w-full"></input>
                <button type="submit" className="block mx-auto mt-2">Save</button>
            </form>
        </div>
    );
}
NewAccountForm.propTypes = {
    setIsAddVisible: PropTypes.func.isRequired,
    refreshAccounts: PropTypes.func.isRequired
}

export default NewAccountForm