import { Formik, Form, Field, ErrorMessage } from "formik";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import WaveTubeService from "@/hooks/WaveTube";
import { useAccount } from "wagmi";
import { UploadToThirdWebStorage } from "@/components/global/UploadThirdWeb";
import { useRouter } from "next/navigation";

interface ISettingForm {
  ipfsLink: any;
  updateLink: (value: any) => void;
}

const SettingForm = ({ ipfsLink, updateLink }: ISettingForm) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const waveTube = new WaveTubeService();
  const router = useRouter();

  const { address } = useAccount();
  const handleCreateProfile = async (values: {
    username: string;
    bio: string;
    email: string;
  }) => {
    setIsLoading(true);
    setError("");
    try {
      console.log(values);
      await waveTube.create_profile({
        username: values.username,
        bio: values.bio,
        pfp: ipfsLink, // Replace with actual value if needed
        email: values.email,
        wallet: address,
      });
      alert("Profile created successfully");
      router.refresh();
    } catch (err) {
      setError("Failed to create profile");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        bio: "",
        email: "",
      }}
      onSubmit={(values, { setSubmitting }) => handleCreateProfile(values)}
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
          {error && (
            <div className="absolute top-24 right-4 z-50">
              <div className="bg-red-600 py-4 px-6 rounded-l-lg flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  className="fill-current text-white"
                  width="20"
                  height="20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  ></path>
                </svg>
              </div>
              <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-96 border border-l-transparent border-gray-200 text-black">
                <div>{error}</div>
                <button
                  onClick={() => setError("")}
                  className="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current text-gray-700"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
          <div className="flex space-x-16 p-8 m-24 bg-customLightPurple dark:bg-customPurple-foreground justify-center items-center rounded-md">
            <div className="space-y-6 flex flex-col">
              <div>
                <Avatar className="h-24 w-24 object-cover rounded-full bg-customLightPurple-dark_foreground dark:bg-transparent">
                  <AvatarImage src="/images/user.svg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-xl dark:text-white"
                >
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="ABCD"
                  //value={userInfo && userInfo[0] && userInfo[0].username}
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && errors.username}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xl dark:text-white"
                >
                  Email
                </label>
                <Field
                  type="text"
                  name="email"
                  //value={userInfo && userInfo[0] && userInfo[0].email}
                  placeholder="ABCD@gmail.com"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && errors.email}
              </div>

              <div>
                <label htmlFor="bio" className="block text-xl dark:text-white">
                  Bio
                </label>
                <Field
                  type="text"
                  name="bio"
                  //value={userInfo && userInfo[0] && userInfo[0].bio}
                  placeholder="I'm a software engineer"
                  className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.bio && errors.bio}
                <p className="text-gray-500 text-sm">
                  You can @mention other users and organizations to link to
                  them.
                </p>
              </div>
              <div>
                <label htmlFor="pfp" className="block text-xl dark:text-white">
                  Profile URL
                </label>
                <UploadToThirdWebStorage
                  accept="image/*"
                  updateLink={updateLink}
                />
                <p>{ipfsLink && ipfsLink}</p>
                <ErrorMessage
                  name="pfp"
                  component="div"
                  className="text-red-500 mt-1"
                />
                <p className="text-gray-500 text-sm">
                  Enter the URL of your profile picture.
                </p>
              </div>
              <div className="flex space-x-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-customLightPurple-dark_foreground dark:bg-black dark:text-white border border-gray-100"
                >
                  Create/Edit Profile
                </Button>
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit}
                  className="bg-customLightPurple-dark_foreground dark:bg-black dark:text-white border border-gray-100"
                >
                  Delete Profile
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
        </Form>
      )}
    </Formik>
  );
};

export default SettingForm;
