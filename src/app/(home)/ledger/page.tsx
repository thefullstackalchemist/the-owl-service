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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [accountFilter, setAccountFilter] = useState<string>("all");
  const [ledgerData, setLedgerData] = useState<Transaction[] | null>(null);

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
      const matchesSearch = 
        transaction.from_acc.toString().includes(searchTerm) ||
        transaction.to_acc.toString().includes(searchTerm) ||
        transaction.amount.toString().includes(searchTerm);
      const transactionDate = new Date(transaction.txn_datetime);
      const matchesDate =
        (!dateRange?.from || transactionDate >= dateRange.from) &&
        (!dateRange?.to || transactionDate <= dateRange.to);
      const matchesAccount = 
        accountFilter === "all" || 
        transaction.from_acc.toString() === accountFilter ||
        transaction.to_acc.toString() === accountFilter;
      return matchesSearch && matchesDate && matchesAccount;
    });
  };

  const paginateTransactions = (transactions: Transaction[]) => {
    const filteredTransactions = filterTransactions(transactions);
    const indexOfLastTransaction = currentPage * pageSize;
    const indexOfFirstTransaction = indexOfLastTransaction - pageSize;
    return filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  };

  const uniqueAccounts = Array.from(new Set(
    ledgerData.flatMap(t => [t.from_acc, t.to_acc])
  )).sort((a, b) => a - b);

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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <Select value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Filter by account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    {uniqueAccounts.map((acc) => (
                      <SelectItem key={acc} value={acc.toString()}>
                        Account #{acc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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
                      onSelect={(range: any) => setDateRange(range)}
                      numberOfMonths={1}
                      className="text-xs sm:text-sm md:text-base lg:text-lg"
                    />
                  </PopoverContent>
                </Popover>

                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Rows per page" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20, 50].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size} rows
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-xl overflow-x-auto border border-gray-100">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap p-2 sm:p-4">From</TableHead>
                      <TableHead className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap p-2 sm:p-4">To</TableHead>
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
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filterTransactions(ledgerData).length)} of {filterTransactions(ledgerData).length} entries
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filterTransactions(ledgerData).length / pageSize)))}
                    disabled={currentPage === Math.ceil(filterTransactions(ledgerData).length / pageSize)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
