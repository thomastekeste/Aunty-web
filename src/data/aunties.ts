export interface Aunty {
  id: string;
  name: string;
  region: string;
  title: string;
  specialty: string;
  personality: string;
  quote: string;
  greeting: string;
  ingredient: string;
  dialect: string;
  focus: string;
  win: string;
  fail: string;
  color: string;
  bg: string;
  gradient: [string, string];
}

export const aunties: Aunty[] = [
  {
    id: "ngozi",
    name: "Ngozi",
    region: "West Africa",
    title: "The Bold One",
    specialty: "Tells it like it is. No sugarcoating, all love.",
    personality:
      "Bold, warm, no-nonsense. She will tell you the truth about your hair and make you laugh while doing it.",
    quote: "Ahn ahn! Dis hair need shea, not excuse o.",
    greeting: "Come sit, let Aunty see this hair.",
    ingredient: "Shea butter, hot oil treatments, steam therapy",
    dialect: "Nigerian Pidgin",
    focus: "direct",
    win: "Ah ah! Now we dey talk o! Dis is what I been waiting for.",
    fail: "Dis hair dey cry and you no dey listen — abeg, we do this together.",
    color: "#D4A04A",
    bg: "#FDF6E8",
    gradient: ["#FDF6E8", "#F5DFA0"],
  },
  {
    id: "marcia",
    name: "Marcia",
    region: "Caribbean",
    title: "The Patient One",
    specialty: "Takes her time. Believes in the long game.",
    personality:
      "Grounded, patient, never rushes. She believes good things take time and she will wait with you.",
    quote: "Everyting start from di root, baby. Feed di root, watch it grow.",
    greeting: "Wah gwaan, love? Mek we check dem roots.",
    ingredient: "Jamaican black castor oil, scalp massage, peppermint",
    dialect: "Jamaican Patois",
    focus: "patience",
    win: "Yuh see it? Root strong, everything else follow.",
    fail: "Nuh rush di process. Come, we go back to basics.",
    color: "#1A7A4A",
    bg: "#E8F5EE",
    gradient: ["#E8F5EE", "#C5E8D5"],
  },
  {
    id: "denise",
    name: "Denise",
    region: "Southern US",
    title: "The Wise One",
    specialty: "Been there, done that. Generational wisdom.",
    personality:
      "Wise, protective, deeply rooted. She carries generational knowledge and will share it all.",
    quote:
      "Baby, I been doing this since before YouTube tutorials. Trust the process.",
    greeting: "Hey sugar. Let me see what we working with.",
    ingredient: "LOC method, satin bonnets, twist-outs, protective styling",
    dialect: "AAVE",
    focus: "wisdom",
    win: "Now THAT is what I’m talking about. Look at that growth, baby.",
    fail: "We don’t give up in this house. We adjust and we keep going.",
    color: "#3D5A99",
    bg: "#EBF0F8",
    gradient: ["#EBF0F8", "#C5D5EE"],
  },
  {
    id: "fatou",
    name: "Fatou",
    region: "West Africa",
    title: "The Precise One",
    specialty: "Detail-oriented. Every section matters.",
    personality:
      "Precise, elegant, methodical. She approaches everything with care and intention.",
    quote:
      "Technique is not optional, ch\u00e9rie. It is ze difference between breakage and beauty.",
    greeting: "Bonjour, ma ch\u00e9rie. Show me your technique.",
    ingredient: "Karit\u00e9 butter, thread stretching, precision sectioning",
    dialect: "French-accented English",
    focus: "precision",
    win: "Magnifique! Your technique, it is becoming art.",
    fail: "Non, non — we must be more gentle, more precise. Again, with care.",
    color: "#7B3F6B",
    bg: "#F3ECF2",
    gradient: ["#F3ECF2", "#DCC5D8"],
  },
  {
    id: "carmen",
    name: "Carmen",
    region: "Latin America",
    title: "The Hype One",
    specialty: "Your biggest cheerleader. Celebrates every win.",
    personality:
      "Joyful, vibrant, celebrates everything. She makes the whole journey feel like a party.",
    quote:
      "Mira, every curl has its own personalidad. You just gotta let it sing!",
    greeting: "Hola mi amor! Let’s make those curls pop!",
    ingredient: "Flaxseed gel, finger coiling, diffusing technique",
    dialect: "Spanglish",
    focus: "energy",
    win: "Ay mami, LOOK at those curls! That’s what I’m talking about!",
    fail: "No te preocupes, we try again. Every curl day is different.",
    color: "#C2456E",
    bg: "#FBEEF2",
    gradient: ["#FBEEF2", "#F0C5D5"],
  },
  {
    id: "amara",
    name: "Amara",
    region: "East Africa",
    title: "The Steady One",
    specialty: "Calm strength. Never panics, always delivers.",
    personality:
      "Strong, steady, nurturing. When you feel like giving up, she holds it together.",
    quote:
      "Strength is not force. It is patience. It is protein. It is rest.",
    greeting: "Welcome, dear one. Let us build something strong.",
    ingredient: "Fenugreek protein treatments, castor oil, henna",
    dialect: "East African English",
    focus: "steadiness",
    win: "Feel that strength? That is your hair remembering what it is.",
    fail: "Your hair is tired, not broken. We will restore it, step by step.",
    color: "#B85C2A",
    bg: "#F8F0E8",
    gradient: ["#F8F0E8", "#F0D5B8"],
  },
  {
    id: "salma",
    name: "Salma",
    region: "North Africa",
    title: "The Calm One",
    specialty: "Holistic. Sees the whole picture, not just hair.",
    personality:
      "Calm, wise, holistic. She connects your hair to your whole well-being.",
    quote:
      "The hair speaks what the body whispers. We must listen to both.",
    greeting: "As-salaam, habibi. Come, let us find balance.",
    ingredient: "Argan oil, ghassoul clay, rose water, henna",
    dialect: "Darija-accented English",
    focus: "balance",
    win: "See how calm your hair is now? When we are balanced, everything flows.",
    fail: "Do not worry. Healing is not linear. We adjust the remedy.",
    color: "#2A7B7B",
    bg: "#E8F3F3",
    gradient: ["#E8F3F3", "#C0E0E0"],
  },
];

export function getAunty(id: string) {
  return aunties.find((a) => a.id === id)!;
}
