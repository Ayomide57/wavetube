import WaveTubeService from "@/hooks/WaveTube";
import { Storage, LogLevel, Nft, FileStatus, IApillonList } from "@apillon/sdk";


const waveTube = new WaveTubeService();
const storage = new Storage({
        key: process.env.NEXT_PUBLIC_APILLON_API_KEY2,
        secret: "6G$noKpfUP3%",
        //secret: `${process.env.NEXT_PUBLIC_APILLON_API_SECRET2}`,
        logLevel: LogLevel.VERBOSE,
});
      
const nft = new Nft({
        key: process.env.NEXT_PUBLIC_APILLON_API_KEY2,
        secret: "6G$noKpfUP3%",
        //secret: `${process.env.NEXT_PUBLIC_APILLON_API_SECRET2}`,
        logLevel: LogLevel.VERBOSE,
});

const BUCKET_ID =
        process.env.NEXT_PUBLIC_APILLON_BUCKET_ID3 &&
    process.env.NEXT_PUBLIC_APILLON_BUCKET_ID3;
        

export { waveTube, storage, BUCKET_ID, nft };
