import { useState } from "react";
import InputField from "../src/components/InputField";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Name:", name, "Email:", email, "Password:", password);
    // Add registration logic here
  };

  return (
    <div className="neuromorphic w-1/3 mx-auto mt-16 p-8">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister}>
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="neuromorphic w-full p-2 mt-4" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
