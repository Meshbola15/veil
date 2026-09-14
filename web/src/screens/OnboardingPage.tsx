import { useState } from "react";
import { HiArrowLeft, HiArrowRight, HiOutlineQrCode } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useProfileStore } from "../stores/useProfileStore";

const concerns = [
  ["peanut", "Peanuts"], ["gluten", "Gluten"], ["dairy", "Dairy"],
  ["soy", "Soy"], ["fragrance", "Fragrance"], ["caffeine", "Caffeine"],
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const setName = useProfileStore((state) => state.setName);
  const addMember = useProfileStore((state) => state.addMember);
  const [step, setStep] = useState(0);
  const [name, setLocalName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const finish = () => {
    const safeName = name.trim() || "You";
    setName(safeName);
    addMember({ name: safeName, kind: "person", concerns: selected });
    localStorage.setItem("veil-web-onboarded", "true");
    navigate("/app");
  };

  return (
    <div className="min-h-dvh bg-[#E5E5E5] px-4 py-5">
      <div className="mx-auto flex min-h-[calc(100dvh-2.5rem)] max-w-md flex-col rounded-[30px] bg-white p-5 shadow-card">
        <header className="flex items-center justify-between">
          {step > 0 ? <button aria-label="Previous step" onClick={() => setStep(step - 1)} className="grid size-11 place-items-center rounded-full bg-[#F0F0F0]"><HiArrowLeft size={18} /></button> : <Link to="/" aria-label="Back to landing page" className="grid size-11 place-items-center rounded-full bg-[#F0F0F0]"><HiArrowLeft size={18} /></Link>}
          <div className="flex gap-1.5">{[0,1,2].map((item) => <span key={item} className={`h-1.5 rounded-full ${item === step ? "w-7 bg-[#1A1A1A]" : "w-2 bg-[#D8D8D8]"}`} />)}</div>
          <span className="w-11" />
        </header>

        <div className="flex flex-1 flex-col justify-center py-10">
          {step === 0 ? (
            <>
              <span className="grid size-16 place-items-center rounded-full bg-[#1A1A1A] text-white"><HiOutlineQrCode size={28} /></span>
              <h1 className="mt-8 font-fraunces text-[2.7rem] font-bold leading-[1.02] tracking-[-.04em]">A clearer answer for everyone at home.</h1>
              <p className="mt-4 text-base leading-7 text-[#6B6B6B]">This web demo stores your profile and scans only in this browser. You can reset them at any time.</p>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <p className="text-xs font-medium uppercase tracking-[.16em] text-[#6B6B6B]">First, you</p>
              <h1 className="mt-3 font-fraunces text-[2.7rem] font-bold leading-[1.02] tracking-[-.04em]">What should Veil call you?</h1>
              <label htmlFor="profile-name" className="mt-8 text-sm font-semibold">Your name</label>
              <input id="profile-name" autoFocus value={name} onChange={(event) => setLocalName(event.target.value)} placeholder="e.g. Olumide" className="mt-2 min-h-14 rounded-2xl bg-[#F0F0F0] px-4 text-base outline-none focus:ring-2 focus:ring-[#1A1A1A]" />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <p className="text-xs font-medium uppercase tracking-[.16em] text-[#6B6B6B]">Personalize</p>
              <h1 className="mt-3 font-fraunces text-[2.7rem] font-bold leading-[1.02] tracking-[-.04em]">Anything you watch out for?</h1>
              <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">Choose as many as needed. You can add people and pets later.</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {concerns.map(([key, label]) => {
                  const active = selected.includes(key);
                  return <button key={key} onClick={() => setSelected(active ? selected.filter((item) => item !== key) : [...selected, key])} className={`rounded-full px-4 py-2.5 text-sm font-medium ${active ? "bg-[#1A1A1A] text-white" : "bg-[#F0F0F0] text-[#6B6B6B]"}`}>{label}</button>;
                })}
              </div>
            </>
          ) : null}
        </div>

        <button onClick={() => step === 2 ? finish() : setStep(step + 1)} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-6 font-semibold text-white active:scale-[.98]">
          {step === 0 ? "Set up my profile" : step === 1 ? "Continue" : "Open Veil"} <HiArrowRight size={18} />
        </button>
        {step === 0 ? <button onClick={() => navigate("/app")} className="mt-3 min-h-11 text-sm font-medium text-[#6B6B6B]">Skip and explore the demo</button> : null}
      </div>
    </div>
  );
}
