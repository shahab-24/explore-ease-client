import axios from "axios";
import { useState } from "react";

const UploadImage = ({ onImageUploaded }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setPreviewUrl(URL.createObjectURL(file)); 
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = res.data?.secure_url;
      onImageUploaded(imageUrl); //sends image to parent as imageUrl 

    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input file-input-bordered w-full"
      />

      {previewUrl && (
        <div className="flex justify-center mt-2">
          <img src={previewUrl} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-green-500" />
        </div>
      )}

      {uploading && <p className="text-center text-green-600">Uploading...</p>}
    </div>
  );
};

export default UploadImage;
