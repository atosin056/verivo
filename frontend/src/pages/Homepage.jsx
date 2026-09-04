import Navbar from "../components/Navbar.jsx";
import logo from "../assets/logo.png";
import tunde from "../assets/Tunde_persona.png";
import workerTools from "../assets/workerTools.png";
import employer from "../assets/employer.png";
import {
  ArrowRight,
  ClipboardCheck,
  Hand,
  Mic,
  ShieldCheck,
  Volume2,
} from "lucide-react";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100%",
          minHeight: "calc(100vh - 4rem)",
          display: "flex",
          justifyContent: "center",
          paddingInline: "clamp(20px, 5vw, 64px)",
          paddingTop: "clamp(48px, 8vh, 96px)",
          paddingBottom: "48px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <div
            className="homepage-meta"
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "clamp(28px, 6vw, 72px)",
            }}
          >
            <span
              style={{
                fontFamily: "JetBrains Mono",
                textTransform: "uppercase",
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                color: "#6b6055",
              }}
            >
              Live build · Verivo
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                textTransform: "uppercase",
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                color: "#6b6055",
              }}
            >
              AI Trust & Escrow for Lagos
            </span>
            <span
              style={{
                fontFamily: "JetBrains Mono",
                textTransform: "uppercase",
                fontSize: "10.5px",
                letterSpacing: "0.22em",
                color: "#6b6055",
              }}
            >
              Informal Workforce · 2026
            </span>
          </div>
          <div
            className="homepage-hero-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: "clamp(32px, 7vw, 120px)",
            }}
          >
            <div style={{ flex: "1 1 55%", minWidth: 0 }}>
              <div style={{ maxWidth: "600px", width: "100%" }}>
                <span
                  style={{
                    fontSize: "clamp(2.2rem, 11vw, 6rem)",
                    fontWeight: 400,
                    lineHeight: "1.1em",
                    letterSpacing: "-0.055em",
                  }}
                >
                  Skill is{" "}
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      color: "#0f3d2e",
                    }}
                  >
                    verb.
                    <svg
                      viewBox="0 0 220 20"
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: "-8px",
                        width: "100%",
                        height: "18px",
                      }}
                    >
                      <path
                        d="M2,10 C 40,17 90,2 130,9 C 160,14 190,6 216,11"
                        fill="none"
                        stroke="#C9932E"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>{" "}
                  Prove it.
                </span>
                <p className="homepage-description">
                  Verivo is WAEC for the informal economy. A
                  voice-and-simulation skill exam that turns a trader&apos;s
                  hands into a verifiable credential, and routes payment through
                  Paystack so doing the work on-platform makes you more hireable
                  the next time.
                </p>
                <div className="homepage-actions">
                  <a className="homepage-primary-action" href="/auth">
                    See the diagnostic interview <ArrowRight size={16} />
                  </a>
                  <button className="homepage-secondary-action" type="button">
                    <Mic size={15} /> Walk through Tunde&apos;s flow
                  </button>
                </div>
                <div className="homepage-proof">
                  <div className="homepage-proof-avatars">
                    <img src={tunde} alt="" />
                    <img src={tunde} alt="" />
                    <img src={tunde} alt="" />
                  </div>
                  <span>
                    Field-validated with 24 workers and 6 employers across
                    <br /> Computer Village, Ladipo, Tejuosho, Aba.
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "min(35%, 420px)",
                background: "#fbf7ef",
                flex: "0 1 420px",
                minWidth: "280px",
                paddingBottom: "10px",
                borderRadius: "24px",
                position: "relative",
              }}
            >
              <div
                className="homepage-paper-backdrop homepage-paper-backdrop-secondary"
                aria-hidden="true"
              />
              <div className="homepage-paper-backdrop" aria-hidden="true" />
              <div className="homepage-container">
                <div className="homepage-credential">
                  <div className="homepage-credential-image">
                    <img
                      className="homepage-image"
                      src={tunde}
                      alt="Tunde Adebayo"
                    />
                    <span className="credential-badge">
                      <ShieldCheck size={12} /> VERIVO · VERIFIED
                    </span>
                    <span className="credential-id">#RC-9012-3456</span>
                    <div className="credential-name">
                      Tunde Adebayo
                      <small>
                        Phone repair · Computer Village, Ikeja · 12 yrs
                      </small>
                    </div>
                  </div>
                  <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <div className="credential-scores">
                      <div>
                        <small>KNOWLEDGE</small>
                        <strong>
                          76<em>/100</em>
                        </strong>
                      </div>
                      <div>
                        <small>TRUST</small>
                        <strong>
                          71<em>/100</em>
                        </strong>
                      </div>
                      <div className="credential-score-main">
                        <small>IṢẸ́</small>
                        <strong>
                          73<em>/100</em>
                        </strong>
                      </div>
                    </div>
                    <div className="credential-meta">
                      <span>
                        <ShieldCheck size={13} /> 24 Paystack-confirmed jobs
                      </span>
                      <span>58% repeat customers</span>
                    </div>
                    <div className="credential-replay">
                      <span>
                        <Volume2 size={17} /> DIAGNOSTIC REPLAY
                      </span>
                      <small>06:42</small>
                      <div className="replay-wave">▂▅▃▇▅▆▃▇▅▂▆▃▅▇▃▆</div>
                    </div>
                    <button className="credential-link" type="button">
                      View full credential <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="homepage-stats" aria-label="Verivo statistics">
            <div className="homepage-stat">
              <strong>41M</strong>
              <span>
                Informal workers in
                <br />
                Nigeria
              </span>
              <small>NBS, 2023</small>
            </div>
            <div className="homepage-stat">
              <strong>≈100%</strong>
              <span>
                With no portable
                <br />
                credential
              </span>
            </div>
            <div className="homepage-stat">
              <strong>1 in 4</strong>
              <span>
                Off-platform jobs that
                <br />
                ghost monthly
              </span>
              <small>field interviews, n=20</small>
            </div>
            <div className="homepage-stat">
              <strong>&lt;60s</strong>
              <span>Paystack settlement</span>
              <small>Transfer API</small>
            </div>
          </div>
        </div>
      </div>
      <section id="problem" className="homepage-problem-section">
        <div className="homepage-problem-inner">
          <div className="homepage-problem-top">
            <div className="homepage-problem-intro">
              <span className="homepage-section-kicker">01 · THE PROBLEM</span>
              <h2>
                Forty-one
                <br />
                million <em>invisibles.</em>
              </h2>
              <p>
                Nigeria&apos;s informal sector employs more workers than the
                entire formal workforce. They are not poor by lack of ability,
                they are poor by lack of proof.
              </p>
            </div>
            <div className="homepage-failure-grid">
              <article>
                <span>01</span>
                <h3>Skill is invisible.</h3>
                <p>
                  A phone technician with twelve years of experience has no
                  certificate. No employer outside his WhatsApp circle has any
                  way to know.
                </p>
                <small>— STRUCTURAL FAILURE</small>
              </article>
              <article>
                <span>02</span>
                <h3>Trust is local.</h3>
                <p>
                  Reputation lives in physical neighborhoods and word-of-mouth.
                  A welder in Aba cannot accept a job in Lekki because nobody in
                  Lekki has heard of him.
                </p>
                <small>— STRUCTURAL FAILURE</small>
              </article>
              <article>
                <span>03</span>
                <h3>Payment is broken.</h3>
                <p>
                  Clients ghost after work is done. Workers chase fees for
                  weeks. Informal work pays 30% less than formal work, risk
                  priced into every transaction.
                </p>
                <small>— STRUCTURAL FAILURE</small>
              </article>
            </div>
          </div>
          <div className="homepage-tried-row">
            <div className="homepage-tried-intro">
              <span className="homepage-section-kicker">
                02 · WHAT&apos;S BEEN TRIED
              </span>
              <h2>
                Why nothing else verifies the <em>work itself.</em>
              </h2>
            </div>
            <div className="homepage-tried-content">
              <div className="homepage-comparison">
                <div>
                  <strong>Jiji / OLX</strong>
                  <span>Classified listings</span>
                  <p>→ No verification. Stars from strangers.</p>
                </div>
                <div>
                  <strong>LinkedIn</strong>
                  <span>Self-reported résumés</span>
                  <p>→ Built for paper-credentialed users.</p>
                </div>
                <div>
                  <strong>Lynk (KE)</strong>
                  <span>Admin verification</span>
                  <p>→ Verifies ID, not skill.</p>
                </div>
                <div>
                  <strong>WhatsApp</strong>
                  <span>Where work happens</span>
                  <p>→ Trapped inside groups. No payment safety.</p>
                </div>
              </div>
              <blockquote>
                <span>“</span>
                <div>
                  <p>
                    If the customer can see I passed the test before hiring me,
                    I don&apos;t need to beg for the job. The test is begging
                    for me.
                  </p>
                  <cite>EMEKA · PHONE REPAIR · COMPUTER VILLAGE</cite>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      <section id="interview" className="homepage-interview-section">
        <div className="homepage-interview-inner">
          <div className="homepage-interview-intro">
            <div>
              <span className="homepage-light-kicker">
                02 · DIAGNOSTIC INTERVIEW
              </span>
              <h2>
                Not a skill exam.
                <br />
                <em>A diagnostic interview.</em>
              </h2>
            </div>
            <p>
              A drag-and-drop cannot prove a worker can physically execute a
              repair — that takes muscle memory, smell, sound. What it can prove
              is that they can correctly diagnose, reason about, and articulate
              the fix. That&apos;s exactly what an employer needs to know before
              hiring. Real execution is verified later, by Paystack-confirmed
              completed jobs. We don&apos;t over-claim.
            </p>
          </div>
          <div className="homepage-stage-grid">
            <article>
              <div className="homepage-stage-head">
                <span>Stage 01</span>
                <span>0:00 – 0:30</span>
              </div>
              <div className="homepage-stage-icon">
                <ClipboardCheck size={17} />
              </div>
              <h3>Presentation</h3>
              <p>
                A 3D fault appears on screen. The voice agent — in Pidgin,
                Yoruba, Igbo, Hausa or English — frames the customer brief and
                asks where the worker would begin.
              </p>
            </article>
            <article>
              <div className="homepage-stage-head">
                <span>Stage 02</span>
                <span>0:30 – 3:00</span>
              </div>
              <div className="homepage-stage-icon">
                <Mic size={17} />
              </div>
              <h3>Diagnosis dialogue</h3>
              <p>
                The worker reasons aloud. The agent probes — Why this tool
                first? How will you eliminate motherboard? Branches across a
                30-node decision tree per fault.
              </p>
            </article>
            <article>
              <div className="homepage-stage-head">
                <span>Stage 03</span>
                <span>3:00 – 5:00</span>
              </div>
              <div className="homepage-stage-icon">
                <Hand size={17} />
              </div>
              <h3>Interactive demo</h3>
              <p>
                Drag the battery out. Probe the multimeter onto the contacts.
                Re-seat the ribbon. Every action emits a typed event that the
                deterministic scorer grades against the correct-path graph.
              </p>
            </article>
            <article>
              <div className="homepage-stage-head">
                <span>Stage 04</span>
                <span>5:00 – 6:00</span>
              </div>
              <div className="homepage-stage-icon">
                <ShieldCheck size={17} />
              </div>
              <h3>Resolution</h3>
              <p>
                The worker explains the full fix to the customer in their own
                words. The reasoning model scores articulation — the
                heaviest-weighted dimension, because it is what employers
                actually evaluate.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section id="demo" className="homepage-exchange-section">
        <div className="homepage-exchange-inner">
          <div className="homepage-exchange-labels">
            <span>SAMPLE EXCHANGE — TECNO SPARK, NO POWER</span>
            <span>RUBRIC — PHONE REPAIR</span>
          </div>
          <div className="homepage-exchange-grid">
            <div className="homepage-chat-card">
              <div className="homepage-chat-header">
                <span>
                  <i /> Recording · language: <strong>Pidgin</strong>
                </span>
                <span>T-00:24</span>
              </div>
              <div className="homepage-chat-body">
                <div className="homepage-chat-line homepage-chat-ai">
                  <b>AI</b>
                  <p>
                    Customer bring this phone come. E say e drop am, now e no
                    dey come on at all. Battery, charger dey.{" "}
                    <em>Wetin you go check first?</em>
                  </p>
                </div>
                <div className="homepage-chat-line homepage-chat-worker">
                  <p>
                    I go open the back first, check if the battery still dey sit
                    well. If the drop knock am loose, na quick fix.
                  </p>
                  <b>TU</b>
                </div>
                <div className="homepage-chat-line homepage-chat-ai">
                  <b>AI</b>
                  <p>
                    Good. How you go know say na battery problem, no be
                    motherboard?
                  </p>
                </div>
                <div className="homepage-chat-line homepage-chat-worker">
                  <p>
                    I go put multimeter on the contact. If e show
                    three-point-seven to four-point-two, battery alright — I
                    move to display ribbon and the charging port.
                  </p>
                  <b>TU</b>
                </div>
                <div className="homepage-scorer-note">
                  Scorer note · Reasoning: isolates cheapest variable first;
                  cites correct voltage band. <strong>+6</strong>
                </div>
              </div>
            </div>
            <div className="homepage-rubric-card">
              {[
                [
                  "Diagnostic reasoning",
                  "Isolate causes systematically",
                  "30%",
                  "92%",
                ],
                [
                  "Procedural accuracy",
                  "Right tool, right sequence",
                  "25%",
                  "78%",
                ],
                ["Articulation", "Can explain what & why", "20%", "62%"],
                [
                  "Safety awareness",
                  "Discharge, isolation, data",
                  "15%",
                  "48%",
                ],
                ["Edge-case handling", "Respond to curveballs", "10%", "36%"],
              ].map(([title, detail, weight, score]) => (
                <div className="homepage-rubric-item" key={title}>
                  <div>
                    <strong>{title}</strong>
                    <span>{weight}</span>
                  </div>
                  <small>{detail}</small>
                  <div className="homepage-rubric-track">
                    <i style={{ width: score }} />
                  </div>
                </div>
              ))}
              <p className="homepage-rubric-note">
                Every score includes a text justification the worker can
                dispute. Dual-model scoring with auto-flag on Δ &gt; 8 points.
                Weekly 5% human audit against master-technician reference.
              </p>
              <a className="homepage-demo-action" href="/auth">
                Walk through the live demo <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="score" className="homepage-score-section">
        <div className="homepage-score-inner">
          <div className="homepage-score-intro">
            <div>
              <span className="homepage-light-kicker">03 · THE IṢẸ́ SCORE</span>
              <h2>
                Two halves,
                <br />
                <em>compounding.</em>
              </h2>
            </div>
            <p>
              <strong>Iṣẹ́</strong> (Yorùbá: <em>work, craft</em>) — pronounced
              eh-shay. Knowledge is what you know. Trust is what you&apos;ve
              done. The weighting moves from one to the other as you compound
              on-platform.
            </p>
          </div>
          <div className="homepage-formula-card">
            <span>COMPOSITE FORMULA</span>
            <strong>IṢẸ́ = α · K + (1 − α) · T</strong>
            <code>α = max(0.30, 1 - jobs / 20)</code>
            <p>
              A first-day worker is judged entirely on Knowledge. After 10 jobs,
              half-and-half. After 14+, Trust dominates — capped at 70% so skill
              never becomes irrelevant.
            </p>
          </div>
          <div className="homepage-curve-card">
            <div className="homepage-curve-heading">
              <div>
                <span>WEIGHTING CURVE</span>
                <h3>How α decays as you compound.</h3>
              </div>
              <div className="homepage-curve-legend">
                <span>
                  <i /> Knowledge (α)
                </span>
                <span>
                  <i /> Trust (1-α)
                </span>
              </div>
            </div>
            <svg
              className="homepage-curve"
              viewBox="0 0 900 300"
              role="img"
              aria-label="Knowledge weight declines while trust weight rises and levels off at 70 percent"
            >
              <line x1="50" y1="24" x2="50" y2="260" />
              <line x1="50" y1="260" x2="860" y2="260" />
              <line
                className="curve-grid-line"
                x1="50"
                y1="142"
                x2="860"
                y2="142"
              />
              <line
                className="curve-grid-line"
                x1="50"
                y1="83"
                x2="860"
                y2="83"
              />
              <path
                className="curve-knowledge-fill"
                d="M50 24 L617 189 L860 189 L860 260 L50 260 Z"
              />
              <path
                className="curve-trust-fill"
                d="M50 260 L617 95 L860 95 L860 260 Z"
              />
              <path className="curve-knowledge" d="M50 24 L617 189 L860 189" />
              <path className="curve-trust" d="M50 260 L617 95 L860 95" />
              <circle cx="617" cy="189" r="4" className="curve-dot" />
              <line
                className="curve-marker"
                x1="617"
                y1="189"
                x2="617"
                y2="260"
              />
              <text x="627" y="182">
                α floor = 0.30
              </text>
              <text x="28" y="28">
                100%
              </text>
              <text x="32" y="147">
                50%
              </text>
              <text x="39" y="264">
                0%
              </text>
              <text x="48" y="282">
                0
              </text>
              <text x="244" y="282">
                5
              </text>
              <text x="442" y="282">
                10
              </text>
              <text x="646" y="282">
                15
              </text>
              <text x="848" y="282">
                20
              </text>
            </svg>
          </div>
        </div>
      </section>
      <section className="homepage-score-principles">
        <div className="homepage-score-principles-grid">
          <article>
            <h3>Knowledge — fixed for six months</h3>
            <p>
              From the Diagnostic Interview. Voluntary retake at ₦500 —
              empowering, not punitive. Workers come back when they think
              they&apos;ve improved.
            </p>
          </article>
          <article>
            <h3>Trust — compounds with every Paystack-confirmed job</h3>
            <p>
              Inputs: completed jobs (log curve), star ratings, structured
              feedback tags, repeat-customer ratio, dispute rate, time-decay.
            </p>
          </article>
          <article>
            <h3>Going off-platform passively outranks you</h3>
            <p>
              We don&apos;t punish workers who transact off-platform. Their
              Trust just stops compounding while everyone else&apos;s climbs.
            </p>
          </article>
          <article>
            <h3>Veterans can&apos;t coast on past glory</h3>
            <p>
              Trust decays over time. A great mechanic who hasn&apos;t worked in
              a year drops in rank. Knowledge keeps the bar real.
            </p>
          </article>
        </div>
      </section>
      <section id="paystack" className="homepage-paystack-section">
        <div className="homepage-paystack-inner">
          <div className="homepage-paystack-intro">
            <div>
              <span>04 · PAYSTACK APIS · STRUCTURAL, NOT DECORATIVE</span>
              <h2>
                Remove Paystack,
                <br />
                <em>
                  the product
                  <br />
                  disappears.
                </em>
              </h2>
            </div>
            <p>
              Trust Score literally cannot exist without Paystack-confirmed
              transactions. Per-job Virtual Account escrow is a financial
              primitive that turns matching into trust infrastructure — three
              APIs doing core platform work, not decorative payment collection.
            </p>
          </div>
          <div className="homepage-paystack-api-grid">
            <article>
              <div className="homepage-paystack-icon">
                <ShieldCheck size={15} />
              </div>
              <h3>Per-job VAs</h3>
              <p>
                Each accepted job spawns a job-scoped Virtual Account. Employer
                funds escrow on hire.
              </p>
              <small>
                Solves “client ghosted me.” Reframes Verivo as trust
                infrastructure.
              </small>
            </article>
            <article>
              <div className="homepage-paystack-icon">
                <ShieldCheck size={15} />
              </div>
              <h3>Virtual Accounts</h3>
              <p>
                Provisioned at signup — a GTCO-backed VA tied to the
                worker&apos;s number.
              </p>
              <small>
                The spine of the Trust Score. Every payment in = verified job
                event.
              </small>
            </article>
            <article>
              <div className="homepage-paystack-icon">
                <ArrowRight size={15} />
              </div>
              <h3>Transfer API</h3>
              <p>
                On confirm, funds release from job escrow to the worker&apos;s
                primary VA.
              </p>
              <small>
                Sub-60-second payout. Worker sees money instantly — beats
                WhatsApp + bank.
              </small>
            </article>
          </div>
          <div className="homepage-lifecycle-card">
            <div className="homepage-lifecycle-heading">
              <div>
                <span>LIFECYCLE OF A SINGLE JOB</span>
                <h3>Funded → released → score updated.</h3>
              </div>
              <small>Idempotent · retried · reconciled</small>
            </div>
            <div className="homepage-lifecycle-steps">
              <div>
                <strong>T+0S</strong>
                <p>Employer funds job VA</p>
              </div>
              <i>→</i>
              <div>
                <strong>T+3S</strong>
                <p>Worker notified, funds locked</p>
              </div>
              <i>→</i>
              <div>
                <strong>T+CONFIRM</strong>
                <p>Employer taps release</p>
              </div>
              <i>→</i>
              <div>
                <strong>&lt;60S</strong>
                <p>Transfer API → worker VA</p>
              </div>
            </div>
            <div className="homepage-lifecycle-footer">
              <span>
                Verivo fee: <b>3% on release</b>. Worker takes home <b>97%</b>,
                same day.
              </span>
              <strong>₦12,000 → ₦11,640 in 47s</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="homepage-people-section">
        <div className="homepage-people-inner">
          <div className="homepage-people-intro">
            <div>
              <span className="homepage-light-kicker">
                05 · WHO WE BUILT FOR
              </span>
              <h2>
                Three faces.{" "}
                <em>
                  One
                  <br />
                  stuck market.
                </em>
              </h2>
            </div>
            <p>
              Verivo is designed against named, interviewed humans — not
              personas we invented. Field validation across Computer Village,
              Ladipo Auto Market, Tejuosho, and four Lekki fashion houses.
            </p>
          </div>
          <div className="homepage-people-grid">
            <article className="homepage-person-card">
              <div className="homepage-person-image">
                <img src={tunde} alt="Tunde, phone repair technician" />
                <span>PHONE REPAIR TECHNICIAN</span>
                <strong>Tunde, 38</strong>
                <small>Iyana-Ipaja → Computer Village, Ikeja</small>
              </div>
              <div className="homepage-person-copy">
                <blockquote>
                  “I&apos;ve been fixing phones for twelve years. Everybody in
                  this market knows me. But if you ask me to work for Slot or
                  3CHub, they don&apos;t know me, so they won&apos;t hire me.
                  I&apos;m stuck here.”
                </blockquote>
                <dl>
                  <div>
                    <dt>INCOME</dt>
                    <dd>₦80k–₦220k / month · volatile</dd>
                  </div>
                  <div>
                    <dt>PHONE</dt>
                    <dd>Tecno Spark 10 · 4GB RAM</dd>
                  </div>
                  <div>
                    <dt>LANGUAGES</dt>
                    <dd>Yorùbá, Pidgin, basic English</dd>
                  </div>
                  <div>
                    <dt>PAIN POINT</dt>
                    <dd>
                      Lost ₦100,000 last month settling a false damage claim —
                      no intake record
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
            <article className="homepage-person-card">
              <div className="homepage-person-image">
                <img src={tunde} alt="Adaeze, fashion entrepreneur" />
                <img
                  className="homepage-person-stamp"
                  src={workerTools}
                  alt=""
                />
                <span>FASHION ENTREPRENEUR</span>
                <strong>Adaeze, 29</strong>
                <small>Lekki, manufactures in Aba</small>
              </div>
              <div className="homepage-person-copy">
                <blockquote>
                  “I&apos;ve hired three tailors in eighteen months who claimed
                  to do French seams. Two couldn&apos;t ₦400,000 in spoiled
                  fabric. I&apos;d pay a 15% premium for someone I can trust.”
                </blockquote>
                <dl>
                  <div>
                    <dt>HIRES / YR</dt>
                    <dd>≈18 tailors across orders</dd>
                  </div>
                  <div>
                    <dt>WTP</dt>
                    <dd>+15% for verified skill</dd>
                  </div>
                  <div>
                    <dt>CHANNELS</dt>
                    <dd>WhatsApp groups · Jiji · referrals</dd>
                  </div>
                  <div>
                    <dt>PAIN POINT</dt>
                    <dd>
                      No way to test claimed specialty before commissioning
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
            <article className="homepage-person-card">
              <div className="homepage-person-image">
                <img src={tunde} alt="Mr Bello, logistics SME" />
                <img
                  className="homepage-person-stamp homepage-person-stamp-employer"
                  src={employer}
                  alt=""
                />
                <span>HR OFFICER, LOGISTICS SME</span>
                <strong>Mr Bello, 47</strong>
                <small>Apapa · 40-truck fleet</small>
              </div>
              <div className="homepage-person-copy">
                <blockquote>
                  “Mechanic interviews are theatre. Candidates memorise answers.
                  A bad mechanic hires cost us ₦600,000 in repairs over six
                  months. I need to watch them reason through a real fault.”
                </blockquote>
                <dl>
                  <div>
                    <dt>FLEET</dt>
                    <dd>40 trucks · mixed diesel</dd>
                  </div>
                  <div>
                    <dt>COST OF BAD HIRE</dt>
                    <dd>≈₦600k / 6 months</dd>
                  </div>
                  <div>
                    <dt>CURRENT METHOD</dt>
                    <dd>Trade-test on owned truck</dd>
                  </div>
                  <div>
                    <dt>PAIN POINT</dt>
                    <dd>Theatrical interviews; no fair assessment</dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="homepage-scale-section">
        <div className="homepage-scale-inner">
          <div className="homepage-scale-intro">
            <div>
              <span className="homepage-light-kicker">06 · SCALE PATH</span>
              <h2>
                Three trades to fifteen.
                <br />
                <em>Six weeks at a time.</em>
              </h2>
            </div>
            <p>
              Adding a trade is a content problem, not an engineering one. Once
              the simulation engine, voice agent, and rubric framework are in
              place, a new trade needs 3D assets, master-craftsman rubrics, and
              a decision tree — six weeks, start to launch.
            </p>
          </div>
          <div className="homepage-phase-grid">
            <article>
              <div>
                <span>PHASE 1</span>
                <small>Months 1–6</small>
              </div>
              <strong>
                3<em> TRADES</em>
              </strong>
              <p>Computer Village + Tejuosho</p>
              <footer>
                <span>VERIFIED WORKERS</span>
                <b>18,000</b>
              </footer>
            </article>
            <article>
              <div>
                <span>PHASE 2</span>
                <small>Months 6–12</small>
              </div>
              <strong>
                6<em> TRADES</em>
              </strong>
              <p>+ Aba, Kano</p>
              <footer>
                <span>VERIFIED WORKERS</span>
                <b>50,000</b>
              </footer>
            </article>
            <article>
              <div>
                <span>PHASE 3</span>
                <small>Months 12–24</small>
              </div>
              <strong>
                15<em> TRADES</em>
              </strong>
              <p>Every state capital</p>
              <footer>
                <span>VERIFIED WORKERS</span>
                <b>250,000</b>
              </footer>
            </article>
          </div>
        </div>
        <div
          className="homepage-association-marquee"
          aria-label="Partner associations"
        >
          <div className="homepage-association-track">
            <span>Phone Dealers Association</span>
            <i>✦</i>
            <span>FADAN · Fashion Designers Association of Nigeria</span>
            <i>✦</i>
            <span>NAMA · Auto Mechanics Association</span>
            <i>✦</i>
            <span>Federal Road Transport Network</span>
            <i>✦</i>
            <span>Phone Dealers Association</span>
            <i>✦</i>
            <span>FADAN · Fashion Designers Association of Nigeria</span>
            <i>✦</i>
            <span>NAMA · Auto Mechanics Association</span>
            <i>✦</i>
            <span>Federal Road Transport Network</span>
            <i>✦</i>
          </div>
        </div>
      </section>
      <section className="homepage-final-section">
        <div className="homepage-final-inner">
          <span className="homepage-final-kicker">THE BET, RESTATED</span>
          <h2>
            Skill is a <em>verb.</em>
            <br />
            We help them <em>prove it.</em>
          </h2>
          <p>
            Verivo is Paystack&apos;s path into 41 million Nigerian wallets that
            no bank has ever touched.
            <br />
            The diagnostic is the moat. The Trust Score is the credential. The
            rails are the proof.
          </p>
          <div className="homepage-final-actions">
            <a href="/auth">
              Watch a diagnostic, end to end <ArrowRight size={15} />
            </a>
            <a href="/auth" className="homepage-final-secondary">
              See it from an employer&apos;s side <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
      <footer className="homepage-footer">
        <div className="homepage-footer-main">
          <div className="homepage-footer-brand">
            <div className="homepage-footer-logo">
              <img src={logo} alt="" />
              <span>Verivo</span>
            </div>
            <p>
              A voice-and-simulation skill exam for the 41 million informal
              workers of Nigeria&apos;s real economy. Built by Oluwatosin
              Akinfenwa for the Public.
            </p>
            <small>v1.0 · Lagos · May 2026</small>
          </div>
          <nav className="homepage-footer-links" aria-label="Footer navigation">
            <div>
              <span>PRODUCT</span>
              <a href="#diagnostic">Diagnostic Interview</a>
              <a href="#score">Iṣẹ́ Score</a>
              <a href="#paystack">Paystack rails</a>
              <a href="#disputes">Disputes</a>
            </div>
            <div>
              <span>SURFACES</span>
              <a href="/app">Worker app</a>
              <a href="/employer">Employer console</a>
              <a href="#demo">Live demo</a>
              <a href="#ussd">USSD bridge (Q3)</a>
            </div>
            <div>
              <span>BUILD</span>
              <a href="#architecture">Architecture</a>
              <a href="#risk">Risk register</a>
              <a href="#validation">Field validation</a>
              <a href="#team">Team Platinum</a>
            </div>
          </nav>
        </div>
        <div className="homepage-footer-bottom">
          <span>© 2026 Verivo. All hands welcome.</span>
          <span>Verified by Paystack · GTCO · Idempotent · Reconciled</span>
        </div>
      </footer>
    </>
  );
}
