import Toast from "../Toast";
import PropTypes from 'prop-types';

const ToastList = ({ data, removeToast }) => {
    return data.length > 0 && (
        <div className="fixed top-0.5 right-0.5 w-80 space-y-0.5" data-testid="toast-list">
            {data.map((toast) => (
                <Toast 
                    key={toast.id} 
                    type={toast.type} 
                    message={toast.message} 
                    closeToast={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}
ToastList.propTypes = {
    data: PropTypes.array,
    removeToast: PropTypes.func.isRequired,
}

export default ToastList