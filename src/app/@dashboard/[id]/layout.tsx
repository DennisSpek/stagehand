import { SideNavigation } from '@/ui/sideNavigation';
import { ArtistSelector } from '@/components/artistSelector';
import { WelcomeMessage } from '@/components/welcomeMessage';

export default function ArtistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className='h-full flex flex-col'>
      <main className='flex flex-1 gap-8'>
        <div className='w-[288px] flex flex-col gap-4 h-full'>
          <ArtistSelector />
          <div className='flex-1 overflow-auto'>
            <SideNavigation />
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <WelcomeMessage />
          {children}
        </div>
      </main>
    </div>
  );
}
