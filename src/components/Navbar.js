import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const isLoggedIn = false; // You can replace this with your actual auth logic

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg z-50 navbar">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <motion.div
          className="text-3xl font-bold text-gray-200 hover:text-blue-400 transition-all"
          whileHover={{ scale: 1.1 }}
        >
          <Link href="/">OWL</Link>
        </motion.div>

        {/* Navigation Links and Action Buttons */}
        <div className="flex items-center justify-end space-x-6 ml-auto">
          {/* Links */}
          {["Ledger", "Accounts", "Admin"].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-gray-200 text-lg font-medium hover:text-blue-400 transition duration-200 gap-7"
            >
              {link}
            </Link>
          ))}

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 ml-6">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-gray-200 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-gray-200 border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300 px-6"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}