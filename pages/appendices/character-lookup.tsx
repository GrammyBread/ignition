import { GetStaticProps } from "next";
import { getCharacterPage, getCharacters } from "../../src/lib/api/client";
import * as React from "react";
import Layout from "../../src/components/Main/Layout";
import { CleanedNavigation } from "../../src/interfaces/read/cleaned-types.interface";
import NotFoundPage from "../../src/components/Error/NotFound";
import { Character } from "../../src/interfaces/appendices/character.interface";
import {
  Autocomplete,
  TextField,
  Stack,
  Grid,
  Typography,
  CardHeader,
  Card,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CharacterCard from "../../src/components/CharacterSearch/CharacterCard/CharacterCard";
import getCleanSiteData from "../../src/lib/api/sitedata/cache-site-data";
import { AppendixPage } from "../../src/interfaces/appendices/documents.interface";
import { useRouter } from "next/router";
import { PublicBackground } from "../../public/backgroundImage";
import { CharacterSearchHeader } from "../../src/components/CharacterSearch/CharacterSearchHeader/CharacterSearchHeader";

interface Props {
  navData: CleanedNavigation;
  characters: Character[];
  pageDetails: AppendixPage;
}

const CharacterSearch = (props: Props): JSX.Element => {
  const router = useRouter();
  const theme = useTheme();
  const [filterName, setFilterName] = React.useState<string | null>("");
  const isGiantScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isLargerScreen = useMediaQuery("(min-width:760px)", { noSsr: true });
  const STATION = "STATION";

  if (
    props == undefined ||
    props.navData == undefined ||
    props.characters == undefined
  ) {
    return <NotFoundPage requestedItem={`Character Page`} />;
  }

  const baseURL = router.asPath
    ? `${props.navData.domain}${router.asPath}`
    : props.navData.domain;

  const characterNames = props.characters.map((character) => {
    const stationName =
      character.metadata.name.station_name &&
        character.metadata.name.station_image.url
        ? ` ${character.metadata.name.station_name.toUpperCase()} ${STATION}`
        : "";
    return `${character.metadata.name.first_name.toUpperCase()} ${character.metadata.name.additional_names
      }${stationName}`;
  });

  return (
    <Layout backgroundImageUrl={PublicBackground}>
      <Stack spacing={2}>
        <Card>
          <CardHeader
            sx={{
              background: "black",
            }}
            title={
              <Typography
                gutterBottom
                variant="h2"
                component="h1"
                textAlign={"center"}
                sx={{ lineHeight: "1" }}
              >
                {props.pageDetails.title}
              </Typography>
            }
          />
          <CharacterSearchHeader
            isGiantScreen={isGiantScreen}
            isLargerScreen={isLargerScreen}
            aboutTitle="About This Appendix Item"
            aboutHTML={props.pageDetails.content}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={characterNames}
            onChange={(event: any, newValue: string | null) => {
              if (newValue?.includes(STATION)) {
                let nameParts = newValue.split(" ");
                setFilterName(`${nameParts[0]} ${nameParts[1]}`);
                return;
              }
              if (newValue) setFilterName(newValue);
              else setFilterName(null);
            }}
            sx={{
              maxWidth: "400",
              margin: "1rem",
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search by Name" />
            )}
          />
        </Card>
        <Grid
          container
          spacing={2}
          sx={{
            paddingRight: "2rem",
          }}
        >
          {props.characters.length > 0 &&
            props.characters
              .filter(
                (character) =>
                  !filterName ||
                  (filterName &&
                    `${character.metadata.name.first_name.toUpperCase()} ${character.metadata.name.additional_names
                      }`.includes(filterName))
              )
              .map((character) => {
                return (
                  <Grid
                    key={character.id}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2}
                    xl={2}
                  >
                    <CharacterCard
                      baseURL={baseURL}
                      info={character}
                    ></CharacterCard>
                  </Grid>
                );
              })}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default CharacterSearch;

export const getStaticProps: GetStaticProps = async (context) => {
  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  const characterResults = await getCharacters();
  const pageDetails = await getCharacterPage();

  return {
    props: {
      navData: cleanSiteData.getSimpleNav(),
      characters: characterResults,
      pageDetails,
    } as Props,
    revalidate: 30 * 24 * 60 * 60,
  };
};
