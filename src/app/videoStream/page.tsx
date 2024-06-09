"use client";

import { Button } from "@/components/ui/button";
import Comment from "@/components/global/comment";
import { useCallback, useEffect, useState } from "react";
import Date from '@/components/global/date';
import { useSearchParams } from "next/navigation";
import { waveTube, storage, BUCKET_ID } from "@/hooks/waveServiceInfo";
import Link from 'next/link';
import { useAccount } from 'wagmi';
import axios from "axios";

export default function VideoStream() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [videoDetail, updateVideo] = useState<any>();
  const router = useSearchParams();
  const videoId = router.get("videoId");
  const [linkVideo, updateVideoLink] = useState<any>(null);
  const [linkCID, updateCID] = useState<any>(null);
  const { address } = useAccount();


  const handleFollow = async () => {
    setIsLoading(true);
    setError('');
    try {
      await waveTube.follow({
        user: videoDetail[0].user,
        follower: address,
      });
      alert('Followed successfully');
    } catch (err) {
      setError('Failed to follow');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError('');
    try {
      await waveTube.subscribe({
        user: videoDetail[0].user,
        subscriber: address,
      });
      alert('Subscribed successfully');
    } catch (err) {
      setError('Failed to subscribe');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTip = async () => {
    setIsLoading(true);
    setError('');
    try {
      // await chainTubeService.tip({
      //   Arg0: "user",
      //   Arg1: "amount",
      // });
      alert('Tip sent successfully');
    } catch (err) {
      setError('Failed to send tip');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


      const getAllVideo = useCallback(async () => {
        if (videoId) {
          const videosList = await waveTube.getSingleVideos(videoId);
          updateVideo(videosList);
        }
      }, [videoId]);
  useEffect(() => {    
    getAllVideo();
    if (videoDetail) {
      window.localStorage.setItem("NftName",videoDetail[0].title);
      const result = axios.get(`https://ipfs.io/ipfs/${videoDetail[0].link}`);
      updateCID(`https://ipfs.io/ipfs/${videoDetail[0].link}`);
      result.then((response) => {
        updateVideoLink(response.data);
      })

    }


  }, [error, linkVideo, getAllVideo, videoDetail]);
  

  return (
    <div className="flex flex-col items-center mt-10 h-full w-full">
      {videoDetail && (
        <div className="w-11/12 lg:w-3/4">
          <div className="relative aspect-w-16 aspect-h-9">
            {linkVideo && (
              <video
                controls
                autoPlay
                className="w-full rounded-lg shadow-lg"
                src={linkVideo}
              ></video>
            )}
          </div>

          <div className="mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">
                {videoDetail[0].title}
              </h2>
              <div className="flex space-x-4">
                <Button
                  className="bg-customPurple-foreground border border-gray-400 text-white px-4 py-2 rounded-md hover:bg-popover"
                  onClick={handleFollow}
                  disabled={isLoading}
                >
                  Follow
                </Button>
                <Button
                  className="bg-customPurple-foreground border border-gray-400 text-white px-4 py-2 rounded-md hover:bg-popover"
                  onClick={handleSubscribe}
                  disabled={isLoading}
                >
                  Subscribe
                </Button>
                <Button
                  className="bg-customPurple-foreground border border-gray-400 text-white px-4 py-2 rounded-md hover:bg-popover"
                  onClick={handleSendTip}
                  disabled={isLoading}
                >
                  Send Tip
                </Button>
                {linkCID && <Link
                  href={`/makeVideoNft?nftlink=${linkCID}`}
                  className="bg-customPurple-foreground border border-gray-400 text-white px-4 py-2 rounded-md hover:bg-popover"
                >
                  Convert To NFT
                </Link>}
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
              <p className="text-sm">
                Uploaded: <Date dateString={videoDetail[0].created_at}></Date>
              </p>
              <p className="text-sm">
                Duration: {`${videoDetail[0].duration / 60}`.substring(0, 4)}
              </p>
              <p className="text-sm">Views: {videoDetail[0].views}</p>
            </div>

            <div className="p-4 rounded-lg mt-6 text-gray-400">
              <p className="text-sm">{videoDetail[0].description}</p>
            </div>

            <div className="p-4 rounded-lg mt-6 w-full space-x-2 space-y-4">
              <h3 className="text-lg font-bold mb-2">Comments</h3>
              <Comment />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
