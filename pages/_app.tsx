import type { AppProps } from 'next/app';
import { Oswald } from '@next/font/google'

// If loading a variable font, you don't need to specify the font weight

const oswald = Oswald();

function MyApp ( { Component, pageProps }: AppProps )
{
  return (
    <main style={{
      fontFamily: oswald.className
    }}>
      <Component { ...pageProps } />;
    </main> 
  );
}

export default MyApp;
