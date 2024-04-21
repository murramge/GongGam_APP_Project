# Project Setup

> [공식 문서](https://reactnative.dev/docs/environment-setup?os=macos&platform=android)

## 01. Environment‐Setup

<details>
<summary>Mac</summary>

### 공통
- Node.js 설치
  - `brew install node`
- watchman 설치
  - `brew install watchman`

### Android
- OpenJDK 설치
  - `brew tap homebrew/cask-versions && brew install --cask zulu17`
- JAVA_HOME 환경변수 설정

```
echo 'export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home' >> ~/.zshrc
source ~/.zshrc
```

### iOS
- CocoaPods 설치
  - `sudo gem install cocoapods`
 
---

</details>
<details>
<summary>Windwos</summary>

### 공통
- Chocolaty 설치
  - 관리자 권한으로 Powershell을 실행하고 다음의 커맨드 실행하여 설치
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

- Node.js 설치
  - `choco install node`
- watchman 설치
  - `choco install watchman`

### Android
- OpenJDK 설치
  - `choco install -y nodejs-lts microsoft-openjdk17`
- JAVA_HOME 환경변수 설정
  - `Chocolaty`로 설치한 경우 자동 설정

</details>

## 02. Simulator-Setup

### Android

[안드로이드 스튜디오](https://developer.android.com/studio) 설치
- SDK 설치
  - 설치과정에서 다음의 Item 반드시 모두 체크
    - `Android SDK`
    - `Android SDK Platform`
    - `Android Virtual Device`
    - `Performance (Intel ® HAXM)`
  - More Actions → SDK Manager
  - **Android 14 (UpsideDownCake)** 설치
    - _Show Package Details를 클릭해 세부 정보를 표시해 모두 설치_
  - SDK Tools 탭
    - Android SDK Build-Tools에서 **v34.0.0** 설치
- emulator 생성
  - More Actions → Virtual Device Manager
  - Create Device를 눌러 새 애뮬레이터를 생성
  - System Image : UpsideDownCake 34
  - Device: 원하는 디바이스 선택
    - Device 스토리지 용량을 2048mb 이상으로 설정
- 환경변수 설정
<details>
<summary>Mac</summary>

- ANDROID_HOME 환경 변수 설정

```
vi ~/.zshrc
```

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

```
source ~/.zshrc
```

</details>
<details>
<summary>Windwos</summary>

- ANDROID_HOME 환경 변수 설정
  - 환경변수에 다음과 같이 추가
    - 이름 : `ANDROID_HOME`
    - 값 : `C:\Users\사용자명\AppData\Local\Android\Sdk`
- Path에 platform-tools 추가
  - Path 변수에 다음과 같은 값 추가
  - `C:\Users\사용자명\AppData\Local\Android\Sdk\platform-tools`

</details>


### iOS

[Xcode](https://developer.apple.com/xcode) 설치

- 설치 후 Xcode의 경로를 지정하도록 커맨드 입력
  - `xcode-select --switch /Applications/Xcode.app`
- Xcode → Preferences → Locations → **Command Line Tools**가 선택되어 있는지 확인

## 03. Project-Setup

### 공통
- env 파일 세팅
  - .env, .env.development, .env.production 파일 다운로드 
  - .env, .env.development, .env.production 파일을 프로젝트 루트 폴더에 위치시킴
- git clone 후 npm install 실행
