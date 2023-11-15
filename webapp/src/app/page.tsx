"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isInputValid(searchTerm)) {
      router.push(`/result?term=${encodeURIComponent(searchTerm)}`);
    } else {
      setSearchTerm("");
      alert("Invalid input detected.");
    }
  };

  const isInputValid = (input: string): boolean => {
    // Basic validation logic here
    // Prevent XSS and SQL Injection
    return !/<script>|<\/script>|SELECT|INSERT|DELETE|UPDATE/i.test(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Home;
