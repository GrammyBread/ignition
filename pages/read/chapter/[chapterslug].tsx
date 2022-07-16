import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getAvailableChapters, getChapter } from '../../../lib/api/client';
import { Chapter, Part } from '../../../interfaces/read-metadata.interfaces';
import Image from 'next/image';
import { ParsedUrlQuery } from 'querystring';

interface ChapterPath {
  params: {
    partslug: string;
    chapterslug: string;
  }
}

interface Props {
  chapter?: Chapter;
}

const Chapter = (props: Props): JSX.Element => {
  if (props == undefined) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div>
      <p>You've reached chapter {props.chapter?.slug}</p>
      {props.chapter?.metadata?.chapter_image !== undefined &&
        <Image src={props.chapter.metadata.chapter_image.url} width={100} />
      }
      <p><strong>Log Line:</strong> {props.chapter?.metadata?.previous_chapter_recap}</p>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  let data = undefined;
  let slug = context?.params?.chapterslug;
  if (slug != undefined) {
    data = await getChapter(slug.toString());
  }
  return {
    props: {
      chapter: data,
    } as Props,
    revalidate: 120
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getAvailableChapters() || [];
  let availablePaths = Array<ChapterPath>();
  result.forEach(part => {
    if (part.metadata?.chapters != null) {
      availablePaths.concat(part.metadata.chapters.map((chapter) => ({
        params: {
          partslug: part.slug,
          chapterslug: chapter.slug,
        }
      }))
      )
    }
  });
  return {
    paths: availablePaths,
    fallback: true,
  }
};

export default Chapter;