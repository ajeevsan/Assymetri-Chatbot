// app/layout.tsx
import './globals.css';
import { Providers } from './components/Providers'; // import this

export default function RootLayout({ children }: { children: React.ReactNode }) {

  console.log('children___', children)

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
