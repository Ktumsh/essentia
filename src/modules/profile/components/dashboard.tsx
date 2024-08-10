"use client";

import Link from "next/link";

import ProfileInfo from "./profile-info";

import { Avatar, AvatarGroup, Image as UIImage } from "@nextui-org/react";

import Image from "next/image";

import ProgressInfo from "./progress-info";

const Dashboard = ({ session }: any) => {
  return (
    <>
      <section className="flex flex-col items-stretch shrink w-full mb-2">
        <div className="relative flex flex-col size-full bg-white/50 dark:bg-base-full-dark-50 border border-t-0 border-white dark:border-base-full-dark backdrop-blur backdrop-saturate-150 rounded-b-xl shadow-md">
          <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5 rounded-xl z-0"></div>
          <Link
            href=""
            aria-hidden="true"
            role="link"
            className="relative flex h-72 bg-black/30 transition-colors"
          >
            <div className="overflow-hidden">
              <div className="pb-[33.333%] w-full"></div>
              <div className="absolute inset-0 size-full">
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat bg-center size-full"
                  style={{ backgroundImage: "url()" }}
                ></div>
                <UIImage
                  removeWrapper
                  as={Image}
                  width={984}
                  height={288}
                  src="/hero-dashboard.webp"
                  alt=""
                  draggable={true}
                  classNames={{
                    img: "absolute inset-0 object-cover object-center size-full",
                  }}
                />
              </div>
            </div>
          </Link>
          <ProfileInfo session={session} />
        </div>
      </section>
      <section className="flex items-stretch grow shrink size-full mb-5 gap-2">
        <div className="relative flex flex-col w-full bg-white/50 dark:bg-base-full-dark-50 border border-white dark:border-base-full-dark backdrop-blur backdrop-saturate-150 rounded-xl shadow-md">
          <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5 rounded-xl z-0"></div>
          <div className="flex flex-col gap-4 px-8 py-5">
            <div className="text-sm font-bold">
              <h3>Amigos</h3>
            </div>
            <AvatarGroup isBordered total={10}>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
          </div>
        </div>
        <ProgressInfo />
      </section>
    </>
  );
};

export default Dashboard;
