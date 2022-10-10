import Cosmic from 'cosmicjs'
import { CosmicQuery } from './query'
import { 
  CosmicChapter, 
  CosmicPart, 
  CosmicSection, 
  CosmicSiteData} from '../../interfaces/read/read-metadata.interfaces'
import { 
  makeGetPartQuery, 
  makeGetPartsQuery, 
  makeGetChapterQuery, 
  makeGetSectionQuery, 
  makeGetSiteDataQuery } from './readmeta/read-metadata-queries';
import { HomePage } from '../../interfaces/static/home.interfaces'
import { 
  makeGetCharactersQuery, 
  makeGetHomeQuery, 
  makeGetPatreonQuery } from './static/page-queries'
import { makeGetChapterHeaderQuery } from './readmeta/read-metadata-queries';
import { PatreonPage } from '../../interfaces/static/patreon.interface';
import { Character } from '../../interfaces/static/character.interface';
import { CleanSiteData } from '../../interfaces/read/clean-site-data.class';
import CleanUpSiteData from './sitedata/nav.mapper';

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
export async function getSiteData(): Promise<CleanSiteData> {
  let response = await getObjects<CosmicSiteData[]>(makeGetSiteDataQuery())
  let nav = response[0];
  nav.domain = process.env.DOMAIN!;
  return CleanUpSiteData(nav);
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

//Non-Read Pages
export async function getHome(): Promise<HomePage> {
  let response = await getObjects<HomePage[]>(makeGetHomeQuery());
  return response[0];
}

export async function getPatreon(): Promise<PatreonPage> {
  let response = await getObjects<PatreonPage[]>(makeGetPatreonQuery());
  return response[0];
}

export async function getCharacters(): Promise<Character[]> {
  let response = await getObjects<Character[]>(makeGetCharactersQuery());
  return response;
}