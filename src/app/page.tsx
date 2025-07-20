import AuthGuard from "@/components/AuthGuard";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import DashboardSummary from "@/components/DashboardSummary";
import CategoryChart from "@/components/CategoryChart";
import Link from "next/link";

export default function Home() {
  return (
    <AuthGuard>
      <main className="flex min-h-screen flex-col items-center p-4 bg-gray-100">
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-center">
              لوحة التحكم المالية
            </h1>
            <div className="space-x-2">
              <Link href="/reports">
                <a className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                  التقارير
                </a>
              </Link>
              <Link href="/settings">
                <a className="px-4 py-2 font-bold text-white bg-gray-600 rounded-md hover:bg-gray-700">
                  الإعدادات
                </a>
              </Link>
            </div>
          </div>
          <DashboardSummary />
          <CategoryChart />
          <TransactionForm />
          <TransactionList />
        </div>
      </main>
    </AuthGuard>
  );
}
