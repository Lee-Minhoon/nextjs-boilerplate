import { MatchFunction, match } from "path-to-regexp";
import { IconType } from "react-icons";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export enum ApiRoutes {
  Upload = "api/upload",
  Signin = "api/auth/signin",
  Signout = "api/auth/signout",
  Me = "api/auth/me",
  User = "api/users/:id?",
  ApproveUser = "api/users/:id?/approve",
  Post = "api/posts/:id?",
  LikedPost = "api/posts/liked",
}

export enum PageRoutes {
  Home = "/",
  Signin = "/auth/signin",
  Users = "/users",
  UserDetail = "/users/:id",
  Posts = "/posts",
  PostDetail = "/posts/:id",
}

export enum ViewOptionQueries {
  All = "all",
  Offset = "offset",
  CursorButton = "cursorButton",
  CursorObserver = "cursorObserver",
}

export interface Nav {
  label: string;
  pathname: string;
  query?: Record<string, string>;
  icon?: IconType;
  matcher: MatchFunction;
  children?: Nav[];
}

export const navs: Nav[] = [
  {
    label: "Users",
    pathname: PageRoutes.Users,
    query: { view: ViewOptionQueries.All, sort: "id", order: "desc" },
    icon: FaUser,
    matcher: match(PageRoutes.Users),
    children: [
      {
        label: "User Detail",
        pathname: PageRoutes.UserDetail,
        matcher: match(PageRoutes.UserDetail),
      },
    ],
  },
  {
    label: "Posts",
    pathname: PageRoutes.Posts,
    query: { view: ViewOptionQueries.All },
    icon: BsFillPostcardFill,
    matcher: match(PageRoutes.Posts),
  },
];

export const findNavInHierarchy = (
  pathname: string,
  items = navs,
  parents: Nav[] = []
): Nav[] => {
  for (const nav of items) {
    const matched = !!nav.matcher(pathname);
    if (matched) return [...parents, nav];
    if (nav.children) {
      const navs = findNavInHierarchy(pathname, nav.children, [
        ...parents,
        nav,
      ]);
      if (navs.length) return navs;
    } else {
      continue;
    }
  }
  return [];
};
