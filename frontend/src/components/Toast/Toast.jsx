import { FaCircleCheck, FaCircleExclamation, FaCircleXmark, FaXmark } from "react-icons/fa6";
import PropTypes from 'prop-types';


const Toast = ({ type, message, closeToast }) => {
    const icons = {
        'success': <FaCircleCheck className="green-icon mx-1 my-auto" data-testid="success-icon"/>,
        'info': <FaCircleExclamation className="blue-icon mx-1 my-auto" data-testid="info-icon"/>,
        'error': <FaCircleXmark className="red-icon mx-1 my-auto" data-testid="error-icon"/>,
    }

    const toastIcon = icons[type] || null;

    return (
        <div className="w-80 border-2 flex space-x-1 p-1 bg-white">
            {toastIcon}
            <p>{ message }</p>
            <button className="absolute right-0.5" onClick={closeToast}> <FaXmark /> </button>
        </div>
    );
}
Toast.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    closeToast: PropTypes.func,
}

export default Toast