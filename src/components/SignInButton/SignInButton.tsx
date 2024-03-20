import { signIn, signOut, useSession } from "next-auth/react";
// import { FiLogIn, FiLogOut } from "react-icons/fi"; // Importing icons from React Icons
import { GoSignIn, GoSignOut } from "react-icons/go";
import React from "react";

const SignInButton = () => {
  const { data: session, status } = useSession();

  const getTruncatedName = (name: string) => {
    if (!name || name.length <= 0) {
      return 'Guest';
    } else if (name.length <= 10) {
      return name;
    } else {
      return name.substring(0, 10) + '.';
    }
  };

  return (
    <div className="ml-auto flex gap-2" style={{justifyContent:"center", display:"flex"}}>
      {session?.user ? (
        <>
          <div className="containerSignIn" style={{display:"flex", gap:"10px", justifyContent:"center" }}>
            <p style={{position:"absolute", marginTop:"36px", marginLeft:"4px", color:"black"}} className="text-sky-600">{getTruncatedName(session?.user.name)}</p>
            <button className="text-red-500" onClick={() => signOut()}>
              <GoSignOut className="inline-block align-text-bottom mr-1" />
            </button>
          </div>
        </>
      ) : (
        <button className="text-green-600" onClick={() => signIn()}>
          <GoSignIn className="inline-block align-text-bottom mr-1" />
        </button>
      )}
    </div>
  );
};

export default SignInButton;
