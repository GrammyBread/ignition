import { GetStaticProps, GetStaticPaths } from 'next';
import { getSiteData, getAvailableChapters, getChapter } from '../../../../lib/api/client';
import ErrorPage from 'next/error';
import * as React from 'react';
import Image from 'next/image';
import Styles from '../../../../styles/shared.module.scss';
import { TableOfContentsProps } from '../../../../components/TableOfContents/Table/Table';
import TableOfContents from '../../../../components/TableOfContents/Table/Table';
import Layout from '../../../../components/Main/Layout';
import MapSiteData from '../../../../mappers/nav.mapper';
import { CleanedNavigation } from '../../../../interfaces/read/cleaned-types.interface';
import { CosmicChapter } from '../../../../interfaces/read/read-metadata.interfaces';
import { Chapter, Part } from '../../../../interfaces/read/view-data.interfaces';
import { ChapterProps } from '../../../../components/TableOfContents/Chapter/TOCChapter';
import { GetRequestedResource } from '../../../../lib/api/shared';
import NotFoundPage from '../../../../components/Error/NotFound';
import { ItemStatus } from '../../../../mappers/availability/state.mappers';

interface ChapterPath {
  params: {
    partslug: string;
    chapterslug: string;
  }
}

interface Props {
  chapter: CosmicChapter;
  relatedChapter: Chapter;
  navData: CleanedNavigation;
}

function GetRelatedChapter(parts: Part[], id: string): Chapter | undefined {
  let relatedChapter: Chapter | undefined;
  for (let pi = 0; pi < parts.length && relatedChapter == undefined; pi++) {
    let part = parts[pi];
    for (let ci = 0; ci < part.chapters.length && relatedChapter == undefined; ci++) {
      let chapter = part.chapters[ci];
      if (chapter.id == id) {
        relatedChapter = chapter;
      }
    }
  }
  return relatedChapter;
}

const Chapter = (props: Props): JSX.Element => {
  let requestedRes = GetRequestedResource();

  if (props.chapter?.metadata == undefined || props.navData == undefined || props.relatedChapter == undefined ||
    props.relatedChapter != undefined && props.relatedChapter.publishStatus == ItemStatus.Unpublished) {
    return <NotFoundPage requestedItem={`Chapter: ${requestedRes}`} />
  }

  let tocProps = {
    chapterProps: {
      showLinkedHeader: false,
      availability: props.relatedChapter
    } as ChapterProps
  } as TableOfContentsProps;

  let table = <TableOfContents {...tocProps}></TableOfContents>;

  return (
    <Layout navData={props.navData} backgroundImageUrl={props.chapter.metadata.chapter_image?.url}>
      {table}
    </Layout>
  );
};

export default Chapter;

export const getStaticProps: GetStaticProps = async (context) => {
  let data = undefined;
  let navData = await getSiteData();
  let slug = context?.params?.chapterslug;
  if (slug != undefined) {
    data = await getChapter(slug.toString());
  }

  const cleanedNav = MapSiteData(navData);

  let relatedChapter: Chapter | undefined;
  if (cleanedNav != undefined && data != undefined) {
    relatedChapter = GetRelatedChapter(cleanedNav.data.parts, data.id);
    if (relatedChapter != undefined && relatedChapter.publishStatus == ItemStatus.PatreonOnly) {
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
      chapter: data,
      navData: cleanedNav,
      relatedChapter
    } as Props,
    revalidate: 120
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getAvailableChapters();
  let availablePaths = new Array<ChapterPath>();
  result.map((part) => {
    if (part.metadata != undefined) {
      part.metadata.chapters.map((chapter) => {
        availablePaths.push({
          params: {
            partslug: part.slug,
            chapterslug: chapter.slug
          }
        } as ChapterPath)
      })
    }
  });

  return {
    paths: availablePaths,
    fallback: false,
  };
};
