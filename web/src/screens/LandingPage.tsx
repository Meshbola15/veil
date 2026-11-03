import { HiArrowRight, HiCheck, HiOutlineQrCode, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";

const featureItems = [
  { Icon: HiOutlineQrCode, title: "Scan almost anything", text: "Food, cosmetics, supplements, medicine, and products used around your home." },
  { Icon: HiOutlineUserGroup, title: "Personal to your household", text: "A single label becomes a useful answer for each person and pet you care for." },
  { Icon: HiOutlineShieldCheck, title: "Understand every flag", text: "See the ingredient behind each note, in calm language that helps you decide." },
];

export function LandingPage() {
  return (
    <div className="min-h-dvh bg-[#E5E5E5] text-[#1A1A1A]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-2 font-inter text-lg font-bold">
          <span className="grid size-9 place-items-center rounded-full bg-[#1A1A1A] text-white"><HiOutlineQrCode size={19} /></span>
          Veil
        </Link>
        <nav className="flex items-center gap-5">
          <a href="#how" className="hidden text-sm font-medium text-[#6B6B6B] sm:block">How it works</a>
          <Link to="/app" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold shadow-card">Open demo</Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-12 md:grid-cols-[1.05fr_.95fr] md:px-10 md:pb-28 md:pt-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#6B6B6B] shadow-card"><HiOutlineSparkles size={16} /> Product clarity for the whole household</div>
            <h1 className="mt-7 max-w-3xl font-fraunces text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[.88] tracking-[-.055em]">
              See what is really inside.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#6B6B6B] md:text-xl">
              Scan a product and see how its ingredients fit your allergies, preferences, medications, and pets.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/onboarding" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-7 font-semibold text-white active:scale-[.98]">
                Start scanning <HiArrowRight size={18} />
              </Link>
              <Link to="/app" className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 font-semibold shadow-card">Explore with demo data</Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6B6B6B]">
              {["No account required", "Saved on this device", "Built for mobile browsers"].map((item) => <span key={item} className="flex items-center gap-1.5"><HiCheck size={16} />{item}</span>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="rounded-[46px] bg-[#1A1A1A] p-2.5 shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
              <div className="overflow-hidden rounded-[38px] bg-[#E5E5E5] p-4">
                <div className="flex items-center justify-between py-2"><span className="grid size-9 place-items-center rounded-full bg-white shadow-card"><HiOutlineQrCode size={18} /></span><span className="grid size-9 place-items-center rounded-full bg-white text-xs font-semibold shadow-card">OM</span></div>
                <div className="mt-4 rounded-[30px] bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="grid size-20 place-items-center rounded-full bg-white text-5xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]">🥜</span>
                    <div className="relative grid size-24 place-items-center rounded-full border-[7px] border-[#E53935]">
                      <span className="font-fraunces text-3xl font-bold">34</span>
                    </div>
                  </div>
                  <h2 className="mt-7 text-xl font-semibold">Creamy Peanut Butter</h2>
                  <p className="mt-1 text-sm text-[#6B6B6B]">Jif · Food</p>
                  <div className="mt-5 border-t border-[#F0F0F0] pt-4">
                    <p className="text-xs text-[#6B6B6B]">Personalized for Lisa</p>
                    <p className="mt-1 text-sm font-semibold text-[#E53935]">May not suit your profile</p>
                    <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">Roasted peanuts are flagged for Lisa’s allergy.</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-[30px] bg-white p-5 shadow-card">
                  <div className="grid size-12 place-items-center rounded-full bg-[#1A1A1A] text-white"><HiOutlineQrCode size={22} /></div>
                  <div><p className="font-semibold">Scan another product</p><p className="mt-1 text-xs text-[#6B6B6B]">Use your phone’s back camera</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#6B6B6B]">A better way to read the label</p>
            <div className="mt-5 grid items-start gap-10 md:grid-cols-[.8fr_1.2fr]">
              <h2 className="font-fraunces text-4xl font-bold leading-[1.02] tracking-[-.04em] md:text-6xl">The label is general. Your answer should not be.</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {featureItems.map(({ Icon, title, text }) => (
                  <article key={title} className="rounded-[30px] bg-white p-5 shadow-card">
                    <Icon size={24} />
                    <h3 className="mt-12 text-base font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 md:px-10 md:pb-28">
          <div className="mx-auto max-w-5xl rounded-[30px] bg-white px-6 py-14 shadow-card md:px-16 md:py-20">
            <h2 className="max-w-3xl font-fraunces text-4xl font-bold leading-tight tracking-[-.04em] md:text-6xl">Make the next product an informed choice.</h2>
            <Link to="/onboarding" className="mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#1A1A1A] px-7 font-semibold text-white">Try Veil now <HiArrowRight size={18} /></Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-black/5 px-5 py-8 text-center text-sm text-[#6B6B6B]">© 2026 Veil. Information to support your choices, not replace professional advice.</footer>
    </div>
  );
}
