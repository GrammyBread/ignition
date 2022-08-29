import { GetStaticProps } from 'next';
import { CosmicPart } from '../../interfaces/read/read-metadata.interfaces';
import { getCharacters, getParts, getSiteData } from '../../lib/api/client';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../styles/shared.module.scss';
import PartCard from '../../components/PartCard/PartCard';
import Layout from '../../components/Main/Layout';
import MapSiteData from '../../mappers/nav.mapper';
import { CleanedNavigation } from '../../interfaces/read/cleaned-types.interface';
import { Part } from '../../interfaces/read/view-data.interfaces';
import NotFoundPage from '../../components/Error/NotFound';
import { Character } from '../../interfaces/static/character.interface';
import { Autocomplete, TextField, Paper, Stack, Grid } from '@mui/material';
import CharacterCard from '../../components/CharacterCard/CharacterCard';

interface Props {
  navData: CleanedNavigation;
  characters: Character[];
}

const Characters = (props: Props): JSX.Element => {
  const STATION = "STATION";

  if (props == undefined || props.navData == undefined || props.characters == undefined) {
    return <NotFoundPage requestedItem={`Character Page`} />
  }

  const characterNames = props.characters.map((character) => {
    const stationName = character.metadata.name.station_name && character.metadata.name.station_image.url ?
    ` ${character.metadata.name.station_name.toUpperCase()} ${STATION}` : '';
    return `${character.metadata.name.first_name.toUpperCase()} ${character.metadata.name.additional_names}${stationName}`
  }
  );
  const [value, setValue] = React.useState<string | null>('');

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
                  setValue(`${nameParts[0]} ${nameParts[1]}`);
                  return;
                }
                setValue(newValue);
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
                .filter((character) => !value || value && `${character.metadata.name.first_name.toUpperCase()} ${character.metadata.name.additional_names}`.includes(value))
                .map((character) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
                      <CharacterCard {...character}></CharacterCard>
                    </Grid>
                  );
                })
            }
          </Grid>
        </Stack>
        <Image className={Styles.backgroundImage} src="/assets/SiteBack.svg" layout="fill" objectFit='cover' objectPosition='center' />
      </div>
    </Layout>
  );
};

export default Characters;

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await getSiteData();
  const characterResults = await getCharacters();

  const cleanedNav = MapSiteData(result);

  return {
    props: {
      navData: cleanedNav,
      characters: characterResults
    } as Props,
    revalidate: 120
  };
};