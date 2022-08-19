import { GetStaticProps, GetStaticPaths } from 'next';
import { getSiteData, getAvailableChapters, getSectionData } from '../../../../lib/api/client';
import * as React from 'react';
import MapSiteData from '../../../../mappers/nav.mapper';
import { CleanedNavigation } from '../../../../interfaces/read/cleaned-types.interface';
import { CosmicSection } from '../../../../interfaces/read/read-metadata.interfaces';
import { Section, Part } from '../../../../interfaces/read/view-data.interfaces';
import Layout from '../../../../components/Main/Layout';
import { GetRequestedResource } from '../../../../lib/api/shared';
import NotFoundPage from '../../../../components/Error/NotFound';
import { ItemStatus } from '../../../../mappers/availability/state.mappers';
import ScriptComponent, { ScriptProps } from '../../../../components/Script/Script';

interface SectionPath {
  params: {
    partslug: string;
    chapterslug: string;
    sectionslug: string;
  }
}

interface Props {
  section: CosmicSection;
  navData: CleanedNavigation;
  relatedSection: Section;
}

function GetRelatedSection(parts: Part[], id: string): Section | undefined {
  let relatedSection: Section | undefined;
  for (let pi = 0; pi < parts.length && relatedSection == undefined; pi++) {
    let part = parts[pi];
    for (let ci = 0; ci < part.chapters.length && relatedSection == undefined; ci++) {
      let chapter = part.chapters[ci];
      for (let si = 0; ci < chapter.sections.length && relatedSection == undefined; si++) {
        let section = chapter.sections[si];
        if (section.id === id) {
          relatedSection = section;
        }
      }
    }
  }
  return relatedSection;
}

const Section = (props: Props): JSX.Element => {
  let requestedRes = GetRequestedResource();

  let script = props.section.metadata?.script;

  if (props.section.metadata == undefined ||
    props.section.metadata.script == undefined ||
    props.navData == undefined ||
    props.relatedSection == undefined ||
    props.relatedSection != undefined && props.relatedSection.publishStatus == ItemStatus.Unpublished ||
    script == undefined) {
    return <NotFoundPage requestedItem={`Section: ${requestedRes}`} />
  }

  const scriptProps = {
    script: script,
    header: props.relatedSection.header
  } as ScriptProps

  return (
    <Layout navData={props.navData}>
      <ScriptComponent {...scriptProps}></ScriptComponent>
    </Layout>
  );
};

export default Section;

export const getStaticProps: GetStaticProps = async (context) => {
  let data = undefined;
  let navData = await getSiteData();
  let slug = context?.params?.sectionslug;
  if (slug != undefined) {
    data = await getSectionData(slug.toString());
  }

  const cleanedNav = MapSiteData(navData);

  let relatedSection: Section | undefined;
  if (cleanedNav != undefined && data != undefined) {
    relatedSection = GetRelatedSection(cleanedNav.data.parts, data.id);
    if (relatedSection != undefined && relatedSection.publishStatus == ItemStatus.PatreonOnly) {
      return {
        redirect: {
          destination: '/patreon',
          permanent: false,
        },
      }
    }
  }

  return {
    props: {
      section: data,
      navData: cleanedNav,
      relatedSection
    } as Props,
    revalidate: 120
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getAvailableChapters();
  let availablePaths = new Array<SectionPath>();
  result.map((part) => {
    if (part.metadata != undefined) {
      part.metadata.chapters.forEach((chapter) => {
        if (chapter.metadata != undefined) {
          chapter.metadata.sections.forEach((section) => {
            availablePaths.push({
              params: {
                partslug: part.slug,
                chapterslug: chapter.slug,
                sectionslug: section.slug
              }
            } as SectionPath)
          });
        }
      });
    }
  });

  return {
    paths: availablePaths,
    fallback: false,
  };
};
