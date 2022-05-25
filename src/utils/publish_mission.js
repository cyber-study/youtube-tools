

export default async function publish_mission(publish_file_path, browser) {
  const page = await browser.newPage();
  await page.goto("https://mp.toutiao.com/profile_v4/xigua/upload-video/");
  const video_trigger_input = await page.waitForSelector("div.upload-video-trigger input", { timeout: 60000000 });
  await video_trigger_input.uploadFile(publish_file_path);
}