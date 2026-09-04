import { useState, useMemo } from "react";
import { Search, ChevronDown, ShieldCheck, MapPin } from "lucide-react";

/**
 * TradesDirectory
 *
 * The parent owns the data — pass an array of professional objects and
 * this component handles search, trade filtering, and sorting entirely
 * on the frontend.
 *
 * Expected shape of each professional object:
 * {
 *   id: "pro_1",
 *   name: "Bisi Okonkwo",
 *   trade: "Tailoring",              // must match one of TRADE_TABS' id (see below) after slugifying, OR pass tradeId directly
 *   tradeId: "tailoring",            // id used for filtering — see TRADE_TABS
 *   specialty: "chiffon & silk",     // shown under the name as "Tailor — chiffon & silk"
 *   roleLabel: "Tailor",             // the word before the em dash, e.g. "Tailor", "Mechanic"
 *   location: "Tejuosho, Yaba",
 *   jobsCount: 142,
 *   repeatPercent: 72,
 *   bio: "Eight years finishing for two Lekki ateliers before going independent...",
 *   tags: ["French seam", "Bias cut", "Beadwork"],
 *   pricePerHour: 3400,
 *   iseScore: 88,
 *   verified: true,
 *   imageUrl: "https://...",
 * }
 *
 * Props:
 * - professionals        array   required
 * - onSelectProfessional  fn     called with the professional's id on card click
 *                                (defaults to console.log so it works out of the box)
 *
 * Usage:
 *   <TradesDirectory
 *     professionals={professionals}
 *     onSelectProfessional={(id) => navigate(`/pro/${id}`)}
 *   />
 */

const TRADE_TABS = [
  { id: "all", label: "All trades" },
  { id: "phone_repair", label: "Phone repair" },
  { id: "generator_repair", label: "Generator repair" },
  { id: "tailoring", label: "Tailoring" },
  { id: "welder", label: "Welder" },
  { id: "auto_mechanic", label: "Auto mechanic" },
  { id: "electrician", label: "Electrician" },
];

const SORT_OPTIONS = [
  { id: "ise_score", label: "Isé Score" },
  { id: "most_jobs", label: "Most jobs" },
  { id: "price_low", label: "Price: low to high" },
  { id: "price_high", label: "Price: high to low" },
];

const FONT_IMPORT_ID = "trades-directory-fonts";

export default function TradesDirectory({
  professionals = [],
  onSelectProfessional = (id) => console.log(id),
}) {
  const [query, setQuery] = useState("");
  const [activeTrade, setActiveTrade] = useState("all");
  const [sortBy, setSortBy] = useState("ise_score");
  const [sortOpen, setSortOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Inject fonts once
  if (
    typeof document !== "undefined" &&
    !document.getElementById(FONT_IMPORT_ID)
  ) {
    const link = document.createElement("link");
    link.id = FONT_IMPORT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
  }

  const filtered = useMemo(() => {
    let list = [...professionals];

    if (activeTrade !== "all") {
      list = list.filter((p) => p.trade === activeTrade);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.trade, p.trade, p.marketarea]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q)),
      );
    }

    switch (sortBy) {
      case "most_jobs":
        list.sort((a, b) => b.jobsCount - a.jobsCount);
        break;
      case "price_low":
        list.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case "price_high":
        list.sort((a, b) => b.pricePerHour - a.pricePerHour);
        break;
      case "ise_score":
      default:
        list.sort((a, b) => b.iseScore - a.iseScore);
        break;
    }

    return list;
  }, [professionals, activeTrade, query, sortBy]);

  const styles = {
    page: {
      fontFamily: "'Instrument Sans', -apple-system, sans-serif",
      boxSizing: "border-box",
    },
    topRow: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 20,
    },
    searchBox: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: 10,
      maxWidth: 320,
      border: "1px solid #ddd8c8",
      borderRadius: 10000,
      padding: "10px 14px",
    },
    searchInput: {
      flex: 1,
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      fontSize: 14,
      fontFamily: "'Instrument Sans', sans-serif",
      color: "#1c1c1a",
    },
    sortBox: {
      position: "relative",
    },
    sortButton: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      minWidth: 200,
      fontFamily: "Instrument Sans",
      backgroundColor: "transparent",
      border: "1px solid #ddd8c8",
      borderRadius: 1000,
      padding: "10px 14px",
      fontSize: 13,
      color: "#1c1c1a",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
    sortMenu: {
      position: "absolute",
      top: "calc(100% + 6px)",
      right: 0,
      backgroundColor: "white",
      fontFamily: "Instrument Sans",
      border: "1px solid #ddd8c8",
      borderRadius: 10,
      overflow: "hidden",
      zIndex: 10,
      minWidth: 190,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    },
    sortItem: (active) => ({
      padding: "10px 14px",
      fontSize: 13,
      color: active ? "#0f3d2e" : "#1c1c1a",
      fontWeight: active ? 600 : 400,
      fontFamily: "Instrument Sans",
      cursor: "pointer",
      backgroundColor: active ? "#e5f3ea" : "transparent",
    }),
    count: {
      fontSize: 13,
      color: "#8a8578",
      fontFamily: "'JetBrains Mono', monospace",
      whiteSpace: "nowrap",
    },
    tabsRow: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 22,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: 20,
    },
    card: (isHovered) => ({
      backgroundColor: "transparent",
      border: "1px solid #ddd8c8",
      borderRadius: 14,
      overflow: "hidden",
      cursor: "pointer",
      transition: "transform 0.15s, box-shadow 0.15s",
      transform: isHovered ? "translateY(-2px)" : "none",
      boxShadow: isHovered ? "0 12px 24px rgba(0,0,0,0.08)" : "none",
    }),
    imageWrap: {
      position: "relative",
      height: 220,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
    imageOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0) 60%)",
    },
    verifiedBadge: {
      position: "absolute",
      top: 12,
      left: 12,
      display: "flex",
      alignItems: "center",
      gap: 5,
      backgroundColor: "rgba(0,0,0,0.55)",
      color: "#ffffff",
      fontSize: 11,
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: "0.06em",
      padding: "6px 10px",
      borderRadius: 8,
      backdropFilter: "blur(4px)",
    },
    iseScoreBadge: {
      position: "absolute",
      top: 12,
      right: 12,
      backgroundColor: "#0f3d2e",
      color: "#ffffff",
      borderRadius: 8,
      padding: "6px 10px",
      textAlign: "center",
      lineHeight: 1.1,
    },
    iseLabel: {
      fontSize: 9,
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: "0.05em",
      opacity: 0.85,
    },
    iseValue: {
      fontSize: 17,
      fontWeight: 400,
      fontFamily: "'Fraunces', monospace",
    },
    nameBlock: {
      position: "absolute",
      bottom: 12,
      left: 14,
      right: 14,
      color: "#ffffff",
    },
    name: {
      margin: 0,
      fontSize: 20,
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
    },
    roleLine: {
      margin: "2px 0 0 0",
      fontSize: 12.5,
      opacity: 0.9,
    },
    body: {
      padding: "14px 16px 16px 16px",
    },
    metaLine: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 12,
      color: "#8a8578",
      marginBottom: 10,
      flexWrap: "wrap",
    },
    bio: {
      margin: "0 0 12px 0",
      fontSize: 13,
      lineHeight: 1.5,
      color: "#42403a",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    tagsRow: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 14,
    },
    tag: {
      fontSize: 11,
      color: "#5c584c",
      backgroundColor: "#f2efe6",
      border: "1px solid #ddd8c8",
      borderRadius: 999,
      padding: "4px 10px",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid #eee9da",
      paddingTop: 12,
    },
    price: {
      fontSize: 14,
      fontWeight: 600,
      color: "#1c1c1a",
      fontFamily: "'JetBrains Mono', monospace",
    },
    viewProfile: {
      fontSize: 12.5,
      fontWeight: 600,
      color: "#0f3d2e",
    },
    emptyState: {
      padding: "60px 20px",
      textAlign: "center",
      fontSize: 14,
      color: "#8a8578",
    },
  };

  const tabStyle = (tabId) => {
    const isActive = activeTrade === tabId;
    const isHovered = hoveredTab === tabId && !isActive;
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 16px",
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 500,
      fontFamily: "Instrument Sans",
      cursor: "pointer",
      border: isActive ? "1px solid #0f3d2e" : "1px solid #ddd8c8",
      backgroundColor: isActive
        ? "#0f3d2e"
        : isHovered
          ? "rgba(0,0,0,0.03)"
          : "transparent",
      color: isActive ? "#ffffff" : "#1c1c1a",
      transition: "background-color 0.15s, border-color 0.15s",
      whiteSpace: "nowrap",
    };
  };

  return (
    <div style={styles.page}>
      {/* Search + sort */}
      <div style={styles.topRow}>
        <div style={styles.searchBox}>
          <Search size={16} color="#8a8578" />
          <input
            type="text"
            placeholder="Search name, market, specialty..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.sortBox}>
          <button
            style={styles.sortButton}
            onClick={() => setSortOpen((v) => !v)}
          >
            ↕ Sort: {SORT_OPTIONS.find((o) => o.id === sortBy)?.label}
            <ChevronDown size={14} />
          </button>
          {sortOpen && (
            <div style={styles.sortMenu}>
              {SORT_OPTIONS.map((option) => (
                <div
                  key={option.id}
                  style={styles.sortItem(sortBy === option.id)}
                  onClick={() => {
                    setSortBy(option.id);
                    setSortOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <span style={styles.count}>
          {filtered.length} of {professionals.length}
        </span>
      </div>

      {/* Trade tabs */}
      <div style={styles.tabsRow}>
        {TRADE_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTrade(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{ ...tabStyle(tab.id), border: tabStyle(tab.id).border }}
          >
            {activeTrade === tab.id && "✓ "}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div style={styles.emptyState}>No professionals match your search.</div>
      ) : (
        <div style={styles.grid}>
          {filtered.map((pro) => (
            <div
              key={pro.id}
              style={styles.card(hoveredCard === pro.id)}
              onMouseEnter={() => setHoveredCard(pro.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onSelectProfessional(pro.id)}
            >
              <div style={styles.imageWrap}>
                <img src={pro.imageUrl} style={styles.image} />
                <div style={styles.imageOverlay} />

                {pro.status && (
                  <div style={styles.verifiedBadge}>
                    <ShieldCheck size={12} />
                    {String(pro.status)}
                  </div>
                )}

                <div style={styles.iseScoreBadge}>
                  <div style={styles.iseLabel}>ISÉ</div>
                  <div style={styles.iseValue}>{pro.iseScore}</div>
                </div>

                <div style={styles.nameBlock}>
                  <p style={styles.name}>{pro.name}</p>
                  <p style={styles.roleLine}>
                    {pro.trade === "phone_repair"
                      ? "Phone Repair Specialist"
                      : pro.trade === "electrician"
                        ? "Electrical Technician"
                        : pro.trade}
                  </p>
                </div>
              </div>

              <div style={styles.body}>
                <div style={styles.metaLine}>
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <MapPin size={11} /> {pro.marketarea}
                  </span>
                  <span>·</span>
                  <span>{pro.jobCount} jobs</span>
                  <span>·</span>
                  <span>{pro.repeatPercent}% repeat</span>
                </div>

                <p style={styles.bio}>{pro.pitch}</p>

                <div style={styles.tagsRow}>
                  {(pro.tags ?? []).map((tag) => (
                    <span key={tag} style={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={styles.footer}>
                  {/* <span style={styles.price}>
                    ₦{new Intl.NumberFormat("en-NG").format(pro.pricePerHour)}
                    /hr
                  </span> */}
                  <span style={styles.viewProfile}>View profile →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
