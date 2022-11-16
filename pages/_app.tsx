import { Oswald } from '@next/font/google'
import { AppProps } from 'next/app';

// If loading a variable font, you don't need to specify the font weight

const oswald = Oswald({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${oswald.style.fontFamily};
        }
          :root {
            --oswald-font: ${oswald.style.fontFamily};
          }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
