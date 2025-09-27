"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import getTokenOnLoginAction from "@/actions/getTokenOnLoginAction";
import { APP_ROUTES } from "@/utils/appRoutes";
import { isErrorHandlerResponseType } from "@/utils/errorHandler";
import { useUserStore } from "@/stores/user-store-provider";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const AuthSigninForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUserStore((state) => state);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await getTokenOnLoginAction(email, password);
      if (isErrorHandlerResponseType(user)) throw new Error(user.message);
      updateUser(user);
      router.push(APP_ROUTES.DASHBOARD);
      toast.success("You have successfully logged in.");
    } catch (error) {
      console.error("error", error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default AuthSigninForm;
