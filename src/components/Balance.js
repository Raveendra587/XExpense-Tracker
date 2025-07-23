const Balance = ({ balance, onAddBalance }) => {
  return (
    <div className="card balance-card">
      <div className="balance-content">
        <div className="balance-amount">Wallet Balance: ₹{balance.toFixed(2)}</div>
        <button 
          type="button" 
          className="btn btn-income"
          onClick={onAddBalance}
        >
          + Add Income
        </button>
      </div>
    </div>
  );
};

export default Balance;