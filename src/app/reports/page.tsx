import AuthGuard from "@/components/AuthGuard";
import ReportsPage from "@/components/ReportsPage";

export default function Reports() {
  return (
    <AuthGuard>
      <main className="flex min-h-screen flex-col items-center p-4 bg-gray-100">
        <div className="w-full max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold text-center">
            التقارير والتحليلات
          </h1>
          <ReportsPage />
        </div>
      </main>
    </AuthGuard>
  );
}
