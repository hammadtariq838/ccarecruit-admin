'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AxiosError } from 'axios'
import { changePassword } from '@/requests/client/auth'

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get('new-password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true);
    try {
      const result = await changePassword({ newPassword })
      toast.success(result.message || "Password has been reset successfully")
    } catch (error) {
      console.log('error', error)
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error?.message)
      } else if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      (event.target as HTMLFormElement).reset();
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="new-password"
        type="password"
        placeholder="New Password ..."
        required
      />
      <Input
        name="confirm-password"
        type="password"
        placeholder="Confirm Password ..."
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Updating password...' : 'Update Password'}
      </Button>
    </form>
  )
}

export default ChangePasswordForm
