import { GetStaticProps } from 'next';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../src/styles/shared.module.scss';
import Layout from '../../src/components/Main/Layout';
import { CleanedNavigation } from '../../src/interfaces/read/cleaned-types.interface';
import NotFoundPage from '../../src/components/Error/NotFound';
import { Divider, Grid, Paper, Typography, useScrollTrigger, Fade } from '@mui/material';
import getCleanSiteData from '../../src/lib/api/sitedata/cache-site-data';
import { getAppendicesHome } from '../../src/lib/api/client';
import { AppendixHome } from '../../src/interfaces/appendices/home.interface';
import SpecialItem, { SpecialItemProps } from '../../src/components/Appendix/HomeItems/SpecialItem';
import DocItemComponent from '../../src/components/Appendix/HomeItems/DocItems';

interface Props {
    navData: CleanedNavigation;
    homeData: AppendixHome;
}

interface HideOnScrollProps {
    threshold: number;
    children: React.ReactElement;
}

interface Background {
    url: string;
    threshold: number;
}

function HideOnScroll({ threshold, children }: HideOnScrollProps) {
    const trigger = useScrollTrigger({
        threshold: threshold
    });

    return (
        <Fade appear={trigger}>
            {children}
        </Fade>
    );
}


const ApendicesHome = (props: Props): JSX.Element => {
    if (props == undefined || props.homeData == undefined) {
        return <NotFoundPage requestedItem={`Appendices`} />
    }

    const characterSearchProps = {
        item: props.homeData.metadata.character_lookup,
        url: "/appendices/character-lookup"
    } as SpecialItemProps;

    const stationSearchProps = {
        item: props.homeData.metadata.station_lookup,
        url: "/appendices/station-lookup"
    } as SpecialItemProps;

    let threshold = 200;
    let backgrounds = props.homeData.metadata.appendix_items.map((item) => ({
        url: item.image.url,
        threshold: threshold + 100
    }));

    backgrounds.push({
        url: props.homeData.metadata.character_lookup.image.url,
        threshold: 100
    });
    backgrounds.push({
        url: props.homeData.metadata.station_lookup.image.url,
        threshold: 200
    });

    return (
        <Layout navData={props.navData} backgroundImageUrl={"/assets/SiteBack.svg"}>
            <Paper sx={{
                padding: "1rem",
                margin: "1rem 0"
            }}>
                <Typography gutterBottom variant="h2" component="h1" textAlign={"center"}
                    sx={{
                        lineHeight: "1"
                    }}>
                    {props.homeData.title}
                </Typography>
                <Divider variant='middle' />
                <Typography gutterBottom variant="body1" component="h2" textAlign={"center"} sx={{ margin: "1rem" }}>
                    <div dangerouslySetInnerHTML={{ __html: props.homeData.content }} />
                </Typography>
            </Paper>
            <Grid container spacing={3}>
                <SpecialItem {...characterSearchProps} />
                <SpecialItem {...stationSearchProps} />
                {props.homeData.metadata.appendix_items.map((item) => <DocItemComponent key={item.document.slug} {...item} />)}
            </Grid>
            {
                backgrounds.map((background) =>
                    <HideOnScroll threshold={background.threshold}>
                        <Image className={Styles.specialBackground} alt="" src={background.url} height={30} width={100} />
                    </HideOnScroll>
                )
            }

        </Layout>
    );
};

export default ApendicesHome;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    if (!cleanSiteData) {
        throw Error("Could not get site data!")
    }

    const appendixHome = await getAppendicesHome();

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            homeData: appendixHome
        } as Props,
        revalidate: 120
    };
};