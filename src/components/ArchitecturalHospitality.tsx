import { Sparkles } from "lucide-react";

interface HospitalityCard {
  id: string;
  tagline: string;
  title: string;
  description: string;
  bgClass: string;
}

const HOSPITALITY_CARDS: HospitalityCard[] = [
  {
    id: "teak",
    tagline: "Sturdily beautiful.",
    title: "Cross-Laminated Ceylon Teak",
    description:
      "Hand-crafted timber pavilions engineered for coastal durability, acoustic serenity, and zero-carbon footprint.",
    bgClass: "bg-[#38312a]",
  },
  {
    id: "horizon",
    tagline: "Warm, sun-drenched.",
    title: "Golden-Hour Infinity Horizons",
    description:
      "Cantilevered basalt plunge pools and private cabanas with automated RFID/QR guest access validation.",
    bgClass: "bg-[#8e592e]",
  },
  {
    id: "dining",
    tagline: "Naturally comforting.",
    title: "Ayurvedic & Allergen-Safe Dining",
    description:
      "Every dish is mapped to our real-time Allergen Engine and local/foreign multi-currency pricing lists.",
    bgClass: "bg-[#877258]",
  },
  {
    id: "digital",
    tagline: "Timelessly modern.",
    title: "NFC Smart Keys & In-Room QR Butler",
    description:
      "Unlock your villa via mobile key, order single-estate tea via room QR, and track live folio charges.",
    bgClass: "bg-[#987053]",
  },
];

export default function ArchitecturalHospitality() {
  return (
    <section className="architectural-hospitality-section py-16 md:py-24 bg-[#f6f3ed] border-t border-stone-200/60">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Mission, Vision, Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#865d36] uppercase block mb-3">
                ARCHITECTURAL HOSPITALITY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2b241e] font-normal leading-[1.08] tracking-tight mb-5">
                Mass-timber sanctuaries tuned to Sri Lanka's coast and cloud forests.
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                AAA Hotel unites sustainable timber craftsmanship and biophilic design
                with effortless digital hospitality, from mobile keys to in-room butler service.
              </p>
            </div>

            {/* Metrics Row */}
            <div className="border-t border-stone-300/80 pt-6 mt-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-serif text-[#2b241e] font-normal">
                    4 Properties
                  </h4>
                  <p className="text-xs text-stone-500 font-medium mt-1">
                    Weligama • Galle • Bentota • Ella
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl sm:text-3xl font-serif text-[#2b241e] font-normal">
                    100% Unified
                  </h4>
                  <p className="text-xs text-stone-500 font-medium mt-1">
                    PMS • POS • QR Menu • Smart Locks
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Standard Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {HOSPITALITY_CARDS.map((card) => (
                <div
                  key={card.id}
                  className={`${card.bgClass} text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between min-h-[230px] border border-white/10 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1`}
                >
                  <div>
                    <span className="font-serif italic text-amber-200/90 text-sm sm:text-base block mb-1">
                      {card.tagline}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-200/90 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="border-t border-white/20 pt-4 mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-stone-300/90 uppercase">
                      AAA SANCTUARY STANDARD
                    </span>
                    <Sparkles size={14} className="text-amber-200/90" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
