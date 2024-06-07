import WaveTubeService from "@/hooks/WaveTube";
import { Storage, LogLevel, Nft, FileStatus, IApillonList } from "@apillon/sdk";


const waveTube = new WaveTubeService();
const storage = new Storage({
        key: process.env.NEXT_PUBLIC_APILLON_API_KEY,
        secret: process.env.NEXT_PUBLIC_APILLON_API_SECRET,
        logLevel: LogLevel.VERBOSE,
});
      
const nft = new Nft({
  key: process.env.NEXT_PUBLIC_APILLON_API_KEY,
  secret: process.env.NEXT_PUBLIC_APILLON_API_SECRET,
  logLevel: LogLevel.VERBOSE,
});

const BUCKET_ID =
        process.env.NEXT_PUBLIC_APILLON_BUCKET_ID2 &&
    process.env.NEXT_PUBLIC_APILLON_BUCKET_ID2;
        

export { waveTube, storage, BUCKET_ID, nft };
