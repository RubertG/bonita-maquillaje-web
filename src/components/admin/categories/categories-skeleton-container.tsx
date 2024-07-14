import { CategorySkeleton } from "@/components/common/category-skeleton"

export const CategoriesSkeletonContainer = ({ className }: { className?: string }) => {
  return (
    <section className={`${className} flex gap-3 items-center overflow-x-auto scrollbar-hide md:justify-center`}>
      {
        Array(4).fill(0).map((_, index) => (
          <CategorySkeleton key={index} />
        ))
      }
          <CategorySkeleton />

    </section>
  )
}