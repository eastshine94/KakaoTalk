# Kakao Talk Clone Project
> 카카오톡 채팅 기능을 구현

 Socket.io를 이용하여 실시간 양방향 통신 기능을 구현해보고 싶었습니다. 그러기에 가장 적합한 것이 채팅이라고 생각하였습니다. 그래서 가장 흔하게 사용하고 있는 카카오톡 채팅 기능을 구현해보자는 생각으로 이 프로젝트를 진행하였습니다.

## 기술 스택

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

## 사용 방법

### 1. 회원가입

> 간단한 입력을 통해 회원가입이 가능합니다.

<img src="https://user-images.githubusercontent.com/41350459/95066085-e2d56480-073c-11eb-8ddf-9c2ffedffb97.PNG" alt="회원가입"/>

### 2. 로그인

> 회원가입한 정보로 로그인할 수 있습니다.

<img src="https://user-images.githubusercontent.com/41350459/95066838-e61d2000-073d-11eb-8c75-e89c407dbdfd.PNG" alt="로그인"/>


### 3. 친구 메뉴

> 해당 메뉴에서는 친구 목록 확인 및 친구 추가, 검색이 가능합니다.
> 
<img src="https://user-images.githubusercontent.com/41350459/95071711-10bea700-0745-11eb-9645-e631faa4923b.png" alt="친구 메뉴"/>

#### 3.1 친구 추가

> 친구 ID를 입력하여 친구를 추가할 수 있습니다. 만약 이미 친구라면 1:1 채팅 버튼이 나옵니다.

<img src="https://user-images.githubusercontent.com/41350459/95072744-a575d480-0746-11eb-86d4-06625ca08e49.png" alt="친구 추가"/>

#### 3.2 친구 검색

> 검색 창에 입력한 단어가 이름에 있는 친구들을 찾습니다.

<img src="https://user-images.githubusercontent.com/41350459/95088937-84b97900-075e-11eb-8697-b0363874c672.png" alt="친구 검색"/>

### 5. Profile

> 친구 메뉴, 채팅방 등에서 사진을 클릭 시 프로필 창이 등장합니다. 해당 창에서 사용자 정보를 변경할 수 있습니다.

1. 나의 프로필
  
<img src="https://user-images.githubusercontent.com/41350459/95067605-0c8f8b00-073f-11eb-8e23-d5cd846e8b57.png" alt="나의 프로필 창"/>   

-------------

2. 친구 프로필

> 친구의 경우, 이름 변경만 가능합니다.

<img src="https://user-images.githubusercontent.com/41350459/95068016-a2c3b100-073f-11eb-8bbf-3d01653bab6e.png" alt="친구 프로필 창"/>   