import path from "path";
import { homedir } from "os";
import puppeteer from "puppeteer";

export async function login() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    userDataDir: path.resolve(homedir(), "/puppeteer_temp/")
  });
  const page = await browser.newPage();
  await page.goto("https://mp.toutiao.com/auth/page/login/");
}