import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axios-instance";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: {
    user: { name: string; email: string; image: string };
  } | null = await getServerSession();

  if (!session) {
    redirect("/");
  }

  let email: string = await session?.user?.email;
  
  const res = await axiosInstance.get(`/users/email/${email}`);
  const data = await res.data;
  // redirecting user to the home page if not admin
  if (data.role === "user") {
    redirect("/");
  }

  return <>{children}</>;
}
