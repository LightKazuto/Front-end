import { useEffect, useState } from 'react';
import { Transaction } from '../types/index';


const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("access_token");

    try {

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${apiBaseUrl}/transactionHistory`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart items: ${response.statusText}`);
      }

      const data = await response.json();

      setTransactions(data.items);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }    
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total Price</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Seller</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td className="border p-2"><img src={item.image_url} alt={item.product_name} className="h-20 w-20" /></td>
              <td className="border p-2">{item.product_name} <br/> {item.description}</td>
              <td className="border p-2">{item.quantity}</td>
              <td className="border p-2">Rp {item.total_price}</td>
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.seller}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;