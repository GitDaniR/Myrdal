// Utils
import { AccountsProvider } from "../utils/AccountsContext";
import { TransactionsProvider } from "../utils/TransactionsContext";

// Components
import Navbar from "../components/Navbar";
import AccountsTable from "../components/AccountsTable";
import TransactionsTable from "../components/TransactionsTable";

const DashboardPage = () => {
    return (
        <>
            <Navbar/>
            <AccountsProvider>
                <TransactionsProvider>
                    <div className="h-screen ml-36 p-4">
                        <AccountsTable/>
                        <TransactionsTable/>
                    </div>
                </TransactionsProvider>
            </AccountsProvider>
        </>
    );
}

export default DashboardPage