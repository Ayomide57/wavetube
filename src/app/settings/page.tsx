"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { useAccount } from "wagmi";
import { UploadToThirdWebStorage } from "@/components/global/UploadThirdWeb";
import SettingForm from "./Form";
import UserInfo from "./UserInfo";
import { waveTube } from "@/hooks/waveServiceInfo";
import useSWR from "swr";



export default function ProfileForm() {
  const [ipfsLink, updateLink] = useState<any>();
    const [userInfo, setUserInfo] = useState<any>([]);

  const { address } = useAccount();

  
  // Form validation function
  const validate = (values: { username: any }) => {
    const errors: { username?: string } = {};
    if (!values.username) {
      errors.username = "Username Required";
    }
    return errors;
  };


  const handleGetUserInformation = () => {
    const user = waveTube.getUserInformation(address);
    return user;
  };

  const { data, error, isLoading } = useSWR(handleGetUserInformation);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>loading...</div>;
  if(data) return <UserInfo userInfo={data} />
  return (<SettingForm ipfsLink={ipfsLink} updateLink={updateLink} />);
}
