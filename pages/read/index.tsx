import { GetStaticProps } from 'next';
import { Part } from '../../interfaces/read-metadata.interfaces';
import { getParts } from '../../lib/api/client';

interface Props
{
  content: Part[];
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
  const result = await getParts();

  return {
    props: {
      content: result
    } as Props,
    revalidate: 120
  };
};