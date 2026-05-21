export interface Package {
  id: string
  name: string
  tagline: string
  forDescription: string
  youGet: string[]
  timeline: string
  format: string
  price: string
  cta: string
  ctaHref: string
  highlight?: boolean
}

export const PACKAGES: Package[] = [
  {
    id: 'snapshot',
    name: 'EHS Snapshot',
    tagline: 'A fast read on where you stand.',
    forDescription: 'Companies that want to know their EHS risk position before committing to more.',
    youGet: [
      'Written EHS assessment',
      'Peer benchmark',
      'Risk score with CHF exposure figure',
      'Readout call with your senior expert',
    ],
    timeline: '5 business days',
    format: 'Remote',
    price: 'CHF 2,000',
    cta: 'Buy Snapshot',
    ctaHref: '#',
  },
  {
    id: 'reality-check',
    name: 'EHS Reality Check',
    tagline: 'On-site. Eyes open. No filter.',
    forDescription: 'Companies that have a sense of the problem and need an expert on the ground.',
    youGet: [
      'Everything in Snapshot',
      '2 on-site days',
      'Gap analysis against regulatory baseline',
      'Action plan with prioritised fixes',
    ],
    timeline: '10 business days',
    format: 'On-site (2 days)',
    price: 'CHF 5,000',
    cta: 'Buy Reality Check',
    ctaHref: '#',
    highlight: true,
  },
  {
    id: 'transformation-plan',
    name: 'EHS Transformation Plan',
    tagline: 'A roadmap for companies that are serious about change.',
    forDescription: 'Companies with a structural EHS gap that needs a multi-year fix.',
    youGet: [
      'Everything in Reality Check',
      '5 on-site days',
      'Multi-year transformation roadmap',
      'Board-ready executive summary',
    ],
    timeline: '15 business days',
    format: 'On-site (5 days)',
    price: 'CHF 10,000',
    cta: 'Buy Plan',
    ctaHref: '#',
  },
  {
    id: 'execution-partner',
    name: 'Execution Partner',
    tagline: 'A senior expert embedded in your work, quarter by quarter.',
    forDescription: 'Companies that have a plan and need a senior expert to execute it.',
    youGet: [
      'Named senior expert',
      '2–4 days/month',
      'Scope agreed each quarter',
      'Direct access — no account manager',
    ],
    timeline: 'Scoped each quarter',
    format: 'On-site + remote',
    price: 'Day rate',
    cta: 'Get in touch',
    ctaHref: '/contact',
  },
]
