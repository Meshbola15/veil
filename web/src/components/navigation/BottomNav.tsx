import gsap from "gsap";
import { useRef } from "react";
import { HiOutlineClock, HiOutlineHome, HiOutlineQrCode, HiOutlineUserCircle, HiOutlineUserGroup } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/app", label: "Home", Icon: HiOutlineHome, end: true },
  { to: "/app/history", label: "History", Icon: HiOutlineClock },
  { to: "/app/scan", label: "Scan", Icon: HiOutlineQrCode, scan: true },
  { to: "/app/household", label: "Household", Icon: HiOutlineUserGroup },
  { to: "/app/profile", label: "Profile", Icon: HiOutlineUserCircle },
];

export function BottomNav() {
  const fabRef = useRef<HTMLSpanElement>(null);
  const press = () => gsap.to(fabRef.current, { scale: 0.93, duration: 0.08 });
  const release = () => gsap.to(fabRef.current, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.5)" });

  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-40 mx-auto flex h-[calc(64px+env(safe-area-inset-bottom))] max-w-md items-start justify-around bg-white px-2 pt-2 shadow-[0_-1px_0_rgba(0,0,0,0.04)]">
      {navItems.map(({ to, label, Icon, scan, end }) => (
        <NavLink key={to} to={to} end={end} aria-label={label} className={({ isActive }) => `grid min-h-11 min-w-11 place-items-center ${isActive ? "text-[#1A1A1A]" : "text-[#ADADAD]"}`}>
          {scan ? (
            <span ref={fabRef} onPointerDown={press} onPointerUp={release} onPointerCancel={release} className="-mt-7 grid size-14 place-items-center rounded-full bg-[#1A1A1A] text-white shadow-fab">
              <Icon size={24} />
            </span>
          ) : <Icon size={22} />}
        </NavLink>
      ))}
    </nav>
  );
}
