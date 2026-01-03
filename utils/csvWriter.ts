import fs from 'fs';
import path from 'path';

export function writeCSV(
  filePath: string,
  headers: string[],
  rows: string[][]
) {
  try {
    // Ensure a parent directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Check if file already exists
    const fileExists = fs.existsSync(filePath);

    // Build CSV content
    const csvContent = [
      !fileExists ? headers.join(',') : null,
      ...rows.map(row =>
        row.map(cell => `"${cell ?? ''}"`).join(',')
      )
    ]
      .filter(Boolean)
      .join('\n');

    // Append data safely
    fs.appendFileSync(filePath, csvContent + '\n', 'utf-8');
  } catch (error) {
    console.error('❌ Failed to write CSV file');
    console.error(error);
    throw error; // fail the test clearly
  }
}
