import AuthGuard from "@/components/AuthGuard";
import SettingsPage from "@/components/SettingsPage";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Settings() {
  return (
    <AuthGuard>
      <main className="flex min-h-screen flex-col items-center p-4 bg-gray-100">
        <div className="w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-center">الإعدادات</h1>
            <ThemeSwitcher />
          </div>
          <SettingsPage />
        </div>
      </main>
    </AuthGuard>
  );
}
