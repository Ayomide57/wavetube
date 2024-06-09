/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import React from "react";
import Date from "@/components/global/date";

interface IVideoCard {
  newList: any
}

function VideoCard({ newList }: IVideoCard) {
  return (
    <div className="grid grid-cols-3 gap-2 ">
      {newList.map((video: any, index: number) => (
        <Card
          key={index}
          className="flex flex-col justify-between bg-customLightPurple-dark_foreground dark:bg-customPurple-foreground m-2"
        >
          <CardHeader className="flex-row items-center">
            <div className="relative">
              <div className="relative">
                <Link href={`/videoStream?videoId=${video.id}`}>
                  <img
                    src={video.thumbnail_link}
                    alt="Notification"
                    width={500}
                    height={400}
                    className="rounded-lg"
                  />
                </Link>
                <div className="absolute bottom-0 right-0 bg-black bg-opacity-20 text-white px-2 py-1 rounded">
                  <Badge variant={"secondary"}>{
                    (`${video.duration / 60}`).substring(0, 4)
                  }</Badge>
                </div>
              </div>
              <div className="mt-4">
                <Link href={`/videoStream?videoId=${video.id}`}>
                  <CardTitle className=" text-white dark:text-customLightPurple-dark_text text-md font-semibold">
                    {video.title}
                  </CardTitle>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src={"/images/channel.jpg"} />
                <AvatarFallback>img</AvatarFallback>
              </Avatar>
              <span className="text-pink-200 dark:text-gray-600 text-base">
                {video.channel_name}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex text-gray-100 dark:dark:text-gray-500">
            <CardDescription className="tx-sm text-gray-300 dark:dark:text-gray-500">
              {`${video.title}`}
              <br />
              {`views ${video.views}`} <br />
              <Date dateString={video.created_at}></Date>
            </CardDescription>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default VideoCard;
