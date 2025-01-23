"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import Ledger from "@/services/Models/Ledger";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  from_acc: number;
  to_acc: number;
  amount: number;
  txn_datetime: string;
  type: string;
  category: string;
}

interface Account {
  id: number;
  userId: string;
  name: string;
  transactions: Transaction[];
}

interface User {
  id: string;
  name: string;
  accounts: Account[];
}

export default function LedgerPage() {
  const [expandedAccount, setExpandedAccount] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [ledgerData, setLedgerData] = useState<{ users: User[] } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const transactionsPerPage = 5;
  const usersPerPage = 3;

  useEffect(() => {
    const fetchLedgerData = async () => {
      const ledger = new Ledger();
      try {
        const mockData = {
          users: [
            {
              id: "user1",
              name: "John Doe",
              accounts: [
                {
                  id: 1,
                  userId: "user1",
                  name: "Savings Account",
                  transactions: [
                    {
                      from_acc: 1,
                      to_acc: 2,
                      amount: 5240.00,
                      txn_datetime: "2024-01-15T10:30:00",
                      type: "Credit",
                      category: "Salary Transfer"
                    },
                    {
                      from_acc: 1,
                      to_acc: 3,
                      amount: -3120.00,
                      txn_datetime: "2024-01-16T14:20:00",
                      type: "Debit",
                      category: "Rent Payment"
                    },
                    {
                      from_acc: 4,
                      to_acc: 2,
                      amount: 3000.00,
                      txn_datetime: "2024-01-17T09:15:00",
                      type: "Credit",
                      category: "Business Income"
                    },
                    {
                      from_acc: 2,
                      to_acc: 5,
                      amount: -500.00,
                      txn_datetime: "2024-01-18T16:45:00",
                      type: "Debit",
                      category: "Utility Bills"
                    }
                  ]
                },
              ]
            },
            {
              id: "user2",
              name: "Jane Smith",
              accounts: [
                {
                  id: 3,
                  userId: "user2",
                  name: "Personal Account",
                  transactions: [
                    {
                      from_acc: 3,
                      to_acc: 1,
                      amount: 2000.00,
                      txn_datetime: "2024-01-19T11:30:00",
                      type: "Credit",
                      category: "Freelance Income"
                    }
                  ]
                }
              ]
            },
            {
              id: "user3",
              name: "Alex Johnson",
              accounts: [
                {
                  id: 3,
                  userId: "user2",
                  name: "Personal Account",
                  transactions: [
                    {
                      from_acc: 3,
                      to_acc: 1,
                      amount: 2000.00,
                      txn_datetime: "2024-01-19T11:30:00",
                      type: "Credit",
                      category: "Freelance Income"
                    }
                  ]
                }
              ]
            },
            {
              id: "user4",
              name: "Sarah Wilson",
              accounts: [
                {
                  id: 3,
                  userId: "user2",
                  name: "Personal Account",
                  transactions: [
                    {
                      from_acc: 3,
                      to_acc: 1,
                      amount: 2000.00,
                      txn_datetime: "2024-01-19T11:30:00",
                      type: "Credit",
                      category: "Freelance Income"
                    }
                  ]
                }
              ]
            }
          ]
        };
        setLedgerData(mockData);
        setSelectedUser(mockData.users[0].id);
      } catch (error) {
        console.error("Error fetching ledger data:", error);
      }
    };

    fetchLedgerData();
  }, []);

  if (!ledgerData) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  const categories = Array.from(new Set(ledgerData.users.flatMap((user: User) => 
    user.accounts.flatMap(account => 
      account.transactions.map(t => t.category)
    )
  )));

  const filterTransactions = (transactions: Transaction[]) => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm);
      const matchesType = selectedType === "all" || transaction.type === selectedType;
      const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
      const transactionDate = new Date(transaction.txn_datetime);
      const matchesDate = !dateRange.from || !dateRange.to || 
        (transactionDate >= dateRange.from && transactionDate <= dateRange.to);
      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  };

  const paginateTransactions = (transactions: Transaction[]) => {
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    return transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  };

  const paginateUsers = (users: User[]) => {
    const indexOfLastUser = userCurrentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return users.slice(indexOfFirstUser, indexOfLastUser);
  };

  const currentUser = ledgerData.users.find(user => user.id === selectedUser);
  const totalUserPages = Math.ceil(ledgerData.users.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div className="flex mb-8">
          <div className="w-1/4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mr-8 backdrop-blur-lg backdrop-filter">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Users</h2>
            <ul className="space-y-3">
              {paginateUsers(ledgerData.users).map((user) => (
                <motion.li
                  key={user.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setSelectedUser(user.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedUser === user.id
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {user.name}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-center mt-6 space-x-4">
              <button
                onClick={() => setUserCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={userCurrentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
                {userCurrentPage} / {totalUserPages}
              </span>
              <button
                onClick={() => setUserCurrentPage(prev => Math.min(prev + 1, totalUserPages))}
                disabled={userCurrentPage === totalUserPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
                  <p className="text-gray-500 mt-1">Track your transactions across all accounts</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from
                        ? `${format(dateRange.from, "PPP")} - ${format(dateRange.to || dateRange.from, "PPP")}`
                        : "Select Date Range"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      className="rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
                <select
                  className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl overflow-hidden border border-gray-100">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Account</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Category</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUser &&
                      paginateTransactions(
                        filterTransactions(currentUser.accounts.flatMap(account => account.transactions))
                      ).map((transaction, idx) => (
                        <TableRow key={idx} className="hover:bg-gray-50 transition-colors">
                          <TableCell>{`Account #${transaction.from_acc}`}</TableCell>
                          <TableCell className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
                            {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                          </TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              transaction.type === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.type}
                            </span>
                          </TableCell>
                          <TableCell>{format(new Date(transaction.txn_datetime), "PPP")}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
