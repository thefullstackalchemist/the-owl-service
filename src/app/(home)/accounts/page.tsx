"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./accounts.css";
import { CirclePlus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NewBankAccountForm from "@/components/owl/newBankAccountForm";

export default function AccountDetailsForm() {
  return (
    <Tabs defaultValue="account" className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 rounded-2xl bg-white/80 backdrop-blur-lg shadow-sm border border-gray-100">
        <TabsTrigger value="account" className="data-[state=active]:bg-black/5 data-[state=active]:text-black transition-all duration-300">Account</TabsTrigger>
        <TabsTrigger value="cards" className="data-[state=active]:bg-black/5 data-[state=active]:text-black transition-all duration-300">Cards</TabsTrigger>
        <TabsTrigger value="UPI" className="data-[state=active]:bg-black/5 data-[state=active]:text-black transition-all duration-300">UPI</TabsTrigger>
        <TabsTrigger value="wallets" className="data-[state=active]:bg-black/5 data-[state=active]:text-black transition-all duration-300">Wallets</TabsTrigger>
        <TabsTrigger value="vendors" className="data-[state=active]:bg-black/5 data-[state=active]:text-black transition-all duration-300">Vendors</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 overflow-auto">
          <Sheet>
            <SheetTrigger>
              <Card className="group hover:shadow-xl transition-all duration-500 border border-dashed hover:border-black/20 cursor-pointer h-[220px] flex items-center justify-center bg-white/50 backdrop-blur-md">
                <CirclePlus className="w-10 h-10 text-black/30 group-hover:text-black/70 group-hover:scale-110 transition-all duration-500" />
              </Card>
            </SheetTrigger>
            <SheetContent className="bg-white/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle className="text-3xl font-light">New Account</SheetTitle>
                <SheetDescription className="text-gray-600">
                  Fill the details and click submit
                </SheetDescription>
              </SheetHeader>
              <NewBankAccountForm />
            </SheetContent>
          </Sheet>

          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-500 bg-white/50 backdrop-blur-md h-[220px] group border-transparent hover:border-black/10">
              <CardHeader>
                <CardTitle className="text-xl font-light group-hover:text-black transition-colors">Account {index + 1}</CardTitle>
                <CardDescription className="text-sm text-gray-500">Banking Details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-2xl font-light text-black/80 group-hover:hidden">₹••••••</p>
                  <p className="text-2xl font-light text-black/80 hidden group-hover:block">₹1,23,456</p>
                  <p className="text-sm text-gray-500 tracking-wide">Savings Account</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="password">
        <Card className="max-w-md mx-auto mt-8 bg-white/70 backdrop-blur-xl border-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-light">Password</CardTitle>
            <CardDescription className="text-gray-600">
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current" className="text-sm font-light">Current password</Label>
              <Input id="current" type="password" className="bg-white/80 border-gray-200 focus:border-black/20 transition-colors" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new" className="text-sm font-light">New password</Label>
              <Input id="new" type="password" className="bg-white/80 border-gray-200 focus:border-black/20 transition-colors" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-black hover:bg-black/90 transition-colors text-white">
              Save password
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
