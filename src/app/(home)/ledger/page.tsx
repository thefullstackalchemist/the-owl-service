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
}

export default function LedgerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  
  const [ledgerData, setLedgerData] = useState<Transaction[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    const fetchLedgerData = async () => {
      const ledger = new Ledger();
      try {
        const mockData = [
          { from_acc: 1, to_acc: 2, amount: 5240.00, txn_datetime: "2024-01-15T10:30:00" },
          { from_acc: 1, to_acc: 3, amount: -3120.00, txn_datetime: "2024-01-16T14:20:00" },
          { from_acc: 4, to_acc: 2, amount: 3000.00, txn_datetime: "2024-01-17T09:15:00" },
          { from_acc: 2, to_acc: 5, amount: -500.00, txn_datetime: "2024-01-18T16:45:00" },
          { from_acc: 2, to_acc: 5, amount: -500.00, txn_datetime: "2024-01-18T16:45:00" },
          { from_acc: 2, to_acc: 5, amount: -500.00, txn_datetime: "2024-01-18T16:45:00" },
          { from_acc: 2, to_acc: 5, amount: -500.00, txn_datetime: "2024-01-18T16:45:00" },
          { from_acc: 2, to_acc: 5, amount: -500.00, txn_datetime: "2024-01-18T16:45:00" },
          { from_acc: 2, to_acc: 5, amount: -500.00, txn_datetime: "2024-01-18T16:45:00" },
        ];
    
        setLedgerData(mockData);
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

  const filterTransactions = (transactions: Transaction[]) => {
    return transactions.filter(transaction => {
      const matchesSearch = transaction.amount.toString().includes(searchTerm);
      const transactionDate = new Date(transaction.txn_datetime);
      const matchesDate =
        (!dateRange?.from || transactionDate >= dateRange.from) &&
        (!dateRange?.to || transactionDate <= dateRange.to);
      return matchesSearch && matchesDate;
    });
  };

  const paginateTransactions = (transactions: Transaction[]) => {
    const filteredTransactions = filterTransactions(transactions);
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    return filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-4 md:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-screen-xl min-h-screen w-full mx-auto px-1 sm:px-2 md:px-4 lg:px-6"
      >
        <div className="flex flex-col mb-1">
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-4 md:p-6 mb-4 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8">
                <div className="w-full sm:w-auto mb-4 sm:mb-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Financial Overview</h1>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 mt-1">Track your transactions across all accounts</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-xs sm:text-sm md:text-base lg:text-lg rounded-xl">
                      <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                      {dateRange?.from
                        ? `${format(dateRange.from, "PPP")} - ${format(dateRange.to || dateRange.from, "PPP")}`
                        : "Select a date range"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2 sm:p-4 bg-white rounded-lg shadow-md">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => setDateRange(range)}
                      numberOfMonths={1}
                      className="text-xs sm:text-sm md:text-base lg:text-lg"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="rounded-xl overflow-x-auto border border-gray-100">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap p-2 sm:p-4">From</TableHead>
                      <TableHead className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap p-2 sm:p-4">to</TableHead>
                      <TableHead className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap p-2 sm:p-4">Amount</TableHead>
                      <TableHead className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap p-2 sm:p-4">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginateTransactions(ledgerData).map((transaction, idx) => (
                      <TableRow key={idx} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap p-2 sm:p-4">{`Account #${transaction.from_acc}`}</TableCell>
                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap p-2 sm:p-4">{`Account #${transaction.to_acc}`}</TableCell>
                        <TableCell className={`text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap p-2 sm:p-4 ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap p-2 sm:p-4">{format(new Date(transaction.txn_datetime), "PPP")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-center mt-4 sm:mt-6 lg:mt-8 space-x-2 sm:space-x-4 lg:space-x-6">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1 sm:p-2 lg:p-3 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </button>
                <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">
                  {currentPage} / {Math.ceil(filterTransactions(ledgerData).length / transactionsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filterTransactions(ledgerData).length / transactionsPerPage)))}
                  disabled={currentPage === Math.ceil(filterTransactions(ledgerData).length / transactionsPerPage)}
                  className="p-1 sm:p-2 lg:p-3 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
