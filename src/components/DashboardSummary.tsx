"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function DashboardSummary() {
  const [user] = useAuthState(auth);
  const [value, loading, error] = useCollection(
    query(collection(db, "transactions"), where("uid", "==", user?.uid || ""))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const transactions = value ? value.docs.map((doc) => doc.data()) : [];
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 gap-4 p-6 my-6 bg-white rounded-lg shadow-md md:grid-cols-3">
      <div className="p-4 text-center bg-green-100 rounded-lg">
        <h3 className="text-lg font-bold">إجمالي الدخل</h3>
        <p className="text-2xl font-bold text-green-600">{income}</p>
      </div>
      <div className="p-4 text-center bg-red-100 rounded-lg">
        <h3 className="text-lg font-bold">إجمالي المصروفات</h3>
        <p className="text-2xl font-bold text-red-600">{expenses}</p>
      </div>
      <div className="p-4 text-center bg-blue-100 rounded-lg">
        <h3 className="text-lg font-bold">الرصيد الحالي</h3>
        <p className="text-2xl font-bold text-blue-600">{balance}</p>
      </div>
    </div>
  );
}
