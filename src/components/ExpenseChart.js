import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ExpenseChart = ({ expenses }) => {
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
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;