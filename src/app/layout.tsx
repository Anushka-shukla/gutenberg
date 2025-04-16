import "./globals.css";


// Example: using Inter from Google Fonts
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="montserrat.className">
        {children}
      </body>
    </html>
  );
}
