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
                className="h-64"
                containerClassName=" shadow-sm shadow-main-content/20 w-full"
              >
                <CardImageContainer className="relative">
                  <Skeleton className="h-full w-full" />
                </CardImageContainer>
                <CardSection>
                  <CardTitle>
                    <Skeleton className="w-full h-6" />
                  </CardTitle>
                  <div className="flex gap-1 px-4">
                    <Skeleton className="rounded-full h-6 w-24" />
                    <Skeleton className="rounded-full h-6 w-24" />
                  </div>
                  <Skeleton className="w-[40%] mx-4 h-4 my-2" />
                </CardSection>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
