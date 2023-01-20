import { GetStaticProps, GetStaticPaths } from "next";
import { getSectionData } from "../../../../src/lib/api/client";
import * as React from "react";
import {
  CosmicSection,
  Script,
} from "../../../../src/interfaces/read/read-metadata.interfaces";
import { Section } from "../../../../src/interfaces/read/view-data.interfaces";
import Layout from "../../../../src/components/Main/Layout";
import { GetRequestedResource } from "../../../../src/lib/api/shared";
import NotFoundPage from "../../../../src/components/Error/NotFound";
import { ItemStatus } from "../../../../src/mappers/availability/state.mappers";
import ScriptComponent, {
  ScriptProps,
} from "../../../../src/components/Script/Script";
import { useRouter } from "next/router";
import MapSocialData from "../../../../src/mappers/socials.mapper";
import {
  RedirectTo404,
  RedirectToPatreon,
} from "../../../../src/common/common-redirects";
import getCleanSiteData from "../../../../src/lib/api/sitedata/cache-site-data";
import { CleanedNavigation } from "../../../../src/interfaces/read/cleaned-types.interface";
import { MakeNavigationScript, NavigationScript } from "../../../../src/mappers/availability/nav-script.mappers";

interface SectionPath {
  params: {
    partslug: string;
    chapterslug: string;
    sectionslug: string;
  };
}

interface Props {
  sectionImageURL: string;
  script: Script;
  navData: CleanedNavigation;
  relatedSection: Section;
  previousScript?: NavigationScript;
  nextScript?: NavigationScript;
}

const Section = (props: Props): JSX.Element => {
  const router = useRouter();
  let requestedRes = GetRequestedResource();

  if (
    props.navData == undefined ||
    props.relatedSection == undefined ||
    (props.relatedSection != undefined &&
      props.relatedSection.publishStatus == ItemStatus.Unpublished) ||
    props.script == undefined
  ) {
    return <NotFoundPage requestedItem={`Section: ${requestedRes}`} />;
  }

  const scriptURL = router.asPath
    ? `${props.navData.domain}${router.asPath}`
    : props.navData.domain;


  const socialData = props.script.metadata.social_details
    ? MapSocialData(props.script.metadata.social_details, scriptURL)
    : undefined;
  const scriptProps = {
    script: props.script,
    header: props.relatedSection.header,
    fullURL: scriptURL,
  } as ScriptProps;

  return (
    <Layout
      backgroundImageUrl={scriptProps.script.metadata.script_image}
      socials={socialData}
    >
      <ScriptComponent {...scriptProps} />
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

  if (!data?.id) {
    return RedirectTo404();
  }

  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  const relatedSection = cleanSiteData.getRelatedSection(data.id);
  if (!relatedSection) {
    return RedirectTo404();
  } else if (!data.metadata?.script) {
    return RedirectTo404();
  } else if (relatedSection.publishStatus == ItemStatus.PatreonOnly) {
    return RedirectToPatreon();
  }

  let nextNavigationScript: NavigationScript | undefined;
  if(data.metadata?.next_section) {
    nextNavigationScript = MakeNavigationScript(data.metadata.next_section, cleanSiteData)
  }
 
  let previousNavigationScript: NavigationScript | undefined;
  if(data.metadata?.previous_section) {
    previousNavigationScript = MakeNavigationScript(data.metadata.previous_section, cleanSiteData)
  }

  return {
    props: {
      sectionImageURL:
        data.metadata?.script?.metadata.script_image.url ??
        "/assets/SiteBack.svg",
      relatedSection,
      script: data.metadata.script,
      navData: cleanSiteData.getSimpleNav(),
      nextScript: nextNavigationScript,
      previousScript: previousNavigationScript
    } as Props,
    revalidate: 10 * 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  let availablePaths = new Array<SectionPath>();
  cleanSiteData.getSimpleNav(true).data.forEach((part) => {
    part.chapters.forEach((chapter) => {
      chapter.sections.forEach((section) => {
        availablePaths.push({
          params: section.slug.params,
        } as SectionPath);
      });
    });
  });

  return {
    paths: availablePaths,
    fallback: false,
  };
};
