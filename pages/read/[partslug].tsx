import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error'
import { getPart, getParts } from '../../lib/api/client';
import { Part } from '../../interfaces/read-metadata.interfaces';
import Image from 'next/image';

interface Props {
  part?: Part;
}

const Part = (props: Props): JSX.Element => {
  if (props == undefined) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div>
      <p>You're reached part {props.part?.slug}</p>
      {props.part?.metadata?.table_of_contents_image.url !== undefined &&
        <Image src={props.part?.metadata?.table_of_contents_image.url} width={100} height={100} />
      }
      <p><strong>Log Line:</strong> {props.part?.metadata?.part_logline}</p>
    </div>
  )
};

export default Part;

export const getStaticProps: GetStaticProps = async (context) => {
  let data = undefined;
  let slug = context?.params?.partslug;
  if (slug != undefined) {
    data = await getPart(slug.toString());
  }
  return {
    props: {
      part: data,
    } as Props,
    revalidate: 120
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getParts() || [];
  let availablePaths = result.map((part) => ({
    params: { partslug: part.slug },
  }));
  return {
    paths: availablePaths,
    fallback: false,
  }
};
