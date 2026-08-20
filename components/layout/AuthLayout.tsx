import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  asideTitle: string;
  asideText: string;
  asideItems: string[];
  switchText: string;
  switchHref: string;
  switchLabel: string;
}

/** Layout compartido por las pantallas 02/03/04 (auth) — split screen con beneficios. */
export function AuthLayout({ children, asideTitle, asideText, asideItems, switchText, switchHref, switchLabel }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <div className="auth-topbar">
        <Link className="brand" href="/">
          <svg className="brand-mark" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="24" height="24" stroke="currentColor" strokeWidth="1.4" />
            <path d="M13 4L13 8M13 18L13 22M4 13L8 13M18 13L22 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M13 5L15.4 12.6L13 21L10.6 12.6L13 5Z" fill="currentColor" />
          </svg>
          <span>PlanoEvento</span>
        </Link>
        <span className="auth-topbar-switch">
          {switchText} <Link href={switchHref}>{switchLabel}</Link>
        </span>
      </div>

      <div className="auth-body">
        <div className="auth-form-col">
          <div className="auth-form-inner">{children}</div>
        </div>

        <div className="auth-aside">
          <div className="auth-aside-card">
            <svg viewBox="0 0 100 70" aria-hidden="true">
              <rect x="0" y="0" width="100" height="70" rx="6" fill="var(--surface)" />
              <rect x="8" y="18" width="12" height="10" rx="1.5" fill="var(--info)" opacity="0.85" />
              <rect x="8" y="32" width="12" height="10" rx="1.5" fill="var(--info)" opacity="0.85" />
              <rect x="24" y="18" width="12" height="10" rx="1.5" fill="var(--accent)" opacity="0.85" />
              <rect x="24" y="32" width="12" height="10" rx="1.5" fill="var(--accent)" opacity="0.85" />
              <rect x="40" y="18" width="12" height="10" rx="1.5" fill="var(--accent)" opacity="0.85" />
              <rect x="40" y="32" width="12" height="10" rx="1.5" fill="var(--accent)" opacity="0.85" />
              <circle cx="66" cy="23" r="5" fill="var(--danger)" opacity="0.8" />
              <circle cx="82" cy="23" r="5" fill="var(--good)" opacity="0.8" />
              <rect x="60" y="34" width="28" height="14" rx="3" fill="var(--paper-alt)" />
              <circle cx="10" cy="52" r="3" fill="var(--good)" opacity="0.6" />
              <circle cx="90" cy="10" r="3" fill="var(--good)" opacity="0.6" />
            </svg>
          </div>
          <h2>{asideTitle}</h2>
          <p>{asideText}</p>
          <ul className="auth-aside-list">
            {asideItems.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
