# Front-End **Code Convention**

## 1. 파일

### 1-1. 파일의 EOL을 LF로 적용

### 1-2. 컴포넌트로 분리된 파일은 PascalCase, 확장자는 tsx 적용

```
Main.tsx
Article.tsx
```

### 1-2. 컴포넌트 명의 경우 기능명 + CRUD형태로 작성

```
ArticleEdit.jsx
ArticleDetail.jsx
ArticleList.jsx
```

### 1-3. 컴포넌트가 아닌 파일은 파일명은 camelCase, 확장자는 ts 적용
```
constants.ts
utils.ts
```

## 2. 변수

### 2-1. 변수명은 camelCase를 적용

```ts
const isFocused = false;
```

### 2-2. 변수에 할당되는 값이 Boolean인 경우에는 is, can, exist, has등을 접두사로 붙임

```ts
const isLoading = false;
```

### 2-3. 상수는 대문자로 작성

```ts
const BASE_URL = 'https://naver.com'
```

## 3. 함수명
- 함수명은 기본적으로 camelCase로 작성

### 3-1. 이벤트 함수명

- on+{eventname}
```ts
<Pressable onPress={onPressSubmit}>제출</button>
```

## 4. 컴포넌트
```ts
import React from 'react';

interface ComponentProps {}

const Component = ({}:ComponentProps) => {};

export default Component;
```
1. 컴포넌트는 **함수형 컴포넌트** 사용
2. 컴포넌트 선언시 **화살표 함수** 를 사용


## 5. CSS
- 별도의 CSS 파일로 작성하지 않고, **StyleSheet**를 사용하여 **컴포넌트 파일 내**에 작성

