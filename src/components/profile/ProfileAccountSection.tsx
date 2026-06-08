import { useRef } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import { ProfileSection } from "@/components/profile/ProfileSection";
type Props = {
  name: string;
  email: string;
  profileImageUrl?: string;
  onNameChange: (name: string) => void;
  onProfileImageChange: (dataUrl: string | undefined) => void;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase();
}

export function ProfileAccountSection({
  name,
  email,
  profileImageUrl,
  onNameChange,
  onProfileImageChange,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") onProfileImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ProfileSection
      title="Account"
      subtitle="Used to personalize your scores and sync your data."
    >
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative flex size-20 items-center justify-center rounded-full bg-[#F0F0F0] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          aria-label="Change profile photo"
        >
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt=""
              className="size-full rounded-full object-cover"
            />
          ) : (
            <span className="font-bricolage text-2xl font-semibold text-text-primary">
              {getInitials(name)}
            </span>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 flex size-8 items-center justify-center rounded-full bg-text-primary text-white shadow-sm">
            <HiOutlineCamera size={16} />
          </span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />

        <div className="w-full">
          <label
            htmlFor="profile-name"
            className="font-inter text-xs font-medium text-text-secondary"
          >
            Display name
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Your name"
            className="mt-1.5 w-full rounded-2xl bg-[#F5F5F5] px-4 py-3 font-inter text-sm text-text-primary outline-none placeholder:text-text-disabled"
          />
        </div>

        <div className="w-full rounded-2xl bg-[#F5F5F5] px-4 py-3">
          <p className="font-inter text-xs font-medium text-text-secondary">
            Email
          </p>
          <p className="mt-1 font-inter text-sm font-medium text-text-primary">
            {email || "Not signed in"}
          </p>
        </div>
      </div>
    </ProfileSection>
  );
}
