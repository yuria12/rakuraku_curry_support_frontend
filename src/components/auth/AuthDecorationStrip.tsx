const decorations = ["chili", "spice", "curry", "cutlery"];

export function AuthDecorationStrip() {
  return (
    <div className="auth-decorations" aria-hidden="true">
      {decorations.map((item) => (
        <span className={`auth-decoration auth-decoration--${item}`} key={item} />
      ))}
    </div>
  );
}
