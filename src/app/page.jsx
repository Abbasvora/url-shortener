"use client";
import { useState, useRef } from "react";
export default function Home() {
  const [urlValue, setUrlValue] = useState("");
  const [shortUrl, setShortUrl] = useState();
  const [loading, setLoading] = useState(false);
  const popup = useRef();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const handleSubmit = () => {
    setLoading(true);
    if (!URL.canParse(urlValue)) {
      popup.current.classList.remove("hidden");
      popup.current.classList.add("flex");

      setTimeout(() => {
        popup.current.classList.add("hidden");
        popup.current.classList.remove("flex");
      }, 1500);
      return;
    }
    fetch(`${baseUrl}/url/db-connect`, {
      method: "POST",
      body: JSON.stringify({ url: urlValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShortUrl(data.shortUrl);
        setLoading(false);
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
      {loading ? (
        <div role="status" className="pt-24">
          <svg
            aria-hidden="true"
            class="inline w-10 h-10 lg:w-16 lg:h-16 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        shortUrl && (
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
        )
      )}
    </main>
  );
}
