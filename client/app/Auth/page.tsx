"use client";

import React, { useState, useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form"; // Import FieldErrors
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

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
    path: ["confirmPassword"], // Field to highlight
  });

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;

interface UserInfo {
  id: string;
  name: string;
  email: string;
  // Add other fields as necessary
}

const AuthForm: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // Define userInfo state
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData | SignUpData>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
  });

  // Log userInfo whenever it updates
  useEffect(() => {
    if (userInfo) {
      console.log("User Info updated:", userInfo);
    }
  }, [userInfo]);

  const onSubmit = async (data: SignInData | SignUpData) => {
    const endpoint = isSignIn ? "/login" : "/registration";
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${endpoint}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (!isSignIn) {
          // Handle user info after successful registration
          setUserInfo(responseData.user_info);
        }
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(data));
        }
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isSignUpErrors = (
    errors: FieldErrors<SignInData | SignUpData>
  ): errors is FieldErrors<SignUpData> => {
    return !isSignIn;
  };

  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center bg-gray-50">
      <div className="text-gray-800">
        <div className="flex items-center relative gap-4 justify-center">
          <div className="pulse">
            <Image src="/logo.svg" alt="Logo" height={70} width={70} />
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
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
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
          />
          <label htmlFor="rememberMe" className="text-gray-700">
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-sm text-center mt-4">
          {isSignIn
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
