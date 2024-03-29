import { signIn, signOut, useSession } from 'next-auth/react';
import { GoSignIn, GoSignOut } from 'react-icons/go';
import React from 'react';

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

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signIn/page' }); // Include callbackUrl for sign out
  };

  return (
    <div
      className="ml-auto flex gap-2"
      style={{ justifyContent: 'center', display: 'flex' }}
    >
      {session?.user ? (
        <>
          <div
            className="containerSignIn"
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '-10px',
            }}
          >
            <p
              style={{
                position: 'absolute',
                marginTop: '36px',
                marginLeft: '4px',
                color: 'black',
              }}
              className="text-sky-600"
            >
              {getTruncatedName(session?.user.name)}
            </p>
            <button
              style={{
                background: '#EA4335',
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
              }}
              className="text-red-500"
              onClick={handleSignOut} // Use handleSignOut function for sign out
            >
              <GoSignOut className="inline-block align-text-bottom mr-1" />
            </button>
          </div>
        </>
      ) : (
        <button
          style={{
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            background: '#34A853',
          }}
          className="text-green-600"
          onClick={() => signIn()}
        >
          <GoSignIn className="inline-block align-text-bottom mr-1" />
        </button>
      )}
    </div>
  );
};

export default SignInButton;
