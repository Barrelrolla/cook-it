import RecipeListLoading from "@/app/components/recipes/recipeListLoading";
import SearchButton from "@/app/components/searchButton";

export default function RecipeLoding() {
  return (
    <main className="max-w-(--max-content-width) mx-auto mt-26">
      <div className="px-2">
        <SearchButton initialQuery={""} />
      </div>
      <RecipeListLoading />
    </main>
  );
}
