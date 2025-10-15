import GoodItemSkeleton from "./gooditemskeleton";

interface GoodItemListSkeletonProps {
  count: number;
}

const GoodItemListSkeleton = ({ count }: GoodItemListSkeletonProps) => {
  return new Array(count)
    .fill(0)
    .map((_, index) => <GoodItemSkeleton key={index} />);
};

export default GoodItemListSkeleton;
