import path from "path";
import iconv_lite from "iconv-lite";
import { spawn } from "cross-spawn";

import publish_mission from "@/utils/publish_mission";

const youtube_dl = path.resolve(__dirname, "../../youtube-dl.exe");

export default async function download_single(videoId) {
  try {
    const video_source_url = `https://www.youtube.com/watch?v=${videoId}`;
    const stdout_title = spawn(youtube_dl, ["--get-title", video_source_url, "--proxy", "socks5://127.0.0.1:1080"]);
    const video_title = await new Promise((resolve, reject) => {
      stdout_title.stdout.on("data", (data) => resolve(data));
      stdout_title.stderr.on("data", (error) => reject(error.toString()));
    });
    const decode_title = iconv_lite.decode(video_title, "cp936").replace(/\n/ig, "").replace(/\%/ig, "");
    const download_dir_path = path.resolve(__dirname, `../../statics/${decode_title} #鸡汤 #励志 .%(ext)s`);
    const download_mission = spawn(youtube_dl, ["--format", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best", "-o", download_dir_path, video_source_url, "--proxy", "socks5://127.0.0.1:1080"], { cwd: process.cwd() });
    await new Promise((resolve, reject) => {
      download_mission.on("close", resolve);
      download_mission.stdout.on("data", (data) => {
        console.log(iconv_lite.decode(data, "cp936"));
      });
      download_mission.stderr.on("data", (error) => {
        reject(error.toString());
      });
    });
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // const save_file_name = path.resolve(__dirname, `../../statics/${decode_title} #搞笑 #美女.mp4`);
    // await publish_mission(save_file_name);
    // await promisify(fs.unlink)(save_file_name);
  } catch (error) {
    console.log("error", error);
  };
};