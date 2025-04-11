"use client";

import NextError from "next/error";
import { useState, useEffect } from "react";

export default function GlobalError(props: {
  error: Error & { digest?: string };
}) {
  const [error, setError] = useState<(Error & { digest?: string }) | null>(
    props.error
  );

  useEffect(() => {
    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Global Error:", error);
      }
    }
  }, [error]);

  const handleRetry = () => {
    setError(null);
    window.location.reload();
  };

  return (
    <html lang="en">
      <body>
        {error ? (
          <>
            <NextError
              statusCode={500}
              title={
                process.env.NODE_ENV === "production"
                  ? "Something went wrong. Please try again later."
                  : error.message || "An unexpected error occurred."
              }
            />
            <button
              onClick={handleRetry}
              style={{
                margin: "20px auto",
                display: "block",
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Attempting to recover...
          </p>
        )}
      </body>
    </html>
  );
}
