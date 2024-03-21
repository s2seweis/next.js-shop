import React, { useRef } from "react";
import Button from "./Button";
import TextBox from "./TextBox";
import { signIn } from "next-auth/react";
import Link from 'next/link'; // Import Link from Next.js

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
    <div className="ape" style={{ justifyContent: "center", display: "flex", height: "100vh", alignItems: "center", maxWidth:"300px", margin:"auto" }}>
      <div style={{width:"85%"}} className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <h3>Login</h3>
        <TextBox labelText="User Name" onChange={(e) => (userName.current = e.target.value)} />
        <TextBox labelText="Password" type={"password"} onChange={(e) => (pass.current = e.target.value)} />
        <Link style={{ fontSize: "1rem", marginLeft: "10px" }} href="/register"> {/* Specify the path to your login page */}
          <a style={{ textDecoration: "none", fontSize: "1rem" }} className=''>Go to Register</a>
        </Link>
        <div className="signInButtonContainer" style={{ display: "flex", gap: "15px", marginTop: "10px", justifyContent:"center" }}>
          <Button onClick={onSubmit} style={{ backgroundColor: "#34A853", color: "#fff", padding: "10px 15px", width:"50%" }}>SIGN IN with E-Mail</Button>
          {/* GitHub Sign-In Button */}
          <Button onClick={handleGitHubSignIn} style={{ backgroundColor: "#333", color: "#fff", padding: "10px 15px", width:"50%" }}>
            SIGN IN with GitHub
          </Button>
        </div>
        <div className="signInButtonContainer" style={{ display: "flex", gap: "15px", marginTop: "10px", justifyContent:"center" }}>
          <Button onClick={onSubmit} style={{ backgroundColor: "#FBBC05", color: "#fff", padding: "10px 15px", width:"50%" }}>SIGN IN with Google</Button>
          {/* GitHub Sign-In Button */}
          <Button onClick={handleGitHubSignIn} style={{ backgroundColor: "#4285F4", color: "#fff", padding: "10px 15px", width:"50%" }}>
            SIGN IN with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
