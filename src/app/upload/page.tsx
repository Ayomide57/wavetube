"use client";
/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Storage, LogLevel, FileStatus } from "@apillon/sdk";
import * as fs from "fs";
import { ChangeEvent, useEffect, useState } from "react";
import { UploadToStorage } from "@/components/global/Upload";
import WaveTubeService from "@/hooks/WaveTube";
import { ICreateVideo, ICreateVideoForm } from "@/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useAccount } from "wagmi";


// eslint-disable-next-line @next/next/no-img-element

export default function UploadPage() {
  const [videoLink, updateVideoLink] = useState<any>();
  const [thumbnailLink, updateThumbnailLink] = useState<any>();

    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { address } = useAccount();
  
    const BUCKET_ID =
      process.env.NEXT_PUBLIC_APILLON_BUCKET_ID2 &&
      process.env.NEXT_PUBLIC_APILLON_BUCKET_ID2;


  const waveTube = new WaveTubeService();
  
    const handleUploadVideo = async (values: ICreateVideoForm) => {
      setIsLoading(true);
      setError("");
      try {
        console.log(values);
        await waveTube.create_video({
          title: values.title,
          description: values.description,
          videolink: videoLink,
          thumbnailLink: thumbnailLink,
          tag: values.tag,
          category: values.category,
          videoUUid: BUCKET_ID || '',
          user: address,
        });
        alert("Video uploaded successfully");
      } catch (err) {
        setError("Failed to upload video");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };



  const storage = new Storage({
    key: process.env.NEXT_PUBLIC_APILLON_API_KEY,
    secret: process.env.NEXT_PUBLIC_APILLON_API_SECRET,
    logLevel: LogLevel.VERBOSE,
  });

  const bucket =
    process.env.NEXT_PUBLIC_APILLON_BUCKET_ID &&
    storage.bucket(process.env.NEXT_PUBLIC_APILLON_BUCKET_ID);
  
  useEffect(() => {
    if (bucket) {
      //const file = bucket.file("2f53cb14-5f91-43e4-a850-350cfa2fad4c").get();
      //console.log("file ==========================================", file);
    }
  })

  const options = ["music", "sport", "gaming", "technology"];


  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        tag: "",
        category: "",
      }}
      onSubmit={(values, { setSubmitting }) => handleUploadVideo(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form>
          <section className="upload max-w-screen-lg mx-auto h-full p-4 bg-customLightPurple dark:bg-customPurple-foreground m-20">
            <h2 className="text-customPurple dark:text-white text-3xl">
              Upload New Video
            </h2>
            <div className="flex flex-row">
              <div className="flex flex-col gap-8 mr-20">
                <div className="flex flex-col gap-5 p-6 rounded-md">
                  <label className="w-full flex flex-col gap-2">
                    <p className="text-customLightPurple-dark_text dark:text-white">
                      Enter title
                    </p>
                    <Input
                      name="title"
                      className="text-gray-800 bg-zinc-100"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p>{errors.title && errors.title}</p>
                  </label>
                  <label className="flex flex-col gap-2 w-full">
                    <p className="text-customLightPurple-dark_text dark:text-white">
                      Description
                    </p>
                    <TextArea
                      name="description"
                      className="resize-none rounded-md p-2 text-gray-800 bg-zinc-100"
                      rows={7}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p>{errors.description && errors.description}</p>
                  </label>
                  <label className="flex flex-col gap-2">
                    <p className="text-customLightPurple-dark_text dark:text-white">
                      Select category
                    </p>
                    <Select
                      className="rounded-md p-2 text-gray-800 bg-zinc-100"
                      name="category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      options={options}
                    />
                    <p>{errors.category && errors.category}</p>
                  </label>
                  <div className="tags-check flex items-center gap-5">
                    <label className="flex items-center gap-2 flex-1">
                      <p className="text-customLightPurple-dark_text dark:text-white">
                        Tags
                      </p>
                      <Input
                        name="tag"
                        className="text-gray-800 bg-zinc-100"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p>{errors.tag && errors.tag}</p>
                    </label>
                    <label className="flex flex-row-reverse items-center gap-2">
                      <p className="text-customLightPurple-dark_text dark:text-white">
                        Subscribers only{" "}
                      </p>
                      <input
                        type="checkbox"
                        checked
                        onChange={() => {}}
                        className="rounded-md p-2 text-gray-800"
                      />
                    </label>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => handleSubmit}
                    className="px-2 py-2 mt-7 bg-customLightPurple-dark_foreground dark:bg-black text-white self-start border border-white rounded-md"
                  >
                    Publish video
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-8 mt-10">
                <div>
                  <label> Select and Upload your video</label>
                  <div className="video flex-1 bg-customLightPurple dark:bg-customPurple-foreground rounded-md flex items-center justify-center">
                    <UploadToStorage
                      accept="video/mp4,video/x-m4v,video/*"
                      updateLink={updateVideoLink}
                      ForLabel="myVideo"
                    />
                    <p>{videoLink && videoLink}</p>
                  </div>
                </div>
                <div>
                  <label> Select and Upload your video thumbnail</label>
                  <div className="thumbnail flex-1 bg-customLightPurple dark:bg-customPurple-foreground rounded-md flex items-center justify-center">
                    <UploadToStorage
                      accept="image/*"
                      updateLink={updateThumbnailLink}
                      ForLabel="myThumnail"
                    />
                  </div>
                  <p>{thumbnailLink && thumbnailLink}</p>
                </div>
              </div>
            </div>
          </section>
        </Form>
      )}
    </Formik>
  );
}
