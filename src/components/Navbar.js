import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="text-xl font-bold">
        <Link href="/">MyApp</Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 transition">
          Dashboard
        </Link>
        <Link href="/ledger" className="text-gray-700 hover:text-gray-900 transition">
          Ledger
        </Link>
        <Link href="/accounts" className="text-gray-700 hover:text-gray-900 transition">
          Accounts
        </Link>
        <Link href="/admin" className="text-gray-700 hover:text-gray-900 transition">
          Admin
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          Login
        </Button>
        <Button variant="primary" size="sm">
          Register
        </Button>

        {/* Mobile Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:hidden">
              ☰
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="md:hidden">
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/ledger">Ledger</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/accounts">Accounts</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/admin">Admin</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
