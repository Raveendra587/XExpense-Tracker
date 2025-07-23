import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FiPlus } from 'react-icons/fi';
import Balance from './components/Balance';
import ExpenseList from './components/ExpenseList';
import AddBalanceForm from './components/AddBalanceForm';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseChart from './components/ExpenseChart';
import ExpenseTrends from './components/ExpenseTrends';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const savedBalance = localStorage.getItem('balance');
    const savedExpenses = localStorage.getItem('expenses');
    
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem('balance', balance);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [balance, expenses]);

  const handleAddBalance = (amount) => {
    if (amount <= 0) {
      alert('Amount must be greater than zero');
      return;
    }
    setBalance(prev => prev + amount);
    setIsBalanceModalOpen(false);
    alert(`₹${amount} added to balance`);
  };

  const handleAddExpense = (expense) => {
    if (expense.price > balance) {
      alert('Expense exceeds available balance');
      return;
    }
    
    if (editingExpense) {
      const originalAmount = editingExpense.price;
      setExpenses(prev => 
        prev.map(exp => 
          exp.id === editingExpense.id ? expense : exp
        )
      );
      setBalance(prev => prev + originalAmount - expense.price);
      alert('Expense updated successfully');
    } else {
      setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
      setBalance(prev => prev - expense.price);
      alert('Expense added successfully');
    }
    
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const handleDeleteExpense = (id, amount) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    setBalance(prev => prev + amount);
    alert('Expense deleted successfully');
  };

  return (
    <div className="app">
      <main className="container">
        <h1>Expense Tracker</h1>
        
        <div className="top-row">
          <Balance 
            balance={balance} 
            onAddBalance={() => setIsBalanceModalOpen(true)} 
          />
          
          <div className="card expenses-header">
            <div className="expenses-header-content">
              <div className="expenses-summary">
                <span className='balance-amount'>Expenses: ₹{expenses.reduce((sum, exp) => sum + exp.price, 0).toFixed(2)}</span>
              </div>
              <button 
                type="button" 
                className="btn btn-expense"
                onClick={() => setIsExpenseModalOpen(true)}
              >
                + Add Expense
              </button>
            </div>
          </div>
          
          <div className="card expense-summary-card">
            <ExpenseChart expenses={expenses} />
          </div>
        </div>
        
        <div className="bottom-row">
          <div className="card expense-history-container">
            <h3>Recent Transactions</h3>
            <ExpenseList 
              expenses={expenses} 
              onEdit={handleEditExpense} 
              onDelete={handleDeleteExpense} 
            />
          </div>
          
          <div className="card expense-trends-container">
            <h3>Top Expenses</h3>
            <ExpenseTrends expenses={expenses} />
          </div>
        </div>
        
        <Modal
          isOpen={isBalanceModalOpen}
          onRequestClose={() => setIsBalanceModalOpen(false)}
          className="modal"
          overlayClassName="overlay"
        >
          <AddBalanceForm 
            onSubmit={handleAddBalance} 
            onCancel={() => setIsBalanceModalOpen(false)} 
          />
        </Modal>
        
        <Modal
          isOpen={isExpenseModalOpen}
          onRequestClose={() => {
            setIsExpenseModalOpen(false);
            setEditingExpense(null);
          }}
          className="modal"
          overlayClassName="overlay"
        >
          <AddExpenseForm 
            onSubmit={handleAddExpense} 
            onCancel={() => {
              setIsExpenseModalOpen(false);
              setEditingExpense(null);
            }}
            expense={editingExpense}
          />
        </Modal>
      </main>
    </div>
  );
}

export default App;