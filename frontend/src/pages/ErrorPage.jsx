import { Link, useRouteError } from 'react-router-dom';
import BasePage from './BasePage';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <BasePage>
            <div className="p-9">
                <h1>Something went wrong!</h1>
                <p>{error.statusText || error.message}</p>
                <Link to="/" className="hyperlink">Back to login</Link>
            </div>
        </BasePage>
    );
}

export default ErrorPage