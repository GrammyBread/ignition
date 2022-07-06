import Cosmic from 'cosmicjs'
import Error from 'next/error'
import { CosmicQuery } from './query'
import { Chapter, CosmicResponse, Part, Section } from '../../interfaces/shared'
import {makeGetPartQuery, makeGetPartsQuery, makeGetChapterQuery, makeGetSectionQuery } from './readmeta/read-metadata-queries'

//import page specific queries


const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG
const READ_KEY = process.env.COSMIC_READ_KEY

export const bucket = Cosmic().bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})


async function getObjects<T>(query: CosmicQuery): Promise<T> {
      const data = await bucket.getObjects(query);
      return data.objects[0];
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

export async function getSection(slug:string): Promise<Section> {
  let response = await getObjects<Section[]>(makeGetSectionQuery(slug));
  return response[0];
}