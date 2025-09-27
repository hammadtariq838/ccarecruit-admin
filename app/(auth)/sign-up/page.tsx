import AuthSignupForm from "./SignUp";
import Link from "next/link";
import { APP_ROUTES } from "@/utils/appRoutes";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignUpComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Register Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AuthSignupForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={APP_ROUTES.SIGN_IN}
              className="text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const SignUpPage = () => {
  return <SignUpComponent />;
};

export default SignUpPage;
