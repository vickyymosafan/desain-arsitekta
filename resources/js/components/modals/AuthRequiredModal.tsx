import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { XMarkIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  isOpen,
  onClose,
  title = 'Login Diperlukan',
  message = 'Anda perlu login atau registrasi terlebih dahulu untuk dapat melanjutkan konsultasi gratis.'
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800 border border-emerald-500/30">
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className="rounded-md bg-white/10 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:hover:text-gray-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center justify-center mb-4">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <LockClosedIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                </div>

                <Dialog.Title 
                  as="h3" 
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white text-center"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
                    {message}
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/login"
                    className="inline-flex justify-center rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-emerald-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-emerald-400 dark:ring-gray-600 dark:hover:bg-gray-600 transition-all duration-300"
                  >
                    Registrasi
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthRequiredModal;
