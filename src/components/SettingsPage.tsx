"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

export default function SettingsPage() {
  const [user] = useAuthState(auth);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCategories(docSnap.data().categories || []);
      }
    };
    fetchCategories();
  }, [user]);

  const handleAddCategory = async () => {
    if (!user || !newCategory) return;
    const updatedCategories = [...categories, newCategory];
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, { categories: updatedCategories }, { merge: true });
    setCategories(updatedCategories);
    setNewCategory("");
  };

  const handleDeleteCategory = async (categoryToDelete: string) => {
    if (!user) return;
    const updatedCategories = categories.filter(
      (c) => c !== categoryToDelete
    );
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, { categories: updatedCategories });
    setCategories(updatedCategories);
  };

  return (
    <div className="p-6 my-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">تخصيص الفئات</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="إضافة فئة جديدة"
        />
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md"
        >
          إضافة
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
          >
            <span>{category}</span>
            <button
              onClick={() => handleDeleteCategory(category)}
              className="px-2 py-1 text-sm text-white bg-red-500 rounded-md"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
