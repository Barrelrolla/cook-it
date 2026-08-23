import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import { Skeleton } from "@barrelrolla/react-components-library";

export default function UserLoading() {
  return (
    <main className="pt-4">
      <section className="flex m-4 mt-0 flex-col md:flex-row bg-muted rounded-containers border border-main-content/(--border-transparency)">
        <div className="w-1/3 p-4 lg:p-8 mx-auto justify-items-center">
          <Skeleton className="size-50 rounded-full" />
        </div>
        <div className="w-full md:w-2/3 md:pt-8 text-center md:text-left">
          <Skeleton className="h-9 w-50" />
          <Skeleton className="h-6 w-34 mt-4" />
        </div>
      </section>
      <section>
        <Skeleton className="h-8 w-20 mx-4" />
        <RecipeListLoading />
      </section>
    </main>
  );
}
