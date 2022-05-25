import path from "path";
import glob from "glob";
import { homedir } from "os";
import { promisify } from "util";
import puppeteer from "puppeteer";

import publish_mission from "@/utils/publish_mission";

const match_glob = path.resolve(__dirname, "../../statics/**/*.mp4");

export async function publish() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1920,1080`],
    defaultViewport: { width: 1920, height: 800 },
    userDataDir: path.resolve(homedir(), "/puppeteer_temp/")
  });
  const match_video_files = await promisify(glob)(match_glob);
  match_video_files.map(async (single_file_name) => {
    await publish_mission(single_file_name, browser);
  });
};