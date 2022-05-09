import cheerio from "cheerio";
import puppeteer from "puppeteer";

export default async function get_list_data(channel_url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(channel_url);
  const page_content = await page.content();
  await browser.close();

  const $ = cheerio.load(page_content);
  const script_collection = $("script")
  const target_script = script_collection.map((index) => {
    if (script_collection.eq(index).html().match("var ytInitialData")) {
      return script_collection.eq(index).html();
    };
  }).get(0);
  return target_script;
};