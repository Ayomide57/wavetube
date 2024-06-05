"use server";

import axios from "axios";
interface IRetrieveImageFromIPFS {
  ipfsHash: string;
}

const RetrieveImageFromIPFS = async ({ ipfsHash }: IRetrieveImageFromIPFS) => {
  const result = await axios.get(`https://ipfs.io/ipfs/${ipfsHash}`);
  //return result.data;
  return (
    <img
      src={result.data}
      alt="Notification"
      width={500}
      height={400}
      className="rounded-lg"
    />
  );
};
export default RetrieveImageFromIPFS;
