import { GetStaticProps, GetStaticPaths } from "next";
import { CosmicPart } from "../../../src/interfaces/read/read-metadata.interfaces";
import { getPart } from "../../../src/lib/api/client";
import * as React from "react";
import { TableOfContentsProps } from "../../../src/components/TableOfContents/Table/Table";
import TableOfContents from "../../../src/components/TableOfContents/Table/Table";
import Layout from "../../../src/components/Main/Layout";
import { CleanedNavigation } from "../../../src/interfaces/read/cleaned-types.interface";
import { GetRequestedResource } from "../../../src/lib/api/shared";
import NotFoundPage from "../../../src/components/Error/NotFound";
import { Part } from "../../../src/interfaces/read/view-data.interfaces";
import { ItemStatus } from "../../../src/mappers/availability/state.mappers";
import getCleanSiteData from "../../../src/lib/api/sitedata/cache-site-data";
import {
  RedirectTo404,
  RedirectToPatreon,
} from "../../../src/common/common-redirects";

interface Props {
  partImageUrl: string;
  relatedPart: Part;
  navData: CleanedNavigation;
}

const Part = (props: Props): JSX.Element => {
  let requestedRes = GetRequestedResource();
  if (
    props.partImageUrl == undefined ||
    props.navData == undefined ||
    props.relatedPart == undefined ||
    (props.relatedPart != undefined &&
      props.relatedPart.publishStatus == ItemStatus.Unpublished)
  ) {
    return <NotFoundPage requestedItem={`Part: ${requestedRes}`} />;
  }

  let tocProps = {
    partProps: props.relatedPart,
  } as TableOfContentsProps;

  let table = <TableOfContents {...tocProps}></TableOfContents>;

  return (
    <Layout
      navData={props.navData}
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

  if (!data?.id) {
    return RedirectTo404();
  }
  
  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  let relatedPart = cleanSiteData.getRelatedPart(data.id);
  if (!relatedPart) {
    return RedirectTo404();
  }
  else if (relatedPart.publishStatus == ItemStatus.PatreonOnly) {
    return RedirectToPatreon();
  }

  return {
    props: {
      partImageUrl: data.metadata?.table_of_contents_image.url ?? "/assets/SiteBack.svg",
      navData: cleanSiteData.getSimpleNav(),
      relatedPart,
    } as Props,
    revalidate: (10*60*60),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cleanSiteData = await getCleanSiteData();

  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  let availablePaths = cleanSiteData.getSimpleNav(true).data.map((part) => ({
    params: part.slug.params,
  }));

  return {
    paths: availablePaths,
    fallback: false,
  };
};
