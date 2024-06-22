import RootLayoutServer, { metadata } from '@components/Layouts/RootLayoutServer'
import RootLayoutClient from '@components/Layouts/RootLayoutClient'

export { metadata };

export default function RootLayout({ children }) {
  return (
    <RootLayoutServer>
      <RootLayoutClient>
        {children}
      </RootLayoutClient>
    </RootLayoutServer>
  );
}
