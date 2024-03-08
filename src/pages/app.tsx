// pages/index.tsx
import Head from 'next/head';
import styles from '../../src/styles/css/app.module.css';

const App: React.FC = () => {
  const handleInstall = () => {
    // You can implement the logic for installing the PWA here
    // For simplicity, we're just showing/hiding the install button
    const installButton = document.getElementById('installButton');
    if (installButton) {
      installButton.style.display = 'none';
    }
  };

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Your PWA App</title>
      </Head>

      <header className={styles.header}>
        <h1>Welcome to Your PWA App</h1>
        <p>Enjoy a seamless experience with our progressive web app.</p>
      </header>

      <main className={styles.main}>
        <button id="installButton" onClick={handleInstall}>
          Install App
        </button>
      </main>
    </div>
  );
};

export default App;
