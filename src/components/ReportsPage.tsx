"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function ReportsPage() {
  const [user] = useAuthState(auth);
  const [value, loading, error] = useCollection(
    query(
      collection(db, "transactions"),
      where("uid", "==", user?.uid || ""),
      where("type", "==", "expense")
    )
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const transactions = value ? value.docs.map((doc) => doc.data()) : [];
  const categoryData = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as { [key: string]: number });

  const sortedCategories = Object.entries(categoryData).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="p-6 my-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">أكثر الفئات استهلاكاً</h2>
      <ul className="space-y-4">
        {sortedCategories.map(([category, amount]) => (
          <li key={category} className="flex justify-between">
            <p className="font-bold">{category}</p>
            <p className="font-bold text-red-500">{amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
