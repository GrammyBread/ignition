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
  makeGetSiteDataQuery, 
  makeGetMostRecentSections} from './readmeta/read-metadata-queries';
import { HomePage, PingPage } from '../../interfaces/static/home.interfaces'
import { 
  makeGetHomeQuery, 
  makeGetLicenseQuery, 
  makeGetPatreonQuery } from './static/page-queries'
import { makeGetChapterHeaderQuery } from './readmeta/read-metadata-queries';
import { PatreonPage } from '../../interfaces/static/patreon.interface';
import { Character } from '../../interfaces/appendices/character.interface';
import { CleanSiteData } from '../../interfaces/read/clean-site-data.class';
import CleanUpSiteData from './sitedata/nav.mapper';
import { makeGetAppendicesHome, makeGetArchQuery, makeGetCharacterPageQuery, makeGetCharactersQuery, makeGetLoreDocument, makeGetLoreDocuments, makeGetStationPageQuery, makeGetStationsQuery } from './appendices/appendices-queries';
import { AppendixDocument, AppendixPage, AvailableAppendixDocs } from '../../interfaces/appendices/documents.interface';
import { Arch, Station } from '../../interfaces/appendices/stations.interface';
import { AppendixHome } from '../../interfaces/appendices/home.interface';
import { LicensePage } from '../../interfaces/static/licenses.interfaces';

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG
const READ_KEY = process.env.COSMIC_READ_KEY

export const bucket = Cosmic().bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})

async function getObjects<T>(query: CosmicQuery | any): Promise<T> {
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

export async function getMostRecentSections(): Promise<CosmicSection[]> {
  let response = await getObjects<CosmicSection[]>(makeGetMostRecentSections());
  return response;
}

//Non-Read Pages
export async function getHome(): Promise<HomePage> {
  let response = await getObjects<HomePage[]>(makeGetHomeQuery());
  return response[0];
}

export async function pingCosmic(): Promise<PingPage> {
  let response = await getObjects<PingPage[]>(makeGetHomeQuery());
  return response[0];
}

export async function getPatreon(): Promise<PatreonPage> {
  let response = await getObjects<PatreonPage[]>(makeGetPatreonQuery());
  return response[0];
}

export async function getLicense(): Promise<LicensePage> {
  let response = await getObjects<LicensePage[]>(makeGetLicenseQuery());
  return response[0];
}

export async function getAppendicesHome(): Promise<AppendixHome> {
  let response = await getObjects<AppendixHome[]>(makeGetAppendicesHome());
  return response[0];
}

//Appendices Queries
export async function getCharacters(): Promise<Character[]> {
  let response = await getObjects<Character[]>(makeGetCharactersQuery());
  return response;
}

export async function getCharacterPage(): Promise<AppendixPage> {
  let response = await getObjects<AppendixPage[]>(makeGetCharacterPageQuery());
  return response[0];
}

export async function getAllStations(): Promise<Station[]> {
  let response = await getObjects<Station[]>(makeGetStationsQuery());
  return response;
}

export async function getAllArches(): Promise<Arch[]> {
  let response = await getObjects<Arch[]>(makeGetArchQuery());
  return response;
}

export async function getStationPage(): Promise<AppendixPage> {
  let response = await getObjects<AppendixPage[]>(makeGetStationPageQuery());
  return response[0];
}

export async function getLoreDocument(slug: string): Promise<AppendixDocument> {
  let response = await getObjects<AppendixDocument[]>(makeGetLoreDocument(slug));
  return response[0];
}

export async function getAllAvailableLoreDocs(): Promise<AvailableAppendixDocs[]> {
  let response = await getObjects<AvailableAppendixDocs[]>(makeGetLoreDocuments());
  return response;
}