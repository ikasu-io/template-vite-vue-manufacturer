// Kennzahlen. Für ein neues Jahr: eine Zeile in `unitsPerYear` anfügen und
// die Zahlen in `people` anpassen; die Summen und das Diagramm rechnen sich
// selbst.

/** Gebaute Wärmepumpen je Jahr, seit der ersten Serie 2008. */
export const unitsPerYear: { year: number; units: number }[] = [
  { year: 2008, units: 140 },
  { year: 2009, units: 360 },
  { year: 2010, units: 620 },
  { year: 2011, units: 840 },
  { year: 2012, units: 1020 },
  { year: 2013, units: 1180 },
  { year: 2014, units: 1310 },
  { year: 2015, units: 1490 },
  { year: 2016, units: 1760 },
  { year: 2017, units: 2080 },
  { year: 2018, units: 2390 },
  { year: 2019, units: 2740 },
  { year: 2020, units: 3150 },
  { year: 2021, units: 3620 },
  { year: 2022, units: 4480 },
  { year: 2023, units: 6900 },
  { year: 2024, units: 5300 },
  { year: 2025, units: 5900 },
]

/** Geschätzte CO₂-Einsparung je laufendem Gerät und Jahr gegenüber einer Gasheizung, in Tonnen. */
export const co2PerUnitAndYear = 3.1

export const people = {
  employees: 340,
  apprentices: 38,
  /** Anteil der Teile (nach Einkaufswert) von Lieferanten in weniger als 200 km Entfernung, in Prozent. */
  localParts: 72,
}

/** Bis Ende jedes Jahres gebaute Geräte und dadurch eingespartes CO₂ (alle Jahre zusammen). */
export const series = unitsPerYear.reduce<{ year: number; units: number; installed: number; co2: number }[]>(
  (rows, { year, units }) => {
    const before = rows.at(-1)
    const installed = (before?.installed ?? 0) + units
    // Geräte aus dem laufenden Jahr zählen zur Hälfte.
    const co2 = (before?.co2 ?? 0) + ((before?.installed ?? 0) + units / 2) * co2PerUnitAndYear
    rows.push({ year, units, installed, co2 })
    return rows
  },
  [],
)

export const totals = {
  units: series.at(-1)?.installed ?? 0,
  co2: series.at(-1)?.co2 ?? 0,
  lastYear: unitsPerYear.at(-1)?.year ?? 0,
}
