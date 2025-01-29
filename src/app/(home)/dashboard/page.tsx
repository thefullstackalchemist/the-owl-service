export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 border-b pb-4">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Accounts Summary Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              Accounts Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-700">Account {index + 1}</p>
                    <div className="text-xs text-indigo-600 hover:text-indigo-800">
                      <span className="group-hover:hidden">Show</span>
                      <span className="hidden group-hover:inline">Hide</span>
                    </div>
                  </div>
                  <p className="text-2xl font-light mt-2 group-hover:blur-none blur-sm transition-all">₹1,23,456</p>
                  <p className="text-sm text-gray-500 mt-1">Savings Account</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Transactions
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:shadow-md transition-all">
                  <div>
                    <p className="font-medium">Transaction {index + 1}</p>
                    <p className="text-sm text-gray-500">2024-01-{15 + index}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {index % 2 === 0 ? '+₹5,000' : '-₹3,000'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Overview Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Financial Overview
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                <span>Total Balance</span>
                <span className="font-semibold">₹4,56,789</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                <span>Total Income</span>
                <span className="text-green-600 font-medium">+₹2,34,567</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                <span>Total Expenses</span>
                <span className="text-red-600 font-medium">-₹1,23,456</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-lg bg-opacity-90 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                New Transaction
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-sm hover:shadow-md">
                View Accounts
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-sm hover:shadow-md">
                View Ledger
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-sm hover:shadow-md">
                Settings
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}