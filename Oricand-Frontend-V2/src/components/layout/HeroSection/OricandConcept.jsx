import LoyaltyHome from "../LoyaltyHome";

export default function OricandConcept() {
  return (
    <section className="relative w-full min-h-screen px-4 py-5">
      <div className="hidden md:flex md:flex-col md:justify-between md:h-full md:min-h-screen">
        <div className="w-full max-w-8xl mx-auto grid grid-cols-3 gap-8 items-start">
          <div className="flex flex-col justify-start">
            <h1 className="text-[10vw] font-bold uppercase leading-none tracking-tight text-richblack">
              NEVER
            </h1>
          </div>

          <div className="h-full" /> 

          <div className="flex flex-col items-end justify-start">
            <h1 className="text-[10vw] font-bold uppercase leading-none tracking-tight text-richblack">
              RUN
            </h1>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <LoyaltyHome />
        </div>

        <div className="w-full flex justify-center">
          <h1 className="text-[12vw] font-bold uppercase leading-none tracking-tight text-richblack">
            OUT
          </h1>
        </div>
      </div>

      <div className="md:hidden flex flex-col justify-center items-center space-y-8 min-h-screen">
        <div className="text-center">
          <h1 className="text-[15vw] font-bold uppercase leading-none tracking-tight text-richblack">
            NEVER
          </h1>
          <h1 className="text-[15vw] font-bold uppercase leading-none tracking-tight text-richblack">
            RUN OUT
          </h1>
        </div>

        <div className="w-full px-4">
          <LoyaltyHome />
        </div>
      </div>
    </section>
  );
}
