import { GetStaticProps } from 'next';
import { getAllArches, getAllStations, getStationPage } from '../../src/lib/api/client';
import * as React from 'react';
import Layout from '../../src/components/Main/Layout';
import { CleanedNavigation } from '../../src/interfaces/read/cleaned-types.interface';
import NotFoundPage from '../../src/components/Error/NotFound';
import {
    Autocomplete,
    TextField,
    Paper,
    Stack,
    Grid,
    Typography,
    Divider
} from '@mui/material';
import getCleanSiteData from '../../src/lib/api/sitedata/cache-site-data';
import { Arch, Station } from '../../src/interfaces/appendices/stations.interface';
import StationCard from '../../src/components/StationCard/StationCard';
import { AppendixPage } from '../../src/interfaces/appendices/documents.interface';

interface Props {
    navData: CleanedNavigation;
    stations: Station[];
    arches: Arch[];
    pageDetails: AppendixPage;
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
                    <Typography gutterBottom variant="h2" component="h1" textAlign={"center"} sx={{ lineHeight: "1" }}>
                        {props.pageDetails.title}
                    </Typography>
                    <Divider variant='middle' />
                    <Typography gutterBottom variant="body1" component="h2" sx={{ margin: "1rem" }}>
                        <div dangerouslySetInnerHTML={{ __html: props.pageDetails.content }} />
                    </Typography>
                    <Autocomplete
                        disablePortal
                        id="search-by-station-box"
                        options={stationNames}
                        onChange={(event: any, newValue: string | null) => {
                            if (newValue) setFilterName(newValue);
                            else setFilterName(null);
                        }}
                        sx={{
                            maxWidth: '400',
                            margin: '1rem'
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
    const pageDetails = await getStationPage();

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            stations: normalStations,
            arches: archStations,
            pageDetails
        } as Props,
        revalidate: (30*24*60*60)
    };
};