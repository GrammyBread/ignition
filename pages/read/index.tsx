import { GetStaticProps } from 'next';
import { Part } from '../../interfaces/read-metadata.interfaces';
import { getParts } from '../../lib/api/client';
import ErrorPage from 'next/error';

interface Props {
  parts: Part[];
}

const Parts = (props: Props): JSX.Element => {
  if (props == undefined) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div>
      
    </div>
  );
};

export default Parts;

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await getParts();

  return {
    props: {
      parts: result
    } as Props,
    revalidate: 120
  };
};