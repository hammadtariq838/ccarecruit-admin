"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import getTokenOnSignUpAction from "@/actions/getTokenOnSignUpAction";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_ROUTES } from "@/utils/appRoutes";
import { useUserStore } from "@/stores/user-store-provider";
import { isErrorHandlerResponseType } from "@/utils/errorHandler";

const AuthSignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUserStore((state) => state);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await getTokenOnSignUpAction(name, email, password);
      if (isErrorHandlerResponseType(user)) throw new Error(user.message);
      updateUser(user);
      router.push(APP_ROUTES.DASHBOARD);
      toast.success("Account has been registered successfully!");
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
        name="name"
        type="text"
        placeholder="Name"
        autoComplete="name"
        required
      />
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
        {loading ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
};

export default AuthSignupForm;
