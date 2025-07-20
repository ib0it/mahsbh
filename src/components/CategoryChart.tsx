"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart() {
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

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="p-6 my-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">توزيع المصاريف</h2>
      <Pie data={data} />
    </div>
  );
}
