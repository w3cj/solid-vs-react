"use server";

import { ErrorResponse, StoryDefinition, StoryTypes, UserDefinition } from "@/types";

const story = (path: string) => `https://node-hnapi.herokuapp.com/${path}`;
const user = (path: string) =>
  `https://hacker-news.firebaseio.com/v0/${path}.json`;

async function fetchAPI(path: string) {
  const url = path.startsWith("user") ? user(path) : story(path);
  const headers: Record<string, string> = { "User-Agent": "chrome" };

  try {
    let response = await fetch(url, { headers });
    let text = await response.text();

    try {
      if (text === null) {
        return { error: "Not found" };
      }
      const result = JSON.parse(text);
      if (result) return result;
      return { error: "Not found" };
    } catch (e) {
      console.error(`Received from API: ${text}`);
      console.error(e);
      return { error: e };
    }
  } catch (error) {
    return { error };
  }
}

const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
} as const;

export const getStories = async (
  type: StoryTypes,
  page: number
): Promise<StoryDefinition[] | ErrorResponse> => {
  return fetchAPI(`${mapStories[type]}?page=${page}`);
};

export const getStory = async (
  id: string
): Promise<StoryDefinition | ErrorResponse> => {
  return fetchAPI(`item/${id}`);
};

export const getUser = async (
  id: string
): Promise<UserDefinition | ErrorResponse> => {
  return fetchAPI(`user/${id}`);
};
