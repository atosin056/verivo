// Maps each trade key (from TradeSelect) to its own default tool list
// (rendered by ToolsSelect as selectable pills). Keys MUST match the `key`
// values used in TradeSelect's options array exactly.
export const TRADE_TOOLS = {
  phone_repair: [
    "Soldering iron",
    "Hot air rework station",
    "Microscope",
    "Multimeter",
    "DC power supply",
    "Ultrasonic cleaner",
    "Anti-static mat",
    "Pry tools (iSesamo set)",
    "Suction handle",
    "Heat gun",
    "Tri-point screwdriver set",
    "Programmer (NAND/eMMC)",
  ],
  generator: [
    "Multimeter",
    "Socket wrench set",
    "Spanner set",
    "Screwdriver set",
    "Compression tester",
    "Battery tester",
    "Grease gun",
    "Fuel pressure gauge",
    "Wire stripper/crimper",
    "Torque wrench",
  ],
  tailoring: [
    "Sewing machine",
    "Overlock machine",
    "Measuring tape",
    "Dressmaker shears",
    "Seam ripper",
    "Pins & needles set",
    "Iron & pressing table",
    "Pattern paper",
    "Chalk / fabric marker",
    "Embroidery machine",
  ],
  auto_mechanic: [
    "Socket wrench set",
    "OBD scanner",
    "Torque wrench",
    "Jack & stands",
    "Multimeter",
    "Compression tester",
    "Timing light",
    "Battery charger/tester",
    "Brake bleeder kit",
    "Impact wrench",
  ],
  welding: [
    "Arc welding machine",
    "MIG welder",
    "Angle grinder",
    "Welding helmet",
    "Welding gloves",
    "Chipping hammer",
    "Clamps",
    "Measuring tape",
    "Cutting torch",
    "Wire brush",
  ],
  electrical: [
    "Multimeter",
    "Voltage tester",
    "Wire stripper/crimper",
    "Screwdriver set",
    "Pliers set",
    "Cable tester",
    "Fish tape",
    "Insulation tester (megger)",
    "Circuit breaker finder",
    "Conduit bender",
  ],
};

// Fallback list if a trade has no mapped tools yet.
export const DEFAULT_TOOLS = ["Basic hand tools"];

export function getToolsForTrade(tradeKey) {
  return TRADE_TOOLS[tradeKey] || DEFAULT_TOOLS;
}
