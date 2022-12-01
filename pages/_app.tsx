import React from 'react';
import { Oswald } from '@next/font/google'
import { AppProps } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTumblr } from '@fortawesome/free-brands-svg-icons'
import { useTheme } from '@mui/material';

// If loading a variable font, you don't need to specify the font weight

const oswald = Oswald({ subsets: ["latin"] });

library.add(fab, faTumblr)

export default function MyApp({ Component, pageProps }: AppProps) {
  const theme = useTheme();

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${oswald.style.fontFamily};
          --theme-spacing-three: ${theme.spacing(3)};
          --theme-spacing-six: ${theme.spacing(6)};
          scroll-behavior: smooth;
        }
          :root {
            --oswald-font: ${oswald.style.fontFamily};
          }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
