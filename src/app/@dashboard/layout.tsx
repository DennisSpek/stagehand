import { auth } from "@/auth"
import { Header } from '@/components/header';
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  console.log()

  return (
    <div className='h-full'>
      <Header/>
      <div className='flex-1'>
        <div className='p-8 h-full '>
          {children}
        </div>
      </div>
    </div>
    
  );
}
