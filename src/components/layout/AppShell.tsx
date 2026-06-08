import Link from "next/link";

type AppShellProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link className="app-logo" href="/">
            <strong>らくらくカレーサポート</strong>
            <span>Cooking support frontend</span>
          </Link>
        </div>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <div className="app-footer__inner">
          <span>rakuraku_curry_support_frontend</span>
        </div>
      </footer>
    </div>
  );
}
