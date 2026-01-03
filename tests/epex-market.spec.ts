import { test } from '@playwright/test';
import fs from 'fs';
import { EpexMarketPage } from '../pages/EpexMarketPage';
import { writeCSV } from '../utils/csvWriter.ts';

test('EPEX SPOT – scrape market data and export CSV/JSON', async ({ page }) => {
  test.setTimeout(180_000);

  const url =
    'https://www.epexspot.com/en/market-results?market_area=GB&delivery_date=2025-12-31&modality=Continuous&data_mode=table&product=30';

  const epexPage = new EpexMarketPage(page);

  await epexPage.navigate(url);
  await epexPage.acceptCookiesIfPresent();
  await epexPage.waitForHumanVerification();

  const data = await epexPage.scrapeMarketData();

  if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
  }

  // JSON export
  fs.writeFileSync(
    'output/epex-data.json',
    JSON.stringify(data, null, 2)
  );

  // CSV export
  writeCSV(
    'output/epex-data.csv',
    ['Low(£/MWh)', 'High(£/MWh)', 'Last(£/MWh)', 'Weight Avg.(£/MWh)'],
    data.map(d => [d.low, d.high, d.last, d.weightAvg])
  );

  console.log(`✅ Exported ${data.length} rows`);
});
