import {
  Card,
  CardImageContainer,
  CardSection,
  CardTitle,
  Skeleton,
} from "@barrelrolla/react-components-library";

export default function RecipeListLoading() {
  const arr = Array(8).fill(0);
  let i = 0;
  return (
    <div className="m-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {arr.map(() => {
          return (
            <li key={i++} className="justify-items-center">
              <Card
                size="xl"
                className="h-60"
                containerClassName=" shadow-sm shadow-main-content/20 w-full"
              >
                <CardImageContainer className="relative">
                  <Skeleton className="h-full w-full" />
                </CardImageContainer>
                <CardSection>
                  <CardTitle>
                    <Skeleton className="w-full h-7" />
                  </CardTitle>
                  <div className="flex justify-between text-sm">
                    <Skeleton className="w-[70%] mx-4 h-6 mb-2" />
                  </div>
                </CardSection>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
