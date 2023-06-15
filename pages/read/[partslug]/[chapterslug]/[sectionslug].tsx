import { GetStaticProps, GetStaticPaths } from "next";
import { getSectionData } from "../../../../src/lib/api/client";
import * as React from "react";
import Layout from "../../../../src/components/Main/Layout";
import { GetRequestedResource } from "../../../../src/lib/api/shared";
import NotFoundPage from "../../../../src/components/Error/specialty/NotFound";
import { useRouter } from "next/router";
import MapSocialData from "../../../../src/mappers/socials.mapper";
import {
  RedirectTo404,
  RedirectToPatreon,
} from "../../../../src/common/common-redirects";
import getCleanSiteData from "../../../../src/lib/api/sitedata/cache-site-data";
import { CosmicSection } from "../../../../src/interfaces/read/cosmic/cosmic-metadata.interfaces";
import { NavigationItem, PublishStatus } from "../../../../src/interfaces/read/nav-data.interfaces";
import { CompletePageProps } from "../../../_app";

interface SectionPageProps extends CompletePageProps {
  section: CosmicSection;
  sectionNavigation: NavigationItem;
}

const Section = (props: SectionPageProps): JSX.Element => {
  const router = useRouter();
  let requestedRes = GetRequestedResource();

  if (
    !props.navData ||
    !props.sectionNavigation ||
    !props.section ||
    !props.section.metadata.blocks
   ) {
    return <NotFoundPage requestedItem={`Section: ${requestedRes}`} />;
  }

  const scriptURL = router.asPath
    ? `${props.navData.domain}${router.asPath}`
    : props.navData.domain;

  const socialData = props.section.metadata.seo
    ? MapSocialData(props.section.metadata.seo, scriptURL)
    : undefined;

  return (
    <Layout
      backgroundImageUrl={props.section.metadata.images?.background}
      socials={socialData}
    >
    </Layout>
  );
};

export default Section;

export const getStaticProps: GetStaticProps = async (context) => {
  let data: CosmicSection | undefined = undefined;
  let slug = context?.params?.sectionslug;
  if (slug != undefined) {
    data = await getSectionData(slug.toString());
  }

  if (!data?.metadata.publish_details.key) {
    return RedirectTo404();
  }

  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  const relatedSection = cleanSiteData.getRelatedSection(data.metadata.publish_details.key);
  if (!relatedSection || !data.metadata.blocks) {
    return RedirectTo404();
  } else if (relatedSection.status === PublishStatus.PatreonOnly) {
    return RedirectToPatreon();
  }

  return {
    props: {
      navData: cleanSiteData.getCacheableVersion(),
      section: data,
      sectionNavigation: relatedSection

    } as SectionPageProps,
    revalidate: 10 * 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  const availablePaths = cleanSiteData.getAvailableSections();

  return {
    paths: availablePaths,
    fallback: false,
  };
};
