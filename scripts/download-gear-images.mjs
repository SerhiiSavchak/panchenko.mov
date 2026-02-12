#!/usr/bin/env node
/**
 * Downloads gear product images from Wikimedia Commons to public/assets/gear.
 * Run: node scripts/download-gear-images.mjs
 * 
 * Sources: Wikimedia Commons (CC BY 2.0 / CC BY-SA 4.0)
 * See GEAR_IMAGES.md for attribution.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEAR_DIR = path.join(__dirname, "..", "public", "assets", "gear");

const IMAGES = [
  {
    file: "sony-fx3.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Sony_FX3_with_Sony_FE_24mm_F1.4_GM_-_by_Henry_S%C3%B6derlund_%2851061907312%2C_cropped%29.jpg/1280px-Sony_FX3_with_Sony_FE_24mm_F1.4_GM_-_by_Henry_S%C3%B6derlund_%2851061907312%2C_cropped%29.jpg",
    model: "Sony FX3",
  },
  {
    file: "sony-a7s-iii.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Sony_%CE%B17S_III_21_Oct_2020a.jpg/1280px-Sony_%CE%B17S_III_21_Oct_2020a.jpg",
    model: "Sony A7S III",
  },
  {
    file: "bmpcc-6k-pro.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Blackmagic_Pocket_Cinema_Camera_4K_-_1.jpg/1280px-Blackmagic_Pocket_Cinema_Camera_4K_-_1.jpg",
    model: "BMPCC 6K Pro (closest: BMPCC 4K)",
  },
  {
    file: "dji-rs3-pro.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/DJI_Ronin_SC_Camera_Gimbal_01.jpg/1280px-DJI_Ronin_SC_Camera_Gimbal_01.jpg",
    model: "DJI RS 3 Pro (closest: DJI Ronin SC)",
  },
  {
    file: "rode-wireless-go-ii.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rode_Wireless_Go_II_microphone.jpg/1280px-Rode_Wireless_Go_II_microphone.jpg",
    model: "RODE Wireless GO II",
  },
  {
    file: "aputure-600d-pro.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Studio_Lighting_Equipment_WMDE_IMG_3238_edit.jpg/1280px-Studio_Lighting_Equipment_WMDE_IMG_3238_edit.jpg",
    model: "Aputure 600d Pro (closest: studio LED lighting)",
  },
  {
    file: "sigma-24mm-f1.4.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Sigma_24mm_F1.4_DG_DN_-_Art%2C_Sony_E.jpg/1280px-Sigma_24mm_F1.4_DG_DN_-_Art%2C_Sony_E.jpg",
    model: "Sigma 24mm f/1.4 DG DN Art",
  },
  {
    file: "sony-handycam.jpg",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Sony_Handycam_DCR-SR35_20190810.jpg/1280px-Sony_Handycam_DCR-SR35_20190810.jpg",
    model: "Sony Handycam",
  },
];

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  fs.mkdirSync(GEAR_DIR, { recursive: true });
  console.log("Downloading gear images to", GEAR_DIR);

  for (const { file, url, model } of IMAGES) {
    const outPath = path.join(GEAR_DIR, file);
    try {
      const buf = await download(url);
      fs.writeFileSync(outPath, buf);
      console.log(`  ✓ ${file} (${model})`);
    } catch (e) {
      console.error(`  ✗ ${file}: ${e.message}`);
    }
  }
  console.log("Done.");
}

main();
