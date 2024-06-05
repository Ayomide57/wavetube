import { Formik, Form, Field, ErrorMessage } from "formik";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import WaveTubeService from "@/hooks/WaveTube";
import { useAccount } from "wagmi";
import { UploadToThirdWebStorage } from "@/components/global/UploadThirdWeb";

interface IUserInfo {
  userInfo: any;
}

const UserInfo = ({ userInfo }: IUserInfo) => {

  return (
    <div className="flex space-x-16 p-8 m-24 bg-customLightPurple dark:bg-customPurple-foreground justify-center items-center rounded-md">
      <div className="space-y-6 flex flex-col">
        <div>
          <Avatar className="h-24 w-24 object-cover rounded-full bg-customLightPurple-dark_foreground dark:bg-transparent">
            {userInfo[0] && <AvatarImage src={userInfo[0].pfp} />}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <label htmlFor="username" className="block text-xl dark:text-white">
            Username
          </label>
          <p className="text-gray-500 text-sm">{userInfo[0].username}</p>
        </div>
        <div>
          <label htmlFor="email" className="block text-xl dark:text-white">
            Email
          </label>
          <p className="text-gray-500 text-sm">{userInfo[0].email}</p>
        </div>

        <div>
          <label htmlFor="bio" className="block text-xl dark:text-white">
            Bio
          </label>
          <p className="text-gray-500 text-sm">{userInfo[0].bio}</p>
        </div>

        <div className="flex space-x-6">
          <Button
            type="submit"
            //disabled={isSubmitting}
            className="bg-customLightPurple-dark_foreground dark:bg-black dark:text-white border border-gray-100"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Following and Followers List */}
      <div className="flex flex-col space-y-12">
        <div className="card flex flex-col justify-center items-center space-y-4">
          <h2 className="text-xl font-bold mb-2">Following</h2>
          <div className="flex space-x-4">
            <div className="dark:bg-customPurple card-item p-2 border rounded shadow flex items-center space-x-2">
              <Avatar className="h-12 w-12 object-cover rounded-full">
                <AvatarImage src="/images/channel_1.jpg" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <p>Username 1</p>
            </div>
            <div className="dark:bg-customPurple card-item p-2 border rounded shadow flex items-center space-x-2">
              <Avatar className="h-12 w-12 object-cover rounded-full">
                <AvatarImage src="/images/channel_3.jpg" />
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
              <p>Username 2</p>
            </div>
            {/* Add more following items as needed */}
          </div>
        </div>
        <div className="card flex flex-col justify-center items-center space-y-4">
          <h2 className="text-xl font-bold mb-2">Followers</h2>
          <div className="flex space-x-4">
            <div className="dark:bg-customPurple card-item p-2 border rounded shadow flex items-center space-x-2">
              <Avatar className="h-12 w-12 object-cover rounded-full">
                <AvatarImage src="/images/channel_8.jpg" />
                <AvatarFallback>EF</AvatarFallback>
              </Avatar>
              <p>Username 3</p>
            </div>
            <div className="dark:bg-customPurple card-item p-2 border rounded shadow flex items-center space-x-2">
              <Avatar className="h-12 w-12 object-cover rounded-full">
                <AvatarImage src="/images/channel_6.jpg" />
                <AvatarFallback>GH</AvatarFallback>
              </Avatar>
              <p>Username 4</p>
            </div>
            {/* Add more followers items as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
