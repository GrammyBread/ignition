import * as React from 'react';
import Image from 'next/image';
import Styles from '../styles/shared.module.scss';
import { Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { getPatreon, getSiteData } from '../lib/api/client';
import MapSiteData from '../mappers/nav.mapper';
import { GetStaticProps } from 'next';
import { CleanedNavigation } from '../interfaces/read/cleaned-types.interface';
import Layout from '../components/Main/Layout';
import { PatreonPage } from '../interfaces/static/patreon.interface';
import NotFoundPage from '../components/Error/NotFound';

interface Props {
    navData: CleanedNavigation;
    pageData: PatreonPage;
}

const Patreon = (props: Props): JSX.Element => {    
    if(props.navData == undefined || props.pageData == undefined || props.pageData.metadata == undefined) {
        return <NotFoundPage requestedItem='Patreon Subscribe Page'/>
    }

    return (<>
        <Layout navData={props.navData}>
            <Paper>


            </Paper>
            <Image className={Styles.backgroundImage} src="/assets/Patreon.svg" layout="fill" objectFit='cover' objectPosition='center' />
        </Layout>
    </>);
}

export default Patreon

export const getStaticProps: GetStaticProps = async (context) => {
    const navData = await getSiteData();
    const patreonData = await getPatreon();

    const cleanedNav = MapSiteData(navData);
    return {
        props: {
            navData: cleanedNav,
            pageData: patreonData
        } as Props,
        revalidate: 120
    };
};