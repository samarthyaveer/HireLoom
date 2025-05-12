export default function RootLayout({ children }) {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen antialiased">
      <div className="min-h-screen flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900 z-[-1]"></div>
        {children}
        
      </div>
    </div>
  );
}
