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

interface Props {
    navData: CleanedNavigation;
}

const ApendicesHome = (props: Props): JSX.Element => {
    if (props == undefined || props.navData == undefined) {
        return <NotFoundPage requestedItem={`Appendices`} />
    }

    return (
        <Layout navData={props.navData}>
            <div>
                <Paper>
                    <Link href="/appendices/characters">
                        <Typography variant='h2'>
                            Character Look Up
                        </Typography>
                    </Link>
                </Paper>
                <Image className={Styles.backgroundImage} alt="" src="/assets/SiteBack.svg" layout="fill" objectFit='cover' objectPosition='center' />
            </div>
        </Layout>
    );
};

export default ApendicesHome;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    if (!cleanSiteData) {
        throw Error("Could not get site data!")
    }

    return {
        props: {
            navData: cleanSiteData.getSimpleNav()
        } as Props,
        revalidate: 120
    };
};