import mongoose from "mongoose";

const OriginalUrlSchema = new mongoose.Schema({
  originalUrl: String,
  expiresAt: Date,
});
OriginalUrlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 3600 }); // expires after 1 hour
export default mongoose.models.OriginalUrl ||
  mongoose.model("OriginalUrl", OriginalUrlSchema);
