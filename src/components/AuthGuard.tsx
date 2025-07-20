"use client";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
