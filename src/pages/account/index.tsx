// pages/account.tsx

import TransactionHistory from '../../components/transactionHistory';
import { Transaction } from '../../types/index';


const AccountPage: React.FC = () => {

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <TransactionHistory/>
    </div>
  );
};

export default AccountPage;