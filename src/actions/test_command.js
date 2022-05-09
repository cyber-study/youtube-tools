// import {Argument,Option} from "commander";
import load_config from "@/utils/load_config";
import get_list_data from "@/utils/get_list_data";
import download_single from "@/utils/download_single";

// export const test_command_argument=new Argument("<actions>","动作类型描述").choices(["init","info"]);
// export const test_command_option=new Option("-t,--test_option <string>").default("test_option_value");

export async function test_command() {
  const channel_url = "https://www.youtube.com/channel/UCDyYJmCdChpMBl1l_EIlU1Q/videos";
  eval(await get_list_data(channel_url));
  const video_list = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
  const format_download_task = video_list.slice(0, video_list.length - 2).map(async ({ gridVideoRenderer }) => {
    const { videoId, title: { runs: [{ text: videoTitle }] } } = gridVideoRenderer;
    await download_single(videoId, videoTitle);
  });
  await Promise.all(format_download_task);
  // console.log(await load_config());
}