import { FormEvent, useState } from "react";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi2";
import { PiPawPrint } from "react-icons/pi";
import { ScreenCard } from "../components/common/ScreenCard";
import { useProfileStore } from "../stores/useProfileStore";
import type { MemberKind } from "../types";

const concerns = [["peanut","Peanuts"],["gluten","Gluten"],["dairy","Dairy"],["soy","Soy"],["fragrance","Fragrance"],["caffeine","Caffeine"]];

export function HouseholdPage() {
  const members = useProfileStore((state) => state.members);
  const addMember = useProfileStore((state) => state.addMember);
  const removeMember = useProfileStore((state) => state.removeMember);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [kind, setKind] = useState<MemberKind>("person");
  const [selected, setSelected] = useState<string[]>([]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    addMember({ name: name.trim(), kind, concerns: selected });
    setName(""); setKind("person"); setSelected([]); setAdding(false);
  };

  return (
    <div className="px-4 pb-6 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="flex items-center justify-between"><span className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineUserGroup size={18} /></span><button onClick={() => setAdding((value) => !value)} aria-label="Add household member" className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlinePlus size={18} /></button></header>
      <h1 className="mt-6 font-fraunces text-4xl font-bold tracking-[-.035em]">Your household</h1>
      <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">Veil can show a different result for each person and pet.</p>

      {adding ? (
        <ScreenCard className="mt-5">
          <form onSubmit={submit}>
            <h2 className="text-lg font-semibold">Add a profile</h2>
            <label htmlFor="member-name" className="mt-5 block text-sm font-medium">Name</label>
            <input id="member-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-12 w-full rounded-2xl bg-[#F0F0F0] px-4 outline-none focus:ring-2 focus:ring-[#1A1A1A]" />
            <label htmlFor="member-kind" className="mt-4 block text-sm font-medium">Profile type</label>
            <select id="member-kind" value={kind} onChange={(event) => setKind(event.target.value as MemberKind)} className="mt-2 min-h-12 w-full rounded-2xl bg-[#F0F0F0] px-4 outline-none">
              <option value="person">Person</option><option value="dog">Dog</option><option value="cat">Cat</option><option value="bird">Bird</option><option value="rabbit">Rabbit</option>
            </select>
            <p className="mt-4 text-sm font-medium">Watch list</p>
            <div className="mt-2 flex flex-wrap gap-2">{concerns.map(([key,label]) => { const active = selected.includes(key); return <button type="button" key={key} onClick={() => setSelected(active ? selected.filter((item) => item !== key) : [...selected, key])} className={`rounded-full px-3 py-1.5 text-xs font-medium ${active ? "bg-[#1A1A1A] text-white" : "bg-[#F0F0F0] text-[#6B6B6B]"}`}>{label}</button>; })}</div>
            <button className="mt-6 min-h-12 w-full rounded-full bg-[#1A1A1A] font-semibold text-white">Save profile</button>
          </form>
        </ScreenCard>
      ) : null}

      <ScreenCard className="mt-5">
        {members.map((member, index) => (
          <div key={member.id} className={`flex min-h-[76px] items-center gap-3 ${index ? "border-t border-[#F0F0F0]" : ""}`}>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#F0F0F0]">{member.kind === "person" ? <HiOutlineUser size={20} /> : <PiPawPrint size={20} />}</span>
            <span className="min-w-0 flex-1"><span className="block font-semibold">{member.name}</span><span className="mt-1 block truncate text-xs capitalize text-[#6B6B6B]">{member.kind} · {member.concerns.length ? member.concerns.join(", ") : "No selected concerns"}</span></span>
            <button onClick={() => removeMember(member.id)} aria-label={`Remove ${member.name}`} className="grid size-10 place-items-center rounded-full text-[#ADADAD]"><HiOutlineTrash size={18} /></button>
          </div>
        ))}
      </ScreenCard>
    </div>
  );
}
