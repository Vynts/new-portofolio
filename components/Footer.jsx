// components/Footer.jsx
export default function Footer() {
  return (
    // Tambahkan bg-[#0d1117] agar sama dengan background utama
    <footer className="p-8 md:px-24 text-center border-t border-[#30363d] bg-[#0d1117] text-[#8b949e] text-sm notranslate">
      <p>© {new Date().getFullYear()} Alvinza Erza Farandhika. Built with Next.js</p>
    </footer>
  );
}