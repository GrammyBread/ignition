import { GetStaticProps } from 'next';
import { getAllArches, getAllStations } from '../../src/lib/api/client';
import * as React from 'react';
import Layout from '../../src/components/Main/Layout';
import { CleanedNavigation } from '../../src/interfaces/read/cleaned-types.interface';
import NotFoundPage from '../../src/components/Error/NotFound';
import {
    Autocomplete,
    TextField,
    Paper,
    Stack,
    Grid
} from '@mui/material';
import getCleanSiteData from '../../src/lib/api/sitedata/cache-site-data';
import { Arch, Station } from '../../src/interfaces/appendices/stations.interface';
import StationCard from '../../src/components/StationCard/StationCard';

interface Props {
    navData: CleanedNavigation;
    stations: Station[];
    arches: Arch[];
}

const StationSearch = (props: Props): JSX.Element => {
    const [filterName, setFilterName] = React.useState<string | null>('');

    if (props == undefined || props.arches == undefined || props.stations == undefined) {
        return <NotFoundPage requestedItem={`Character Page`} />
    }

    props.stations.sort((a, b) => (a.title < b.title) ? -1 : 1);
    const stationNames = props.stations.map((station) => station.title);

    return (
        <Layout navData={props.navData} backgroundImageUrl={"/assets/SiteBack.svg"}>
            <Stack spacing={2}>
                <Paper>
                    <Autocomplete
                        disablePortal
                        id="search-by-station-box"
                        options={stationNames}
                        onChange={(event: any, newValue: string | null) => {
                            if (newValue) setFilterName(newValue);
                            else setFilterName(null);
                        }}
                        sx={{
                            maxWidth: '400'
                        }}
                        renderInput={(params) => <TextField {...params} label="Search by Station Name" />}
                    />
                </Paper>
                <Grid container spacing={2} sx={{
                    paddingRight: '2rem'
                }}>
                    {
                        props.stations.length > 0 && props.stations
                            .filter((station) => !filterName || filterName && station.title.includes(filterName))
                            .map((station) => {
                                return (
                                    <Grid key={station.id} item xs={6} sm={6} md={4} lg={2} xl={2}>
                                        <StationCard {...station}></StationCard>
                                    </Grid>
                                );
                            })
                    }
                </Grid>
            </Stack>
        </Layout>
    );
};

export default StationSearch;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    if (!cleanSiteData) {
        throw Error("Could not get site data!")
    }

    const normalStations = await getAllStations();
    const archStations = await getAllArches();

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            stations: normalStations,
            arches: archStations
        } as Props,
        revalidate: 120
    };
};