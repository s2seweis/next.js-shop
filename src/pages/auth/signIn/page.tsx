import React, { useRef } from "react";
import Button from "./Button";
import TextBox from "./TextBox";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleGitHubSignIn = async () => {
    await signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="ape" style={{ justifyContent: "center", display: "flex", height:"100vh", alignItems:"center" }}>
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <TextBox labelText="User Name" onChange={(e) => (userName.current = e.target.value)} />
        <TextBox labelText="Password" type={"password"} onChange={(e) => (pass.current = e.target.value)} />
        <Button onClick={onSubmit}>Login</Button>
        {/* GitHub Sign-In Button */}
        <Button onClick={handleGitHubSignIn} style={{ backgroundColor: "#333", color: "#fff" }}>
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
