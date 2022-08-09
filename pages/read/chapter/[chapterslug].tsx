import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getAvailableChapters, getChapter, getNavigation } from '../../../lib/api/client';
import { Chapter, NavigationData, Part } from '../../../interfaces/read-metadata.interfaces';
import TableOfContents, { TableOfContentsProps, TOCChapterCosmicProps, TOCChapterProps } from '../../../components/TableOfContents/TableOfContents';
import Layout from '../../../components/Main/Layout';
import Image from 'next/image';
import Styles from '../../styles/parts.module.scss';

const drawerWidth = 240;

interface ChapterPath
{
  params: {
    partslug: string;
    chapterslug: string;
  };
}

interface Props
{
  chapter: Chapter;
  navData: NavigationData;
}

const Chapter = ( props: Props ): JSX.Element =>
{
  if ( props == undefined )
  {
    return <ErrorPage statusCode={ 404 } />;
  }

  props.navData.navWidth = drawerWidth;

  let tocProps = {
    chapterProps: {
      cosmicProps: {
        chapterData: props.chapter.metadata?.chapter_section_data,
        chapterDetails: props.chapter
      } as TOCChapterCosmicProps
    } as TOCChapterProps
  } as TableOfContentsProps;

  let table = <TableOfContents { ...tocProps }></TableOfContents>;

  return (
    <Layout navData={ props.navData }>
      { table }
      { props.chapter.metadata?.chapter_image?.url &&
        <Image className={ Styles.backgroundImage } src={ props.chapter.metadata.chapter_image.url } layout="fill" objectFit='cover' objectPosition='center' />
      }   </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ( context ) =>
{
  let data = undefined;
  let navData = await getNavigation();
  let slug = context?.params?.chapterslug;
  if ( slug != undefined )
  {
    data = await getChapter( slug.toString() );
  }
  return {
    props: {
      chapter: data,
      navData: navData
    } as Props,
    revalidate: 120
  };
};

export const getStaticPaths: GetStaticPaths = async () =>
{
  const result = await getAvailableChapters() || [];
  let availablePaths = Array<ChapterPath>();
  result.forEach( part =>
  {
    if ( part.metadata?.chapters != null )
    {
      availablePaths.concat( part.metadata.chapters.map( ( chapter ) => ( {
        params: {
          partslug: part.slug,
          chapterslug: chapter.slug,
        }
      } ) )
      );
    }
  } );
  return {
    paths: availablePaths,
    fallback: true,
  };
};

export default Chapter;