export interface Job {
  title: string
  team: string
  location: string
  type: 'Vollzeit' | 'Teilzeit' | 'Vollzeit oder Teilzeit'
  start: string
  /** Was die Stelle ausmacht, ein bis zwei Sätze. */
  text: string
}

// Offene Stellen. Stelle besetzt: Objekt löschen. Neue Stelle: Objekt anfügen.
export const jobs: Job[] = [
  {
    title: 'Kältetechniker/in für den Prüfstand',
    team: 'Qualität',
    location: 'Ebersgrund',
    type: 'Vollzeit',
    start: 'ab sofort',
    text: 'Sie prüfen jedes Gerät in der Klimakammer, bevor es das Werk verlässt, und verbessern die Prüfabläufe.',
  },
  {
    title: 'Ingenieur/in Regelungstechnik',
    team: 'Entwicklung',
    location: 'Ebersgrund oder mobil',
    type: 'Vollzeit',
    start: 'ab 1. Januar 2027',
    text: 'Sie entwickeln die Regelung unserer Geräte weiter, vom Abtauen bis zur Kaskade mehrerer Geräte.',
  },
  {
    title: 'Servicetechniker/in Alb und Oberschwaben',
    team: 'Kundendienst',
    location: 'Ebersgrund, mit Firmenwagen',
    type: 'Vollzeit',
    start: 'ab sofort',
    text: 'Sie unterstützen Installationsbetriebe bei Inbetriebnahme und Wartung, vor Ort und am Telefon.',
  },
  {
    title: 'Sachbearbeiter/in Einkauf',
    team: 'Einkauf',
    location: 'Ebersgrund',
    type: 'Vollzeit oder Teilzeit',
    start: 'ab 1. Februar 2027',
    text: 'Sie betreuen unsere Lieferanten in der Region und halten Teile für zwanzig Jahre Ersatzteilversorgung bereit.',
  },
]

/** Ausbildungsberufe, Beginn jeweils am 1. August. */
export const apprenticeships = [
  'Mechatroniker/in für Kältetechnik',
  'Elektroniker/in für Geräte und Systeme',
  'Anlagenmechaniker/in SHK',
  'Industriekaufmann/-frau',
]
