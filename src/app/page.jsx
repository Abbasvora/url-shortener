"use client";
import { useState, useRef } from "react";
export default function Home() {
  const [urlValue, setUrlValue] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const popup = useRef();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const handleSubmit = () => {
    if (!URL.canParse(urlValue)) {
      popup.current.classList.remove("hidden");
      popup.current.classList.add("flex");

      setTimeout(() => {
        popup.current.classList.add("hidden");
        popup.current.classList.remove("flex");
      }, 1500);
      return;
    }
    fetch(`${baseUrl}/api/db-connect`, {
      method: "POST",
      body: JSON.stringify({ url: urlValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShortUrl(data.shortUrl);
      });
  };
  return (
    <main className="flex bg-[#111827] text-white  flex-col items-center content-center h-[100vh] pt-24  gap-y-6 relative">
      <section className="flex flex-col gap-y-5">
        <h1 className="mb-4 text-4xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Linkly
          </span>
        </h1>
        <div
          ref={popup}
          className="absolute top-2 left-0 w-full transition-all duration-500 ease-in-out hidden justify-center items-center "
        >
          <p className="text-center rounded-md min-w-[15rem] bg-red-500 text-white p-2">
            Invalid URL
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-y-4  gap-x-3 min-w-[45vw]">
          <input
            type="text"
            id="url"
            onChange={(e) => setUrlValue(e.target.value)}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Long Url"
            required
          ></input>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </section>
      {shortUrl && (
        <section className="pt-24 flex flex-col lg:flex-row gap-y-4 gap-x-3 items-center">
          <div className="font-semibold text-3xl tracking-wider underline text-white decoration-indigo-500">
            Your Shortened Url
          </div>
          <div className="ml-5 text-xl">
            {baseUrl}/{shortUrl}
          </div>
          <button
            onClick={() =>
              navigator.clipboard.writeText(`${baseUrl}/${shortUrl}`)
            }
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span
              onClick={() =>
                navigator.clipboard.writeText(`${baseUrl}/${shortUrl}`)
              }
              className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
            >
              Copy Link
            </span>
          </button>
        </section>
      )}
    </main>
  );
}
