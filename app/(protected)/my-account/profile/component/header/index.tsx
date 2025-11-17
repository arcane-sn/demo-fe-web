import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";

interface ProfileHeaderProps {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: "active" | "inactive";
  avatar?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name = "John Doe",
  email = "johndoe@gmail.com",
  phone = "08123456789",
  role = "Admin",
  status = "active",
  avatar = "https://placehold.co/100x100",
}) => {
  return (
    <div className="w-full flex flex-col items-center relative overflow-hidden rounded-lg min-h-[200px]">
      {/* Background SVG */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/assets/image/PROFILE_header_background.svg"
          alt="Profile header background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Content */}
      <div className="relative flex flex-col items-center gap-[10px] w-full pt-8">
        {/* Avatar */}
        <div className="flex justify-start items-start gap-[10px]">
          <img
            src={avatar}
            alt={name}
            className="w-[100px] h-[100px] rounded-full border-[3px] border-[var(--color-success)]"
          />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center gap-[14px]">
          {/* Name and Status */}
          <div className="px-[10px] flex justify-center items-center gap-4">
            <div className="text-b-18-18-600 text-[var(--color-gray-900)]">
              {name}
            </div>
            <Badge
              variant={status === "active" ? "success" : "destructive"}
              size="sm"
              appearance="light"
              shape="circle"
            >
              {status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Contact Info and Role */}
          <div className="flex justify-start items-center gap-[18px]">
            {/* Email */}
            <div className="flex justify-start items-center gap-[5px]">
              <div className="w-4 h-4 relative overflow-hidden">
                <Mail className="w-[14px] h-[13px] text-[var(--color-gray-500)]" />
              </div>
              <div className="text-center text-b-14-14-500 text-[var(--color-gray-600)]">
                {email}
              </div>
            </div>

            {/* Phone */}
            <div className="flex justify-start items-center gap-[5px]">
              <div className="w-4 h-4 relative overflow-hidden">
                <Phone className="w-[11px] h-[15px] text-[var(--color-gray-500)]" />
              </div>
              <div className="text-center text-b-14-14-500 text-[var(--color-gray-600)]">
                {phone}
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex justify-start items-center gap-[6px]">
              <Badge
                variant="info"
                size="sm"
                appearance="light"
                shape="default"
              >
                {role}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
