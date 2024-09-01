# Dazzi Frontend Project

## 프로젝트 설정

### 1. Node.js 및 Yarn 설치

- **Node.js**: 이 프로젝트는 Node.js 20.17.0 버전을 권장합니다. `nvm` 사용을 권장하며, `.nvmrc` 파일을 통해 자동으로 Node.js 버전을 설정할 수 있습니다.

  ```bash
  nvm use
  Yarn: 이 프로젝트는 Yarn을 사용하여 의존성을 관리합니다. Yarn이 설치되어 있지 않은 경우, 다음 명령어로 설치하세요.
  ```

```
npm install -g yarn
```

2. 프로젝트 클론 및 의존성 설치
   프로젝트를 클론하고 필요한 의존성을 설치합니다.

```
git clone git@github.com:dazziDev/dazzi-front.git
cd dazzi-front
yarn install
```

3. 환경 변수 설정
   .env.development 및 .env.production 파일을 생성하여 필요한 환경 변수를 설정하세요. 기본 템플릿으로 제공되는 env.development.sample 및 env.production.sample 파일을 참고하세요.

```
cp env.development.sample .env.development
cp env.production.sample .env.production
```

4. 개발 서버 실행
   다음 명령어로 로컬 개발 서버를 실행합니다.

```
yarn dev
```

주요 명령어

- 개발 서버 시작: yarn dev
- 프로덕션 빌드: yarn build
- 프로덕션 서버 시작: yarn start
- 코드 린팅: yarn lint --fix
- 코드 포맷팅: yarn format
