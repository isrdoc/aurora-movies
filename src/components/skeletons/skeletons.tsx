import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/lib/use-mobile";

export function DataTableSkeletons({ isCardView }: { isCardView?: boolean }) {
  return (
    <div className="@container w-full flex flex-col space-y-3">
      <Skeleton className="h-8 w-[200px]" />
      {isCardView ? <CardSkeletons /> : <RowSkeletons />}
    </div>
  );
}

function RowSkeletons() {
  const isMobile = useIsMobile();
  return (
    <>
      {[...Array(isMobile ? 12 : 23).keys()].map((key) => (
        <Skeleton key={`DataTableRowSkeletons${key}`} className="h-8 w-full" />
      ))}
    </>
  );
}

function CardSkeletons() {
  const isMobile = useIsMobile();
  return (
    <div className="grid @md:grid-cols-1 @lg:grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-2 @3xl:grid-cols-2 @4xl:grid-cols-3 @5xl:grid-cols-3 @6xl:grid-cols-3 @7xl:grid-cols-4 gap-3">
      {[...Array(isMobile ? 4 : 12).keys()].map((key) => (
        <Skeleton
          key={`DataTableCardSkeletons${key}`}
          className="h-120 w-full max-w-xl hover:shadow-lg transition-shadow duration-500"
        />
      ))}
    </div>
  );
}
