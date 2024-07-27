import { FaCircleCheck, FaCircleExclamation, FaCircleXmark, FaXmark } from "react-icons/fa6";
import PropTypes from 'prop-types';


const Toast = ({ type, message, closeToast }) => {
    const icons = {
        'success': <FaCircleCheck className="fill-green-500 mx-1 my-auto"/>,
        'info': <FaCircleExclamation className="fill-blue-500 mx-1 my-auto"/>,
        'error': <FaCircleXmark className="fill-red-500 mx-1 my-auto"/>,
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