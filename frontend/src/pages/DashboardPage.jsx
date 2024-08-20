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
                    <div className="h-full ml-36">
                        <h1 className="w-full bg-slate-50 p-4 text-2xl"><b>Dashboard</b></h1>
                        <div className="p-4">
                            <AccountsTable/>
                            <TransactionsTable/>
                        </div>           
                    </div>
                </TransactionsProvider>
            </AccountsProvider>
        </>
    );
}

export default DashboardPage