<h1 align="center">NextJS Boilerplate</h1>

프론트엔드를 위한 Next.js boilerplate입니다.

많은 코드가 [Charka UI](https://npmjs.com/package/@chakra-ui/react)와 [React Query](https://npmjs.com/package/@tanstack/react-query)가 결합한 형태입니다.

마음대로 클론을 하셔도 되고, 필요한 부분만 복사해 가셔도 됩니다.

## Demo

데모사이트의 데이터는 임의로 삭제될 수 있습니다. [link](https://nextjs-boilerplate-dusky-phi.vercel.app/)

## Getting Started

의존성 설치 후

```bash
yarn
```

Next.js 서버를 시작합니다.

```bash
yarn dev
```

## Main Features

- [Global Modal Provider](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/providers/ModalProvider/ModalProvider.tsx) (Zustand)
- [Optimistic Update](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/apis/hooks.ts) (React Query, refer to [github](https://github.com/horprogs/react-query))
- [WYSIWYG Editor](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/common/Editor/Editor.tsx) (Quill)
- Forms (React Hook Form)
- [Table](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/common/DataTable/DataTable.tsx) (React Table)
- [Infinite List](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/common/InfiniteList/InfiniteList.tsx) (React Query)
- [Virtual List](https://github.com/Lee-Minhoon/nextjs-boilerplate/blob/main/src/components/common/VirtualList/VirtualListBase.tsx) (React Virtual)
- Translation (React I18next)

## 라이브러리

### Core

- [Next.js](https://www.npmjs.com/package/next)

### UI

- [Charka UI](https://npmjs.com/package/@chakra-ui/react)
- [React Table](https://npmjs.com/package/@tanstack/react-table)
- [Quill](https://www.npmjs.com/package/quill)
- [React Icons](https://npmjs.com/package/react-icons)

### Data

- [Zustand](https://npmjs.com/package/zustand)
- [React Query](https://npmjs.com/package/@tanstack/react-query)
- [React Hook Form](https://npmjs.com/package/react-hook-form)

### Utilities

- [React Virtual](https://npmjs.com/package/@tanstack/react-virtual)
- [React I18next](https://www.npmjs.com/package/react-i18next)

### Code

- [TypeScript](https://www.npmjs.com/package/typescript)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Prettier](https://www.npmjs.com/package/prettier)

## Attention

- 이 프로젝트는 풀 스택 개발을 위해 개발되지 않았습니다. 프론트엔드 개발에만 초점이 맞춰져 있습니다.

- 서버 사이드 렌더링은 사용되지 않았습니다. 모든 것이 클라이언트 사이드 렌더링으로만 작동합니다. 라우터만 변경한다면 리액트와 쉽게 통합이 가능합니다.

- 서버 사이드에 작성된 코드들은 오로지 예시를 위해 개발되었으므로, 사용하지 않는다면 삭제해 주셔야 합니다. 서버 사이드 코드를 삭제할 시 아래 라이브러리들을 추가로 제거해 주셔야 합니다.

  - formidable (폼 파싱을 위해 사용)
  - aws-sdk (파일 업로드를 위해 사용)
