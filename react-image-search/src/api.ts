import { ImageSearchResponse } from "./types";

const API_URL = `https://api.pexels.com/v1/search?per_page=30&query=`;

// Get an API key at: https://www.pexels.com/api/
const authorization = '';

export default async function getImages(searchTerm: string) {
  const response = await fetch(`${API_URL}${searchTerm}`, {
    headers: {
      authorization,
    },
  });
  const json = await response.json() as ImageSearchResponse;
  await new Promise((resolve) => setTimeout(resolve, 500));
  return json.photos || [];
}
