import { promises as fs } from "fs";
import { resolve } from "path";

export default defineEventHandler(async () => {
  // public_html/tools ディレクトリの絶対パス
  const toolsDir = resolve(process.cwd(), "public_html/tools");

  // 中身を取得
  const entries = await fs.readdir(toolsDir, { withFileTypes: true });

  // ディレクトリのみ抽出し、URL を付与
  const tools = entries
    .filter(entry => entry.isDirectory())
    .map(entry => {
      let url;
      if(entry.name === 'postfixadmin'){
        url = `/tools/${entry.name}/public`;
      }else{
        url = `/tools/${entry.name}/`;
      }
      return{
        name: entry.name,
        url: url
      }
    });
		tools.push({
			name: 'php-info',
			url: '/tools/info.php'
		});

  return { tools };
});
