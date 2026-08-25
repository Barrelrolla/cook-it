import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import { Skeleton } from "@barrelrolla/react-components-library";

export default function UserLoading() {
  return (
    <main className="pt-4">
      <section className="flex m-4 mt-0 flex-col md:flex-row bg-muted rounded-containers border border-main-content/(--border-transparency)">
        <div className="w-1/3 p-4 lg:p-8 mx-auto justify-items-center">
          <Skeleton className="size-50 rounded-full" />
        </div>
        <div className=" w-full md:w-2/3 text-center md:text-left flex flex-col items-center md:items-start justify-center">
          <Skeleton className="h-10 w-50" />
          <Skeleton className="h-6 w-34 my-4" />
        </div>
      </section>
      <section>
        <Skeleton className="h-12 w-54 mx-4" />
        <RecipeListLoading />
      </section>
    </main>
  );
}
