import RootLayoutServer from '@components/Layouts/RootLayoutServer'
import RootLayoutClient from '@components/Layouts/RootLayoutClient'

export default function RootLayout({ children }) {
  return (
    <RootLayoutServer>
      <RootLayoutClient>
        {children}
      </RootLayoutClient>
    </RootLayoutServer>
  );
}
