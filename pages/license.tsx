import * as React from "react";
import {
    Button,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { getLicense } from "../src/lib/api/client";
import { GetStaticProps } from "next";
import Layout from "../src/components/Main/Layout";
import NotFoundPage from "../src/components/Error/specialty/NotFound";
import Styles from "../src/styles/patreon.module.scss";
import getCleanSiteData from "../src/lib/api/sitedata/cache-site-data";
import { CleanedNavigation } from "../src/interfaces/read/cleaned-types.interface";
import { LicensePage } from "../src/interfaces/static/licenses.interfaces";
import { PublicBackground } from "../public/backgroundImage";

interface Props {
    navData: CleanedNavigation;
    pageData: LicensePage;
}

const License = (props: Props): JSX.Element => {
    if (
        props.navData == undefined ||
        props.pageData == undefined ||
        props.pageData.metadata == undefined
    ) {
        return <NotFoundPage requestedItem="Patreon Subscribe Page" />;
    }

    const data = props.pageData.metadata;

    return (
        <Layout backgroundImageUrl={PublicBackground}>
            <React.Fragment>
            </React.Fragment>
        </Layout>
    );
};

export default License;

export const getStaticProps: GetStaticProps = async (context) => {
    const cleanSiteData = await getCleanSiteData();
    const licenseData = await getLicense();

    if (!cleanSiteData) {
        throw Error("Could not get site data!");
    }

    return {
        props: {
            navData: cleanSiteData.getSimpleNav(),
            pageData: licenseData,
        } as Props,
        revalidate: 120,
    };
};
