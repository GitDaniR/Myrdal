// Utils
import { AccountsProvider } from "../utils/AccountsContext";

// Components
import Navbar from "../components/Navbar";
import AccountsWidget from "../components/AccountsWidget";

const DashboardPage = () => {
    return (
        <AccountsProvider>
        <Navbar/>
        <div className="ml-36 p-4 h-screen">
            <AccountsWidget/>
        </div>
        </AccountsProvider>
    );
}

export default DashboardPage