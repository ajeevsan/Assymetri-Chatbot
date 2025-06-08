// app/login/page.tsx
import Link from "next/link";
import { AuthForm } from "../components/auth/authForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code2, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
        {/* Logo/Brand Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HTML Generator
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Transform ideas into beautiful web pages
          </p>
        </div>

        {/* Login Card */}
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
          <CardHeader className="space-y-4 pb-6">
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Welcome back
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                Sign in to your account to continue creating
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <AuthForm type="login" />
            
            <div className="relative">
              <Separator className="my-6" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white dark:bg-slate-800 px-4 text-sm text-slate-500 dark:text-slate-400">
                  New here?
                </span>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don&apos;t have an account yet?
              </p>
              <Link href="/signup">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create new account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© 2025 HTML Generator. Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}