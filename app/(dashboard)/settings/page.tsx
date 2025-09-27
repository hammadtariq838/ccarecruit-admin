import ChangePasswordForm from "./change-password"
import { Separator } from "@/components/ui/separator"

export default function Settings() {
  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      <Separator />
      <div className="mt-6 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Change Password</h2>
        <div className="space-y-4 max-w-md">
          <ChangePasswordForm />
        </div>
      </div>
      <Separator />
    </div >
  )
}

