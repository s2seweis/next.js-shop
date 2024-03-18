import Head from 'next/head';
import styles from '../../src/styles/css/App.module.css';
import { useEffect, useState } from 'react';

const Test: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false);
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if the browser supports the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowInstallButton(true);
    });

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsAppInstalled(true);
    }
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Your PWA Test</title>
      </Head>

      <header className={styles.header}>
        <h1>Welcome to Your PWA Test</h1>
        <p>Enjoy a seamless experience with our progressive web app.</p>
      </header>

      <main className={styles.main}>
        <button id="installButton" onClick={handleInstallClick} disabled={isAppInstalled}>
          {showInstallButton ? 'Install Now' : 'Already Installed'}
        </button>
      </main>
    </div>
  );
};

export default Test;
