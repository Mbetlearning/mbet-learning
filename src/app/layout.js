// ✅ NO "use client" here
import '../styles/globals.css';
import LayoutClient from './layoutclient'; // Add this small wrapper

export const metadata = {
  title: 'MBET Learning',
  description: 'Empowering Students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
