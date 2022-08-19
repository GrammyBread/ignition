import { GetStaticProps, GetStaticPaths } from 'next';
import { getSiteData, getAvailableChapters, getChapter } from '../../../../lib/api/client';
import * as React from 'react';
import Layout from '../../../../components/Main/Layout';
import MapSiteData from '../../../../mappers/nav.mapper';
import { CleanedNavigation } from '../../../../interfaces/read/cleaned-types.interface';
import { CosmicChapter } from '../../../../interfaces/read/read-metadata.interfaces';
import { Chapter, Part } from '../../../../interfaces/read/view-data.interfaces';
import { GetRequestedResource } from '../../../../lib/api/shared';
import NotFoundPage from '../../../../components/Error/NotFound';
import ScriptComponent, { ScriptProps } from '../../../../components/Script/Script';

interface ChapterPath {
  params: {
    partslug: string;
    chapterslug: string;
  }
}

interface Props {
  chapter: CosmicChapter;
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

const ChapterIntro = (props: Props): JSX.Element => {
  let requestedRes = GetRequestedResource();
  let relatedChapter;
  if (props.navData != undefined && props.chapter != undefined) {
    relatedChapter = GetRelatedChapter(props.navData.data.parts, props.chapter.id);
  }

  if (props.chapter?.metadata == undefined || props.navData == undefined || relatedChapter == undefined || props.chapter?.metadata.header_scripts == undefined) {
    return <NotFoundPage requestedItem={`Chapter Intro: ${requestedRes}`}/>
  }

  const scriptProps = {
    script: props.chapter.metadata.header_scripts,
    header: props.chapter.metadata.header
  } as ScriptProps;

  return (
    <Layout navData={props.navData}>
      <ScriptComponent {...scriptProps}></ScriptComponent>
    </Layout>
  );
};

export default ChapterIntro;

export const getStaticProps: GetStaticProps = async (context) => {
  let data = undefined;
  let navData = await getSiteData();
  let slug = context?.params?.chapterslug;
  if (slug != undefined) {
    data = await getChapter(slug.toString());
  }

  const cleanedNav = MapSiteData(navData);

  return {
    props: {
      chapter: data,
      navData: cleanedNav
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
