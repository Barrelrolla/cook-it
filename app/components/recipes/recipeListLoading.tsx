import { Card } from "@barrelrolla/react-components-library";

export default function RecipeListLoading() {
  const arr = Array(8).fill(0);
  let i = 0;
  return (
    <div className="m-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {arr.map(() => {
          return (
            <li key={i++}>
              <Card
                containerClasses="border-main-content/30 shadow-sm min-w-70"
                className="h-60 bg-main-content/60"
              ></Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
