import React from "react";
import { Oswald, Montserrat_Subrayada } from "@next/font/google";
import { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faTumblr } from "@fortawesome/free-brands-svg-icons";
import { ThemeProvider } from "@mui/material";
import { ignitionThemeDark } from "../src/styles/darkTheme";
import { ignitionThemeLight } from "../src/styles/lightTheme";
import { CleanedNavigation } from "../src/interfaces/read/cleaned-types.interface";
import { CleanSiteData } from "../src/interfaces/read/clean-site-data.class";

// If loading a variable font, you don't need to specify the font weight
const oswald = Oswald({ subsets: ["latin"] });
const montserratSub = Montserrat_Subrayada({
  subsets: ["latin"],
  weight: ["400", "700"],
});

library.add(fab, faTumblr);

export const ThemeModeContext = React.createContext({
  toggleThemeMode: () => { },
});

interface NavigationContextProps {
  navData: CleanedNavigation | undefined
}
export const NavigationContext = React.createContext<CleanedNavigation | undefined>(undefined);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setCurrentTheme] = React.useState(ignitionThemeDark);

  const themeMode = React.useMemo(
    () => ({
      toggleThemeMode: () => {
        setCurrentTheme((prevTheme) =>
          prevTheme === ignitionThemeDark
            ? ignitionThemeLight
            : ignitionThemeDark
        );
      },
    }),
    []
  );

  const handleThemeChange = (isDark: boolean) => {
    setCurrentTheme(isDark ? ignitionThemeDark : ignitionThemeLight);
  };

  const newPageProps = {
    ...pageProps,
    handleThemeChange,
  };

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={currentTheme}>
        <NavigationContext.Provider value={pageProps.navData}>
          <style jsx global>
            {`
              html {
                scroll-behavior: smooth !important;
                font-family: ${oswald.style.fontFamily};
                --header-font: ${montserratSub.style.fontFamily};
                --theme-spacing-one: ${currentTheme.spacing(1)};
                --theme-spacing-three: ${currentTheme.spacing(3)};
                --theme-spacing-six: ${currentTheme.spacing(6)};
                --theme-secondary-light: ${currentTheme.palette.secondary
                .light};
                --theme-primary-main: ${currentTheme.palette.primary.main};
                scroll-behavior: smooth;
              }
              :root {
                --oswald-font: ${oswald.style.fontFamily};
                --montSub-font: ${montserratSub.style.fontFamily};
              }
            `}
          </style>
          <Component {...newPageProps} />
        </NavigationContext.Provider>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
