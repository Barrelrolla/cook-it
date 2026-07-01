import RecipeItem from "./recipeItem";
import image from "../../../public/hero-dark.png";

export default function RecipeList() {
  const arr = Array(10).fill({
    id: 0,
    title: "Creamy Mushroom Pasta",
    userName: "Emma",
    imageUrl: image.src,
    timeToPreapare: 30,
    difficulty: "easy",
    isLiked: false,
    rating: 4.8,
    ratingsCount: 324,
  });
  let index = 0;
  return (
    <div className="m-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {arr.map((recipe) => {
          return <RecipeItem key={index++} recipe={recipe} />;
        })}
      </ul>
    </div>
  );
}
