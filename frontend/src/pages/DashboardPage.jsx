// Utils
import { AccountsProvider } from "../utils/AccountsContext";
import { TransactionsProvider } from "../utils/TransactionsContext";

// Components
import Navbar from "../components/Navbar";
import AccountsWidget from "../components/AccountsWidget";
import TransactionsTable from "../components/TransactionsTable";

const DashboardPage = () => {
    return (
        <>
            <Navbar/>
            <AccountsProvider>
                <TransactionsProvider>
                    <div className="h-screen ml-36 p-4">
                        <AccountsWidget/>
                        <TransactionsTable/>
                    </div>
                </TransactionsProvider>
            </AccountsProvider>
        </>
    );
}

export default DashboardPage