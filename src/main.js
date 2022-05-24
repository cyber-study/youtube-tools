import { program } from "commander";
import { name, version } from "@@/package.json";

import { thumbnail } from "@/actions/thumbnail";
import { download_list } from "@/actions/download_list";
import { download_single, video_id_option } from "@/actions/download_single";
import { create_config_file } from "@/actions/create_config_file";

program
  .usage(name)
  .version(version)

program
  .command("init")
  .description("创建运行时配置文件")
  .action(create_config_file);

program
  .command("single")
  .description("这是测试命令")
  .addOption(video_id_option)
  .action(download_single);

program
  .command("list")
  .description("这是测试命令")
  .action(download_list);

program
  .command("thumb")
  .description("这是测试命令")
  .action(thumbnail);

program.parse();





