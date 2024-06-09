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
  const [data, updateData] = useState<any>();

  const { address } = useAccount();

  const handlegetUserInformation = useCallback(async () => {
    const user = await waveTube.getUserInformation(address);
    if (user && user[0]) updateData(user[0]);
  }, [address]);

  useEffect(() => {
    handlegetUserInformation();
  }, [data, handlegetUserInformation]);


  if (address && !data) return <SettingForm ipfsLink={ipfsLink} updateLink={updateLink} />;
  return (<UserInfo userInfo={data}/>);
}
