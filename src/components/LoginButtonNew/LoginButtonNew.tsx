"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButtonNew = () => {
  const { data: session, status } = useSession();
  // console.log("line:100", session);
  
  return (
    <div className="ml-auto flex gap-2">
      {session?.user ? (
        <>
          <p className="text-sky-600"> {session.user.name}</p>
          <button className="text-red-500" onClick={() => signOut()}>
            Sign Out
          </button>
        </>
      ) : (
        <button className="text-green-600" onClick={() => signIn()}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default LoginButtonNew;