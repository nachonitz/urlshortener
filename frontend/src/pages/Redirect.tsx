import { useParams } from "react-router-dom";
import { getLongUrlByShortenedUrl } from "../api/services/shortUrlService";
import { useEffect } from "react";

const Redirect = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();

  const redirect = async (shortUrl: string) => {
    const longUrl = await getLongUrlByShortenedUrl(shortUrl);
    if (longUrl) {
      window.open(longUrl, "_self");
    }
  };

  useEffect(() => {
    if (shortUrl) {
      redirect(shortUrl);
    }
  }, [shortUrl]);

  return <div></div>;
};

export default Redirect;
