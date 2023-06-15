import { GetStaticProps, GetStaticPaths } from "next";
import { getChapter } from "../../../../src/lib/api/client";
import * as React from "react";
import { TableOfContentsProps } from "../../../../src/components/TableOfContents/Table/Table";
import TableOfContents from "../../../../src/components/TableOfContents/Table/Table";
import Layout from "../../../../src/components/Main/Layout";
import { GetRequestedResource } from "../../../../src/lib/api/shared";
import NotFoundPage from "../../../../src/components/Error/specialty/NotFound";
import getCleanSiteData from "../../../../src/lib/api/sitedata/cache-site-data";
import {
  RedirectTo404,
  RedirectToPatreon,
} from "../../../../src/common/common-redirects";
import { CosmicChapter } from "../../../../src/interfaces/read/cosmic/cosmic-metadata.interfaces";
import { NavigationChapter, PublishStatus } from "../../../../src/interfaces/read/nav-data.interfaces";
import { CompletePageProps } from "../../../_app";

interface ChapterPageProps extends CompletePageProps {
  chapter: CosmicChapter;
  chapterNavigation: NavigationChapter;
}

const Chapter = (props: ChapterPageProps): JSX.Element => {
  let requestedRes = GetRequestedResource();

  if (
    !props.navData ||
    !props.chapterNavigation ||
    !props.chapter.metadata.metadata.background
  ) {
    return <NotFoundPage requestedItem={`Chapter: ${requestedRes}`} />;
  }


  let table = <TableOfContents chapterProps={{
    content: props.chapterNavigation,
    logline: props.chapter.metadata.recap
  }}></TableOfContents>;

  return <Layout backgroundImageUrl={props.chapter.metadata.metadata.background}>{table}</Layout>;
};

export default Chapter;

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
