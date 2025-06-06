// app/login/page.tsx
import { AuthForm } from "../../components/auth/authForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome back</h1>
      <AuthForm type="login" />
    </div>
  );
}
