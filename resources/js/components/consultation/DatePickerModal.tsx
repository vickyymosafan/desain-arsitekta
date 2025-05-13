import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { format, addMonths, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addYears, subYears } from 'date-fns';
import { id } from 'date-fns/locale';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedDate: Date) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(addMonths(currentDate, -1));
  const nextYear = () => setCurrentDate(addYears(currentDate, 1));
  const prevYear = () => setCurrentDate(subYears(currentDate, 1));

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      onSubmit(selectedDate);
      onClose();
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={prevYear}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <span className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
          {format(currentDate, dateFormat, { locale: id })}
        </span>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={nextYear}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEEEE";
    const days = [];
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
          {format(addDays(startDate, i), dateFormat, { locale: id })}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isPastDay = day < new Date() && !isToday;
        
        days.push(
          <button
            key={day.toString()}
            onClick={() => handleDateClick(cloneDay)}
            disabled={isPastDay || !isCurrentMonth}
            className={`
              h-10 w-full rounded-lg flex items-center justify-center text-sm transition
              ${isCurrentMonth ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'} 
              ${isToday && 'bg-emerald-100 dark:bg-emerald-900/30 font-semibold text-emerald-600 dark:text-emerald-400'}
              ${isSelected && 'bg-emerald-500 dark:bg-emerald-600 text-white font-semibold'}
              ${isPastDay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-100 dark:hover:bg-emerald-900/30'}
              ${!isCurrentMonth && 'opacity-25 cursor-not-allowed'}
            `}
          >
            {formattedDate}
          </button>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1 my-1">
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="p-3">{rows}</div>;
  };

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
                    <CalendarIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                </div>

                <Dialog.Title 
                  as="h3" 
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white text-center"
                >
                  Pilih Tanggal Konsultasi
                </Dialog.Title>
                <div className="mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-300 text-center mb-4">
                    Silakan pilih tanggal yang Anda inginkan untuk konsultasi gratis
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden">
                    {renderHeader()}
                    {renderDays()}
                    {renderCells()}
                  </div>
                  
                  <div className="mt-5 flex justify-between items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedDate ? (
                        <span>Tanggal dipilih: <strong>{format(selectedDate, 'dd MMMM yyyy', { locale: id })}</strong></span>
                      ) : (
                        <span>Silakan pilih tanggal</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-700"
                    onClick={onClose}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    disabled={!selectedDate}
                    className={`inline-flex justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none ${
                      selectedDate
                        ? 'bg-emerald-600 hover:bg-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                        : 'bg-emerald-400 cursor-not-allowed opacity-70'
                    }`}
                    onClick={handleSubmit}
                  >
                    Konfirmasi
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DatePickerModal;
