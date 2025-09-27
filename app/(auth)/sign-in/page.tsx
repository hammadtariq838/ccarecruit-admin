import Link from "next/link";
import AuthSigninForm from "./SignIn";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_ROUTES } from "@/utils/appRoutes";

const SignInComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login to your account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AuthSigninForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={APP_ROUTES.SIGN_UP}
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const SignInPage = () => {
  return <SignInComponent />;
};

export default SignInPage;
