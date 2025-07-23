import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const ExpenseTrends = ({ expenses }) => {
  const getCategoryData = () => {
    const categories = {};
    
    expenses.forEach(expense => {
      if (categories[expense.category]) {
        categories[expense.category] += expense.price;
      } else {
        categories[expense.category] = expense.price;
      }
    });
    
    return Object.entries(categories).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: parseFloat(value.toFixed(2))
    }));
  };

  const data = getCategoryData();
  const COLORS = [
    'var(--food-color)',
    'var(--transport-color)',
    'var(--entertainment-color)',
    'var(--shopping-color)',
    'var(--utilities-color)',
    'var(--other-color)'
  ];

  if (data.length === 0) {
    return <div className="empty-state">No data to display</div>;
  }

  return (
    <div className="horizontal-barchart">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={80} />
          <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
          <Legend />
          <Bar dataKey="value" name="Amount">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseTrends;