import { GetStaticProps } from 'next';
import { getCharacters } from '../../src/lib/api/client';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../src/styles/shared.module.scss';
import Layout from '../../src/components/Main/Layout';
import { CleanedNavigation } from '../../src/interfaces/read/cleaned-types.interface';
import NotFoundPage from '../../src/components/Error/NotFound';
import { Character } from '../../src/interfaces/static/character.interface';
import { 
  Autocomplete, 
  TextField, 
  Paper, 
  Stack, 
  Grid } from '@mui/material';
import CharacterCard from '../../src/components/CharacterCard/CharacterCard';
import getCleanSiteData from '../../src/lib/api/sitedata/cache-site-data';

interface Props {
  navData: CleanedNavigation;
  characters: Character[];
}

const CharacterSearch = (props: Props): JSX.Element => {  
  const [filterName, setFilterName] = React.useState<string>('');
  const STATION = "STATION";

  if (props == undefined || props.navData == undefined || props.characters == undefined) {
    return <NotFoundPage requestedItem={`Character Page`} />
  }

  const characterNames = props.characters.map((character) => {
    const stationName = character.metadata.name.station_name && character.metadata.name.station_image.url ?
    ` ${character.metadata.name.station_name.toUpperCase()} ${STATION}` : '';
    return `${character.metadata.name.first_name.toUpperCase()} ${character.metadata.name.additional_names}${stationName}`
  });

  return (
    <Layout navData={props.navData}>
      <div>
        <Stack spacing={2}>
          <Paper>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={characterNames}
              onChange={(event: any, newValue: string | null) => {
                if(newValue?.includes(STATION))
                {
                  let nameParts = newValue.split(" ");
                  setFilterName(`${nameParts[0]} ${nameParts[1]}`);
                  return;
                }
                if(newValue) setFilterName(newValue);
              }}
              sx={{
                maxWidth: '400'
              }}
              renderInput={(params) => <TextField {...params} label="Name" />}
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
                      <CharacterCard {...character}></CharacterCard>
                    </Grid>
                  );
                })
            }
          </Grid>
        </Stack>
        <Image className={Styles.backgroundImage} alt="" src="/assets/SiteBack.svg" layout="fill" objectFit='cover' objectPosition='center' />
      </div>
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

  return {
    props: {
      navData: cleanSiteData.getSimpleNav(),
      characters: characterResults
    } as Props,
    revalidate: 120
  };
};