import React from 'react';
import { Oswald } from '@next/font/google'
import { AppProps } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faTumblr } from '@fortawesome/free-brands-svg-icons'
import { ThemeProvider } from '@mui/material';
import { ignitionThemeDark } from '../src/styles/darkTheme';
import { ignitionThemeLight } from '../src/styles/lightTheme';

// If loading a variable font, you don't need to specify the font weight

const oswald = Oswald({ subsets: ["latin"] });

library.add(fab, faTumblr)

export const ThemeModeContext = React.createContext({ toggleThemeMode: () => { } });

export default function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = React.useState(ignitionThemeDark);
  const themeMode = React.useMemo(
    () => ({
      toggleThemeMode: () => {
        setCurrentTheme((prevTheme) => (prevTheme === ignitionThemeDark ? ignitionThemeLight : ignitionThemeDark));
      },
    }),
    [],
  );

  const handleThemeChange = (isDark: boolean) => {
    setCurrentTheme(isDark ? ignitionThemeDark : ignitionThemeLight)
  }

  const newPageProps = {
    ...pageProps,
    handleThemeChange
  }

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={currentTheme}>
        <style jsx global>{`
      html {
        scroll-behavior: smooth !important;
        font-family: ${oswald.style.fontFamily};
        --theme-spacing-three: ${currentTheme.spacing(3)};
        --theme-spacing-six: ${currentTheme.spacing(6)};
        --theme-secondary-light: ${currentTheme.palette.secondary.light};
        scroll-behavior: smooth;
      }
      :root {
        --oswald-font: ${oswald.style.fontFamily};
      }
    `}
        </style>
        <Component {...newPageProps} />
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
