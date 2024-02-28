import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface CreateCommentPopupProps {
  createComment: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateCommentPopup({
  createComment,
  open,
  setOpen,
}: CreateCommentPopupProps) {
  const [text, setText] = useState("");

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
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#1c2123] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-white"
                    >
                      Add a comment
                    </Dialog.Title>
                   
                    <label className="block mb-2 text-white text-start">
                      Comment
                    </label>
                    <div className="relative">
                      <textarea
                        className="w-full px-3 py-2 rounded-md resize-none outline-none bg-black text-white"
                        rows={6}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="content"
                      ></textarea>
                      <div className="text-gray-500 text-sm absolute bottom-2 right-2">
                        {text.length}/250
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-[#B67352] px-3 py-2 text-sm font-semibold text-white shadow-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-3 py-2 bg-[#ECB159] text-white text-sm rounded-md ${
                      text.trim() === "" ||
                      text.length > 250
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      text.trim() === "" ||
                      text.length > 250
                    }
                    onClick={createComment}
                  >
                    Create Comment
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
