'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  type: 'login' | 'signup';
  onAuthResult?: (success: boolean, message?: string) => void;
}

export function AuthForm({ type, onAuthResult }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === "signup") {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" }
        });
        
        if (res.ok) {
          onAuthResult?.(true, 'Account created successfully! Redirecting to login...');
          setTimeout(() => router.push("/login"), 500);
        } else {
          const errorData = await res.json();
          onAuthResult?.(false, errorData.message || 'Failed to create account. Please try again.');
        }
      } else {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        
        if (result?.ok) {
          onAuthResult?.(true, 'Login successful! Welcome back.');
          setTimeout(() => router.push("/chat"), 1500);
        } else if (result?.error) {
          // Handle specific NextAuth errors
          let errorMessage = 'Login failed. Please try again.';
          if (result.error === 'CredentialsSignin') {
            errorMessage = 'Invalid email or password. Please check your credentials.';
          }
          onAuthResult?.(false, errorMessage);
        } else {
          onAuthResult?.(false, 'An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      if(error)
        onAuthResult?.(false, 'Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        disabled={isLoading}
        className="w-full"
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        required
        disabled={isLoading}
        className="w-full"
      />
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {type === 'login' ? 'Signing in...' : 'Creating account...'}
          </>
        ) : (
          type === "signup" ? "Sign Up" : "Log In"
        )}
      </Button>
    </form>
  );
}