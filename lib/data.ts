import { promises as fs } from 'fs';
import path from 'path';

/**
 * Read and parse a JSON file from the data directory
 */
export async function readJsonFile(filename: string) {
  try {
    const filePath = path.join(process.cwd(), 'data', filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw new Error(`Failed to read ${filename}`);
  }
}

/**
 * Get landing page data
 */
export async function getLandingData() {
  return await readJsonFile('landing.json');
}

/**
 * Get dashboard data
 */
export async function getDashboardData() {
  return await readJsonFile('dashboard.json');
}

/**
 * Get chapters data
 */
export async function getChaptersData() {
  const data = await getDashboardData();
  return data.chapters || [];
}

/**
 * Get a specific chapter by ID
 */
export async function getChapterById(id: number) {
  const chapters = await getChaptersData();
  return chapters.find((chapter: any) => chapter.id === id);
}

/**
 * Get partners/professional bodies data
 */
export async function getPartnersData() {
  const data = await getDashboardData();
  return data.partners || {};
}

/**
 * Get internships data
 */
export async function getInternshipsData() {
  const data = await getLandingData();
  return data.internships || {};
}

/**
 * Get news data
 */
export async function getNewsData() {
  const data = await getLandingData();
  return data.news || {};
}

/**
 * Get council data
 */
export async function getCouncilData() {
  const data = await getLandingData();
  return data.council || {};
}

/**
 * Get network/schools data
 */
export async function getNetworkData() {
  const data = await getLandingData();
  return data.network || {};
}

/**
 * Get site configuration
 */
export async function getSiteConfig() {
  const data = await getLandingData();
  return data.site || {};
}

/**
 * Get user data
 */
export async function getUserData() {
  const data = await getDashboardData();
  return data.user || {};
}
