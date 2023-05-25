import { GetStaticProps, GetStaticPaths } from "next";
import { getPart } from "../../../src/lib/api/client";
import * as React from "react";
import { TableOfContentsProps } from "../../../src/components/TableOfContents/Table/Table";
import TableOfContents from "../../../src/components/TableOfContents/Table/Table";
import Layout from "../../../src/components/Main/Layout";
import { GetRequestedResource } from "../../../src/lib/api/shared";
import NotFoundPage from "../../../src/components/Error/specialty/NotFound";
import getCleanSiteData from "../../../src/lib/api/sitedata/cache-site-data";
import {
  RedirectTo404,
  RedirectToPatreon,
} from "../../../src/common/common-redirects";
import { PublicBackground } from "../../../public/backgroundImage";
import { CleanedNavigation } from "../../../src/interfaces/read/cleaned-types.interface";
import { Resource, CosmicPart } from '../../../src/interfaces/read/cosmic/cosmic-metadata.interfaces';
import { NavigationPart, PublishStatus } from '../../../src/interfaces/read/nav-data.interfaces';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  partImageUrl: Resource;
  relatedPart: NavigationPart;
  navData: CleanedNavigation;
}

const Part = (props: Props): JSX.Element => {
  let requestedRes = GetRequestedResource();
  if (
    !props.partImageUrl ||
    !props.navData ||
    !props.relatedPart ||
    props.relatedPart.status === PublishStatus.Unpublished
  ) {
    return <NotFoundPage requestedItem={`Part: ${requestedRes}`} />;
  }

  let tocProps = {
    partProps: props.relatedPart,
  } as TableOfContentsProps;

  let table = <TableOfContents {...tocProps}></TableOfContents>;

  return (
    <Layout
      backgroundImageUrl={props.partImageUrl}
    >
      {table}
    </Layout>
  );
};

export default Part;

export const getStaticProps: GetStaticProps = async (context) => {
  let data: CosmicPart | undefined = undefined;
  let slug = context?.params?.partslug;
  if (slug != undefined) {
    data = (await getPart(slug.toString())) as CosmicPart;
  }

  if (!data) {
    return RedirectTo404();
  }

  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  let relatedPart = cleanSiteData.getRelatedPart(data.metadata.metadata.key);
  if (!relatedPart || relatedPart.status == PublishStatus.Unpublished) {
    return RedirectTo404();
  }
  else if (relatedPart.status == PublishStatus.PatreonOnly) {
    return RedirectToPatreon();
  }

  return {
    props: {
      partImageUrl: data.metadata.images?.table_of_contents ?? PublicBackground,
      navData: cleanSiteData.getCacheableVersion(),
      relatedPart,
    } as Props,
    revalidate: (10 * 60 * 60),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cleanSiteData = await getCleanSiteData();

  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  const availablePaths = cleanSiteData.getAvailableParts();

  return {
    paths: availablePaths,
    fallback: false,
  };
};
