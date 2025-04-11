export const uploadImageToCloudinary = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset || "");
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  };
  