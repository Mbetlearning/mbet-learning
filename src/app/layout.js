import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';
export const metadata = {
  title: 'MBET Learning',
  description: 'Empowering Students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
