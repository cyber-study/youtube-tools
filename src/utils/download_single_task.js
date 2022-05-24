import path from "path";
import spawn from "cross-spawn";

const youtube_dl = path.resolve(__dirname, "../../youtube-dl.exe");
const download_dir_path = path.resolve(__dirname, `../../statics/%(title)s #搞笑 #整蛊 #热门.%(ext)s`);

export default async function download_single(videoId) {
  const video_source_url = `https://www.youtube.com/watch?v=${videoId}`;
  await spawn(youtube_dl, ["-o", download_dir_path, video_source_url], { cwd: process.cwd(), stdio: "inherit" });
};