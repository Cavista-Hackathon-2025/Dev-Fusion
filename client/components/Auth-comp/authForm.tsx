"use client";

import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Client, Account, ID, Models } from "appwrite";

// Validate environment variables
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID) {
  throw new Error("Missing Appwrite configuration");
}

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const account = new Account(client);

// Form validation schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = signInSchema
  .extend({
    username: z.string().min(3, "Username must be at least 3 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
      required_error: "Please select your gender",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;

const AuthForm: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInData | SignUpData>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
  });

  useEffect(() => {
    console.log("Signed-in User:");

    const checkSession = async () => {
      try {
        const user = await account.get();

        const jwt = await account.createJWT();
        
        const verification = await fetch("/api/verify-user", {
          headers: { Authorization: `Bearer ${jwt.jwt}` }
        });

        if (!verification.ok) throw new Error("Session verification failed");

        setRedirecting(true);
        router.push("/");
      } catch (error) {
        await account.deleteSession('current');
        if (window.location.pathname !== '/auth') {
          router.push("/auth");
        }
      }
    };

    checkSession();
  }, [router, redirecting]);

  const handleAuth = async (data: SignInData | SignUpData) => {
    setLoading(true);
    setError("");

    try {
      let user: Models.User<Models.Preferences>;
      let username = "";
      let gender = "";

      if (isSignIn) {
        // Sign in flow
        await account.createEmailPasswordSession(data.email, data.password);
        user = await account.get();
        // console.log("Signed-in User:");

      } else {
        // Sign up flow
        const { username: newUsername, email, password, gender: newGender } = data as SignUpData;
        username = newUsername;
        gender = newGender;
        
        user = await account.create(ID.unique(), email, password, newUsername);
        await account.createEmailPasswordSession(email, password);
      }

      // Sync with backend
      const jwt = await account.createJWT();
      const syncResponse = await fetch("/api/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.jwt}`,
        },
        body: JSON.stringify({
          appwriteId: user.$id,
          email: user.email,
          ...(!isSignIn && { username, gender }),
        }),
      });

      if (!syncResponse.ok) {
        const errorData = await syncResponse.json();
        throw new Error(errorData.error || "Failed to sync user data");
      }

      if (rememberMe) {
        localStorage.setItem("authEmail", data.email);
      } else {
        localStorage.removeItem("authEmail");
      }

      setRedirecting(true);
      router.push("/");
    } catch (err: unknown) {
      await account.deleteSession('current');
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const isSignUpErrors = (
    errors: FieldErrors<SignInData | SignUpData>
  ): errors is FieldErrors<SignUpData> => !isSignIn;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 relative">
            <Image
              src="/logo.svg"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignIn ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(handleAuth)} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {!isSignIn && (
              <>
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    id="username"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    disabled={loading}
                  />
                  {isSignUpErrors(errors) && errors.username && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="sr-only">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    id="gender"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    disabled={loading}
                    defaultValue=""
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {isSignUpErrors(errors) && errors.gender && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                disabled={loading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                disabled={loading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {!isSignIn && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  disabled={loading}
                />
                {isSignUpErrors(errors) && errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? (
                <span>Processing...</span>
              ) : isSignIn ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsSignIn(!isSignIn);
                reset();
              }}
              className="font-medium text-blue-600 hover:text-blue-500"
              disabled={loading}
            >
              {isSignIn
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;