import { options } from "../headers";

export async function getMediaData(url: string) {
  const res = await fetch(url, options);
  if (!res.ok)
    throw new Error(`Could not fetch titles`, { cause: res.statusText });
  return res.json();
}
