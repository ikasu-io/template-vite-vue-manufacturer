export interface Milestone {
  year: number
  title: string
  text: string
}

export const history: Milestone[] = [
  { year: 1962, title: 'Ein Heizungsbaubetrieb', text: 'Heinrich Ebert gründet in Ebersgrund einen Betrieb für Heizung und Sanitär, mit zwei Gesellen und einem Lieferwagen.' },
  { year: 1988, title: 'Die zweite Generation', text: 'Monika und Walter Ebert übernehmen und bauen den Kundendienst für ganz Nordhessen auf.' },
  { year: 2008, title: 'Die erste eigene Wärmepumpe', text: 'In der alten Werkstatt entsteht die erste Serie: 140 Geräte, alle in der Region eingebaut.' },
  { year: 2019, title: 'Nur noch R290', text: 'Alle Modelle arbeiten mit Propan als Kältemittel, ohne fluorierte Gase.' },
  { year: 2024, title: 'Die neue Montagehalle', text: 'Eine Halle aus Holz mit Solardach, Prüfstand und Ausbildungswerkstatt verdreifacht die Fläche.' },
  { year: 2026, title: 'Heute', text: 'Katrin Ebert führt das Unternehmen in dritter Generation; 340 Menschen arbeiten in Ebersgrund.' },
]
