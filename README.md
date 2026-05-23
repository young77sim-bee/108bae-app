# 108배 절 카운터 (108 Bows Counter)

15초(조절 가능) 간격으로 종소리와 함께 1~108을 음성으로 세어주는 절 수행 보조 앱입니다.
숫자는 영어 음성, 기도 문구는 한국어 음성으로 안내하며, 화면 꺼짐 방지·카운트다운·일시정지/이어하기를 지원합니다.

## 주요 기능
- 1~108 자동 카운팅 (간격 1~120초 조절)
- Web Audio 합성 종소리 (음 높이·음량 조절, 외부 음원 파일 없음)
- 음성 안내: 숫자(영어) + 기도 문구(한국어, 반복 횟수 설정)
- 진행률 바 / 경과·남은 시간 표시
- 화면 자동 꺼짐 방지 (Wake Lock)
- Capacitor TextToSpeech 로 네이티브 음성 사용 (WebView 브라우저 TTS 불안정 대비)

## 기술 스택
- 순수 HTML/CSS/JS — `www/index.html`
- [Capacitor](https://capacitorjs.com/) 6 + Android
- `@capacitor-community/text-to-speech`

## 빌드 방법

    npm install
    node make_icons.js              # 아이콘/스플래시 PNG 생성 (sharp 필요)
    npx cap add android             # 네이티브 프로젝트 생성
    npx cap sync
    cd android
    ./gradlew assembleDebug         # Windows: gradlew.bat assembleDebug

빌드 결과물: `android/app/build/outputs/apk/debug/app-debug.apk`

> 처음 빌드 시 Android SDK Platform 34 / Build-Tools 34.0.0 이 필요하며,
> `sdkmanager --licenses` 로 라이선스 동의가 되어 있어야 합니다.

## 라이선스
개인 프로젝트.
