import { SignItem } from './types'

export const LOCATIONS = [
  'Cobourg',
  'Chicago',
  'Nogales',
  'Tijuana',
  'Montreal',
  'Cornelius',
  'Indianapolis',
  'Richmond I',
  'Richmond II',
  'Richmond III',
  'Santa Clara',
  'St. Louis',
  'Tucson',
  'Shanghai',
  'Pune Phase 1',
  'Pune Phase 2',
  'Singapore',
  'Bangalore',
  'Dubai',
  'Olen',
  'Neckartenzlingen',
  'Milan',
  'Blagnac',
]

const DEMO_IMG = '/images/chicago-demo.png'

export const CHICAGO_SIGNS: SignItem[] = [
  {
    id: 'IN-001',
    name: 'Reception Letters Reversed Color - Illuminated',
    code: 'RL.R.96.I',
    dimensions: {
      h: `2' 0" (614 mm)`,
      w: `8' 0" (2438 mm)`,
      d: `1" (25 mm)`,
    },
    illumination: true,
    backerNeeded: false,
    quantity: 1,
    visualImage: DEMO_IMG,
    implImage: DEMO_IMG,
  },
  {
    id: 'IN-003',
    name: 'Reception Letters Reversed Color - Non-Illuminated + Backer Panel',
    code: 'RL.R.60.BP',
    dimensions: {
      h: `Letters: 1' 5" (432 mm) — BP: 2' 6" (762 mm)`,
      w: `Letters: 5' 0" (1524 mm) — BP: 6' 3" (1905 mm)`,
      d: `Letters: 0.5" (13 mm) — BP: 0.5" (13 mm)`,
    },
    illumination: false,
    backerNeeded: true,
    quantity: 1,
    visualImage: DEMO_IMG,
    implImage: DEMO_IMG,
  },
  {
    id: 'IN-004',
    name: 'Overlay Vinyl',
    code: 'Custom',
    dimensions: {
      h: `1' 9" (533 mm)`,
      w: `7' 4" (2235 mm)`,
      d: 'N/A',
    },
    illumination: false,
    backerNeeded: false,
    quantity: 1,
    visualImage: DEMO_IMG,
    implImage: DEMO_IMG,
  },
  {
    id: 'IN-006',
    name: 'Chrome Logomark',
    code: 'CH.P.Custom',
    dimensions: {
      h: `5' 10.8" (1798 mm)`,
      w: `5' 0" (1524 mm)`,
      d: `0.5" (13 mm)`,
    },
    illumination: false,
    backerNeeded: false,
    quantity: 1,
    visualImage: DEMO_IMG,
    implImage: DEMO_IMG,
  },
]

export const SIGNS_BY_LOCATION: Record<string, SignItem[]> = {
  Chicago: CHICAGO_SIGNS,
}
