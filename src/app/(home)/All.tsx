"use client";
import VideoCard from "@/components/global/videocard";
import axios from "axios";
import useSWR from "swr";
import { waveTube, storage, BUCKET_ID } from "@/hooks/waveServiceInfo";


const AllVideo = () => {    
  const getAllVideo = async (link: string) => {

      const bucket = storage.bucket(BUCKET_ID || "");

      if (bucket) {
        const fileList = await bucket.listFiles();
        const videosList: any[] | null | undefined = await waveTube.getVideos();
        const newList1: any = [];
        videosList &&
          videosList.forEach((video) => {
            fileList.items.filter(async (file) => {
              if (file.path == `${video.user}/`) {
                const result = await axios.get(
                  `${link}${file.CID}`
                );

                if (result) newList1.push([video, result.data]);
              }
            });
          });
        console.log("newList1 =====================================================", newList1);
        return newList1;
      }
  };
  
    const { data, error, isLoading } = useSWR(
      "https://ipfs.io/ipfs/",
      getAllVideo
    );
  
  if (error) return <div>{ error }</div>;
  if (isLoading) return <div>loading...</div>;


  return <VideoCard newList={data} />;
}

export default AllVideo;