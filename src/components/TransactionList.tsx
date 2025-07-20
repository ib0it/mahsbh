"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function TransactionList() {
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

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-2xl font-bold">المعاملات</h2>
      <ul className="space-y-4">
        {value &&
          value.docs.map((doc) => (
            <li
              key={doc.id}
              className="flex justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <div>
                <p className="font-bold">{doc.data().category}</p>
                <p className="text-sm text-gray-500">{doc.data().description}</p>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    doc.data().type === "expense"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {doc.data().amount}
                </p>
                <p className="text-sm text-gray-500">{doc.data().date}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
