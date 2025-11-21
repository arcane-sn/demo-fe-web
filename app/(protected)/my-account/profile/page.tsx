"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProfileHeader from "./component/header";
import NavigationTab from "./component/navigation-tab";
import Profile from "./component/profile";
import MyAccountSecurityPage from "./component/security";

export default function MyAccountProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get("type");
    console.log("URL params:", { type });

    if (type === "security") {
      setActiveTab("security");
    } else {
      setActiveTab("profile");
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    if (tab === "profile") {
      router.push("/my-account/profile");
    } else if (tab === "security") {
      router.push("/my-account/profile?type=security");
    }
  };

  return (
    <div className="container mx-auto pb-6 pl-6 pr-6">
      <div className="">
        <ProfileHeader
          name="John Doe"
          email="johndoe@gmail.com"
          phone="08123456789"
          role="Admin"
          status="active"
          avatar="https://placehold.co/100x100"
        />
      </div>
      <div className="mb-6">
        <NavigationTab
          activeTab={activeTab as "profile" | "security"}
          onTabChange={(tab) => {
            handleTabChange(tab);
          }}
        />
      </div>
      <div>
        {activeTab === "profile" && <Profile />}
        {activeTab === "security" && <MyAccountSecurityPage />}
      </div>
    </div>
  );
}
