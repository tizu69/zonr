import DtConfigCard from '@/components/features/dtConfigCard';
import DtConvertCard from '@/components/features/dtConvertCard';
import { ThemeToggle } from '@/components/theme-toggle';
import { z } from 'zod';

function isValidDateTime(dt: string) {
  try {
    z.string().datetime({ offset: true }).parse(dt);
    return true;
  } catch {
    return false;
  }
}

export default async function Home({
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const dt = decodeURIComponent((await searchParams).dt as string);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <main className="max-w-3xl w-full mx-auto space-y-6">
        {dt && isValidDateTime(dt) && <DtConvertCard dt={dt} />}
        <DtConfigCard />
        <div className="text-center text-sm text-muted-foreground">
          <p>Stay in sync with a single link.</p>
          <p>
            Made with ❤️ by{' '}
            <a href="https://zonr.dev" className="underline">
              zonr.dev
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
