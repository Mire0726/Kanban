import * as fs from 'fs';
import * as path from 'path';

const inputDirectory = "./src/data/familymarts";
const outputFile = './src/data/familymarts/ts';

const readdir = async (dir: string): Promise<string[]> =>
  new Promise((resolve, reject) =>
    fs.readdir(dir, (error, files) => (error ? reject(error) : resolve(files)))
  );

const readFile = async (filePath: string): Promise<string> =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf8', (error, data) => (error ? reject(error) : resolve(data)))
  );

const main = async () => {
  try {
    const jsonFiles = (await readdir(inputDirectory)).filter((file) => file.endsWith('.json'));
    const data: { [key: string]: any } = {};

    for (const file of jsonFiles) {
      const filePath = path.join(inputDirectory, file);
      const fileContent = await readFile(filePath);
      const jsonContent = JSON.parse(fileContent);
      data[path.basename(file, '.json')] = jsonContent;
    }

    const tsContent = `export default ${JSON.stringify(data, null, 2)};`;
    fs.writeFileSync(outputFile, tsContent);
    console.log(`JSON files merged into ${outputFile}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
