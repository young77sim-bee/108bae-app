# 108배 절 카운터 (108 Bows Counter)

15초(조절 가능) 간격으로 종소리와 함께 1~108을 음성으로 세어주는 절 수행 보조 앱입니다.
숫자는 영어 음성, 기도 문구는 한국어 음성으로 안내하며, 배경음악·화면 꺼짐 방지·카운트다운·일시정지/이어하기를 지원합니다.

## 📥 다운로드 (안드로이드)

**[➡️ 최신 앱 받기 (108bae-counter.apk, 약 40MB)](https://github.com/young77sim-bee/108bae-app/raw/main/dist/108bae-counter.apk)**

1. 위 링크를 휴대폰에서 눌러 APK를 내려받습니다.
2. 다운로드 알림(또는 파일앱)에서 받은 파일을 탭 → 설치.
3. 처음 한 번만 "출처를 알 수 없는 앱 설치 허용"을 켜주면 됩니다.
4. 이미 설치돼 있다면 **덮어쓰기 업데이트**로 깔리며 기존 기록·설정·녹음 목소리가 그대로 유지됩니다.

> 같은 서명의 빌드라 재설치가 아닌 업데이트로 설치됩니다.

## 주요 기능
- 1~108 자동 카운팅 (간격 1~120초 조절)
- 종소리 + 숫자(영어)·기도 문구(한국어, 반복 횟수 설정) 음성 안내
- **내장 배경음악**: 명상음악 + 반야심경 (인터넷 없이 재생, 시작~종료까지 반복 / 완료·일시정지에도 끊기지 않음)
- **기도 문구 최근 12개 저장** → 입력칸 드롭다운에서 바로 선택
- 진행률 바 / 경과·남은 시간 표시
- 화면 자동 꺼짐 방지 (Wake Lock)
- Capacitor TextToSpeech 로 네이티브 음성 사용 (WebView 브라우저 TTS 불안정 대비)

## 기술 스택
- 순수 HTML/CSS/JS — `www/index.html`
- [Capacitor](https://capacitorjs.com/) 6 + Android
- `@capacitor-community/text-to-speech`

## 빌드 방법

    npm install
    npx cap sync                    # 웹 자산 + 플러그인 동기화 (android/ 폴더는 저장소에 포함됨)
    cd android
    ./gradlew assembleDebug         # Windows: gradlew.bat assembleDebug

빌드 결과물: `android/app/build/outputs/apk/debug/app-debug.apk`

> 배포본은 `dist/108bae-counter.apk` 가 기준입니다. 용량 문제로 배경음악 mp3 원본은 저장소에 포함하지 않으므로,
> 직접 빌드 시 배경음악을 넣으려면 `www/bgm/med1.mp3`(명상음악)·`www/bgm/banya.mp3`(반야심경)을 추가한 뒤 빌드하세요.

아이콘/스플래시를 바꾸려면 `assets/`의 PNG를 수정하거나 `node make_icons.js`(sharp 필요)로 재생성한 뒤
`npx @capacitor/assets generate` 를 실행합니다.

> 처음 빌드 시 Android SDK Platform 34 / Build-Tools 34.0.0 이 필요하며,
> `sdkmanager --licenses` 로 라이선스 동의가 되어 있어야 합니다.

## 라이선스
개인 프로젝트.
