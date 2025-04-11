"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Dialog,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import UploadButton from "../components/UploadButton";
import ImageCard from "../components/ImageCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import defaultImages from "../utils/defaultGallary";

interface Image {
  public_id: string;
  secure_url: string;
  title: string;
  tags: string[];
}

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Normalize raw data to full Image shape
  const normalizeImage = (img: Partial<Image>): Image => ({
    public_id: img.public_id || "",
    secure_url: img.secure_url || "",
    title: img.title || "Untitled",
    tags: img.tags || [],
  });

  useEffect(() => {
    const stored = localStorage.getItem("galleryImages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<Image>[];
        const fixed = parsed.map(normalizeImage);
        setImages(fixed);
      } catch (error) {
        console.error("Error loading stored images", error);
        const fixed = defaultImages.map(normalizeImage);
        setImages(fixed);
        localStorage.setItem("galleryImages", JSON.stringify(fixed));
      }
    } else {
      const fixed = defaultImages.map(normalizeImage);
      setImages(fixed);
      localStorage.setItem("galleryImages", JSON.stringify(fixed));
    }
  }, []);

  const handleUpload = (img: Image) => {
    const newImg = {
      ...img,
      title: img.title || "Untitled",
      tags: img.tags || [],
    };
    const updated = [...images, newImg];
    setImages(updated);
    localStorage.setItem("galleryImages", JSON.stringify(updated));
  };
  

  const handleDelete = (public_id: string) => {
    const updated = images.filter((img) => img.public_id !== public_id);
    setImages(updated);
    localStorage.setItem("galleryImages", JSON.stringify(updated));
  };

  const filteredImages = images.filter((img) => {
    const query = searchQuery.toLowerCase();
    return (
      img.title.toLowerCase().includes(query) ||
      img.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <>
      <Header />

      <Container
        sx={{
          py: 6,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#1a5276",
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          Image Gallery
        </Typography>

        <TextField
          label="Search by title or tags"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 4 }}
        />

        <UploadButton onUpload={handleUpload} />

        <Box mt={4}>
          <Grid container spacing={4}>
            {filteredImages.length === 0 ? (
              <Typography variant="h6" color="textSecondary" sx={{ px: 2 }}>
                No images found
              </Typography>
            ) : (
              filteredImages.map((img) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={img.public_id}>
                  <ImageCard
                    image={img}
                    onPreview={setSelectedImage}
                    onDelete={handleDelete}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        <Dialog
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          maxWidth="md"
          fullWidth
        >
          <img
            src={selectedImage || ""}
            alt="preview"
            style={{
              width: "100%",
              maxHeight: "60vh",
              objectFit: "contain",
            }}
          />
        </Dialog>
      </Container>

      <Footer />
    </>
  );
}
