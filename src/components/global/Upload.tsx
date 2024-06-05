import Image from "next/image";
import { ChangeEvent } from "react";
import { Storage, LogLevel, FileStatus } from "@apillon/sdk";
import { useAccount } from "wagmi";



interface IUploadFile {
  updateLink: (value: string) => void;
  className?: string;
  accept: string | undefined;
  ForLabel: string;
}


export const UploadToStorage = ({
  updateLink,
  className,
  accept,
  ForLabel,
}: IUploadFile) => {
  const storage = new Storage({
    key: process.env.NEXT_PUBLIC_APILLON_API_KEY,
    secret: process.env.NEXT_PUBLIC_APILLON_API_SECRET,
    logLevel: LogLevel.VERBOSE,
  });
  const { address } = useAccount();

  const bucket =
    process.env.NEXT_PUBLIC_APILLON_BUCKET_ID2 &&
    storage.bucket(process.env.NEXT_PUBLIC_APILLON_BUCKET_ID2);

  let file: any;
  const uploadFile = async (event: ChangeEvent<HTMLInputElement | null>) => {
    file = event.currentTarget.files && event.currentTarget.files[0];
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      async () => {
        if (bucket && reader.result && address) {
          //await bucket.uploadFromFolder(reader.result);
          const buffer: any = reader.result;
          await bucket.uploadFiles(
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
        }
      },
      false
    );
    if (file) reader.readAsDataURL(file);

    updateLink(file.name);
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
