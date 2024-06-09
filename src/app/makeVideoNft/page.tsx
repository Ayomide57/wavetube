"use client";
import { Formik, Form, ErrorMessage } from "formik";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import WaveTubeService from "@/hooks/WaveTube";
import { useAccount } from "wagmi";
import { nft, waveTube } from "@/hooks/waveServiceInfo";
import {
  CollectionType,
    EvmChain,
  CollectionStatus,
  LogLevel,
  TransactionStatus,
} from "@apillon/sdk";
import { useSearchParams, usePathname } from "next/navigation";
import { TextArea } from "@/components/ui/textarea";


interface IMakeVideoNft {
  //ipfsLink: any;
  //updateLink: (value: any) => void;
}

const MakeVideoNft = ({  }: IMakeVideoNft) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
      const [success, setSuccess] = useState<string>("");

    const router = useSearchParams();
      const pathname = usePathname();
    const nftlink: string = router.get("nftlink") || '';
    const url = `${pathname}?${nftlink}`;
    console.log(url);


  const { address } = useAccount();
  const handleCreateNft = async (values: {
    name: string;
    description: string;
    symbol: string;
    maxSupply: number;
    dropReserve: number;
    dropPrice: number;
    royaltiesFees: number;    
  }) => {
    setIsLoading(true);
    setError("");
    try {
      console.log(values);
      const createNft = await nft.create({
        collectionType: CollectionType.GENERIC,
        chain: EvmChain.MOONBEAM,
        name: values.name,
        symbol: values.symbol,
        description: values.description,
        baseUri: nftlink,
        baseExtension: "json",
        maxSupply: +values.maxSupply,
        isRevokable: false,
        isSoulbound: false,
        royaltiesAddress: address,
        royaltiesFees: +values.royaltiesFees,
        drop: true,
        dropStart: 1679875200,
        dropPrice: +values.dropPrice,
        dropReserve: +values.dropReserve,
      });

      if (createNft.transactionHash) {
        console.log("Collection deployed: ", createNft.transactionHash);
        await waveTube.create_nft({
          name: values.name,
          symbol: values.symbol,
          description: values.description,
          baseUri: nftlink, // Replace with actual value if needed
          maxSupply: values.maxSupply,
          wallet: address,
          royaltiesFees: values.royaltiesFees,
          dropPrice: values.dropPrice,
          dropReserve: values.dropReserve,
        });
        setSuccess(`Collection deployed: ${createNft.transactionHash}`);
        alert(`Collection deployed: ${createNft.transactionHash} `);
      }

    } catch (err) {
      setError("Failed to create Nft");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  let name = window.localStorage.getItem("NftName");

  return (
    <Formik
      initialValues={{
        name: name?.replace(".mp4", "") || "",
        description: "",
        symbol: "",
        maxSupply: 0,
        dropReserve: 0,
        dropPrice: 0,
        royaltiesFees: 0,
      }}
      onSubmit={(values, { setSubmitting }) => handleCreateNft(values)}
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
          <div className="p-8 bg-customLightPurple dark:bg-customPurple-foreground justify-center items-center rounded-md m-40">
            <p className="block text-xl dark:text-white pb-20">
              Convert your video into NFT
            </p>

            <p className="block text-xl dark:text-white pb-20">
              {success && success}
            </p>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xl dark:text-white">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={values.name}
                  placeholder="ABCD"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && errors.name}
              </div>
              <div>
                <label
                  htmlFor="symbol"
                  className="block text-xl dark:text-white"
                >
                  Symbol
                </label>
                <Input
                  type="text"
                  name="symbol"
                  //value={values.symbol}
                  placeholder="SE"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.symbol && errors.symbol}
              </div>
              <div>
                <label
                  htmlFor="dropReserve"
                  className="block text-xl dark:text-white"
                >
                  Drop Reserve
                </label>
                <Input
                  type="text"
                  name="dropReserve"
                  //value={values.dropReserve}
                  placeholder="100"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.dropReserve && errors.dropReserve}
              </div>
              <div>
                <label
                  htmlFor="dropPrice"
                  className="block text-xl dark:text-white"
                >
                  Drop Price
                </label>
                <Input
                  type="text"
                  name="dropPrice"
                  //value={values.dropPrice}
                  placeholder="0.05"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.dropPrice && errors.dropPrice}
              </div>

              <div>
                <label
                  htmlFor="maxSupply"
                  className="block text-xl dark:text-white"
                >
                  Max Supply
                </label>
                <Input
                  type="text"
                  //value={values.maxSupply}
                  name="maxSupply"
                  placeholder="1000"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.maxSupply && errors.maxSupply}
              </div>
              <div>
                <label
                  htmlFor="royaltiesFees"
                  className="block text-xl dark:text-white"
                >
                  Royalties Fees
                </label>
                <Input
                  type="text"
                  name="royaltiesFees"
                  //value={values.maxSupply}
                  placeholder="5"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.royaltiesFees && errors.royaltiesFees}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-xl dark:text-white"
                >
                  Description
                </label>
                <TextArea
                  name="description"
                  placeholder="I'm a software engineer"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && errors.description}
              </div>
              <div className="flex space-x-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-customLightPurple-dark_foreground dark:bg-black dark:text-white border border-gray-100"
                >
                  Create NFT
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MakeVideoNft;
