import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPart, getParts } from '../../lib/api/client';
import { Part } from '../../interfaces/read-metadata.interfaces';
import Image from 'next/image';

interface Props {
  content?: Part;
}

const Part = (props: Props): JSX.Element => {
  if (props == undefined) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div>
      <p>You're reached part {props.content?.slug}</p>
      {props.content?.metadata?.table_of_contents_image.url !== undefined &&
        <Image src={props.content?.metadata?.table_of_contents_image.url} width={100} height={100} />
      }
      <p><strong>Log Line:</strong> {props.content?.metadata?.part_logline}</p>
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
      content: data,
    } as Props,
    revalidate: 120
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getParts() || [];
  let availPaths = result.map((part) => ({
    params: { partslug: part.slug },
  }));
  return {
    paths: availPaths,
    fallback: false,
  }
};
