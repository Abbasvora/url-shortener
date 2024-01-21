import mongoose from "mongoose";

const ShortUrlSchema = new mongoose.Schema({
  shortUrl: String,
  expiresAt: Date,
  clickCount: { type: Number, default: 0 },
  originalUrlId: { type: mongoose.Types.ObjectId, ref: "OriginalUrl" },
});
ShortUrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 3600 }); // expires after 1 hour
ShortUrlSchema.index({ shortUrl: 1 });
export default mongoose.models.ShortUrl ||
  mongoose.model("ShortUrl", ShortUrlSchema);
