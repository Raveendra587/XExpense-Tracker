import { useState } from 'react';

const AddBalanceForm = ({ onSubmit, onCancel }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(parseFloat(amount));
    setAmount('');
  };

  return (
    <div className="expense-form-container">
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Income Amount</label>
          <input
            type="number"
            placeholder="Income Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-submit">
            Add Balance
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBalanceForm;