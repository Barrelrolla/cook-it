import { Card, Hero, HeroSection, Skeleton } from "barrelrolla-ui";

export default function RecipeLoading() {
  return (
    <>
      <Hero
        textAlign="left"
        className="h-fit md:h-150 overflow-y-hidden relative max-w-[2560px] justify-center"
      >
        <div className="absolute h-[50vh] md:h-full w-full md:w-[60%] justify-self-end inset-0 md:mask-l-from-60% mask-b-from-40% md:mask-b-from-100%">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="mt-[30vh] md:mt-0 flex justify-end h-full w-full md:w-(--max-content-width) relative">
          <HeroSection className="justify-end">
            <div className="max-w-full flex flex-col gap-4 md:gap-8 p-4 items-center md:items-start">
              <div className="w-full md:max-w-[50%] flex flex-col gap-2">
                <Skeleton className="h-6.5 w-18 rounded-full" />
                <Skeleton className="h-22 md:h-28 w-150 max-w-full" />
                <Skeleton className="h-4 w-120 max-w-[80%]" />
                <Skeleton className="h-4 w-120 max-w-[80%]" />
              </div>
              <div className="flex items-center justify-center gap-4 w-fit">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-45 max-w-[50%]" />
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                <Skeleton className="h-6.5 w-18 rounded-full" />
                <Skeleton className="h-6.5 w-18 rounded-full" />
              </div>
              <Skeleton className="h-34.5 md:h-16.5 w-173.5 max-w-full" />
            </div>
          </HeroSection>
        </div>
      </Hero>
      <div className="p-4 max-md:pt-0 max-w-(--max-content-width) mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <Card
            containerClassName="max-w-full w-full p-4 h-fit"
            className="flex flex-col gap-4"
          >
            <Skeleton className="h-5 w-30" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
          </Card>
          <Card
            containerClassName="max-w-full w-full p-4 h-fit md:col-span-2"
            className="flex flex-col gap-4"
          >
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-12 w-[80%]" />
            <Skeleton className="h-12 w-[80%]" />
            <Skeleton className="h-12 w-[80%]" />
            <Skeleton className="h-12 w-[80%]" />
            <Skeleton className="h-12 w-[80%]" />
            <Skeleton className="h-12 w-[80%]" />
          </Card>
        </div>
      </div>
    </>
  );
}
