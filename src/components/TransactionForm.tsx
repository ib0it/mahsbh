"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function TransactionForm() {
  const [user] = useAuthState(auth);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, "transactions"), {
        uid: user.uid,
        type,
        amount: parseFloat(amount),
        category,
        date,
        description,
      });
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 bg-white rounded-lg shadow-md"
    >
      <div className="flex justify-around">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`px-4 py-2 rounded-md ${
            type === "expense" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          مصروف
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`px-4 py-2 rounded-md ${
            type === "income" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          دخل
        </button>
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          المبلغ
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          الفئة
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          التاريخ
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          الوصف
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        إضافة
      </button>
    </form>
  );
}
