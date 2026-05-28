"use server";
import { options } from "./headers";

export async function getMediaData(url: string, signal?: AbortSignal) {
  const updatedOptions = signal ? { ...options, signal } : options;
  try {
    const res = await fetch(url, updatedOptions);
    const data = await res.json();
    return data;
  } catch (err: unknown) {
    throw new Error("Failed fetch:", { cause: err });
  }
}
