export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (
    process.env.NODE_ENV === "production" &&
    process.env.NODE_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.NODE_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.NODE_URL) {
    return `https://${process.env.NODE_URL}`;
  }

  return "http://localhost:3000";
};
