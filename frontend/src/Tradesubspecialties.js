// Maps each trade key (from TradeSelect) to its own list of sub-specialties
// (rendered by SubSpecialtiesSelect). Keys MUST match the `key` values used
// in TradeSelect's options array exactly.
export const TRADE_SUB_SPECIALTIES = {
  phone_repair: [
    "Screen replacement",
    "Battery & charging",
    "Motherboard / soldering",
    "Face-ID / Touch-ID pairing",
    "Water damage recovery",
    "Software & flashing",
    "Speaker / mic",
    "Back glass",
  ],
  generator: [
    "Engine overhaul",
    "AVR replacement",
    "Carburetor / fuel system",
    "Wiring & control panel",
    "Starter motor repair",
    "Routine servicing",
    "Soundproofing installation",
    "Fault diagnosis",
  ],
  tailoring: [
    "Native wear (agbada, kaftan)",
    "Corporate / suits",
    "Alterations & repairs",
    "Bridal & aso-ebi",
    "Pattern drafting",
    "Embroidery / stoning",
    "School / uniform sewing",
    "Children's wear",
  ],
  auto_mechanic: [
    "Engine repair",
    "Suspension & brakes",
    "Electrical & wiring",
    "AC repair",
    "Gearbox / transmission",
    "Diagnostics (OBD)",
    "Panel beating",
    "Routine servicing",
  ],
  welding: [
    "Gate & fence fabrication",
    "Burglary-proof windows",
    "Furniture welding",
    "Structural / roofing",
    "Pipe welding",
    "Aluminum fabrication",
    "Repairs & patch jobs",
    "Custom fabrication",
  ],
  electrical: [
    "House wiring",
    "Fault finding & repair",
    "Inverter/solar installation",
    "Distribution board work",
    "Meter installation",
    "Industrial wiring",
    "Lighting installation",
    "Rewiring old buildings",
  ],
};

// Fallback list shown if a trade has no mapped list yet (e.g. a custom
// trade the user typed in themselves), so the component never renders empty.
export const DEFAULT_SUB_SPECIALTIES = [
  "General repairs",
  "Installation",
  "Maintenance & servicing",
  "Diagnostics",
];

export function getSubSpecialtiesForTrade(tradeKey) {
  return TRADE_SUB_SPECIALTIES[tradeKey] || DEFAULT_SUB_SPECIALTIES;
}
