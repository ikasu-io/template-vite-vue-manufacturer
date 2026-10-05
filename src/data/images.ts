// Alle Fotos der Seite mit Alternativtext. Neues Foto: Datei nach
// src/assets/ legen (mindestens 1600 px breit), hier mit `?photo`
// importieren und beschreiben, was darauf zu sehen ist. Der Build macht
// daraus WebP-Dateien in vier Breiten.
import apprentices from '@/assets/apprentices.jpg?photo'
import assembly from '@/assets/assembly.jpg?photo'
import heatPumpHouse from '@/assets/heat-pump-house.jpg?photo'
import installerHands from '@/assets/installer-hands.jpg?photo'
import plant from '@/assets/plant.jpg?photo'
import testLab from '@/assets/test-lab.jpg?photo'

export interface Photo {
  src: string
  srcset: string
  w: number
  h: number
  alt: string
}

export const images = {
  assembly: { ...assembly, alt: 'Montagehalle mit einer Reihe weißer Wärmepumpen-Außengeräte am Band' },
  'heat-pump-house': { ...heatPumpHouse, alt: 'Eine Luft-Wasser-Wärmepumpe im Garten neben einem Holzhaus im Herbst' },
  'installer-hands': { ...installerHands, alt: 'Ein Installateur schließt gedämmte Kupferrohre an eine Wärmepumpe an' },
  'test-lab': { ...testLab, alt: 'Ein Gerät in der vereisten Klimakammer, davor ein Ingenieur am Messplatz' },
  apprentices: { ...apprentices, alt: 'Zwei Auszubildende löten an der Werkbank Kupferrohre' },
  plant: { ...plant, alt: 'Das Werk mit Holzfassade und Solardach am Rand von Ebersgrund' },
} satisfies Record<string, Photo>

export type ImageName = keyof typeof images
