"use client";
import VideoCard from "@/components/global/videocard";
import WaveTubeService from "@/hooks/WaveTube";
import { Storage, LogLevel, FileStatus, IApillonList } from "@apillon/sdk";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

const AllVideo = () => {
      const storage = new Storage({
        key: process.env.NEXT_PUBLIC_APILLON_API_KEY,
        secret: process.env.NEXT_PUBLIC_APILLON_API_SECRET,
        logLevel: LogLevel.VERBOSE,
      });
  const { address } = useAccount();
  const [newList, updateList] = useState<any>([]);

    const waveTube = new WaveTubeService();
    
    const BUCKET_ID = process.env.NEXT_PUBLIC_APILLON_BUCKET_ID2 && process.env.NEXT_PUBLIC_APILLON_BUCKET_ID2;

    const bucket = storage.bucket(BUCKET_ID || '');
    const getAllVideo = useCallback(async () => {
        if (bucket && address) {
          const fileList = await bucket.listFiles();
          const videosList: any[] | null | undefined =
            await waveTube.getVideos();
          const newList1: any = [];
          videosList && videosList.forEach((video) => {
            fileList.items.filter(async (file) => {
              if (file.path == `${video.user}/`) {
                const result = await axios.get(
                  `https://ipfs.io/ipfs/${file.CID}`
                );

                if (result) newList1.push([video, result.data]);
              }
            });
          });
          updateList(newList1);
          console.log(newList1)
        }
        
        }, []);
  useEffect(() => {
                setTimeout(() => {
        getAllVideo();
              }, 10000); // Clear error after 5 seconds
      
      }, [getAllVideo]);


  return <>{newList && <VideoCard newList={newList} />}</>;
}

export default AllVideo;