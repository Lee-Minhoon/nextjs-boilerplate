import { User, useGetUsersByCursor } from "@/apis";
import { InfiniteList } from "@/components";
import { usePagination } from "@/hooks";
import { UserListItem } from ".";

interface UsersByCursorProps {
  usesObserver?: boolean;
}

const UsersByCursor = ({ usesObserver }: UsersByCursorProps) => {
  const { limit, sort, order } = usePagination();

  return (
    <InfiniteList<User>
      infiniteQuery={useGetUsersByCursor({ limit, sort, order })}
      renderItem={UserListItem}
      usesObserver={usesObserver}
    />
  );
};

export default UsersByCursor;
