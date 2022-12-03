export const NORMAL_SECTION_PATH = '/read/[partslug]/[chapterslug]/[sectionslug]';
export const INTRO_SECTION_PATH = '/read/[partslug]/[chapterslug]/intro';
export const NORMAL_CHAPTER_PATH = '/read/[partslug]/[chapterslug]';
export const NORMAL_PART_PATH = '/read/[partslug]';

export function FixEpubUrl(cosmicUrl: string): string {
    const newUrl = new URL(cosmicUrl);
    return `/docs/epubs${newUrl.pathname}`;
}

export function MakeSocialUrl(pathname: string, domain: string): string {
    const newUrl = new URL(domain);
    newUrl.pathname = pathname;
    return newUrl.href;
}