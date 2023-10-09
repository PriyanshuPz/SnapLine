"use client";
import { User } from "@/utils/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { BiEditAlt, BiLogOut } from "react-icons/bi";
import useProfiles from "@/hooks/use-profile";
import { useParams } from "next/navigation";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import useCurrentUser from "@/hooks/useCurrentUser";
import { toast } from "react-hot-toast";
import ProfileFeeds from "@/components/profile/ProfileFeeds";
import { KeyedMutator } from "swr";
import Link from "next/link";
import { useLogoutModal } from "@/hooks/modals/use-logout-modal";
import animation_404 from "@/utils/lotties/404.json";
import ProfileLoading from "@/components/loading/ProfileLoading";

import { cn } from "@/lib/utils";
const ProfilePage = () => {
  const logoutModal = useLogoutModal();
  const params = useParams();

  const {
    data: currentUser,
    isLoading: isUser,
  }: {
    data: User;
    isLoading: boolean;
  } = useCurrentUser();

  const [followLoading, setFollowLoading] = useState(false);

  const {
    data: profileData,
    isLoading,
    error,
    mutate,
  }: {
    data: User;
    isLoading: boolean;
    error: any;
    mutate: KeyedMutator<User>;
  } = useProfiles(params.id as string);

  if (isLoading || isUser) {
    return <ProfileLoading />;
  }

  if (profileData?.message == "No User Found") {
    console.log(error);
    return (
      <div className="flex justify-center items-center flex-col min-h-screen">
        <div className="mb-8 ">
          <Lottie
            animationData={animation_404}
            loop={true}
            height={400}
            width={400}
          />
        </div>
        <div className="p-8 text-center rounded-lg shadow-lg bg-blue-500 backdrop-filter backdrop-blur-lg bg-opacity-40">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            This page is as lost as your keys in the Bermuda Triangle.
          </h3>
          <p>Let's both hope they show up soon!</p>
        </div>
      </div>
    );
  }

  const followUser = async () => {
    if (currentUser.username === "guest") {
      return toast.error("Please login to do this action");
    }
    setFollowLoading(true);
    try {
      const res = await fetch(`/api/profiles/follow/${profileData.id}`, {
        // cache: "no-cache",
      });

      const isFollow = await res.json();

      if (res.status === 401) {
        toast.error("You must be logged in to follow someone");
        setFollowLoading(false);
        return;
      }

      if (isFollow === true) {
        mutate({
          ...profileData,
          followers: [...profileData.followers, currentUser?.id],
        });
        toast.success("Followed");
        console.log(isFollow);
        setFollowLoading(false);
      } else {
        toast.success("Unfollowed");
        mutate({
          ...profileData,
          followers: profileData.followers.filter(
            (id: any) => id !== currentUser?.id
          ),
        });
        console.log(isFollow);
        setFollowLoading(false);
      }
    } catch (err) {
      console.log(err);
      setFollowLoading(false);
      toast.error("Something went wrong");
    }
  };

  if (!profileData) {
    console.log("error", profileData);
    return (
      <div className="flex items-center justify-center">
        <div className="mb-8 ">
          <Lottie
            className="blur-sm"
            animationData={animation_404}
            loop={true}
            height={400}
            width={400}
          />
        </div>
        {/* <span className="text-lg">User not found. try to check username</span> */}
      </div>
    );
  }

  return (
    <section className="p-4 w-full">
      <div className="w-full">
        <div className="flex flex-row max-[400px]:flex-col ">
          <div className="flex min-[400px]:flex-1 max-[400px]:flex-col max-[400px]:justify-center max-[400px]:items-center">
            <div>
              <Avatar className="w-14 h-14 max-[400px]:w-28 max-[400px]:h-28 rounded-full mr-3 shadow">
                <AvatarImage src={profileData.image} />
                <AvatarFallback>{profileData?.name?.at(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="pt-2 flex flex-col items-center">
              <div className="flex flex-row">
                <span className="max-[321px]:text-lg text-center  font-semibold dark:text-white text-neutral-950">
                  {profileData.name}
                </span>
                {profileData.role === "VERIFIED" && (
                  <BsFillPatchCheckFill className="ml-2 mt-2 max-[321px]:text-sm text-xs text-blue-500" />
                )}
              </div>
              <span className="text-sm text-gray-500 hover:underline hover:cursor-pointer">
                @{profileData?.username}
              </span>
            </div>
          </div>
          <div className="p-1 flex items-center justify-center">
            {currentUser?.id === profileData.id && (
              <>
                <Link
                  href="/settings/profile"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "text-sm"
                  )}
                >
                  <BiEditAlt className="mr-2" /> Edit
                </Link>
                <Button
                  variant={"destructive"}
                  className="ml-1"
                  onClick={() => logoutModal.onOpen()}
                >
                  <BiLogOut />
                </Button>
              </>
            )}
            {currentUser?.id !== profileData.id && (
              <Button
                disabled={followLoading}
                onClick={followUser}
                size={"sm"}
                className="max-[321px]:text-xs text-sm"
                variant={
                  profileData.followers.includes(currentUser?.id)
                    ? "destructive"
                    : "outline"
                }
              >
                {profileData.followers.includes(currentUser?.id)
                  ? "Unfollow"
                  : "Follow"}
                {followLoading && "..."}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="pt-4 pb-2">
        <span className="text-center max-[321px]:text-xs dark:text-gray-200 text-gray-900">
          {profileData.bio}
        </span>
      </div>

      <Separator />

      <div className="flex flex-row">
        <div className="p-2">
          <span className="pr-2 font-semibold dark:text-gray-200 text-gray-900">
            {profileData.following.length}
          </span>
          <span className="dark:text-gray-200 text-gray-900">Following</span>
        </div>
        <div className="py-1">
          <Separator orientation="vertical" />
        </div>
        <div className="p-2">
          <span className="pr-2 font-semibold dark:text-gray-200 text-gray-900">
            {profileData.followers.length}
          </span>
          <span className="dark:text-gray-200 text-gray-900">Followers</span>
        </div>
      </div>

      <div className="pt-2">
        <ProfileFeeds
          currentUser={currentUser}
          isCurrentUser={currentUser?.id === profileData.id}
        />
      </div>
    </section>
  );
};

export default ProfilePage;
