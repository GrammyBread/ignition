import { GetStaticProps, GetStaticPaths } from 'next';
import ErrorPage from 'next/error';
import { getSection, getAvailableSections } from '../../../../lib/api/client';
import { CosmicSection, Script } from '../../../../interfaces/read-metadata.interfaces';
import Image from 'next/image';

interface SectionPath {
  params: {
    partslug: string;
    chapterslug: string;
    sectionslug: string;
  }
}

interface Props {
  section?: CosmicSection;
}

const GetScriptData = (script: Script): JSX.Element => {
  return (<div className='scriptBody'>
    <div dangerouslySetInnerHTML={{__html: script.content}}></div>
    <Image src={script.metadata.script_image.url} width={100} />
  </div>
  )
};


const Section = (props: Props): JSX.Element => {
  if (props == undefined) {
    return <ErrorPage statusCode={404} />
  }


  return (
    <div>
      <p>You've reached chapter {props.section?.slug}</p>
      <p>Title: {props.section?.title}</p>
      {props.section?.metadata?.scripts !== undefined &&
        props.section.metadata.scripts.map((script) => {
          return GetScriptData(script);
        })
      }
    </div>
  )
};

export const getStaticProps: GetStaticProps = async (context) => {
  let data = undefined;
  let slug = context?.params?.sectionslug;
  if (slug != undefined) {
    data = await getSection(slug.toString());
  }
  return {
    props: {
      section: data,
    } as Props,
    revalidate: 120
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getAvailableSections() || [];
  let availablePaths = Array<SectionPath>();
  result.forEach(part => {
    if (part.metadata?.chapters != null) {
      part.metadata.chapters.forEach(chapter => {
        if (chapter.metadata?.sections != null) {
          availablePaths.concat(chapter.metadata.sections.map((section) => ({
            params: {
              partslug: part.slug,
              chapterslug: chapter.slug,
              sectionslug: section.slug
            }
          }))
          );
        }
      })
    }
  });
  return {
    paths: availablePaths,
    fallback: true,
  }
};

export default CosmicSection;