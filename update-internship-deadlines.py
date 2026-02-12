#!/usr/bin/env python3
"""
Script to update internship-deadlines.html from internship-deadlines-data.csv
Run this script after updating the CSV file to regenerate the HTML tables.
"""

import csv
import re

def calculate_yearly_pay(hourly_low, hourly_high):
    """Calculate yearly pay from hourly rates (assuming 2080 hours/year)"""
    yearly_low = round(float(hourly_low) * 2080)
    yearly_high = round(float(hourly_high) * 2080)
    return yearly_low, yearly_high

def format_locations(locations_preview, locations_full):
    """Format locations with expandable feature if needed"""
    if locations_full and locations_full != locations_preview and locations_full != "Multiple locations nationwide" and ";" in locations_full:
        # Count locations if it's a list
        location_count = len([loc.strip() for loc in locations_full.split(";") if loc.strip()])
        preview_text = f"Multiple locations ({location_count})"
        
        # Format full locations list - ensure proper spacing
        formatted_locations = locations_full.replace("; ", "; ").replace(";", "; ")
        
        return f'''                                            <span class="locations-preview">{preview_text}</span>
                                            <span class="locations-full" style="display: none;">
                                                {formatted_locations}
                                            </span>
                                            <button class="toggle-locations-btn" onclick="toggleLocations(this)" style="background: none; border: none; color: var(--primary-color); text-decoration: underline; cursor: pointer; padding: 0; margin-left: 0.5rem; font-size: 0.9rem;">Show all</button>'''
    else:
        return locations_preview

def generate_table_rows(entries, table_type):
    """Generate HTML table rows for audit or tax entries"""
    rows = []
    for entry in entries:
        firm = entry['Firm']
        role = entry['Role']
        link = entry['Link']
        years_eligible = entry['Years Eligible']
        locations_preview = entry['Locations']
        locations_full = entry.get('Locations Full', locations_preview)
        deadline = entry['Application Deadline']
        pay_low = entry['Pay Hourly Low']
        pay_high = entry['Pay Hourly High']
        
        yearly_low, yearly_high = calculate_yearly_pay(pay_low, pay_high)
        
        locations_html = format_locations(locations_preview, locations_full)
        
        row = f'''                                    <tr>
                                        <td><strong>{firm}</strong></td>
                                        <td><a href="{link}" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: none;">{role}</a></td>
                                        <td>{years_eligible}</td>
                                        <td>{locations_html}</td>
                                        <td>{deadline}</td>
                                        <td>${pay_low}-${pay_high}/hour<br><span style="color: var(--text-light); font-size: 0.9rem;">(${yearly_low:,}-${yearly_high:,}/year)</span></td>
                                    </tr>'''
        rows.append(row)
    
    return '\n'.join(rows)

def read_csv_data(filename):
    """Read CSV file and return audit and tax entries"""
    audit_entries = []
    tax_entries = []
    
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            entry = {
                'Firm': row['Firm'],
                'Role': row['Role'],
                'Link': row['Link'],
                'Years Eligible': row['Years Eligible'],
                'Locations': row['Locations'],
                'Locations Full': row.get('Locations Full', row['Locations']),
                'Application Deadline': row['Application Deadline'],
                'Pay Hourly Low': row['Pay Hourly Low'],
                'Pay Hourly High': row['Pay Hourly High'],
                'Season': row.get('Season', ''),
                'Year': row.get('Year', '')
            }
            
            if row['Type'] == 'Audit':
                audit_entries.append(entry)
            elif row['Type'] == 'Tax':
                tax_entries.append(entry)
    
    # Sort entries: first by firm name, then by season/year
    def sort_key(entry):
        firm = entry['Firm']
        season_order = {'Summer': 1, 'Winter': 2}
        season = entry.get('Season', '')
        year = entry.get('Year', '')
        return (firm, season_order.get(season, 99), year)
    
    audit_entries.sort(key=sort_key)
    tax_entries.sort(key=sort_key)
    
    return audit_entries, tax_entries

def update_html_file(html_filename, csv_filename):
    """Update HTML file with data from CSV"""
    # Read CSV data
    audit_entries, tax_entries = read_csv_data(csv_filename)
    
    # Read HTML file
    with open(html_filename, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Generate new table rows
    audit_rows = generate_table_rows(audit_entries, 'Audit')
    tax_rows = generate_table_rows(tax_entries, 'Tax')
    
    # Replace audit table body
    audit_pattern = r'(<tbody>)(.*?)(</tbody>)'
    audit_match = re.search(audit_pattern, html_content, re.DOTALL)
    if audit_match:
        audit_start = audit_match.start(1)
        audit_end = audit_match.end(3)
        html_content = html_content[:audit_start] + f'<tbody>\n{audit_rows}\n                                </tbody>' + html_content[audit_end:]
    
    # Replace tax table body - find the second tbody (tax table)
    tbody_matches = list(re.finditer(r'<tbody>', html_content))
    if len(tbody_matches) >= 2:
        # Second tbody is the tax table
        tax_tbody_start = tbody_matches[1].start()
        # Find the closing </tbody> for tax table
        tax_tbody_end = html_content.find('</tbody>', tax_tbody_start) + len('</tbody>')
        html_content = html_content[:tax_tbody_start] + f'<tbody>\n{tax_rows}\n                                </tbody>' + html_content[tax_tbody_end:]
    
    # Write updated HTML
    with open(html_filename, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✓ Updated {html_filename} with {len(audit_entries)} audit entries and {len(tax_entries)} tax entries")

if __name__ == '__main__':
    update_html_file('internship-deadlines.html', 'internship-deadlines-data.csv')
    print("\n✓ HTML file updated successfully!")
    print("  You can now open internship-deadlines.html in your browser to see the changes.")

