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
    .map(entry => ({
      name: entry.name,
      url: `/tools/${entry.name}/`
    }));
		tools.push({
			name: 'manual-tool',
			url: '/tools/manual-tool/'
		});

  return { tools };
});
