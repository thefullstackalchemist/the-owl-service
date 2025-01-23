export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Accounts Summary Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Accounts Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="p-4 rounded-xl bg-gray-50 hover:shadow-md transition-all">
                  <p className="text-sm text-gray-500">Account {index + 1}</p>
                  <p className="text-2xl font-light mt-2">₹1,23,456</p>
                  <p className="text-sm text-gray-500 mt-1">Savings Account</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:shadow-md transition-all">
                  <div>
                    <p className="font-medium">Transaction {index + 1}</p>
                    <p className="text-sm text-gray-500">2024-01-{15 + index}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {index % 2 === 0 ? '+₹5,000' : '-₹3,000'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Overview Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Balance</span>
                <span className="font-semibold">₹4,56,789</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Income</span>
                <span className="text-green-600">+₹2,34,567</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Expenses</span>
                <span className="text-red-600">-₹1,23,456</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                New Transaction
              </button>
              <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                View Accounts
              </button>
              <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                View Ledger
              </button>
              <button className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
