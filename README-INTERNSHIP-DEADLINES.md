# Internship Deadlines Data Management

This system allows you to manage internship deadline data in Excel/CSV format and automatically update the HTML page.

## Files

- **`internship-deadlines-data.csv`** - Master data file (edit this file)
- **`update-internship-deadlines.py`** - Script to update HTML from CSV
- **`internship-deadlines.html`** - The webpage (auto-generated, don't edit manually)

## How to Use

### 1. Update the CSV File

Open `internship-deadlines-data.csv` in Excel or any spreadsheet program and:

- **Add new entries**: Add a new row with all required columns
- **Edit existing entries**: Modify any cell in the row
- **Delete entries**: Delete the entire row
- **Save the file** as CSV format

### 2. Run the Update Script

After saving your CSV changes, run:

```bash
python update-internship-deadlines.py
```

Or on Windows:
```bash
python update-internship-deadlines.py
```

This will automatically update `internship-deadlines.html` with your changes.

## CSV Column Descriptions

| Column | Description | Example |
|--------|-------------|---------|
| **Type** | Either "Audit" or "Tax" | Audit |
| **Firm** | Company name | Deloitte |
| **Role** | Job title/position name | Audit Intern (Summer 2027) |
| **Link** | Full application URL | https://apply.deloitte.com/... |
| **Years Eligible** | Student eligibility | Juniors (Rising Seniors) |
| **Locations** | Short location description | Multiple locations (35+) |
| **Locations Full** | Full list of locations (semicolon-separated) | Baltimore MD; Boise ID; ... |
| **Application Deadline** | Deadline date or status | February 22, 2027 |
| **Pay Hourly Low** | Minimum hourly pay | 25.64 |
| **Pay Hourly High** | Maximum hourly pay | 51.44 |
| **Season** | Summer or Winter | Summer |
| **Year** | Year of internship | 2027 |

## Location Formatting

- **Simple locations**: Just put the location text in both "Locations" and "Locations Full"
- **Expandable locations**: 
  - Put a short description in "Locations" (e.g., "Multiple locations (35+)")
  - Put the full semicolon-separated list in "Locations Full"
  - The script will automatically create the expandable feature

## Pay Formatting

- Enter hourly rates as numbers (e.g., 25.64, not $25.64)
- The script automatically calculates yearly pay and formats it correctly
- Yearly pay is calculated as: hourly rate × 2080 hours

## Tips

1. **Keep backups**: The CSV file is your master data - keep it backed up
2. **Sort order**: Entries are automatically sorted by firm name, then season/year
3. **Consistency**: Use consistent formatting for deadlines (e.g., "February 22, 2027" or "Rolling basis")
4. **Links**: Always include the full URL starting with https://

## Troubleshooting

- **Script won't run**: Make sure Python 3 is installed
- **HTML looks wrong**: Check that your CSV has all required columns
- **Locations not expanding**: Make sure "Locations Full" has the full list separated by semicolons

