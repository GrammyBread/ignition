import { GetStaticProps } from 'next';
import { getCharacterPage, getCharacters } from '../../src/lib/api/client';
import * as React from 'react';
import Layout from '../../src/components/Main/Layout';
import { CleanedNavigation } from '../../src/interfaces/read/cleaned-types.interface';
import NotFoundPage from '../../src/components/Error/NotFound';
import { Character } from '../../src/interfaces/appendices/character.interface';
import {
  Autocomplete,
  TextField,
  Paper,
  Stack,
  Grid,
  Typography,
  Divider
} from '@mui/material';
import CharacterCard from '../../src/components/CharacterCard/CharacterCard';
import getCleanSiteData from '../../src/lib/api/sitedata/cache-site-data';
import { AppendixPage } from '../../src/interfaces/appendices/documents.interface';
import { useRouter } from 'next/router';
import { PublicBackground } from '../../public/backgroundImage';

interface Props {
  navData: CleanedNavigation;
  characters: Character[];
  pageDetails: AppendixPage;
}

const CharacterSearch = (props: Props): JSX.Element => {
  const router = useRouter();
  const [filterName, setFilterName] = React.useState<string | null>('');
  const STATION = "STATION";

  if (props == undefined || props.navData == undefined || props.characters == undefined) {
    return <NotFoundPage requestedItem={`Character Page`} />
  }


  const baseURL = router.asPath ?
    `${props.navData.domain}${router.asPath}` :
    props.navData.domain;

  const characterNames = props.characters.map((character) => {
    const stationName = character.metadata.name.station_name && character.metadata.name.station_image.url ?
      ` ${character.metadata.name.station_name.toUpperCase()} ${STATION}` : '';
    return `${character.metadata.name.first_name.toUpperCase()} ${character.metadata.name.additional_names}${stationName}`
  });

  return (
    <Layout navData={props.navData} backgroundImageUrl={PublicBackground}>
      <Stack spacing={2}>
        <Paper>
          <Typography gutterBottom variant="h2" component="h1" textAlign={"center"} sx={{ lineHeight: "1" }}>
            {props.pageDetails.title}
          </Typography>
          <Divider variant='middle' />
          <Typography gutterBottom variant="body1" component="h2" sx={{ margin: "1rem" }}>
            <div dangerouslySetInnerHTML={{ __html: props.pageDetails.content }} />
          </Typography>
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
              maxWidth: '400',
              margin: "1rem"
            }}
            renderInput={(params) => <TextField {...params} label="Search by Name" />}
          />
        </Paper>
        <Grid container spacing={2} sx={{
          paddingRight: '2rem'
        }}>
          {
            props.characters.length > 0 && props.characters
              .filter((character) => !filterName || filterName && `${character.metadata.name.first_name.toUpperCase()} ${character.metadata.name.additional_names}`.includes(filterName))
              .map((character) => {
                return (
                  <Grid key={character.id} item xs={12} sm={6} md={4} lg={2} xl={2}>
                    <CharacterCard baseURL={baseURL} info={character}></CharacterCard>
                  </Grid>
                );
              })
          }
        </Grid>
      </Stack>
    </Layout>
  );
};

export default CharacterSearch;

export const getStaticProps: GetStaticProps = async (context) => {
  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!")
  }

  const characterResults = await getCharacters();
  const pageDetails = await getCharacterPage();

  return {
    props: {
      navData: cleanSiteData.getSimpleNav(),
      characters: characterResults,
      pageDetails
    } as Props,
    revalidate: (30 * 24 * 60 * 60)
  };
};