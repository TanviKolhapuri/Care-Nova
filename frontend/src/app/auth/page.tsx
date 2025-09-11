"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Shield, Users, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface LoginResponse {
  message: string
  token: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

interface ErrorResponse {
  message: string
}

export default function AuthPage() {
  const [loginLoading, setLoginLoading] = useState(false)
  const [signupLoading, setSignupLoading] = useState(false)
  const [loginMessage, setLoginMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [signupMessage, setSignupMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginMessage(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        const loginData = data as LoginResponse
        // Store token in localStorage
        localStorage.setItem("token", loginData.token)
        localStorage.setItem("user", JSON.stringify(loginData.user))

        setLoginMessage({
          type: "success",
          text: `Welcome back, ${loginData.user.name}! Redirecting to dashboard...`,
        })

        // Redirect after 2 seconds
        setTimeout(() => {
          if (loginData.user.role === "admin") {
            window.location.href = "/dashboard/admin"
          } else if (loginData.user.role === "doctor") {
            window.location.href = "/dashboard/doctor"
          } else if (loginData.user.role === "patient") {
            window.location.href = "/dashboard/patient"
          } else {
            window.location.href = "/dashboard"
          }
        }, 2000)

      } else {
        const errorData = data as ErrorResponse
        setLoginMessage({ type: "error", text: errorData.message })
      }
    } catch (error) {
      setLoginMessage({ type: "error", text: "Network error. Please try again." })
    } finally {
      setLoginLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignupLoading(true)
    setSignupMessage(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await response.json()

      if (response.ok) {
        setSignupMessage({
          type: "success",
          text: "Account created successfully! Please login to continue.",
        })
          // Reset form
          ; (e.target as HTMLFormElement).reset()
      } else {
        const errorData = data as ErrorResponse
        setSignupMessage({ type: "error", text: errorData.message })
      }
    } catch (error) {
      setSignupMessage({ type: "error", text: "Network error. Please try again." })
    } finally {
      setSignupLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MediCare System</h1>
          <p className="text-gray-600 mt-2">Hospital Management Portal</p>
        </div>

        {/* Auth Forms */}
        <Card className="shadow-xl">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">Sign in to access your hospital dashboard</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="doctor@hospital.com"
                      required
                      disabled={loginLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      disabled={loginLoading}
                    />
                  </div>

                  {loginMessage && (
                    <Alert
                      className={
                        loginMessage.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }
                    >
                      {loginMessage.type === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription className={loginMessage.type === "success" ? "text-green-800" : "text-red-800"}>
                        {loginMessage.text}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loginLoading}>
                    {loginLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </CardContent>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Join Our Team</CardTitle>
                <CardDescription className="text-center">Create your account to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      name="name"
                      placeholder="Dr. John Smith"
                      required
                      disabled={signupLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="john.smith@hospital.com"
                      required
                      disabled={signupLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      required
                      disabled={signupLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" required disabled={signupLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="receptionist">Receptionist</SelectItem>
                        <SelectItem value="lab-tech">Lab Technician</SelectItem>
                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {signupMessage && (
                    <Alert
                      className={
                        signupMessage.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }
                    >
                      {signupMessage.type === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <AlertDescription
                        className={signupMessage.type === "success" ? "text-green-800" : "text-red-800"}
                      >
                        {signupMessage.text}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={signupLoading}>
                    {signupLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>© 2024 MediCare System. All rights reserved.</p>
          <p className="mt-1">Secure • Reliable • Professional</p>
        </div>
      </div>
    </div>
  )
}
