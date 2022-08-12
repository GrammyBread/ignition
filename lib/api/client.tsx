import Cosmic from 'cosmicjs'
import Error from 'next/error'
import { CosmicQuery } from './query'
import { CosmicResponse } from '../../interfaces/shared.interfaces'
import { CosmicChapter, CosmicSiteData, CosmicPart, CosmicSection } from '../../interfaces/read-metadata.interfaces'
import { makeGetPartQuery, makeGetPartsQuery, makeGetChapterQuery, makeGetSectionQuery, makeGetAvailableChaptersQuery, makeGetAvailableSectionsQuery, makeGetNavigationQuery } from './readmeta/read-metadata-queries';
import { HomePage } from '../../interfaces/home.interfaces'
import { makeGetHomeQuery } from './static/home-queries'

//import page specific queries


const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG
const READ_KEY = process.env.COSMIC_READ_KEY

export const bucket = Cosmic().bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})


async function getObjects<T>(query: CosmicQuery): Promise<T> {
      const data = await bucket.getObjects(query);
      return data.objects;
}

export async function getNavigation(): Promise<CosmicSiteData> {
  let response = await getObjects<CosmicSiteData[]>(makeGetNavigationQuery())
  return response[0];
}

export async function getParts(): Promise<CosmicPart[]> {
  return await getObjects<CosmicPart[]>(makeGetPartsQuery());
}

export async function getPart(slug:string): Promise<CosmicPart> {
  let response = await getObjects<CosmicPart[]>(makeGetPartQuery(slug));
  return response[0];
}

export async function getChapter(slug:string): Promise<CosmicChapter> {
  let response = await getObjects<CosmicChapter[]>(makeGetChapterQuery(slug));
  return response[0];
}

export async function getAvailableChapters(): Promise<CosmicPart[]> {
  let response = await getObjects<CosmicPart[]>(makeGetAvailableChaptersQuery());
  return response;
}

export async function getSection(slug:string): Promise<CosmicSection> {
  let response = await getObjects<CosmicSection[]>(makeGetSectionQuery(slug));
  return response[0];
}

export async function getAvailableSections(): Promise<CosmicPart[]> {
  let response = await getObjects<CosmicPart[]>(makeGetAvailableSectionsQuery());
  return response;
}

export async function getHome(): Promise<HomePage> {
  let response = await getObjects<HomePage[]>(makeGetHomeQuery());
  return response[0];
}