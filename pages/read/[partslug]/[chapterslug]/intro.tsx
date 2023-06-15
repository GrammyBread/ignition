import { GetStaticProps, GetStaticPaths } from 'next';
import { getChapter } from '../../../../src/lib/api/client';
import * as React from 'react';
import Layout from '../../../../src/components/Main/Layout';
import { GetRequestedResource } from '../../../../src/lib/api/shared';
import NotFoundPage from '../../../../src/components/Error/specialty/NotFound';
import getCleanSiteData from '../../../../src/lib/api/sitedata/cache-site-data';
import { RedirectTo404, RedirectToPatreon } from '../../../../src/common/common-redirects';
import { CompletePageProps } from '../../../_app';
import { CosmicChapter } from '../../../../src/interfaces/read/cosmic/cosmic-metadata.interfaces';
import { NavigationChapter, PublishStatus } from '../../../../src/interfaces/read/nav-data.interfaces';

interface ChapterPageProps extends CompletePageProps {
  chapter: CosmicChapter;
  chapterNavigation: NavigationChapter;
}

const ChapterIntro = (props: ChapterPageProps): JSX.Element => {
  let requestedRes = GetRequestedResource();

  if (
    !props.navData ||
    !props.chapterNavigation ||
    !props.chapter.metadata.intro?.metadata?.blocks) {
    return <NotFoundPage requestedItem={`Chapter Intro: ${requestedRes}`} />
  }

  return (
    <Layout backgroundImageUrl={props.chapter.metadata.intro.metadata.images?.background}>
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

  if (!data?.metadata?.metadata?.key) {
    return RedirectTo404();
  }

  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  const relatedChapter = cleanSiteData.getRelatedChapter(data.metadata.metadata.key);
  if (!relatedChapter) {
    return RedirectTo404();
  } else if (relatedChapter.status == PublishStatus.PatreonOnly) {
    return RedirectToPatreon();
  }

  return {
    props: {
      chapter: data,
      chapterNavigation: relatedChapter,
      navData: cleanSiteData.getCacheableVersion(),
    } as ChapterPageProps,
    revalidate: 10 * 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  let availablePaths = cleanSiteData.getAvailableChapters();

  return {
    paths: availablePaths,
    fallback: false,
  };
};
