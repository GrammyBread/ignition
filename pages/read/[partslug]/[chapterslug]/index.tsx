import { GetStaticProps, GetStaticPaths } from "next";
import { getChapter } from "../../../../src/lib/api/client";
import * as React from "react";
import { TableOfContentsProps } from "../../../../src/components/TableOfContents/Table/Table";
import TableOfContents from "../../../../src/components/TableOfContents/Table/Table";
import Layout from "../../../../src/components/Main/Layout";
import {
  CosmicChapter,
  Resource,
} from "../../../../src/interfaces/read/read-metadata.interfaces";
import { Chapter } from "../../../../src/interfaces/read/view-data.interfaces";
import { ChapterProps } from "../../../../src/components/TableOfContents/Chapter/TOCChapter";
import { GetRequestedResource } from "../../../../src/lib/api/shared";
import NotFoundPage from "../../../../src/components/Error/NotFound";
import { ItemStatus } from "../../../../src/mappers/availability/state.mappers";
import getCleanSiteData from "../../../../src/lib/api/sitedata/cache-site-data";
import {
  RedirectTo404,
  RedirectToPatreon,
} from "../../../../src/common/common-redirects";
import { PublicBackground } from "../../../../public/backgroundImage";
import { CleanedNavigation } from "../../../../src/interfaces/read/cleaned-types.interface";

interface ChapterPath {
  params: {
    partslug: string;
    chapterslug: string;
  };
}

interface Props {
  relatedChapter: Chapter;
  navData: CleanedNavigation;
  chapterImage: Resource;
}

const Chapter = (props: Props): JSX.Element => {
  let requestedRes = GetRequestedResource();

  if (
    props.navData == undefined ||
    props.relatedChapter == undefined ||
    (props.relatedChapter != undefined &&
      props.relatedChapter.publishStatus == ItemStatus.Unpublished)
  ) {
    return <NotFoundPage requestedItem={`Chapter: ${requestedRes}`} />;
  }

  let tocProps = {
    chapterProps: {
      showLinkedHeader: false,
      availability: props.relatedChapter,
    } as ChapterProps,
  } as TableOfContentsProps;

  let table = <TableOfContents {...tocProps}></TableOfContents>;

  return <Layout backgroundImageUrl={props.chapterImage}>{table}</Layout>;
};

export default Chapter;

export const getStaticProps: GetStaticProps = async (context) => {
  let data: CosmicChapter | undefined = undefined;
  let slug = context?.params?.chapterslug;
  if (slug != undefined) {
    data = await getChapter(slug.toString());
  }

  if (!data?.id) {
    return RedirectTo404();
  }

  const cleanSiteData = await getCleanSiteData();
  if (!cleanSiteData) {
    throw Error("Could not get site data!");
  }

  const relatedChapter = cleanSiteData.getRelatedChapter(data.id);
  if (!relatedChapter) {
    return RedirectTo404();
  } else if (relatedChapter.publishStatus == ItemStatus.PatreonOnly) {
    return RedirectToPatreon();
  }

  return {
    props: {
      chapterImage: data.metadata?.chapter_image ?? PublicBackground,
      relatedChapter,
      navData: cleanSiteData.getSimpleNav(),
    } as Props,
    revalidate: 10 * 60 * 60,
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
        params: chapter.slug.params,
      } as ChapterPath);
    });
  });

  return {
    paths: availablePaths,
    fallback: false,
  };
};
