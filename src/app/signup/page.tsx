// app/signup/page.tsx
import { AuthForm } from "../components/auth/authForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Create an account</h1>
      <AuthForm type="signup" />
    </div>
  );
}
