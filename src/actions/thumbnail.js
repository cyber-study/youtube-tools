// import {Argument,Option} from "commander";
import glob from "glob";
import path from "path";
import spawn from "cross-spawn";
import { promisify } from "util";

// export const test_command_argument = new Argument("<actions>", "动作类型描述").choices(["init", "info"]);
// export const test_command_option = new Option("-t,--test_option <string>").default("test_option_value");

const ffmgpe_path = path.resolve(__dirname, "../../ffmpeg.exe");

export async function thumbnail() {
  const match_glob = path.resolve(__dirname, "../../statics/**/*.mp4");
  const video_list = await promisify(glob)(match_glob);
  video_list.map(async (video_source_path) => {
    const basename = path.basename(video_source_path);
    const output_path = path.resolve(__dirname, `../../statics/${basename}.jpg`);
    await spawn(ffmgpe_path, ["-i", video_source_path, "-ss", "1.00", "-vframes", "1", output_path], { stdio: "inherit" });
  });
};