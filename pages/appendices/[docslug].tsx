import { GetStaticProps, GetStaticPaths } from "next";
import * as React from "react";
import { CleanedNavigation } from "../../src/interfaces/read/cleaned-types.interface";
import Layout from "../../src/components/Main/Layout";
import { GetRequestedResource } from "../../src/lib/api/shared";
import NotFoundPage from "../../src/components/Error/NotFound";
import { useRouter } from "next/router";
import MapSocialData from "../../src/mappers/socials.mapper";
import { RedirectTo404 } from "../../src/common/common-redirects";
import getCleanSiteData from "../../src/lib/api/sitedata/cache-site-data";
import {
  getAllAvailableLoreDocs,
  getLoreDocument,
} from "../../src/lib/api/client";
import { AppendixDocument as AppendixDocumentPage } from "../../src/interfaces/appendices/documents.interface";
import ReaderPage from "../../src/components/Appendix/ReaderPage/ReaderPage";
import { MakeSocialUrl } from "../../src/mappers/pathname.mapper";
import CreateEPubReader from "../../src/mappers/epub.mapper";

interface AppendixDocPath {
  params: {
    docslug: string;
  };
}

interface Props {
  document: AppendixDocumentPage;
  navData: CleanedNavigation;
  facebookAppId: string;
  isTest: boolean;
}

const AppendixDocumentPage = (props: Props): JSX.Element => {
  const router = useRouter();
  let requestedRes = GetRequestedResource();

  const appendixURL =
    (router.asPath && MakeSocialUrl(router.asPath, props.navData.domain)) ||
    props.navData.domain;

  if (props.document == undefined) {
    return <NotFoundPage requestedItem={`Section: ${requestedRes}`} />;
  }

  const documentProps = CreateEPubReader(
    props.document,
    appendixURL,
    props.facebookAppId,
    props.document.metadata.background_image.imgix_url,
    props.document.metadata.description
  );

  const socialData = props.document.metadata.social_details
    ? MapSocialData(props.document.metadata.social_details, appendixURL)
    : undefined;

  return (
    <Layout
      navData={props.navData}
      backgroundImageUrl={props.document.metadata.background_image}
      socials={socialData}
      isReadingView={true}
    >
      <ReaderPage {...documentProps}></ReaderPage>
    </Layout>
  );
};

export default AppendixDocumentPage;

export const getStaticProps: GetStaticProps = async (context) => {
  let data: AppendixDocumentPage | undefined = undefined;
  let slug = context?.params?.docslug;
  if (slug != undefined) {
    data = await getLoreDocument(slug.toString());
  }

  if (!data?.metadata) {
    return RedirectTo404();
  }

  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  return {
    props: {
      document: data,
      navData: cleanSiteData.getSimpleNav(),
      facebookAppId: process.env.FACEBOOK_APP_ID,
      isTest: process.env.environment === "local",
    } as Props,
    revalidate: 30 * 24 * 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const availableDocs = await getAllAvailableLoreDocs();

  const availablePaths = availableDocs.map(
    (docs) =>
      ({
        params: {
          docslug: docs.slug,
        },
      } as AppendixDocPath)
  );

  return {
    paths: availablePaths,
    fallback: false,
  };
};
