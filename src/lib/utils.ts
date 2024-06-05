import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge";
import * as fs from "fs";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface IObjectInfo {
  type: string | undefined;
  id: string | undefined;
}


export const getId = (type: string): string | undefined => {
  try {
    const rawData = fs.readFileSync("./created.json", "utf8");
    const parsedData: IObjectInfo[] = JSON.parse(rawData);
    const typeToId = new Map(parsedData.map((item) => [item.type, item.id]));
    return typeToId.get(type);
  } catch (error) {
    console.error("Error reading the created file:", error);
  }
};

