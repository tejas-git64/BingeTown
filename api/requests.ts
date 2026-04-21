"use server";
import { options } from "./headers";

export async function getMediaData(url: string, signal?: AbortSignal) {
  let updatedOptions = signal ? { ...options, signal } : options;
  try {
    const res = await fetch(url, updatedOptions);
    const data = await res.json();
    return data;
  } catch (err: any) {
    throw new Error("Failed fetch:", { cause: err });
  }
}
