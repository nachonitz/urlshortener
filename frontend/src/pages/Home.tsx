import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../components/shared/inputField";
import Page from "../components/shared/page";
import { useState } from "react";
import { CreateShortUrlDto } from "../api/models/shortUrl";
import { createShortUrl } from "../api/services/shortUrlService";
import ShortenUrlButton from "../components/pages/home/shortenUrlButton";
import { IoIosLink } from "react-icons/io";
import { motion } from "framer-motion";
import { LuClipboardCopy } from "react-icons/lu";
import Header from "../components/shared/header";
const uiUrl = import.meta.env.VITE_UI_HOST;

const Home = () => {
  const [creatingShorturl, setCreatingShorturl] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleRegister = async (data: CreateShortUrlDto) => {
    setError(null);
    setShortenedUrl(null);
    setCreatingShorturl(true);
    createShortUrl(data)
      .then((shortenedUrl) => {
        setCreatingShorturl(false);
        setShortenedUrl(`${uiUrl}/${shortenedUrl}`);
        reset();
      })
      .catch((_error) => {
        setCreatingShorturl(false);
        setError("An error occurred. Please try again.");
        reset();
      });
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const validationSchema = Yup.object().shape({
    longUrl: Yup.string().required("Please enter a URL").url("Invalid URL"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  return (
    <>
      <Header />
      <div className="mt-header">
        <Page>
          <div className="w-full h-full flex sm:items-center justify-center sm:p-4">
            <div className="w-full sm:max-w-[600px] sm:p-14 sm:shadow-2xl rounded-xl sm:bg-gray-800 shadow-xl sm:border sm:border-gray-600 mt-10 sm:mt-0">
              <h1 className="text-3xl font-[500] text-center mb-10 text-white">
                URL Shortener
              </h1>
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="flex gap-2 items-center w-full mb-5 flex-col sm:flex-row">
                  <div className="relative flex-1 w-full">
                    <IoIosLink
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                      size={20}
                    />
                    <InputField
                      type="string"
                      placeholder="Enter link here"
                      register={register("longUrl")}
                    />
                  </div>

                  <div className="w-full sm:w-auto">
                    <ShortenUrlButton disabled={creatingShorturl} />
                  </div>
                </div>
              </form>

              {(errors.longUrl || error) && (
                <motion.div
                  key={(errors?.longUrl?.message || error) as string}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-red-500 rounded-md shadow-md text-white"
                >
                  <p>{errors?.longUrl?.message || error}</p>
                </motion.div>
              )}

              {shortenedUrl && !errors.longUrl && !error && (
                <motion.div
                  key={shortenedUrl}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-gray-700 rounded-md shadow-md"
                >
                  <p className="text-sm font-medium text-gray-200 mb-2">
                    Shortened URL:
                  </p>
                  <div className="flex items-center justify-between bg-gray-600 p-2 rounded">
                    <a
                      href={shortenedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 truncate"
                    >
                      {shortenedUrl}
                    </a>
                    <button
                      onClick={handleCopy}
                      className="ml-2 text-gray-200 hover:text-white"
                    >
                      {isCopied ? "Copied!" : <LuClipboardCopy size={18} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </Page>
      </div>
    </>
  );
};

export default Home;
