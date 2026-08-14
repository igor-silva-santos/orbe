import MidiaCardSkeleton from '@/components/media/MidiaCardSkeleton';

const SKELETON_SLIDE_COUNT = 7;
const SLIDE_CLASS =
  'relative flex-[0_0_170px] sm:flex-[0_0_190px] md:flex-[0_0_210px] min-w-0 pl-3 sm:pl-4';

export default function HomeLoading() {
  return (
    <div className="bg-background overflow-x-hidden">
      <section className="border-b border-border/40 py-14 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl mx-auto space-y-4">
          <div className="h-4 w-32 bg-skeleton rounded mx-auto animate-pulse" />
          <div className="h-12 bg-skeleton rounded animate-pulse" />
          <div className="h-16 bg-skeleton rounded animate-pulse" />
        </div>
      </section>
      <main className="container mx-auto py-12 space-y-14 px-2 sm:px-4">
        {['Filmes', 'Séries', 'Animes', 'Jogos'].map((title) => (
          <section key={title}>
            <div className="h-7 w-48 bg-skeleton rounded mb-5 mx-2 animate-pulse" />
            <div className="overflow-hidden py-2 px-1 sm:px-2">
              <div className="flex justify-center">
                {Array.from({ length: SKELETON_SLIDE_COUNT }).map((_, i) => (
                  <div key={i} className={SLIDE_CLASS}>
                    <MidiaCardSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
