import dbConnect from "@/lib/db";
import ShortUrl from "@/models/ShortUrl";
import { redirect } from "next/navigation";

async function getOriginalUrl(url) {
  await dbConnect();
  const data = await ShortUrl.findOne({ shortUrl: url })
    .populate("originalUrlId", "originalUrl")
    .select("originalUrl");

  return data.originalUrlId.originalUrl;
}

async function Reroute({ params }) {
  const urlData = await getOriginalUrl(params.url);
  if (urlData) {
    redirect(urlData);
  }
  return <div>Invalid Url</div>;
}

export default Reroute;
