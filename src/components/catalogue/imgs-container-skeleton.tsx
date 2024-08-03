import Skeleton from "react-loading-skeleton"

export const ImgsContainerSkeleton = () => {
  return (
    <div>
      <picture className="w-full relative">
        <Skeleton
          className="w-full object-cover rounded-lg aspect-[3.5/4]"
        />
      </picture>
      <footer className="mt-2.5 flex gap-2 items-center overflow-auto pb-1 scrollbar-hide-sm h-32">
        {
          Array(4).fill(0).map((_, i) => (
            <Skeleton
              key={i}
              className="block h-40 w-24 object-cover rounded-lg aspect-[3.5/4] cursor-pointer border transition-colors"
            />
          ))
        }
      </footer>
    </div>
  )
}