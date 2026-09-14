import { FormEvent, useState } from "react";
import { HiOutlineArrowPath, HiOutlineDevicePhoneMobile, HiOutlineInformationCircle, HiOutlineUserCircle } from "react-icons/hi2";
import { ScreenCard } from "../components/common/ScreenCard";
import { useProductStore } from "../stores/useProductStore";
import { useProfileStore } from "../stores/useProfileStore";
import { useScanStore } from "../stores/useScanStore";

export function ProfilePage() {
  const profileName = useProfileStore((state) => state.name);
  const setProfileName = useProfileStore((state) => state.setName);
  const resetProfile = useProfileStore((state) => state.resetProfile);
  const clearHistory = useScanStore((state) => state.clearHistory);
  const clearProducts = useProductStore((state) => state.clearProducts);
  const [name, setName] = useState(profileName);
  const [saved, setSaved] = useState(false);

  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    setProfileName(name.trim());
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  const reset = () => {
    resetProfile();
    clearHistory();
    clearProducts();
    localStorage.removeItem("veil-web-onboarded");
    setName("Olumide");
  };

  return (
    <div className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineUserCircle size={18} /></span><span className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineInformationCircle size={18} /></span></header>
      <h1 className="mt-6 font-fraunces text-4xl font-bold tracking-[-.035em]">Your profile</h1>
      <p className="mt-1 text-sm text-[#6B6B6B]">Preferences saved on this browser.</p>

      <ScreenCard className="mt-5">
        <form onSubmit={save}>
          <label htmlFor="profile-name-edit" className="text-sm font-medium">Display name</label>
          <div className="mt-2 flex gap-2">
            <input id="profile-name-edit" value={name} onChange={(event) => setName(event.target.value)} className="min-h-12 min-w-0 flex-1 rounded-full bg-[#F0F0F0] px-4 outline-none focus:ring-2 focus:ring-[#1A1A1A]" />
            <button className="rounded-full bg-[#1A1A1A] px-5 text-sm font-semibold text-white">{saved ? "Saved" : "Save"}</button>
          </div>
        </form>
      </ScreenCard>

      <ScreenCard className="mt-4">
        <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-[#F0F0F0]"><HiOutlineDevicePhoneMobile size={20} /></span><div><p className="font-semibold">Install Veil</p><p className="mt-1 text-xs leading-5 text-[#6B6B6B]">Use your browser menu and choose “Add to Home Screen” for an app-like launch.</p></div></div>
      </ScreenCard>

      <ScreenCard className="mt-4">
        <h2 className="text-lg font-semibold">About this version</h2>
        <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">This is a complete frontend prototype. Camera scanning, profiles, scan history, custom products, and personalized demo scoring work locally. It does not make medical claims or call a backend.</p>
      </ScreenCard>

      <button onClick={reset} className="mt-5 flex min-h-12 items-center gap-2 rounded-full bg-[#F0F0F0] px-5 text-sm font-medium text-[#6B6B6B]"><HiOutlineArrowPath size={18} /> Reset local demo data</button>
    </div>
  );
}
