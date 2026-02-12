/**
 * Equipment section - gear models and corresponding image files.
 * Images stored in public/assets/gear/ from Wikimedia Commons (CC BY/CC BY-SA).
 * See public/assets/gear/GEAR_IMAGES.md for attribution.
 */

export const GEAR = [
  {
    name: "Sony FX3",
    role: "Main Cinema Camera",
    desc: "Full-frame cinema body. S-Cinetone, 4K120. The workhorse.",
    image: "/assets/gear/sony-fx3.jpg",
  },
  {
    name: "Sony A7S III",
    role: "Low Light Beast",
    desc: "Dual-ISO king. Night shoots, run-and-gun, interview setups.",
    image: "/assets/gear/sony-a7s-iii.jpg",
  },
  {
    name: "BMPCC 6K Pro",
    role: "RAW Cinema",
    desc: "Blackmagic RAW. When the grade needs to go deeper.",
    image: "/assets/gear/bmpcc-6k-pro.jpg",
  },
  {
    name: "DJI RS 3 Pro",
    role: "Stabilization",
    desc: "Gimbal for smooth tracking shots and dynamic movement.",
    image: "/assets/gear/dji-rs3-pro.jpg",
  },
  {
    name: "RODE Wireless GO II",
    role: "Audio",
    desc: "Dual-channel wireless. Clean audio, zero hassle.",
    image: "/assets/gear/rode-wireless-go-ii.jpg",
  },
  {
    name: "Aputure 600d Pro",
    role: "Lighting",
    desc: "Daylight powerhouse. Key light for studio and on-location.",
    image: "/assets/gear/aputure-600d-pro.jpg",
  },
  {
    name: "Sigma 24mm f/1.4",
    role: "Wide Prime",
    desc: "Wide-angle prime. Cinematic depth, sharp edge-to-edge.",
    image: "/assets/gear/sigma-24mm-f1.4.jpg",
  },
  {
    name: "Sony Handycam",
    role: "BTS Camcorder",
    desc: "Behind-the-scenes camcorder energy. Raw, unfiltered.",
    image: "/assets/gear/sony-handycam.jpg",
  },
] as const;
