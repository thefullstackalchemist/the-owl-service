import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function NewBankAccountForm() {
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    mobileNumber: "",
    bankName: "",
    ifsc: "",
    remarks: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {" "}
      <div>
        {" "}
        <Label htmlFor="name">Name</Label>{" "}
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <Label htmlFor="accountNumber">Account Number</Label>{" "}
        <Input
          type="text"
          id="accountNumber"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          required
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <Label htmlFor="mobileNumber">Mobile Number</Label>{" "}
        <Input
          type="text"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <Label htmlFor="bankName">Bank Name</Label>{" "}
        <Input
          type="text"
          id="bankName"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          required
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <Label htmlFor="ifsc">IFSC Code</Label>{" "}
        <Input
          type="text"
          id="ifsc"
          name="ifsc"
          value={formData.ifsc}
          onChange={handleChange}
          required
        />{" "}
      </div>{" "}
      <div>
        {" "}
        <Label htmlFor="remarks">Remarks / Extra Notes</Label>{" "}
        <Textarea
          id="remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
        />{" "}
      </div>{" "}
      <button type="submit" className="btn-primary">
        {" "}
        Submit{" "}
      </button>{" "}
    </form>
  );
}
