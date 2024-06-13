import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import translations from '../../constants/en.global.json';
import Button from '../button/button';

interface ErrorPopupProps {
  error: String;
}

export default function ErrorPopup(props: ErrorPopupProps) {
  const t = translations.errorPopup;
  const [open, setOpen] = useState(true);
  const router = useRouter();

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
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative max-w-[450px] transform overflow-hidden rounded-lg bg-[#1c2123] px-4 pb-4 pt-5 text-left shadow-xl transition-all">
                <div>
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#B67352]">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-[#ECB159]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-white"
                    >
                      {t.dialogTitle}
                    </Dialog.Title>
                    <div className="mt-2flex justify-center items-center">
                      <p className="text-sm text-white w-full">{props.error}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center">
                  <Button
                    title={t.reloadButtonText}
                    backgroundColor="bg-[#B67352]"
                    backgroundColorHover=""
                    onClick={() => router.reload()}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
