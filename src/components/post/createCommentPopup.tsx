import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Loader from '../loader/loader';
import translations from '../../constants/en.global.json';
import Button from '../button/button';

interface CreateCommentPopupProps {
  createComment: (text: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateCommentPopup({
  createComment,
  open,
  setOpen,
}: CreateCommentPopupProps) {
  const t = translations.commentPopup;
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const onCreateComment = () => {
    setLoading(true);
    createComment(text);
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
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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

                        <label className="block mb-2 mt-2 text-white text-start">
                          {t.inputLabel}
                        </label>
                        <div className="relative">
                          <textarea
                            className="w-72 px-3 py-2 rounded-md resize-none outline-none bg-black text-white"
                            rows={6}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t.inputPlaceholder}
                          ></textarea>
                          <div className="text-gray-500 text-sm absolute bottom-2 right-2">
                            {text.length}/250
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <Button
                        title={t.cancelButtonText}
                        backgroundColor="bg-[#B67352]"
                        backgroundColorHover=""
                        onClick={() => setOpen(false)}
                      />
                      <Button
                        title={t.createButtonText}
                        backgroundColor="bg-[#ECB159]"
                        backgroundColorHover={`${
                          text.trim() === '' || text.length > 250
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                        disabled={text.trim() === '' || text.length > 250}
                        onClick={onCreateComment}
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
