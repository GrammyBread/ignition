import * as React from 'react';
import Image from 'next/image';
import { Accordion, AccordionDetails, AccordionSummary, Button, Fade, Paper, Stack, Typography } from '@mui/material';
import { getPatreon, getSiteData } from '../src/lib/api/client';
import { GetStaticProps } from 'next';
import { CleanedNavigation } from '../src/interfaces/read/cleaned-types.interface';
import Layout from '../src/components/Main/Layout';
import { PatreonPage, Reason } from '../src/interfaces/static/patreon.interface';
import NotFoundPage from '../src/components/Error/NotFound';
import { ColorLens, Description, Favorite, MailOutline, VolunteerActivism } from '@mui/icons-material';
import { Circle } from '../src/components/TableOfContents/helper';
import Styles from '../src/styles/patreon.module.scss';
import getCleanSiteData from '../src/lib/api/sitedata/cache-site-data';


interface Props {
    navData: CleanedNavigation;
    pageData: PatreonPage;
}

function MapIcon(id: number) {
    switch (id) {
        case 1:
            return <Description fontSize='large'></Description>;
        case 2:
            return <MailOutline fontSize='large'></MailOutline>;
        case 3:
            return <ColorLens fontSize='large'></ColorLens>;
        case 4:
            return <VolunteerActivism fontSize='large'></VolunteerActivism>;
        default:
            return <Favorite fontSize='large'></Favorite>
    }
}

function GetFeatures(reasons: Reason[]): JSX.Element[] {
    let features = reasons.map((reason) => {
        let iconNum = parseInt(reason.id);
        const icon = MapIcon(iconNum);
        return <Accordion key={iconNum}
            square={true}
            elevation={0}
            disableGutters={true}
            sx={{
                backgroundColor: 'transparent',
                '&:before': {
                    display: 'none',
                }
            }}>
            <AccordionSummary
                aria-controls={`panel${iconNum}-content`}
                id={`panel${iconNum}-header`}
            >
                <Circle sx={{
                    backgroundColor: iconNum % 2 == 0 ? 'primary.main' : 'secondary.main'
                }} className={Styles.reasons__icons}>{icon}</Circle>
                <Typography sx={{ marginLeft: '1rem' }} variant='h6'>{reason.catch.toUpperCase()}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                backgroundColor: iconNum % 2 == 0 ? 'primary.main' : 'secondary.main'
            }}>
                <Typography textAlign='center' variant='subtitle1'>{reason.text}</Typography>
            </AccordionDetails>
        </Accordion>
            ;
    })

    return features;
}

const Patreon = (props: Props): JSX.Element => {
    if (props.navData == undefined || props.pageData == undefined || props.pageData.metadata == undefined) {
        return <NotFoundPage requestedItem='Patreon Subscribe Page' />
    }

    const data = props.pageData.metadata;

    return (
        <Layout navData={props.navData}>
            <React.Fragment>
                <Paper elevation={4} className={Styles.patreonPaper}>
                    <Stack
                        direction="column"
                        spacing={0}
                        className={Styles.top}>
                        <Typography textAlign='center' variant='h4' component='h1'>
                            {data.header}
                        </Typography>
                        <Typography textAlign='center' variant='body1' component='h2'>
                            {data.body}
                        </Typography>
                        <Stack
                            direction="column"
                            spacing={0}
                            className={Styles.reasons}
                        >
                            {GetFeatures(data.reasons)}
                        </Stack>
                        <Button variant="contained" color="warning" href={data.cta.url}>
                            <Typography variant='h6' component='h3'>
                                {data.cta.text}
                            </Typography>
                        </Button>
                    </Stack>
                </Paper>
                <Image className={Styles.backgroundLogo} alt="" src={data.background.url} layout="fill" objectFit='cover' objectPosition='center' />
            </React.Fragment>
        </Layout>);
}

export default Patreon

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    const patreonData = await getPatreon();

    if (!cleanSiteData) {
        throw Error("Could not get site data!")
    }

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            pageData: patreonData
        } as Props,
        revalidate: 120
    };
};