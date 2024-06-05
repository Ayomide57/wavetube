import Link from "next/link";
import { Button } from "../ui/button";
import WaveTubeService from "@/hooks/WaveTube";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";


interface IModal {
  setShow: () => void;
    openOAuthPopup: () => void;
}

function Modal({ setShow, openOAuthPopup }: IModal) {
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState<string>("");

    const waveTube = new WaveTubeService();
      const handleSignup = async (values: { email: string; password: string; }) => {
        setIsLoading(true);
        setError("");
        try {
          console.log(values);
          /**await waveTube.create_profile({
            email: values.email,
            password: values.password,
          });**/
          alert("Profile created successfully");
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
          email: "",
          password: "",
        }}
        onSubmit={(values, { setSubmitting }) => handleSignup(values)}
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
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
              <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">Login</h3>
                  <div className="mt-2 px-7 py-3">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-xl dark:text-white"
                      >
                        Email
                      </label>
                      <Field
                        type="text"
                        name="username"
                        placeholder="ABCD"
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-xl dark:text-white"
                      >
                        Passowrd
                      </label>
                      <Field
                        type="text"
                        name="username"
                        placeholder="ABCD"
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                    <Button
                      onClick={() => {
                        handleSubmit;
                        setShow;
                        //openOAuthPopup;
                      }}
                    >
                      Login with apillon
                    </Button>

                    <Button
                      onClick={() => {
                        setShow;
                        openOAuthPopup;
                      }}
                    >
                      Login with apillon
                    </Button>
                    <Button
                      onClick={() => {
                        setShow;
                      }}
                    >
                      Login with Google
                    </Button>
                  </div>
                  <div className="flex justify-center mt-4">
                    {/* Navigates back to the base URL - closing the modal */}
                    <Button
                      onClick={setShow}
                      className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
}

export default Modal;
