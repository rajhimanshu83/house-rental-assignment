const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://kutuki.vercel.app"
    : "http://localhost:8000";

export default baseUrl;