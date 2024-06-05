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
import Image from "next/image";
import Link from "next/link";
import React from "react";



export default function VideoCard({ newList }) {


  return (
    <div className="grid grid-cols-3 gap-2 ">
      {newList &&
        newList.map((video: any, index: number) => (
          <Card
            key={index}
            className="flex flex-col justify-between bg-customLightPurple-dark_foreground dark:bg-customPurple-foreground m-2"
          >
            <CardHeader className="flex-row items-center">
              <div className="relative">
                <div className="relative">
                  <Link
                    href={`/videoStream?videoId=${video[0].id}`}
                  >
                    <img
                      src={video[1]}
                      alt="Notification"
                      width={500}
                      height={400}
                      className="rounded-lg"
                    />
                  </Link>
                  <div className="absolute bottom-0 right-0 bg-black bg-opacity-20 text-white px-2 py-1 rounded">
                    <Badge variant={"secondary"}>{"3:00"}</Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <CardTitle className=" text-white dark:text-customLightPurple-dark_text text-md font-semibold">
                    {video[0].title}
                  </CardTitle>
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
                {video.views} views . {video.uploaded_time}
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
