import { GetStaticProps } from 'next';
import { getParts, getSiteData } from '../../lib/api/client';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../styles/shared.module.scss';
import Layout from '../../components/Main/Layout';
import MapSiteData from '../../mappers/nav.mapper';
import { CleanedNavigation } from '../../interfaces/read/cleaned-types.interface';
import NotFoundPage from '../../components/Error/NotFound';
import { Paper, Typography } from '@mui/material';
import Link from 'next/link';

interface Props {
    navData: CleanedNavigation;
}


const Parts = (props: Props): JSX.Element => {
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
                <Image className={Styles.backgroundImage} src="/assets/SiteBack.svg" layout="fill" objectFit='cover' objectPosition='center' />
            </div>
        </Layout>
    );
};

export default Parts;

export const getStaticProps: GetStaticProps = async (context) => {
    const result = await getSiteData();

    const cleanedNav = MapSiteData(result);
    return {
        props: {
            navData: cleanedNav
        } as Props,
        revalidate: 120
    };
};