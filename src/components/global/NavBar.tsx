"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import ToggleTheme from "./toggle-theme";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { apillonAuthAPI, apillonAuthAPI2 } from "@/hooks/Apillon";
import WaveTubeService from "@/hooks/WaveTube";
import Modal from "@/components/global/modal";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);

  const [balance, setBalance] = useState("0");
  const [authToken, setToken] = useState("");
  const [returnValue, setValue] = useState<any>();

  let oAuthWindow: Window | null;


  const getAuthToken = async () => {
  const response = await apillonAuthAPI.get("/session-token");
    setToken(response.data.data.sessionToken);
    const { data } = await response;
    return data.data.sessionToken;
  };

  async function openOAuthPopup() {
    const sessionToken = await getAuthToken();
    //setToken(sessionToken);
    oAuthWindow = window.open(
      `https://oauth.apillon.io/?embedded=1&token=${sessionToken}`,
      "Apillon OAuth Form",
      `height=${900} width=${450} resizable=no`
    );
  }


  async function verifyUserLogin(authToken: any) {
    const response = await apillonAuthAPI2.post(
      "verify-login",
      {
        body: JSON.stringify({ token: authToken }),
      },
      {
        headers: {
          "data-raw": JSON.stringify({ token: authToken }),
        },
      }
    );

    const { data } = await response;
    console.log("verifyUserLogin =========================", data);
    setValue(data)
    // Handle user email data response here
    console.log({ email: data.email });
  }

  useEffect(() => {
    window.addEventListener(
      "message",
      async (event) => {
        if (!event.origin?.includes("apillon.io")) return;
        if (!event.data.verified) {
          throw new Error("Invalid verification");
        }
        // Close OAuth popup window
        oAuthWindow?.close();
        console.log(
          "event.data.authToken =========================",
          event.data.authToken
        );
        console.log(
          "event.data.authToken =========================",
          authToken
        );

        verifyUserLogin(authToken);
      },
      false
    );
  }, [authToken]);

  return (
    <>
      <nav className="flex flex-col md:flex-row bg-customLightPurple dark:bg-customPurple-foreground w-full border-b md:border-0 items-center justify-between p-0 fixed z-10">
        <div className="flex p-2 items-center">
          <Image
            src="/images/sui_tech_stream.svg"
            alt="User"
            width={70}
            height={70}
          />
          <h1 className="font-display font-bold text-2xl text-center p-4">
            WaveTube
          </h1>
        </div>

        <div className="flex justify-between w-5/6">
          <div className="flex items-center w-full md:w-auto">
            <form className="flex p-1 bg-customLightPurple-dark_foreground dark:bg-customPurple items-center space-x-2 border rounded-md ml-2 md:ml-10">
              <Search className="h-5 w-5 flex-none text-white ml-2 md:ml-4" />
              <input
                className="w-full outline-none bg-customLightPurple-dark_foreground dark:bg-customPurple text-white placeholder-custom-white p-2 sm-auto"
                type="search"
                placeholder="Search"
              />
            </form>
            <button
              className="text-gray-300 md:hidden ml-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className={`w-8 h-8 ${isOpen ? "hidden" : "block"}`} />
            </button>
          </div>
          <div
            className={`flex-col md:flex-row md:flex md:items-center md:space-x-6 md:mr-10 ${
              isOpen ? "flex" : "hidden"
            } w-full md:w-auto`}
          >
            <button
              className="self-end text-gray-300 md:hidden mt-2 mr-4"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-8 h-8 mb-4" />
            </button>
            <div className="flex flex-row items-center space-x-6 justify-end">
              <ToggleTheme />
              <Button
                size={"icon"}
                className="bg-customLightPurple-dark_foreground dark:bg-black w-10 h-10 p-3 border border-gray-100 hover:bg-zinc-700 md:mt-0"
              >
                <Image
                  src="/images/notification.svg"
                  alt="Notification"
                  width={30}
                  height={20}
                />
              </Button>
              <w3m-button />
              <Button
                onClick={() => 
                  openOAuthPopup()
                }
              >
                Login with apillon
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
