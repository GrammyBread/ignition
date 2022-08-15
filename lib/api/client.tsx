import Cosmic from 'cosmicjs'
import { CosmicQuery } from './query'
import { 
  CosmicChapter, 
  CosmicReadData, 
  CosmicPart, 
  CosmicSection, 
  CosmicSiteData as CosmicNavigation} from '../../interfaces/read/read-metadata.interfaces'
import { 
  makeGetPartQuery, 
  makeGetPartsQuery, 
  makeGetChapterQuery, 
  makeGetSectionQuery, 
  makeGetAvailableChaptersQuery, 
  makeGetAvailableSectionsQuery, 
  makeGetSiteDataQuery as makeGetSiteData } from './readmeta/read-metadata-queries';
import { HomePage } from '../../interfaces/static/home.interfaces'
import { makeGetHomeQuery } from './static/page-queries'
import { makeGetAvailablePartsQuery, makeGetChapterHeaderQuery } from './readmeta/read-metadata-queries';
import { PatreonPage } from '../../interfaces/static/patreon.interface';

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

//Read Stuff
export async function getSiteData(): Promise<CosmicNavigation> {
  let response = await getObjects<CosmicNavigation[]>(makeGetSiteData())
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

export async function getChapterHeaderScript(slug:string): Promise<CosmicChapter> {
  let response = await getObjects<CosmicChapter[]>(makeGetChapterHeaderQuery(slug));
  return response[0];
}

export async function getSectionData(slug:string): Promise<CosmicSection> {
  let response = await getObjects<CosmicSection[]>(makeGetSectionQuery(slug));
  return response[0];
}

//Available Stuff
export async function getAvailableSections(): Promise<CosmicPart[]> {
  let response = await getObjects<CosmicPart[]>(makeGetAvailableSectionsQuery());
  return response;
}

export async function getAvailableChapters(): Promise<CosmicPart[]> {
  let response = await getObjects<CosmicPart[]>(makeGetAvailableChaptersQuery());
  return response;
}

export async function getAvailableParts(): Promise<CosmicPart[]> {
  let response = await getObjects<CosmicPart[]>(makeGetAvailablePartsQuery());
  return response;
}

//Non-Read Pages
export async function getHome(): Promise<HomePage> {
  let response = await getObjects<HomePage[]>(makeGetHomeQuery());
  return response[0];
}

export async function getPatreon(): Promise<PatreonPage> {
  let response = await getObjects<PatreonPage[]>(makeGetHomeQuery());
  return response[0];
}