import Image from "next/image";
import { ChangeEvent } from "react";
import { Storage, FileUploadResult, LogLevel } from "@apillon/sdk";
import { useAccount } from "wagmi";
import { BUCKET_ID, storage } from "@/hooks/waveServiceInfo";
import axios from 'axios';

interface IUploadFile {
  updateLink: (value: string) => void;
  updateDuration?: (value: number) => void;
  className?: string;
  accept: string | undefined;
  ForLabel: string;
}


export const UploadToStorage = ({
  updateLink,
  updateDuration,
  className,
  accept,
  ForLabel,
}: IUploadFile) => {
  const { address } = useAccount();

  /**const storage = new Storage({
    key: "d9d18622-f3a3-4726-a22d-fe8a3f209e09",
    secret: "6G$noKpfUP3%",
    logLevel: LogLevel.VERBOSE,
  });*/

  const bucketId = BUCKET_ID || ''; 
  const bucket = storage.bucket(bucketId);

  let file: any;
  let fileResult: FileUploadResult[];
  let media: any;
  const uploadFile = async (event: ChangeEvent<HTMLInputElement | null>) => {
    file = event.currentTarget.files && event.currentTarget.files[0];
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      async () => {
        if (bucket && reader.result && address) {
          //await bucket.uploadFromFolder(reader.result);
          const buffer: any = reader.result;
          if ((accept === "video/mp4,video/x-m4v,video/*" && updateDuration)) {
            media = new Audio(buffer);

          }

          fileResult = await bucket.uploadFiles(
             [
               {
                 fileName: file.name,
                 contentType: accept,
                 content: new Buffer(buffer),
               },
             ],
             // Upload the files in a new subdirectory in the bucket instead of in the root of the bucket
             { wrapWithDirectory: true, directoryPath: address }
           );
              if (fileResult && fileResult[0].fileUuid) {
                //bafybeif7psr3m5lnjep66sc4kva63hmfl2z2v47peiayeoahdxpl3mloaa
                const uuidFile = fileResult[0].fileUuid;
                setTimeout(async () => {
                  const file = await bucket.file(uuidFile).get();
                  if (
                    accept === "video/mp4,video/x-m4v,video/*" &&
                    updateDuration
                  ) {
                      updateDuration(media.duration);
                      updateLink(file.CID);
                  } else {
                    const result = await axios.get(
                      `https://ipfs.io/ipfs/${file.CID}`
                    );
                    updateLink(result.data);
                  }

                  //const result = await axios.get(`https://ipfs.io/ipfs/${file.CID}`);

                }, 50000); // Clear error after 5 seconds
              }

        }
      },
      false
    );
    if (file) reader.readAsDataURL(file);
    

  
  };
  return (
    <label htmlFor={ForLabel}>
      <div className={className}>
        <Image
          src={file ? file : "/images/upload.webp"}
          alt="upload Logo"
          height="150"
          width="300"
        />
      </div>
      <input
        className="h-[80px]"
        id={ForLabel}
        type="file"
        style={{ display: "none" }}
        accept={accept}
        onChange={(event) => uploadFile(event)}
      />
    </label>
  );
};
