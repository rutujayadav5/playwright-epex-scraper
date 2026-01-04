Playwright EPEX Market Data Automation
Overview

This project demonstrates a real-world Playwright automation framework built to interact with the EPEX SPOT Market Results website.
It focuses on robust automation design, clean architecture, while addressing challenges such as dynamic data loading, CAPTCHA protection, and CI limitations.

Note: CAPTCHA is intentionally not bypassed, as it is designed to block automation.

Key Features

✅ End-to-End automation using Playwright + TypeScript

✅ Page Object Model (POM) architecture

✅ Dynamic table data extraction

✅ Export data to CSV / JSON

✅ Explicit handling of CAPTCHA scenarios

✅ CI-safe design principles

✅ Clean, reusable, and maintainable code along with error handling


Tech Stack

Playwright

TypeScript

Node.js

CSV / File System utilities

Git & GitHub

Project Structure
├── pages/
│   └── EpexMarketPage.ts      # Page Object for EPEX market page
├── tests/
│   └── epex-market.spec.ts   # Test scenarios
├── utils/
│   └── csvWriter.ts           # CSV export utility
├── output/
│   └── epex-data.csv        # Generated output (gitignored)
├── playwright.config.ts
├── package.json
└── README.md

CAPTCHA Handling Strategy

This application does not attempt to bypass CAPTCHA, in line with ethical and legal automation practices.

Environment	Strategy
Local	Pause execution for manual verification
CI / Production	Use APIs or licensed data feeds

How to Run Locally
1. Install dependencies
npm install

2. Run Playwright tests
npx playwright test

3. Run in headed mode (recommended for CAPTCHA)
npx playwright test --headed

**Data Export
**

Extracts key market columns:

Low

High

Last

Weighted Average

Data is written to:

CSV (append-safe, header-aware)

Optional JSON

👤 Author

Rutuja Yadav
Automation / QA Engineer
GitHub: https://github.com/rutujayadav5
