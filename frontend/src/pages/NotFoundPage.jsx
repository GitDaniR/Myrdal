import { Link } from 'react-router-dom';
import BasePage from './BasePage'

const NotFoundPage = () => {
    return (
        <BasePage>
            <div className="p-9 mx-auto flex flex-col items-center space-y-5">
                <p className="text-4xl">404 Page not found</p>
                <Link to="/" className="hyperlink ">Back to login</Link>
            </div>
        </BasePage>
    );
}

export default NotFoundPage