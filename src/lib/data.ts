import Papa from "papaparse";

const file = `Year,Total Revenues,Personal Income Tax,Personal Income Tax $,Corporate Income Tax,Corporate Income Tax $,GST,GST $,Customs Duties,Customs Duties $,Defence Spending,Defence Spending $
1867, $ 14 , $ -   , $ -   , $ -   , $ -   , $ -   , $ -   , $ 9 , $ 32.14 , $ 1 , $ 3.57 
1913, $ 163 , $ -   , $ -   , $ -   , $ -   , $ -   , $ -   , $ 105 , $ 32.21 , $ 14 , $ 4.29 
1918, $ 313 , $ 8 , $ 1.28 , $ 1 , $ 0.16 , $ -   , $ -   , $ 147 , $ 23.48 , $ 439 , $ 70.13 
1933, $ 325 , $ 29 , $ 4.46 , $ 27 , $ 4.15 , $ 61 , $ 9.38 , $ 66 , $ 10.15 , $ 13 , $ 2.00 
1945," $ 3,013 ", $ 687 , $ 11.40 , $ 218 , $ 3.62 , $ 212 , $ 3.52 , $ 129 , $ 2.14 ," $ 2,942 ", $ 48.82 
1990," $ 119,685 "," $ 56,201 ", $ 23.48 ," $ 11,545 ", $ 4.82 ," $ 13,161 ", $ 5.50 ," $ 4,001 ", $ 1.67 ," $ 11,323 ", $ 4.73 
2015," $ 291,200 "," $ 142,700 ", $ 24.50 ," $ 38,800 ", $ 6.66 ," $ 33,100 ", $ 5.68 ," $ 5,200 ", $ 0.89 ," $ 23,464 ", $ 4.03 `;

const parseCell = (str: string): number =>
  str === " $ -   " ? 0 : parseFloat(str.replace(/[\$\s\,]/g, ""));

export const data = Papa.parse(file, { header: true }).data.map((row: any) => {
  return {
    year: row.Year,
    totalRevenues: parseCell(row["Total Revenues"]),
    personalIncomeTax: parseCell(row["Personal Income Tax"]),
    personalIncomeTaxDollars: parseCell(row["Personal Income Tax $"]),
    corporateIncomeTax: parseCell(row["Corporate Income Tax"]),
    corporateIncomeTaxDollars: parseCell(row["Corporate Income Tax $"]),
    gst: parseCell(row["GST"]),
    gstDollars: parseCell(row["GST $"]),
    customsDuties: parseCell(row["Customs Duties"]),
    customsDutiesDollars: parseCell(row["Customs Duties $"]),
    defenseSpending: parseCell(row["Defence Spending"]),
    defenseSpendingDollars: parseCell(row["Defence Spending $"]),
  };
});
