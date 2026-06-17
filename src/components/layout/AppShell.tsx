import { Header } from "@/components/layout/Header";

type AppShellProps = Readonly<{
  children: React.ReactNode;
}>;

export async function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">{children}</main>
    </div>
  );
}
