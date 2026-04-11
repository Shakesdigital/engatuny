export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(242,181,29,0.18),transparent_28%),linear-gradient(180deg,#f9f1e6,#f2e6d7)]">
      {children}
    </div>
  );
}
