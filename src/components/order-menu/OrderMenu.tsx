import { FormEventHandler, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@components/base/Container";
import { MENU_ITEM_DETAILS } from "@lib/MENU_ITEM_DETAILS";
import MenuItemQuantityButton from "./MenuItemQuantityButton";

const orderSection = [
  {
    title: "Dishes",
    category: "dishes",
    description:
      "Trademark dishes include robust curries with flaky Roti bread, stir-fried noodles, such as Mee Goreng and Mee Rebus, and satisfying rice dishes.",
    image: "",
  },
  {
    title: "Drinks",
    category: "drinks",
    description:
      "The classic. Hand crafted drinks that taste sweet and has a creamy texture that would make you ask for more. A nice hot cup of Teh Tarik is a staple order at Mamak.",
    image: "",
  },
];

export function OrderMenu() {
  let [tabOrientation, setTabOrientation] = useState("horizontal");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    let lgMediaQuery = window.matchMedia("(min-width: 1024px)");

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? "vertical" : "horizontal");
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, []);

  const currentMenuItem = useMemo(() => {
    return MENU_ITEM_DETAILS.filter(
      (item) => item.category === orderSection[selectedIndex]?.category
    );
  }, [selectedIndex]);

  return (
    <section
      id="menu"
      aria-labelledby="order-menu-title"
      className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-[44%] -translate-y-[42%]">
        <Image
          src={"/assets/background-features.jpg"}
          alt=""
          width={2245}
          height={1636}
          layout="fixed"
          unoptimized
        />
      </div>
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2
            id="order-menu-title"
            className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Everything you need to start your day.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            All of your favourite dishes and drinks. All in one place. All in one app. All in one
            click.
          </p>
        </div>
        <Tab.Group
          as="div"
          selectedIndex={selectedIndex}
          onChange={
            ((index: number) => setSelectedIndex(index)) as FormEventHandler<HTMLDivElement> &
              ((index: number) => void)
          }
          className="mt-16 grid grid-cols-1 items-start gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === "vertical"}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex space-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:space-y-1 lg:space-x-0 lg:whitespace-normal">
                  {orderSection.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        "group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6",
                        {
                          "bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10":
                            selectedIndex === featureIndex,
                          "hover:bg-white/10 lg:hover:bg-white/5": selectedIndex !== featureIndex,
                        }
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            "font-display text-lg [&:not(:focus-visible)]:focus:outline-none",
                            {
                              "text-blue-600 lg:text-white": selectedIndex === featureIndex,
                              "text-blue-100 hover:text-white lg:text-white":
                                selectedIndex !== featureIndex,
                            }
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx("mt-2 hidden text-sm lg:block", {
                          "text-white": selectedIndex === featureIndex,
                          "text-blue-100 group-hover:text-white": selectedIndex !== featureIndex,
                        })}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {orderSection.map((sectionCategory) => (
                  <Tab.Panel key={sectionCategory.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 -top-[6.5rem] -bottom-[4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {sectionCategory.description}
                      </p>
                    </div>
                    {/* <div className="relative mt-10 aspect-[1085/730] w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]"> */}
                    <div className="relative mt-10 aspect-[1085/365] w-[45rem] overflow-hidden rounded-xl bg-slate-50 hover:bg-slate-50/75 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <div className="overflow-hidden rounded-lg ring-opacity-5">
                        <div className="relative grid gap-8 p-7">
                          {currentMenuItem.map((item) => (
                            <a
                              key={item.name}
                              className="-m-3 flex items-center flex-wrap rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                {item.imageUrl ? (
                                  <Image
                                    src={item.imageUrl}
                                    height={40}
                                    width={40}
                                    objectFit="cover"
                                  />
                                ) : (
                                  <span className="h-6 w-6 rounded-full bg-blue-600" />
                                )}
                              </div>
                              <div className="ml-4 flex-grow">
                                <p className="text-sm font-medium text-gray-900">
                                  <span className="mr-1 text-gray-500">({item.code})</span>
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">{item.description}</p>
                              </div>
                              <div className="w-full sm:w-7/12 flex justify-end items-center">
                                <MenuItemQuantityButton itemCode={item.code} />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
