# Kakao Talk Clone Project
> 카카오톡 채팅 기능을 구현

 Socket.io를 이용하여 실시간 양방향 통신 기능을 구현해보고 싶었습니다. 그러기에 가장 적합한 것이 채팅이라고 생각하였습니다. 그래서 가장 흔하게 사용하고 있는 카카오톡 채팅 기능을 구현해보자는 생각으로 이 프로젝트를 진행하였습니다.

## 기술 스택

### 사용 언어

- TypeScript

### Client

- React
- React Router v4
- Redux
- Redux-saga
- Styled-components
- Socket.io-client
- Webpack

### Server

- Node.js - Express
- Sequelize
- Socket.io
- MySQL


## 프로젝트 사용해보기

-  http://kakaoclone.cafe24app.com/ 에서 서비스를 이용할 수 있습니다.

- 다음 ID로 로그인하여 서비스 이용이 가능합니다.

  - ID : **test01** 또는 **test02**
  - PW : **1q2w3e4r!**

- 회원가입을 통해서도 서비스 이용이 가능합니다.

- Session Storage를 사용하였기 때문에, 여러 창에서 로그인하여 서로 대화가 가능합니다. 또는 서로 다른 컴퓨터에서 접속하여 대화를 해보시기 바랍니다.

## 주요 기능

- 프로필 창에서 상태메시지, 배경사진, 프로필 사진 등을 변경할 수 있습니다. 또한, 친구의 이름을 변경할 수 있습니다.

- 사용자들이 채팅방을 만들어 1:1 대화가 가능합니다. 채팅이 온 것을 사용자가 알 수 있도록, 읽지 않은 채팅 숫자를 화면에 표시해줍니다.

- 또한, 채팅방에서 상대방이 채팅을 읽었는지 확인할 수 있도록, 채팅 옆에 읽지 않은 참가자 수만큼 숫자가 표시되도록 하였습니다.

- 무한 스크롤을 이용하여, 채팅방에서 스크롤을 위로 올리면, 이전의 채팅이 나타나도록 하였습니다.

- 채팅방에서 스크롤을 기준치 이상 올릴 경우, 페이지 맨 아래로 내리는 버튼이 나오게 됩니다. 또한, 스크롤이 위로 올라간 상태에서 상대방이 채팅을 보내면, 채팅이 왔다는 것을 알려주는 창이 나오도록 하였습니다. 

## UI/UX

### 1. 회원가입

> 간단한 입력을 통해 회원가입이 가능합니다.

<img src="https://user-images.githubusercontent.com/41350459/95066085-e2d56480-073c-11eb-8ddf-9c2ffedffb97.PNG" alt="회원가입"/>

### 2. 로그인

> 회원가입한 정보로 로그인할 수 있습니다.

<img src="https://user-images.githubusercontent.com/41350459/95066838-e61d2000-073d-11eb-8c75-e89c407dbdfd.PNG" alt="로그인"/>


### 3. 친구 메뉴

> - 해당 메뉴에서는 친구 목록 확인 및 친구 추가, 검색이 가능합니다.
> - 친구는 이름순으로 정렬되어 있습니다.
> - 친구를 더블 클릭 시 채팅방에 입장하게 됩니다.

<img src="https://user-images.githubusercontent.com/41350459/95090891-c2b79c80-0760-11eb-91fb-9617e8a48557.png" alt="친구 메뉴"/>

#### 3.1 친구 추가

> 친구 ID를 입력하여 친구를 추가할 수 있습니다. 만약 이미 친구라면 1:1 채팅 버튼이 나옵니다.

<img src="https://user-images.githubusercontent.com/41350459/95090876-bf241580-0760-11eb-81b0-dafb74bb38b3.png" alt="친구 추가"/>

#### 3.2 친구 검색

> 검색 창에 입력한 단어가 이름에 있는 친구들을 찾습니다.

<img src="https://user-images.githubusercontent.com/41350459/95090885-c1866f80-0760-11eb-8caa-eb9cebbeb373.png" alt="친구 검색"/>

### 4. 채팅 메뉴

> - 해당 메뉴에서는 채팅방 목록 확인 및 검색 등이 가능합니다.
> - 채팅방은 최근 수신한 채팅 날짜 순으로 정렬되어 있으며, 읽지 않은 채팅 수가 표시됩니다.
> - 채팅방을 더블 클릭 시 채팅방에 입장하게 됩니다.

<img src="https://user-images.githubusercontent.com/41350459/95163480-ea4f4900-07e2-11eb-8ff1-49377be284e5.png" alt="채팅 메뉴"/>

#### 4.1 새로운 채팅

> - 친구 목록에서 채팅 할 대상을 선택하여 대화할 수 있습니다.
> - 검색을 통해 대화할 친구를 찾을 수도 있습니다.

<img src="https://user-images.githubusercontent.com/41350459/95184281-1d550500-0802-11eb-8622-420b1c799a54.png" alt="새로운 채팅"/>


#### 4.2 채팅방 검색

> 검색 단어가 방 참가자 또는 방 이름에 있는 채팅방들을 나타냅니다.

<img src="https://user-images.githubusercontent.com/41350459/95185750-129b6f80-0804-11eb-9f04-847ba3cebb5b.png" alt="방 검색">

### 5. 채팅방

> - 채팅방에서 다른 사용자와 대화를 할 수 있습니다.
> - 친구가 아닐 경우, 경고창이 뜨고 원하면 친구 추가를 할 수 있습니다.
> - 스크롤이 위로 올라가 있을 때, 상대방이
메시지를 보내면 알려줍니다.

<img src="https://user-images.githubusercontent.com/41350459/95193059-28159700-080e-11eb-9d8e-54ea6ba409cf.png" alt="채팅방"/>

### 6. Profile

> 친구 메뉴, 채팅방 등에서 사진을 클릭 시 프로필 창이 등장합니다. 해당 창에서 사용자 정보를 변경할 수 있습니다.

1. **나의 프로필**
  
<img src="https://user-images.githubusercontent.com/41350459/95090872-bdf2e880-0760-11eb-8d70-40171d1b5820.png" alt="나의 프로필 창"/>

-------------

2. **친구 프로필**

> 친구의 경우, 이름 변경만 가능합니다.

<img src="https://user-images.githubusercontent.com/41350459/95090878-c0554280-0760-11eb-9fe9-ec60c33b29ab.png" alt="친구 프로필 창"/>

## 프로젝트 구현 기술

### 1. webpack

> CRA(create-react-app)를 통해 프로젝트를 진행하지 않고, Webpack을 이용하여 직접 개발환경을 설정하였습니다. 이를 통해 Customize하게 개발 환경을 구성할 수 있습니다.

```
  mode: process.env.NODE_ENV,

  entry: "./src/index.tsx",

  resolve: {
    extensions: [".ts", ".tsx", '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
          test: /\.tsx?$/,
          loader: 'ts-loader'
      }
    ]
  },

                    ......
```


### 2. Styled-Components

> **Styled-Components**를 사용하여 **CSS-in-JS**를 구현하였습니다. 이를 통해 CSS 모델을 문서 레벨이 아니라 컴포넌트 레벨로 추상화하여, 스타일 시트를 더 이상 유지 보수할 필요가 없도록 하였습니다.

글로벌적으로 설정해야 하는 스타일(ex) body, div, input 등)이나, 재사용할 수 있는 스타일은 **styles** 폴더에 따로 분리하였습니다. 그 후 다른 컴포넌트에서 import하여 사용하였습니다.

```
const GlobalStyle = createGlobalStyle`
     * {
       box-sizing: border-box;
     }
     body {
      width: 100%;
      height: 100%;
    }
     body, div, ul, li, dl, dd, dt, ol, h1, h2, h3, h4, h5, h6, input, fieldset, legend, p, select, table, th, td, tr, textarea, button, form, figure, figcaption {
      padding: 0;
      margin: 0;
    }
                      ......
```

### 3. 스크롤 페이징

> 채팅방에 스크롤 페이징 기술을 접목하였습니다. 이를 통해 처음부터 모든 채팅 내용을 서버에서 가져오는 것이 아니라, 사용자가 원할 때만 이전 채팅 내용을 가져오기 때문에 리소스 낭비를 막을 수 있습니다.

<img src="https://user-images.githubusercontent.com/41350459/95644681-39eb8880-0af3-11eb-9aa6-e850fb33d526.gif" alt="스크롤 페이징"/>

### 4. Sequelize

> ERD & API는 다음 사이트에 정리히였습니다.
> - **ERD Cloud : https://www.erdcloud.com/d/dqzfcGwjsQFq8BiG7**
> - **Gitbook: https://app.gitbook.com/@eastshine94/s/kakaoclone/chat**

