import axios from "axios";
import React, { useState, useCallback, DragEvent } from "react";

export type UploadImageProps = {
  multiple?: boolean;
  onUpload: (url: string) => void;
};

const UploadImage: React.FC<UploadImageProps> = ({ multiple = false, onUpload }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const uploadFiles = async (fileArray: File[]) => {
    setUploading(true);
    try {
      for (const file of fileArray) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);
        const res = await axios.post<{ secure_url: string }>(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        const imageUrl = res.data.secure_url;
        setPreviewUrls(prev => [...prev, imageUrl]);
        onUpload(imageUrl);
      }
    } catch (err) {
      console.error("URL আপলোড ব্যর্থ", err);
      alert("ছবি আপলোডে সমস্যা হয়েছে");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      uploadFiles(multiple ? fileArray : [fileArray[0]]);
    }
  };

  const handleRemove = (idx: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== idx));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length) uploadFiles(multiple ? files : [files[0]]);
  };

  return (
    <div className="space-y-3">
      <div
        className="p-6 border-2 border-dashed rounded-lg text-center hover:bg-gray-50 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("upload-input")?.click()}
      >
        <p>ছবি টানুন-ছেড়ে দিন অথবা ক্লিক করুন</p>
        {uploading && <p className="text-green-600 mt-2">Uploading...</p>}
      </div>

      <input
        id="upload-input"
        type="file" accept="image/*"
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      {previewUrls.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {previewUrls.map((url, i) => (
            <div key={i} className="relative">
              <img src={url} alt={`Preview ${i}`} className="w-24 h-24 object-cover rounded border" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => handleRemove(i)}
              >×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImage;
