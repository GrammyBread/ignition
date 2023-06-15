import path from "path";
import fs from 'fs'
import { promisify } from 'util'
import { getSiteData } from "../client";
import { CleanSiteData } from '../../availability/class/clean-site-data.class';
import { CleanedNavigation } from "../../../interfaces/read/cleaned-types.interface";

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const BLOG_INDEX_CACHE = path.resolve('.next/cache/.clean_site_data')

interface SiteDataCacheObject {
  expiration: string;
  data: CleanedNavigation
}

export default async function getCleanSiteData() {
  let siteDataCacheObject: SiteDataCacheObject | null = null;
  const useCache = process.env.USE_CACHE === 'true'
  const cacheFile = BLOG_INDEX_CACHE;
  let currentTime = new Date();

  if (useCache) {
    try {
      siteDataCacheObject = JSON.parse(await readFile(cacheFile, 'utf8')) as SiteDataCacheObject;
      const expirationDate = new Date(siteDataCacheObject.expiration);
      if (currentTime > expirationDate) siteDataCacheObject = null;
    } catch (_) {
      /* not fatal */
    }
  }

  if (!siteDataCacheObject) {
    try {
      const siteData = await getSiteData();
      currentTime.setDate(currentTime.getDate() + 1);
      currentTime.setHours(1);
      currentTime.setMinutes(0);
      siteDataCacheObject = {
        expiration: currentTime.toString(),
        data: siteData.getCacheableVersion()
      } as SiteDataCacheObject;

    } catch (err) {
      console.warn(
        `Failed to get site data!`
      )
      return null;
    }

    if (useCache) {
      try {
        writeFile(cacheFile, JSON.stringify(siteDataCacheObject), 'utf8').catch(() => { })
      } catch (err) {
        console.warn(
          `could not write to cache file!`
        )
      }
    }
  }

  return siteDataCacheObject.data ? new CleanSiteData(siteDataCacheObject.data) : null;
}