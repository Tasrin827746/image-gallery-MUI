import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useState } from "react";

interface ImageCardProps {
  image: {
    public_id: string;
    secure_url: string;
    title: string;
  };
  onPreview: (url: string) => void;
  onDelete: (public_id: string) => void;
}

export default function ImageCard({ image, onPreview, onDelete }: ImageCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    onDelete(image.public_id);
    setConfirmOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          width: { xs: '100%', sm: 300 }, 
          mx: "auto", 
          backgroundColor: "#fdedec",
          boxShadow: 3, 
        }}
      >
        <CardMedia
          component="img"
          image={image.secure_url}
          alt={image.title || "Uploaded"}
          sx={{
            height: { xs: 180, sm: 200 },
            width: "100%",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={() => onPreview(image.secure_url)}
        />

        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" bgcolor={"maroon"} color="white" px={2} borderRadius="16px" width={100}>
            {image.title || "Untitled"}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between" }}>
          <IconButton onClick={() => onPreview(image.secure_url)}>
            <ZoomInIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setConfirmOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>Are you sure you want to delete this image?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
