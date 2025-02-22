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

// Schema definitions
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = signInSchema
  .extend({
    username: z.string().min(3, "Username must be at least 3 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
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
    const checkSession = async () => {
      try {
        // Direct user check instead of session check
        const user = await account.get();
        
        const jwt = await account.createJWT();
        
        const syncResponse = await fetch("/api/verify-user", {
          headers: { Authorization: `Bearer ${jwt.jwt}` }
        });

        if (!syncResponse.ok) throw new Error("Session verification failed");
        
        router.push("/dashboard");
      } catch (error) {
        await account.deleteSession('current');
        localStorage.removeItem("authEmail");
      }
    };
    
    checkSession();
  }, [router]);

  const handleAppwriteAuth = async (data: SignInData | SignUpData) => {
    setLoading(true);
    setError("");

    try {
      let user: Models.User<Models.Preferences>;
      
      if (isSignIn) {
        await account.createEmailPasswordSession(data.email, data.password);
        user = await account.get();
      } else {
        const { username, email, password } = data as SignUpData;
        user = await account.create(ID.unique(), email, password, username);
        await account.createEmailPasswordSession(email, password);
      }
 
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
          ...(!isSignIn && { username: (data as SignUpData).username }),
        }),
      });

      if (!syncResponse.ok) {
        throw new Error("Failed to sync user data");
      }

      if (rememberMe) {
        localStorage.setItem("authEmail", data.email);
      } else {
        localStorage.removeItem("authEmail");
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      await account.deleteSession('current');
      setError(
        err instanceof Error ? err.message : "Authentication failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const isSignUpErrors = (
    errors: FieldErrors<SignInData | SignUpData>
  ): errors is FieldErrors<SignUpData> => !isSignIn;

  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center bg-gray-50">
      <div className="text-gray-800">
        <div className="flex items-center relative gap-4 justify-center">
          <div className="pulse">
            <Image 
              src="/logo.svg" 
              alt="Logo" 
              width={70} 
              height={70}
              priority
            />
          </div>
          <h1 className="text-3xl font-edu font-bold mb-2">
            Welcome to <span>SafeSpace</span> 😊
          </h1>
        </div>
        <p className="text-xl mb-6 font-nunito text-center">
          Your emotional support web app. Here, you are never alone.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleAppwriteAuth)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {!isSignIn && (
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 mb-1 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            {isSignUpErrors(errors) && errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 mb-1 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-1 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {!isSignIn && (
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mb-1 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            {isSignUpErrors(errors) && errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
            disabled={loading}
          />
          <label htmlFor="rememberMe" className="text-gray-700">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          {isSignIn
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => {
              setIsSignIn(!isSignIn);
              reset();
            }}
            disabled={loading}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;