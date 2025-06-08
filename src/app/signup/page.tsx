// app/signup/page.tsx
import Link from "next/link";
import { AuthForm } from "../components/auth/authForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code2, UserPlus, ArrowLeft, Zap, Shield, Palette } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6">
        {/* Back Button */}
        <Link 
          href="/login" 
          className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Logo/Brand Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-emerald-600 rounded-xl shadow-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              HTML Generator
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Join thousands of creators building amazing web experiences
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
          
          {/* Signup Card */}
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
            <CardHeader className="space-y-4 pb-6">
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Create your account
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 mt-2">
                  Start building beautiful web pages in minutes
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <AuthForm type="signup" />
              
              <div className="relative">
                <Separator className="my-6" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white dark:bg-slate-800 px-4 text-sm text-slate-500 dark:text-slate-400">
                    Already have an account?
                  </span>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ready to sign in?
                </p>
                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-slate-300 hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-600 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20 transition-all duration-200"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign in to existing account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-emerald-500 to-cyan-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose HTML Generator?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Lightning Fast</h4>
                      <p className="text-sm opacity-90">Generate professional HTML in seconds with AI</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Beautiful Designs</h4>
                      <p className="text-sm opacity-90">Modern, responsive layouts that look amazing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Production Ready</h4>
                      <p className="text-sm opacity-90">Clean, semantic code ready for deployment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-800/50 border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  What&apos;s included in your free account:
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Unlimited HTML generation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Real-time preview & editing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Save & manage projects
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Export production-ready code
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    Community support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>By creating an account, you agree to our <Link href="#" className="underline hover:text-slate-700 dark:hover:text-slate-300">Terms of Service</Link> and <Link href="#" className="underline hover:text-slate-700 dark:hover:text-slate-300">Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  );
}