"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import WaveTubeService from "@/hooks/WaveTube";
import { useAccount } from "wagmi";
import { UploadToThirdWebStorage } from "@/components/global/UploadThirdWeb";
import SettingForm from "./Form";
import UserInfo from "./UserInfo";



export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [ipfsLink, updateLink] = useState<any>();
    const [userInfo, setUserInfo] = useState<any>();

  const { address } = useAccount();

  
  // Form validation function
  const validate = (values: { username: any }) => {
    const errors: { username?: string } = {};
    if (!values.username) {
      errors.username = "Username Required";
    }
    return errors;
  };

  const waveTube = new WaveTubeService();

  // Function to handle creating profile

  const handleGetUserInformation = useCallback( async () => {
    const user = await waveTube.getUserInformation(address);
    setUserInfo(user);
  }, [address, waveTube]);


  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    /**if (error) {
      timer = setTimeout(() => {
        setError("");
      }, 5000); // Clear error after 5 seconds
    }
    return () => clearTimeout(timer);**/
    address && handleGetUserInformation();
    address && console.log("userInfo ===============================", userInfo);



  }, [address, error, handleGetUserInformation, ipfsLink, userInfo]);

  

  return (
    <>
      {userInfo != undefined && userInfo.lenght > 0 && <UserInfo userInfo={userInfo} />}
      {userInfo == undefined && (
        <SettingForm ipfsLink={ipfsLink} updateLink={updateLink} />
      )}
    </>
  );
}
