"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import FindUserById from "@/actions/findUserById";

const ProfileDetails = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    userImage: '/public/unknown.png'
  })

  const { data: session } = useSession();

  const userId = session?.user?.id as string;

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setImage(file);
    }
  }

  async function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      alert("Image uploaded successfully!");
      setPreview(data.path); // if you want to show uploaded one from `/uploads`
    } else {
      alert("Upload failed");
    }
  }

  async function HandleUserEmailAndImage(userId: string) {

    const currentUser = await FindUserById(userId);

    const userImagePath =
      currentUser?.image != null
        ? `/uploads/${currentUser.image}`
        : "/images/unknown.png";

        setUserInfo({
          userEmail: currentUser?.email as string,
          userImage: userImagePath
        })
  }

  useEffect(() => {
    HandleUserEmailAndImage(userId)
  })

  return (
    <div className="h-screen bg-white">
      <div className="w-full h-full">
        <div className="h-52 bg-violet-200 relative flex justify-center items-end">
          <div className="h-48 w-48 rounded-full mb-[-30px]">
            <Image
              src={userInfo.userImage}
              height={160}
              width={160}
              alt="Profile"
              className="w-full h-full rounded-full"
            ></Image>
          </div>
        </div>

        <div className="w-full pt-14">
          {/* <p className="text-center font-bold text-2xl">Mitko Kazakov</p> */}

          <p className="text-center font-semibold text-lg mt-2 mb-5">
            {userInfo.userEmail}
          </p>

          <div className="w-full">
            <form
              onSubmit={handleOnSubmit}
              className="w-full px-3 flex flex-col justify-center items-center gap-2"
            >
              <label htmlFor="image" className="tracking-widest">
                Change Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                placeholder="Browse"
                onChange={handleOnChange}
                className="bg-white placeholder:text-gray-400 block py-1.5 px-3 border-1 border-black rounded-2xl"
                required
              />
              <div className="w-full mt-3">
                {/* <Image src={'/images/random.png'} height={100} width={100} alt='Profile' className='w-full h-full'></Image> */}
                {preview && (
                  // <img
                  //   src={preview as string}
                  //   alt="preview"
                  //   className="w-full h-full"
                  // />
                  <Image src={preview as string} width={50} height={50} alt="preview" className="w-full h-full" />
                )}
              </div>
              <button className="bg-violet-300 px-3 py-2 rounded-lg cursor-pointer tracking-widest hover:bg-violet-400">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
