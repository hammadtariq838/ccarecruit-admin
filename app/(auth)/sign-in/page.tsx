import AuthSigninForm from "./SignIn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      </Card>
    </div>
  );
};

const SignInPage = () => {
  return <SignInComponent />;
};

export default SignInPage;
