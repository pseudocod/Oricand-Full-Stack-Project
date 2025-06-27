import aboutImage from "../assets/images/About.webp";
import ContactSection from "../components/contact/ContactSection";

export default function AboutPage() {
  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutImage}
            alt="About Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col min-h-screen">
          <div className="pt-8 pl-8 md:pl-16">
            <div className="flex items-center gap-2 text-white">
              <span className="text-lg font-bold tracking-wider">ORICÂND</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 space-y-8 md:space-y-12">
            <div>
              <h1 className="text-white text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight leading-none">
                ABOUT US
              </h1>
            </div>

            {/* Info Boxes */}
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
              <div className="border border-white/20 rounded-lg p-4 md:p-6 text-white flex-1 md:max-w-sm">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-4">
                  OPEN HOURS
                </h3>
                <div className="space-y-2 text-sm">
                  <p>MONDAY TO FRIDAY 8 A.M. TO 6 P.M.</p>
                  <p>SATURDAY & SUNDAY 9 A.M. TO 5 P.M.</p>
                </div>
              </div>

              <div className="border border-white/20 rounded-lg p-4 md:p-6 text-white flex-1 md:max-w-sm">
                <div className="space-y-2 text-sm">
                  <p>BULEVARDUL REGELE FERDINAND I</p>
                  <p>TIMIȘOARA, ROMANIA</p>
                  <p
                    className="underline cursor-pointer hover:opacity-80"
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/?q=Bulevardul Regele Ferdinand I, Timișoara",
                        "_blank"
                      )
                    }
                  >
                    GET DIRECTIONS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="pb-8 px-8 md:px-16">
            <p className="text-white text-sm sm:text-base md:text-2xl font-medium leading-relaxed max-w-7xl">
              Oricând is more than a coffee brand — it's a ritual. Rooted in the
              rhythm of moods, moments, and identity, we craft limited-edition
              drops that feel personal. Whether it's your first cup or your
              fifth, we believe every sip should carry a story. From curated
              blends to cinematic themes, Oricând invites you to slow down,
              connect, and savor more than just caffeine.
            </p>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
