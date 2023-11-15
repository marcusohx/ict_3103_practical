"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Result: React.FC = () => {
  const searchParams = useSearchParams();

  const term = searchParams.get("term");

  return (
    <div>
      <p>Search Term: {term}</p>
      <Link href="/">Return to Home</Link>
    </div>
  );
};

export default Result;
