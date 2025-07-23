import { useState, useEffect } from 'react';

const AddExpenseForm = ({ onSubmit, onCancel, expense }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        price: expense.price.toString(),
        category: expense.category,
        date: expense.date
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      date: formData.date
    });
  };

  return (
    <div className="expense-form-container">
      <h2>{expense ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="food">Food</option>
              <option value="entertainment">Entertainment</option>
              <option value="travel">Travel</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-submit">
            {expense ? 'Update Expense' : 'Add Expense'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;