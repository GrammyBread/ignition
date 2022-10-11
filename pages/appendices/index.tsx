import { GetStaticProps } from 'next';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../src/styles/shared.module.scss';
import Layout from '../../src/components/Main/Layout';
import { CleanedNavigation } from '../../src/interfaces/read/cleaned-types.interface';
import NotFoundPage from '../../src/components/Error/NotFound';
import { Paper, Typography } from '@mui/material';
import Link from 'next/link';
import getCleanSiteData from '../../src/lib/api/sitedata/cache-site-data';
import { getAppendicesHome } from '../../src/lib/api/client';
import { AppendixHome } from '../../src/interfaces/appendices/home.interface';

interface Props {
    navData: CleanedNavigation;
    homeData: AppendixHome;
}

const ApendicesHome = (props: Props): JSX.Element => {
    if (props == undefined || props.homeData == undefined) {
        return <NotFoundPage requestedItem={`Appendices`} />
    }

    return (
        <Layout navData={props.navData} backgroundImageUrl={"/assets/SiteBack.svg"}>
            <Paper>
                <Link href="/appendices/characters">
                    <Typography variant='h2'>
                        Character Look Up
                    </Typography>
                </Link>
            </Paper>
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