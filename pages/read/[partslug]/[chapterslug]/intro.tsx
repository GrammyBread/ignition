import { GetStaticProps, GetStaticPaths } from 'next';
import { getChapter } from '../../../../src/lib/api/client';
import * as React from 'react';
import Layout from '../../../../src/components/Main/Layout';
import { CosmicChapter } from '../../../../src/interfaces/read/read-metadata.interfaces';
import { GetRequestedResource } from '../../../../src/lib/api/shared';
import NotFoundPage from '../../../../src/components/Error/NotFound';
import ScriptComponent, { ScriptProps } from '../../../../src/components/Script/Script';
import getCleanSiteData from '../../../../src/lib/api/sitedata/cache-site-data';
import { RedirectTo404, RedirectToPatreon } from '../../../../src/common/common-redirects';
import { ItemStatus } from '../../../../src/mappers/availability/state.mappers';
import { CleanedNavigation } from '../../../../src/interfaces/read/cleaned-types.interface';

interface ChapterPath {
  params: {
    partslug: string;
    chapterslug: string;
  }
}

interface Props {
  scriptDetails: ScriptProps;
  navData: CleanedNavigation;
}

const ChapterIntro = (props: Props): JSX.Element => {
  let requestedRes = GetRequestedResource();

  if (props.navData == undefined || props.scriptDetails == undefined) {
    return <NotFoundPage requestedItem={`Chapter Intro: ${requestedRes}`} />
  }

  return (
    <Layout backgroundImageUrl={props.scriptDetails.script.metadata.script_image}>
      <ScriptComponent {...props.scriptDetails}></ScriptComponent>
    </Layout>
  );
};

export default ChapterIntro;

export const getStaticProps: GetStaticProps = async (context) => {
  let data: CosmicChapter | undefined = undefined;
  let slug = context?.params?.chapterslug;
  if (slug != undefined) {
    data = await getChapter(slug.toString());
  }

  if (!data?.id || !data.metadata?.header_scripts) {
    return RedirectTo404();
  }

  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  const relatedChapter = cleanSiteData.getRelatedChapter(data.id);
  if (!relatedChapter) {
    return RedirectTo404();
  }
  else if (relatedChapter.publishStatus == ItemStatus.PatreonOnly) {
    return RedirectToPatreon();
  }

  return {
    props: {
      scriptDetails: {
        script: data.metadata.header_scripts,
        header: data.metadata.header
      } as ScriptProps,
      navData: cleanSiteData.getSimpleNav()
    } as Props,
    revalidate: (10*60*60)
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  let availablePaths = new Array<ChapterPath>();
  cleanSiteData.getSimpleNav(true).data.forEach((part) => {
    part.chapters.forEach((chapter) => {
        availablePaths.push({
          params: chapter.slug.params
        } as ChapterPath)
    })
  });

  return {
    paths: availablePaths,
    fallback: false,
  };
};
