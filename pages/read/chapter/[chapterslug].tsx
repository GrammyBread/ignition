import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { Chapter } from '../../../interfaces/shared';
import { getChapter } from '../../../lib/api/client';

interface Props
{
  content?: Chapter;
}

const Parts = ( props: Props ): JSX.Element =>
{
  if ( !props.content )
  {
    return <div>Could not render parts?!</div>;
  }

  return (
    <div>
      Got Stuff!
    </div>
  );
};

export default Parts;

export const getStaticProps: GetStaticProps = async ( context ) =>
{
  let chapterSlug = context.params?.chapterslug;

  if ( chapterSlug || chapterSlug === "" || chapterSlug == undefined )
  {
    return {
      props: {
        content: undefined
      } as Props,
      revalidate: 30
    };
  }
  else
  {
    const result = await getChapter( chapterSlug );

    return {
      props: {
        content: result
      } as Props,
      revalidate: 120
    };
  }


};