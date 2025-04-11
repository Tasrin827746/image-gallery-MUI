import { Button, CircularProgress, Snackbar } from "@mui/material";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import { useState } from "react";

interface Image {
  public_id: string;
  secure_url: string;
  title: string;
  tags: string[];
}

interface UploadButtonProps {
  onUpload: (image: Image) => void;
}

export default function UploadButton({ onUpload }: UploadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [tags, setTags] = useState("");   

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    setError(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const title = file.name.replace(/\.[^/.]+$/, "");  

      try {
        const result = await uploadImageToCloudinary(file);

        const image: Image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
          title: title,  
          tags: tags ? tags.split(",").map(tag => tag.trim()) : [], 
        };

        onUpload(image); 
        setTags("");  
      } catch (error) {
        console.error("Upload failed", error);
        setError("Failed to upload image. Please try again.");
        setOpenSnackbar(true);
      }
    }

    setLoading(false);
    e.target.value = "";
  };

  return (
    <>
      <Button
        variant="contained"
        component="label"
        sx={{
          width: { xs: "100%", sm: "200px" },
          padding: { xs: "12px", sm: "16px" },
          fontSize: { xs: "14px", sm: "16px" },
          textAlign: "center",
          position: "relative",
        }}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ position: "absolute" }} />
        ) : (
          "Upload Images"
        )}
        <input type="file" hidden multiple onChange={handleUpload} />
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={error}
      />
    </>
  );
}
