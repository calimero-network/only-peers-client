import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loader from "../loader/loader";
import translations from "../../constants/en.global.json";
import Button from "../button/button";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

interface CreatePostPopupProps {
  createPost: (title: string, content: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreatePostPopup({
  createPost,
  open,
  setOpen,
}: CreatePostPopupProps) {
  const t = translations.postPopup;
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onCreatePost = () => {
    setLoading(true);
    createPost(title, imageUrl);
  };

  const handleFileChange = (e) => {
    uploadFile(e.target.files[0]);
  };

  const uploadFile = async (file: File) => {
    if (!file) return;

    setUploading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/get-upload-url`,
        {
          fileName: file.name,
          fileType: file.type,
        },
      );
      const response = await fetch(res.data.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "image/png",
          "x-amz-acl": "public-read",
        },
        body: file,
      });

      if (response.ok) {
        setImageUrl(res.data.fileUrl);
        setUploading(false);
      } else {
        window.alert("Error uploading image");
        console.error(response);
      }
    } catch (error) {
      window.alert("Error uploading image");
      console.error(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen bg-black/80 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#1c2123] px-4 pb-4 pt-5 text-left shadow-xl transition-all">
                {loading ? (
                  <div>
                    <div className="text-lg font-semibold leading-6 text-white text-center pb-4">
                      {t.loadingText}
                    </div>
                    <Loader />
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold leading-6 text-white"
                        >
                          {t.dialogTitle}
                        </Dialog.Title>
                        <label className="block mb-2 text-white text-start">
                          {t.inputTitleLabel}
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 mb-4 rounded-md outline-none bg-black text-white"
                          value={title}
                          placeholder={t.inputTitlePlaceholder}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className="block mb-2 text-white text-start">
                          {t.inputContentLabel}
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="w-full px-3 py-2 mb-4 rounded-md outline-none bg-black text-white"
                          />
                          <span className="text-white text-sm">
                            {uploading ? <Loader /> : ""}
                          </span>
                          {imageUrl && (
                            <div className="flex items-center justify-center py-4">
                              <img
                                src={imageUrl}
                                alt="Uploaded"
                                style={{ maxWidth: "200px", height: "auto" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <button
                        className="text-white text-sm flex items-center gap-2"
                        onClick={() => setOpen(false)}
                      >
                        <ArrowLeftIcon className="w-4 h-4" />
                        {t.backButtonText}
                      </button>
                      <Button
                        title={t.createButtonText}
                        backgroundColor="bg-[#ECB159]"
                        backgroundColorHover={`${
                          title.trim() === "" || imageUrl === ""
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={title.trim() === "" || imageUrl === ""}
                        onClick={() => onCreatePost()}
                      />
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
