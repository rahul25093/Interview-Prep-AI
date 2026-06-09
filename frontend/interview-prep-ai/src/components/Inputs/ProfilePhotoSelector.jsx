import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({
  image,
  setImage,
  preview,
  setPreview,
}) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      const imageUrl = URL.createObjectURL(file);

      setPreviewUrl(imageUrl);

      if (setPreview) {
        setPreview(imageUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {!image ? (
        <div className="relative w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full">
          <LuUser className="text-4xl text-orange-500" />

          <button
            type="button"
            onClick={onChooseFile}
            className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white cursor-pointer"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white cursor-pointer"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;