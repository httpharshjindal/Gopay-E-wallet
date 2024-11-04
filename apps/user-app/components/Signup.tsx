"use client";
import { Button } from "@repo/ui/button";
import { GitHubButton } from "@repo/ui/gitHubButton";
import { GoogleButon } from "@repo/ui/googleButton";
import { TextInput } from "@repo/ui/textInput";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const session = useSession()

  return (
    <div className="w-72 border p-5">
      <div className="text-red-700 text-sm flex justify-center items-center">
        {error && <h1>{error}</h1>}
      </div>
      <div>
        <TextInput
          label="Name"
          placeholder="Enter Your Name"
          onChange={(value) => {
            setName(value);
          }}
        />
        <TextInput
          label="Email"
          placeholder="example@gmail.com"
          onChange={(value) => {
            setEmail(value);
          }}
        />
        <TextInput
          label="Phone"
          placeholder="9856599889"
          onChange={(value) => {
            setPhone(value);
          }}
        />
        <TextInput
          label="password"
          placeholder="123456789"
          onChange={(value) => {
            setPassword(value);
          }}
        />
        <TextInput
          label="Confirm Password"
          placeholder="123456789"
          onChange={(value) => {
            setConfirmPassword(value);
          }}
        />

        <Button
          onClick={async () => {
            const res = await signIn("credentials", {
              name,
              email,
              phone,
              password,
              confirmPassword,
              redirect: false,
              action: "signUp",
              callbackUrl: "dashboard",
            });
            if (res?.error) {
              setError(res?.error);
            }
            else{
              router.replace("/dashboard")
            }
          }}
        >
          Signin
        </Button>
      </div>
      <div>
        <GoogleButon />
        <GitHubButton />
      </div>
      <div className="flex justify-center">
        <h1>
          already have an account?{" "}
          <button
            className="text-blue-800"
            onClick={() => {
              router.push("/auth/signin");
            }}
          >
            login
          </button>
        </h1>
      </div>
    </div>
  );
};
