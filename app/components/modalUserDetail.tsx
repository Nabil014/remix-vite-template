interface Props {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

export default function ModalUserDetail({ showModal, setShowModal }: Props) {
  return (
    <>
      {showModal && (
        <div
          id='hs-vertically-centered-modal'
          className='hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none'
        >
          <div className='hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center'>
            <div className='w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70'>
              <div className='flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700'>
                <h3 className='font-bold text-gray-800 dark:text-white'>
                  Modal title
                </h3>
              </div>
              <div className='p-4 overflow-y-auto'>
                <p className='text-gray-800 dark:text-neutral-400'>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </p>
              </div>
              <div className='flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700'>
                <button
                  onClick={() => setShowModal(false)}
                  type='button'
                  className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800'
                  data-hs-overlay='#hs-vertically-centered-modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
