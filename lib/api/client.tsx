import Cosmic from 'cosmicjs'
import Error from 'next/error'
import { CosmicQuery } from './query'
import { CosmicResponse } from '../../interfaces/shared.interfaces'
import { Chapter, Part, Section } from '../../interfaces/read-metadata.interfaces'
import { makeGetPartQuery, makeGetPartsQuery, makeGetChapterQuery, makeGetSectionQuery, makeGetAvailableChapters, makeGetAvailableSections } from './readmeta/read-metadata-queries';
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

export async function getParts(): Promise<Part[]> {
  return await getObjects<Part[]>(makeGetPartsQuery());
}

export async function getPart(slug:string): Promise<Part> {
  let response = await getObjects<Part[]>(makeGetPartQuery(slug));
  return response[0];
}

export async function getChapter(slug:string): Promise<Chapter> {
  let response = await getObjects<Chapter[]>(makeGetChapterQuery(slug));
  return response[0];
}

export async function getAvailableChapters(): Promise<Part[]> {
  let response = await getObjects<Part[]>(makeGetAvailableChapters());
  return response;
}

export async function getSection(slug:string): Promise<Section> {
  let response = await getObjects<Section[]>(makeGetSectionQuery(slug));
  return response[0];
}

export async function getAvailableSections(): Promise<Part[]> {
  let response = await getObjects<Part[]>(makeGetAvailableSections());
  return response;
}

export async function getHome(slug:string): Promise<HomePage> {
  let response = await getObjects<HomePage[]>(makeGetHomeQuery());
  return response[0];
}