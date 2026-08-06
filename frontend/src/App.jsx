import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [csvFile, setCsvFile] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error("Connection error to backend API cluster:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: 1,
      category_id: parseInt(categoryId),
      amount: parseFloat(amount),
      description: description,
      date: new Date().toISOString().split('T')[0]
    };

    const res = await fetch('http://localhost:8000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      setDescription('');
      setAmount('');
      fetchTransactions();
    }
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) return;

    const formData = new FormData();
    formData.append("file", csvFile);

    const res = await fetch('http://localhost:8000/api/transactions/upload-csv', {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      alert("CSV Statement successfully parsed and committed to database!");
      fetchTransactions();
    } else {
      alert("Error parsing document verification format.");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#111827', textAlign: 'center' }}>📊 Smart Spend Tracker</h1>
      
      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr', margin: '2rem 0' }}>
        <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Log New Expense</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            <input type="number" step="0.01" placeholder="Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} required style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
              <option value="1">Food & Dining</option>
              <option value="2">Rent & Utilities</option>
              <option value="3">Entertainment</option>
              <option value="4">Transport</option>
            </select>
            <button type="submit" style={{ padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Add Item</button>
          </form>
        </section>
        <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0 }}>Bulk Import Bank Statement</h3>
          <form onSubmit={handleCsvUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'space-between' }}>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Upload a standard <code>.csv</code> with headers: <code>date,description,amount</code>.</p>
            <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} required style={{ padding: '10px 0' }} />
            <button type="submit" style={{ padding: '10px', background: '#059669', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Upload Statement</button>
          </form>
        </section>
     </div>

      <section style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>Transaction History</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#4b5563' }}>
              <th style={{ padding: '10px' }}>Date</th>
              <th style={{ padding: '10px' }}>Description</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#9ca3af' }}>No transactions recorded yet.</td></tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px', color: '#6b7280' }}>{tx.date}</td>
                  <td style={{ padding: '10px', fontWeight: '500' }}>{tx.description}</td>
                  <td style={{ padding: '10px', color: '#dc2626', textAlign: 'right', fontWeight: 'bold' }}>-${parseFloat(tx.amount).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
