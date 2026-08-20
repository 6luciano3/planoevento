import Link from "next/link";
import { TiposDeStand } from "@/components/landing/TiposDeStand";

export default function LandingPage() {
  return (
    <>
      <header className="site-header">
        <div className="wrap nav-row">
          <Link className="brand" href="#top">
            <svg className="brand-mark" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="24" height="24" stroke="currentColor" strokeWidth="1.4" />
              <path d="M13 4L13 8M13 18L13 22M4 13L8 13M18 13L22 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M13 5L15.4 12.6L13 21L10.6 12.6L13 5Z" fill="currentColor" />
            </svg>
            <span>PlanoEvento</span>
          </Link>

          <nav className="primary-nav">
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#biblioteca">Biblioteca</a>
            <a href="#rubros">Rubros</a>
            <a href="#topoexport">TopoExport</a>
            <a href="#revision">Revisión y PDF</a>
          </nav>

          <div className="nav-actions">
            <Link className="link-btn" href="/auth/iniciar-sesion">
              Iniciar sesión
            </Link>
            <Link className="btn btn-solid" href="/proyectos/nuevo">
              Crear plano gratis
            </Link>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Editor de planos para eventos y ferias</span>
              <h1>El plano de tu evento, listo para presentar.</h1>
              <p className="lede">
                Ubicá el predio, arrastrá stands, baños y salidas desde una biblioteca pensada para ferias, y
                exportá un PDF a escala real para la municipalidad — sin abrir un programa de arquitectura.
              </p>
              <div className="hero-ctas">
                <Link className="btn btn-solid btn-lg" href="/proyectos/nuevo">
                  Crear mi primer plano
                </Link>
                <a className="btn btn-outline btn-lg" href="#como-funciona">
                  Ver cómo funciona
                </a>
              </div>
              <div className="trust-line">
                <span>Sin conocimientos de arquitectura</span>
                <span>Base geográfica con TopoExport</span>
                <span>Escala y medidas reales</span>
              </div>
            </div>

            <div className="hero-sheet">
              <div className="hero-sheet-inner">
                <svg viewBox="0 0 520 260" role="img" aria-label="Boceto de un plano de feria con stands, accesos y referencias">
                  <path d="M40 20 L440 20 L440 200 L40 200 Z" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeDasharray="6 5" />
                  <g transform="translate(468,32)">
                    <path d="M0 -18 L6 5 L0 0 L-6 5 Z" fill="var(--ink)" />
                    <text x="0" y="16" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight={700} fill="var(--ink)">N</text>
                  </g>
                  <g>
                    <rect x="70" y="50" width="30" height="26" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.1" />
                    <rect x="106" y="50" width="30" height="26" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.1" />
                    <rect x="142" y="50" width="30" height="26" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.1" />
                    <text x="85" y="67" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent-ink)">A01</text>
                    <text x="121" y="67" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent-ink)">A02</text>
                    <text x="157" y="67" textAnchor="middle" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent-ink)">A03</text>
                  </g>
                  <rect x="260" y="50" width="100" height="70" fill="none" stroke="var(--ink-soft)" strokeWidth="1.1" strokeDasharray="3 3" />
                  <text x="310" y="88" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight={600} fill="var(--ink-soft)">ESCENARIO</text>
                  <g transform="translate(280,220)">
                    <rect x="0" y="0" width="140" height="34" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1" />
                    <line x1="0" y1="17" x2="140" y2="17" stroke="var(--line-strong)" strokeWidth="1" />
                    <text x="8" y="12" fontFamily="Inter, sans-serif" fontSize="8.5" fontWeight={700} fill="var(--ink)">PLANO GENERAL</text>
                    <text x="8" y="28" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--ink-soft)">ESCALA 1:500 · HOJA A1</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="rule-top">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Tres pasos</span>
              <h2>De la dirección del predio al PDF final</h2>
              <p className="sub">El mismo recorrido que seguirías con papel y regla — solo que cada elemento ya viene dibujado a escala.</p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-num">01</div>
                <h3>Ubicá el predio</h3>
                <p>Buscá la dirección o dibujá el área del evento sobre el mapa. Traé parcelas, calles y árboles reales con TopoExport, o calibrá un plano propio.</p>
              </div>
              <div className="step">
                <div className="step-num">02</div>
                <h3>Arrastrá los elementos</h3>
                <p>Sumá stands, baños, salidas de emergencia y vegetación desde la biblioteca. Cada símbolo respeta la escala del plano.</p>
              </div>
              <div className="step">
                <div className="step-num">03</div>
                <h3>Descargá el PDF</h3>
                <p>Completá la carátula, generá la leyenda automática y exportá un documento listo para presentar ante la municipalidad.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="biblioteca" className="rule-top">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Biblioteca de componentes</span>
              <h2>Cada elemento de la feria, ya dibujado</h2>
              <p className="sub">Elegís el símbolo, lo soltás en el plano y queda numerado automáticamente.</p>
            </div>
            <div className="feature-grid">
              {FEATURES.map((f) => (
                <div className="feature-card" key={f.titulo}>
                  <h3>{f.titulo}</h3>
                  <p>{f.texto}</p>
                  <span className="code mono">{f.codigo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rubros" className="rule-top">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Para cualquier feria</span>
              <h2>Pensado para los rubros que arman tu evento</h2>
              <p className="sub">
                Cada stand queda numerado con su rubro, así la leyenda del plano es clara para expositores,
                proveedores y visitantes.
              </p>
            </div>
            <TiposDeStand />
          </div>
        </section>

        <section id="topoexport" className="rule-top">
          <div className="wrap split">
            <div>
              <span className="eyebrow">Base geográfica</span>
              <h2>Un terreno real debajo de cada plano</h2>
              <p className="sub">
                TopoExport entrega parcelas, edificios, calles, árboles y áreas verdes del predio elegido.
                PlanoEvento las incorpora como una capa bloqueada, lista para dibujar encima.
              </p>
              <div className="fine">
                TopoExport no crea los elementos del evento ni aprueba el plano: solamente aporta la base del
                terreno. Si no hay cobertura suficiente, siempre podés importar un plano propio y calibrar la escala.
              </div>
            </div>
            <div className="layer-stack">
              {[
                { nombre: "Parcelas", color: "#D9CBB2" },
                { nombre: "Edificios", color: "#B7A98C" },
                { nombre: "Calles", color: "#9C9C9C" },
                { nombre: "Árboles", color: "#8FB79B" },
                { nombre: "Áreas verdes", color: "#A9CDB4" },
              ].map((l) => (
                <div className="layer-item" key={l.nombre}>
                  <span className="layer-swatch" style={{ background: l.color }} />
                  <span className="name">{l.nombre}</span>
                  <span className="status">Importada</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="revision" className="rule-top">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Antes de exportar</span>
              <h2>Una revisión que avisa, no que aprueba</h2>
              <p className="sub">La lista de revisión detecta lo que falta, con el mismo lenguaje que usaría un colega mirando el plano.</p>
            </div>
            <div className="callouts">
              <div className="callout yes">
                <span className="tag">Así avisa PlanoEvento</span>
                <p className="msg">&quot;No se encontró una flecha norte en el plano.&quot;</p>
                <p className="note">Concreto, verificable, y fácil de corregir desde el mismo editor.</p>
              </div>
              <div className="callout no">
                <span className="tag">Esto no lo dice la app</span>
                <p className="msg">&quot;El plano incumple la normativa municipal.&quot;</p>
                <p className="note">Esa decisión es de arquitectos, bomberos y la municipalidad.</p>
              </div>
            </div>
            <div className="legal-strip">
              <p>
                PlanoEvento ayuda a preparar la documentación del plano. No reemplaza la revisión de arquitectos,
                bomberos, defensa civil ni la aprobación de la municipalidad.
              </p>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="wrap cta-inner">
            <div>
              <h2>Tu próxima feria ya tiene lugar para cada stand.</h2>
              <p className="sub">Empezá con un predio vacío o traé la base con TopoExport.</p>
            </div>
            <Link className="btn btn-solid btn-lg" href="/proyectos/nuevo">
              Crear plano gratis
            </Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="wrap">
          <div className="footer-bottom">
            <span>© 2026 PlanoEvento. Herramienta de preparación documental — no reemplaza la aprobación municipal.</span>
          </div>
        </div>
      </footer>

      <style>{LANDING_CSS}</style>
    </>
  );
}

const FEATURES = [
  { titulo: "Stands y carpas", texto: "Del stand de 2×2 al food truck, con numeración automática al distribuirlos en fila o cuadrícula.", codigo: "STANDS · GASTRONOMÍA" },
  { titulo: "Accesos y circulación", texto: "Entradas, salidas y salidas de emergencia con su código en la leyenda.", codigo: "ACCESOS · SE" },
  { titulo: "Sanitarios y limpieza", texto: "Baños, baños accesibles, tachos y puntos de reciclaje, listos para arrastrar.", codigo: "WC · TA" },
  { titulo: "Emergencias", texto: "Atención médica, matafuegos, evacuación y punto de encuentro identificados.", codigo: "PM · MT" },
  { titulo: "Vegetación", texto: "Árboles existentes o proyectados, con diámetro de copa real.", codigo: "AR · PA" },
  { titulo: "Electricidad y agua", texto: "Generadores, tomas y puntos de suministro cerca de cada stand.", codigo: "EL · AG" },
  { titulo: "Estacionamiento", texto: "General, accesible, motos y zona de carga y descarga.", codigo: "EST" },
  { titulo: "Cotas y referencias", texto: "Medí distancias y superficies y convertilas en una cota visible.", codigo: "COT" },
];

/**
 * Estilos propios de la landing. Se mantienen aparte de app/globals.css
 * porque son específicos de esta página (hero, feature-grid, callouts) y
 * no se reutilizan en el resto de la app.
 */
const LANDING_CSS = `
.site-header { position: sticky; top: 0; z-index: 40; background: color-mix(in srgb, var(--paper) 88%, transparent); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
.nav-row { display: flex; align-items: center; justify-content: space-between; gap: 24px; height: 68px; max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,56px); }
.primary-nav { display: flex; gap: 28px; }
.primary-nav a { text-decoration: none; font-family: "Inter", sans-serif; font-weight: 600; font-size: 14.5px; color: var(--ink-soft); }
.primary-nav a:hover { color: var(--ink); }
.nav-actions { display: flex; align-items: center; gap: 10px; }
@media (max-width: 860px) { .primary-nav { display: none; } }

.hero-section { padding: clamp(48px,8vw,88px) 0; }
.hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(32px,5vw,64px); align-items: center; max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,56px); }
.hero-grid h1 { font-size: clamp(32px,4.4vw,50px); margin-top: 16px; }
.lede { margin-top: 18px; font-size: 17px; color: var(--ink-soft); max-width: 46ch; line-height: 1.6; }
.hero-ctas { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 26px; }
.trust-line { margin-top: 22px; display: flex; flex-wrap: wrap; gap: 8px 18px; font-family: "IBM Plex Mono", monospace; font-size: 12px; color: var(--ink-faint); }
.hero-sheet { position: relative; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow-lg); padding: 12px; }
.hero-sheet-inner { border: 1px solid var(--line); }
@media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr; } }

section { padding: clamp(48px,7vw,80px) 0; }
.rule-top { border-top: 1px solid var(--line); }
.section-head { max-width: 640px; margin: 0 auto clamp(28px,4vw,44px); padding: 0 clamp(20px,5vw,56px); }
.section-head h2 { font-size: clamp(24px,3vw,34px); margin-top: 12px; }
.sub { margin-top: 12px; color: var(--ink-soft); font-size: 15.5px; max-width: 56ch; }

.steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,56px); }
.step-num { font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 12px; color: var(--accent-ink); background: var(--accent-soft); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.step h3 { font-size: 17px; margin-top: 16px; }
.step p { margin-top: 8px; color: var(--ink-soft); font-size: 14px; line-height: 1.6; }
@media (max-width: 860px) { .steps { grid-template-columns: 1fr; } }

.feature-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; max-width: 1180px; margin: 0 auto; }
.feature-card { background: var(--surface); padding: 20px 18px 22px; display: flex; flex-direction: column; gap: 10px; }
.feature-card h3 { font-size: 14.5px; }
.feature-card p { font-size: 13px; color: var(--ink-soft); line-height: 1.5; }
.feature-card .code { margin-top: auto; padding-top: 8px; font-size: 10.5px; color: var(--ink-faint); }
@media (max-width: 980px) { .feature-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 640px) { .feature-grid { grid-template-columns: 1fr; } }

.rubro-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,56px); }
.rubro-item { display: flex; align-items: center; gap: 12px; padding: 16px 16px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); font-size: 13.5px; font-weight: 600; color: var(--ink); text-decoration: none; transition: border-color .15s, transform .15s, box-shadow .15s; }
.rubro-item:hover { border-color: var(--accent); box-shadow: var(--shadow-sm); transform: translateY(-1px); }
.rubro-icon { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; background: var(--accent-soft); color: var(--accent-ink); }
@media (max-width: 980px) { .rubro-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 560px) { .rubro-grid { grid-template-columns: 1fr; } }

.split { display: grid; grid-template-columns: 1fr 0.92fr; gap: clamp(32px,5vw,60px); align-items: center; max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,56px); }
.fine { margin-top: 16px; padding: 12px 14px; border-left: 2px solid var(--line-strong); font-family: "IBM Plex Mono", monospace; font-size: 12px; color: var(--ink-faint); line-height: 1.6; }
.layer-stack { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow-sm); padding: 26px 22px; }
.layer-item { display: flex; align-items: center; gap: 12px; padding: 11px 4px; border-bottom: 1px solid var(--line); font-size: 14px; }
.layer-item:last-child { border-bottom: none; }
.layer-swatch { width: 14px; height: 14px; border-radius: 2px; border: 1px solid var(--line-strong); }
.layer-item .status { margin-left: auto; font-family: "IBM Plex Mono", monospace; font-size: 10.5px; color: var(--good); }
@media (max-width: 860px) { .split { grid-template-columns: 1fr; } }

.callouts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,56px); }
.callout { border: 1px solid var(--line); border-radius: var(--radius); padding: 18px 20px; background: var(--surface); }
.callout .tag { font-family: "IBM Plex Mono", monospace; font-size: 10.5px; text-transform: uppercase; }
.callout.yes { border-left: 3px solid var(--good); } .callout.yes .tag { color: var(--good); }
.callout.no { border-left: 3px solid var(--ink-faint); } .callout.no .tag { color: var(--ink-faint); }
.callout .msg { margin-top: 10px; font-family: "Inter", sans-serif; font-weight: 600; font-size: 15px; }
.callout.no .msg { text-decoration: line-through; color: var(--ink-faint); }
.callout .note { margin-top: 8px; font-size: 13px; color: var(--ink-soft); }
@media (max-width: 860px) { .callouts { grid-template-columns: 1fr; } }
.legal-strip { max-width: 1180px; margin: 32px auto 0; padding: 18px 20px; margin-left: clamp(20px,5vw,56px); margin-right: clamp(20px,5vw,56px); border: 1px solid var(--line); border-radius: var(--radius); background: var(--paper-alt); }
.legal-strip p { font-size: 13.5px; color: var(--ink-soft); line-height: 1.6; }

.cta-band { border-top: 1px solid var(--line); }
.cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 22px; flex-wrap: wrap; max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,56px); }
.cta-inner h2 { font-size: clamp(22px,3vw,30px); max-width: 22ch; }

.landing-footer { padding: 30px 0; border-top: 1px solid var(--line); }
.footer-bottom { font-size: 12.5px; color: var(--ink-faint); max-width: 1180px; margin: 0 auto; padding: 0 clamp(20px,5vw,56px); }
`;
