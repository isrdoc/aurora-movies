import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./sidebar";
import MoviesTable from "./movies-table/movies-table";

export default function MoviesPage() {
  return (
    <div className="border-t">
      <div className="bg-background">
        <div className="grid lg:grid-cols-5">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <div className="h-full space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Browse
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Top picks for you. Updated daily
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <MoviesTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
