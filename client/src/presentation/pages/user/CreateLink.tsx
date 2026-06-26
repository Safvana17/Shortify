import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateLink: React.FC = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    // Temporary frontend generated link
    // Replace this with API response later
    const generated = `https://short.ly/${Math.random()
      .toString(36)
      .substring(7)}`;

    setShortUrl(generated);
    toast.success("Link shortened successfully");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard");
  };

  return (
      <div className="align-items-center justify-center items-center w-full max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-center">
          Shorten Your Link
        </h1>
        <p className="text-center text-gray-500 mt-3">
          Convert long URLs into short, easy-to-share links
        </p>
        <div className="mt-8 space-y-4">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className=" w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleShorten}
            className=" w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 ">
            Shorten Link
          </button>
        </div>
        {shortUrl && (
          <div className="mt-8 p-5 bg-gray-50 rounded-xl">
            <p className="text-gray-600 text-sm">
              Your shortened link
            </p>
            <div className="flex items-center gap-3 mt-3">
              <input
                value={shortUrl}
                readOnly
                className=" flex-1 border rounded-lg px-3 py-2 text-gray-700 bg-white "
              />
              <button
                onClick={copyLink}
                className=" px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                Copy
              </button>
            </div>
          </div>
        )}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-semibold text-lg">
            How it works
          </h2>
          <ul className="mt-3 space-y-2 text-gray-600 text-sm">
            <li>
              • Paste your long URL into the input field
            </li>
            <li>
              • Click "Shorten Link" to generate a compact URL
            </li>
            <li>
              • Share your shortened link anywhere
            </li>
            <li>
              • Short links are easier to remember and track
            </li>
          </ul>
        </div>
        <div className="mt-5 bg-indigo-50 rounded-lg p-4">
          <p className="text-sm text-indigo-700">
            Note: Make sure your original link is valid before
            shortening. A shortened link redirects users to the
            original URL.
          </p>
        </div>
      </div>
  );
};

export default CreateLink;