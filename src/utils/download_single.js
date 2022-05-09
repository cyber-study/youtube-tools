import fs from "fs";
import path from "path";
import ytdl from "ytdl-core";
import { green, red } from "colors";

const download_dir_path = path.resolve(__dirname, "../../statics/");

export default async function download_single(videoId, videoTitle) {
  const video_source_url = `https://www.youtube.com/watch?v=${videoId}`;
  await new Promise((resolve, reject) => {
    const stream = ytdl(video_source_url, {
      quality: [137, 18],
      filter: format => format.container === "mp4"
    });
    console.log("正在下载", green(videoTitle));
    stream.on("progress", (_, total_downloaded, total) => {
      logger("正在下载", videoTitle, "当前进度:", total_downloaded, "总大小:", total, "进度:", parseInt(total_downloaded / total));
    });
    stream.on("end", () => {
      resolve();
      console.log(green(videoTitle), "下载完成!");
    });
    stream.on("error", (error) => {
      reject(error);
      console.log(red(videoTitle), "下载失败!", red(error));
    });
    const download_file_path = path.join(download_dir_path, `${videoTitle}.mp4`);
    stream.pipe(fs.createWriteStream(download_file_path));
  });
};