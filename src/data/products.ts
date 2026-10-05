export interface Product {
  id: string
  name: string
  kind: 'Luft/Wasser' | 'Sole/Wasser'
  /** Für wen das Gerät gedacht ist, ein Satz. */
  use: string
  /** Heizleistung in kW bei A2/W35 (Luft) bzw. B0/W35 (Sole). */
  outputKw: number
  /** Jahresarbeitszahl bei 35 °C Vorlauf, durchschnittliches Klima. */
  scop: number
  /** Schalldruckpegel in 3 m Abstand, dB(A). Bei Sole/Wasser: im Aufstellraum. */
  soundDb: number
  refrigerant: 'R290'
  /** Leistungszahl (COP) je Außentemperatur in °C, für das Diagramm. */
  cop: { temp: number; value: number }[]
  /** Linienfarbe im Diagramm. */
  color: string
  /** Wie das Gerät gezeichnet wird. */
  drawing: 'single' | 'double' | 'indoor' | 'large'
}

// Ein Objekt je Modell. Neues Modell: ein Objekt kopieren und ändern; Karte
// und Diagramm folgen.
export const products: Product[] = [
  {
    id: 'luftwerk-8',
    name: 'Luftwerk 8',
    kind: 'Luft/Wasser',
    use: 'Für Einfamilienhäuser im Neubau und gut gedämmte Bestandsbauten.',
    outputKw: 8,
    scop: 5.1,
    soundDb: 32,
    refrigerant: 'R290',
    cop: [
      { temp: -15, value: 2.3 },
      { temp: -10, value: 2.7 },
      { temp: -7, value: 3.0 },
      { temp: -2, value: 3.5 },
      { temp: 2, value: 4.0 },
      { temp: 7, value: 4.8 },
      { temp: 10, value: 5.2 },
      { temp: 15, value: 5.8 },
    ],
    color: '#e8590c',
    drawing: 'single',
  },
  {
    id: 'luftwerk-12',
    name: 'Luftwerk 12',
    kind: 'Luft/Wasser',
    use: 'Für größere Häuser und Altbauten mit Heizkörpern.',
    outputKw: 12,
    scop: 4.9,
    soundDb: 35,
    refrigerant: 'R290',
    cop: [
      { temp: -15, value: 2.2 },
      { temp: -10, value: 2.6 },
      { temp: -7, value: 2.9 },
      { temp: -2, value: 3.4 },
      { temp: 2, value: 3.9 },
      { temp: 7, value: 4.6 },
      { temp: 10, value: 5.0 },
      { temp: 15, value: 5.6 },
    ],
    color: '#2f7fb8',
    drawing: 'double',
  },
  {
    id: 'erdwerk-10',
    name: 'Erdwerk 10',
    kind: 'Sole/Wasser',
    use: 'Mit Erdsonde oder Flächenkollektor: am effizientesten, auch im tiefsten Winter.',
    outputKw: 10,
    scop: 5.4,
    soundDb: 38,
    refrigerant: 'R290',
    cop: [
      { temp: -15, value: 4.5 },
      { temp: -10, value: 4.6 },
      { temp: -7, value: 4.6 },
      { temp: -2, value: 4.7 },
      { temp: 2, value: 4.7 },
      { temp: 7, value: 4.8 },
      { temp: 10, value: 4.8 },
      { temp: 15, value: 4.9 },
    ],
    color: '#6e9b3e',
    drawing: 'indoor',
  },
  {
    id: 'luftwerk-40-pro',
    name: 'Luftwerk 40 Pro',
    kind: 'Luft/Wasser',
    use: 'Für Mehrfamilienhäuser und Gewerbe, bis zu vier Geräte in Kaskade.',
    outputKw: 40,
    scop: 4.6,
    soundDb: 44,
    refrigerant: 'R290',
    cop: [
      { temp: -15, value: 2.1 },
      { temp: -10, value: 2.5 },
      { temp: -7, value: 2.8 },
      { temp: -2, value: 3.3 },
      { temp: 2, value: 3.7 },
      { temp: 7, value: 4.4 },
      { temp: 10, value: 4.8 },
      { temp: 15, value: 5.3 },
    ],
    color: '#1c2329',
    drawing: 'large',
  },
]
