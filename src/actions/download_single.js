import { Argument, Option } from "commander";
// import load_config from "@/utils/load_config";
// import get_list_data from "@/utils/get_list_data";
import download_single_task from "@/utils/download_single_task";

// export const test_command_argument = new Argument("<video_id>", "视频ID").choices(["init", "info"]);
export const video_id_option = new Option("-I,--videoid <string>").default("");

export async function download_single({ videoid }) {
  await download_single_task(videoid);
  // eval(await get_list_data(channel_url));
  // const video_list = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
  // const format_download_task = video_list.slice(0, video_list.length - 2).map(async ({ gridVideoRenderer }) => {
  //   const { videoId, title: { runs: [{ text: videoTitle }] } } = gridVideoRenderer;
  //   await download_single(videoId, videoTitle);
  // });
  // const result = await Promise.all(format_download_task);
  // console.log("result", result);
  // console.log(await load_config());
}