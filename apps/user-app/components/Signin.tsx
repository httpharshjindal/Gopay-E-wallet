"use client";
import { Button } from "@repo/ui/button";
import { GitHubButton } from "@repo/ui/gitHubButton";
import { GoogleButon } from "@repo/ui/googleButton";
import { TextInput } from "@repo/ui/textInput";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const session = useSession();
  // if (session) {
  //   router.push("/dashboard");
  //   return <div></div>;
  // }
  return (
    <div className="w-72 border p-5">
      <div className="text-red-700 text-sm flex justify-center items-center">
        {error && <h1>{error}</h1>}
      </div>
      <div>
        <TextInput
          label="Phone"
          placeholder="9856599889"
          onChange={(value) => {
            setEmail(value);
          }}
        />
        <TextInput
          label="password"
          placeholder="123456789"
          onChange={(value) => {
            setPassword(value);
          }}
        />
        <Button
          onClick={async () => {
            const res = await signIn("credentials", {
              email,
              password,
              action: "signIn",
              redirect: false,
              callbackUrl: "dashboard",
            });
            if (res?.error) {
              setError(res?.error);
            } else {
              router.replace("/dashboard");
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
          Don't have an account?
          <button
            className="text-blue-800"
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            Signup
          </button>
        </h1>
      </div>
    </div>
  );
};
