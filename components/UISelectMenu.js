import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

export const UISelectMenu = ({
  fetching,
  placeholderText,
  items,
  selectedItem,
  setSelectedItem,
  handleChange,
}) => {
  return (
    <Listbox
      value={selectedItem}
      onChange={
        handleChange
          ? handleChange
          : (item) => {
              if (selectedItem && item.id == selectedItem.id) {
                setSelectedItem();
              } else {
                setSelectedItem(item);
              }
            }
      }
    >
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md  py-2.5 pl-3 pr-10 text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm">
              {selectedItem ? (
                <span className="block truncate">{selectedItem.title}</span>
              ) : (
                <span className="block truncate text-gray-400 ">
                  {placeholderText}
                </span>
              )}

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full divide-y overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {fetching ? (
                  <p>loading...</p>
                ) : (
                  items.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-blue-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={item}
                    >
                      {({ selectedItem, active }) => (
                        <>
                          <div>
                            <span
                              className={classNames(
                                selectedItem ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {item.title}
                            </span>
                            {item.id && (
                              <span
                                className={classNames(
                                  selectedItem
                                    ? "font-semibold"
                                    : "font-normal",
                                  "block truncate text-xs"
                                )}
                              >
                                {item.id}
                              </span>
                            )}
                          </div>

                          {selectedItem ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-blue-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
