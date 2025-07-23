import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const getCategoryColor = (category) => {
    switch(category) {
      case 'food': return 'var(--food-color)';
      case 'transport': return 'var(--transport-color)';
      case 'entertainment': return 'var(--entertainment-color)';
      case 'shopping': return 'var(--shopping-color)';
      case 'utilities': return 'var(--utilities-color)';
      default: return 'var(--other-color)';
    }
  };

  return (
    <div className="expense-list-container">
      {expenses.length === 0 ? (
        <div className="empty-state">No expenses added yet</div>
      ) : (
        <div className="expense-items">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-icon" style={{ backgroundColor: getCategoryColor(expense.category) }}>
                {expense.category.charAt(0).toUpperCase()}
              </div>
              
              <div className="expense-details">
                <div className="expense-title">{expense.title}</div>
                <div className="expense-category">{expense.category}</div>
                <div className="expense-date">
                  {new Date(expense.date).toLocaleDateString('en-IN')}
                </div>
              </div>
              
              <div className="expense-amount">₹{expense.price.toFixed(2)}</div>
              
              <div className="expense-actions">
                <button onClick={() => onEdit(expense)}>
                  <FiEdit2 />
                </button>
                <button onClick={() => onDelete(expense.id, expense.price)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;