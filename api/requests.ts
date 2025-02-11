"use server";
import { options } from "./headers";

export async function getMediaData(url: string) {
  try {
    const res = await fetch(url, { ...options, cache: "default" });
    const data = await res.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Failed fetch:", { cause: err });
  }
}
