import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpInput } from "@kulsoham/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signUpInput>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof signUpInput, value: string) => {
    setPostInputs({ ...postInputs, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = type === "signup" ? "signup" : "signin";
      const response = await axios.post(
        `${BACKEND_URL}/user/${endpoint}`,
        postInputs
      );

      // Check if response.data and response.data.token are available
      if (response.data && response.data.token) {
        const token = response.data.token; // Access token directly

        localStorage.setItem("token", token);
        navigate(type === "signup" ? "/blogs" : "/blogs");
      } else {
        // Handle missing token case
        throw new Error("Token not found in the response");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-5xl font-bold text-center">
          {type === "signup" ? "Create an Account" : "Sign in to Account"}
        </div>
        <div className="text-2xl text-slate-400 text-center mt-2">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            to={type === "signup" ? "/signin" : "/signup"}
            className="underline ml-2"
          >
            {type === "signup" ? "Sign in" : "Sign up"}
          </Link>
        </div>

        {/* Display error message */}
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        {/* Inputs */}
        {type === "signup" && (
          <LabelledInput
            label="Username"
            placeholder="Enter your username"
            value={postInputs.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        )}
        <LabelledInput
          label="Email"
          placeholder="Enter your email"
          value={postInputs.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <LabelledInput
          label="Password"
          placeholder="Enter your password"
          value={postInputs.password}
          type="password"
          onChange={(e) => handleInputChange("password", e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-md w-full px-5 py-3 mt-4"
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: LabelledInputProps) {
  return (
    <div className="mt-4">
      <label
        htmlFor={label}
        className="block mb-2 text-md font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-3"
        required
      />
    </div>
  );
}

export default Auth;
