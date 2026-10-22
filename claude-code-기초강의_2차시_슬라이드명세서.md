# 클로드코드 기초 강의 (2차시) — HTML 슬라이드 명세서

> 이 문서는 Claude Code에게 HTML 슬라이드를 만들게 하기 위한 명세서입니다.
> 아래 내용을 그대로 읽고 `lesson2.html`로 슬라이드를 생성하세요 (공통 `slides.css`, `slides.js` 사용).
> 디자인·조작 방식은 1차시 `index.html`과 **완전히 같게** 맞춥니다.

---

## 0. 기본 정보

- **강의명**: 선생님을 위한 클로드코드 기초 — 2차시 "내 웹페이지를 인터넷에"
- **대상**: 초등 교사 (1차시 수강 완료. 클로드코드 설치·실행은 할 줄 앎)
- **시간**: 120분 (본 수업) + 심화 20~30분 (시간이 남을 때만)
- **날짜**: 2026년 10월 23일
- **환경**: Windows 11 + VS Code + PowerShell (Mac은 비고로만 언급)
- **실습 페이지**: 강사가 제공하는 **"오늘의 한 줄" 방명록** (순수 HTML/CSS/JS, 빌드 없음). 상세는 부록 A
- **오늘의 도착점**:
  1. 제공 페이지를 내 스타일로 고친 상태
  2. 그 코드가 내 GitHub **비공개 저장소**에 올라가 있음
  3. `○○.vercel.app` 주소로 휴대폰에서 열림
  4. 글을 쓰면 Supabase DB에 저장되어 **다른 사람 화면에도** 보임
- **1차시와 달라진 점**: 1차시 명세서에는 "React/Vite"로 적혀 있었으나, 설치 부담을 줄이려고 **빌드 없는 순수 HTML**로 변경함. 1차시 설계서는 오늘 배운 과정을 적용하는 **과제**로 연결

### 역할 비유 (수업 전체에서 반복 사용)

| 서비스 | 비유 | 하는 일 |
|---|---|---|
| GitHub | **보관소** | 내 파일과 수정 기록을 보관 |
| Vercel | **가게** | 보관소의 파일을 인터넷 주소로 진열 |
| Supabase | **공책** | 방문자가 쓴 글을 모아 두는 곳 |

---

## 1. 기술 요구사항

- 1차시와 **공통 파일**을 씀: 디자인은 `slides.css`, 조작(키보드·복사 버튼·발표자 노트·진행 바·목록·차시 전환)은 `slides.js`. 새로 디자인하지 말 것.
- 파일: `lesson2.html` (`<html data-lesson="2">`, 슬라이드 본문만 담음).
- 차시 전환 버튼은 `slides.js` 맨 위 `LESSONS` 목록에서 만들어짐. 3차시가 생기면 그 목록에 한 줄 추가.
- **실습 페이지 배포 파일**: 원본은 `lesson2-files/guestbook/`에 두고, 그 폴더 안의 내용을 압축한 `downloads/guestbook.zip`을 #9 슬라이드의 다운로드 버튼이 가리킴. ZIP은 원본을 고칠 때마다 다시 만들 것.
- **슬라이드 공개**: 수강생이 자기 컴퓨터에서 버튼을 누를 수 있도록 이 저장소를 GitHub Pages로 공개 (`liebe842.github.io/claudecode-ppt/lesson2.html`). 주소는 #1 표지와 #9에 **글자로** 표시.
- **이미지·QR 없이 텍스트만**으로 구성. 화면 안내는 메뉴 이름과 단계 목록으로 대신함.
- 슬라이드 타입은 1차시와 동일: `.title`, `.section`, `.bullets`, `.command`, `.table`, `.twocol`, `.checkpoint`, `.trouble`.
- **새 타입 `.optional`(심화)**: 심화 슬라이드는 모두 이 클래스를 함께 붙임.
  - 우측 상단에 `심화 · 시간이 있으면` 배지 표시
  - 배경을 본 수업과 살짝 다르게(예: 옅은 회청색) 해서 "선택 내용"임이 보이게
  - `data-part="심화"`로 묶어 슬라이드 목록에서 따로 모이게
- 마무리(#45 끝) 슬라이드 **뒤에** 심화 슬라이드를 배치. 시간이 없으면 #45에서 끝내면 됨.
- 발표자 노트: 각 슬라이드 `data-notes`.
- 본문 최소 36px, 제목 56px 이상, 명령어 박스 최소 32px, 불릿 5개 이하.

---

## 2. 전체 흐름과 시간 배분

| 부 | 제목 | 시간 | 슬라이드 |
|---|---|---|---|
| 1 | 오리엔테이션 + 준비 확인 | 10분 | 1–6 |
| 2 | 실습 페이지 받고 고치기 | 20분 | 7–13 |
| 3 | GitHub에 올리기 | 25분 | 14–23 |
| 4 | Vercel로 인터넷에 열기 | 15분 | 24–29 |
| 5 | 고치고 푸시 → 자동 반영 | 10분 | 30–32 |
| — | 쉬는 시간 (Supabase 프로젝트 생성 걸어 두기) | 5분 | 33 |
| 6 | Supabase로 글 저장하기 | 30분 | 34–42 |
| 7 | 마무리 | 5분 | 43–45 |
| 심화 A | Vercel CLI | 10분 | 46–49 |
| 심화 B | Supabase MCP | 15분 | 50–55 |

본 수업 45장 + 심화 10장 = 총 55장.

---

## 3. 슬라이드별 내용

### 1부. 오리엔테이션 + 준비 확인 (10분)

**#1 [title] 표지**
- 상단: 클로드코드 기초 · 2차시
- 제목: 선생님을 위한 클로드코드 기초
- 부제: 2차시 — 내 웹페이지를 인터넷에
- 하단: 유경윤 / 2026년 10월 23일 / DeepVibe
- 우측 터미널 장식(1차시 표지와 같은 스타일):
  - `PS C:\…\Desktop\guestbook> claude`
  - `> 이 페이지를 인터넷에 올려줘`
  - `● 좋아요. 먼저 GitHub에 올려 볼게요.`
- notes: 지난주 복습 1분. "오늘은 만든 걸 남에게 보여주는 날".

**#2 [bullets] 오늘 끝나면 이렇게 됩니다**
- 내 웹페이지 주소를 **카톡으로 보낼 수 있다**
- 휴대폰으로 열린다
- 누가 글을 쓰면 **모두의 화면에** 보인다
- 고치고 싶으면 Claude에게 말하고 → 푸시 → 1분 뒤 반영
- notes: 강사의 완성본 주소를 화면에 띄워 수강생이 직접 글을 써 보게 하기. 오늘의 도착점을 먼저 체험시키는 장.

**#3 [table] 오늘 등장하는 세 친구**
| 서비스 | 비유 | 하는 일 |
|---|---|---|
| GitHub | 보관소 | 내 파일과 수정 기록 보관 |
| Vercel | 가게 | 파일을 인터넷 주소로 진열 |
| Supabase | 공책 | 방문자가 쓴 글을 모아 둠 |
- 아래 한 줄: 내 컴퓨터 → **보관소** → **가게** → 손님이 쓴 글은 **공책**에
- notes: 이 비유를 수업 내내 반복. "지금은 보관소 단계예요" 식으로.

**#4 [table] 오늘 시간표**
- 위 시간 배분 표 축약(본 수업만). 맨 아래 작은 글씨: "시간이 남으면 심화: Claude에게 전부 맡기기"

**#5 [checkpoint] 준비 확인 ① 계정 3개**
- ☐ github.com 로그인 됨
- ☐ vercel.com 로그인 됨 (**Continue with GitHub**로 가입)
- ☐ supabase.com 로그인 됨 (**Continue with GitHub**로 가입)
- 안 된 분: 지금 가입. Vercel·Supabase는 GitHub 버튼 하나로 끝
- notes: 사전 과제로 안내했던 부분. 가입이 안 된 분은 보조강사가 지원. Vercel 가입 시 "Hobby" 선택.

**#6 [command] 준비 확인 ② 도구 확인**
```
git --version
gh --version
claude --version
```
- 세 줄 모두 버전 숫자가 나오면 통과
- `gh`를 찾을 수 없음 → 다음 장에서 설치
- notes: 사전 안내 메일로 gh 설치를 부탁했더라도 절반은 안 되어 있다고 가정.

---

### 2부. 실습 페이지 받고 고치기 (20분)

**#7 [section] 2부. 실습 페이지 받기**
- 부제: "오늘은 연습용 페이지로 한 바퀴. 내 설계서는 과제로"

**#8 [command] GitHub CLI 설치 (아직 없는 분만)**
```
winget install --id GitHub.cli
```
1. **"원본 계약 조건에 동의하십니까?"** → `Y` `Enter` (winget 처음 쓸 때 한 번만)
2. **관리자 허용 창**이 뜨면 → **예** (안 보이면 작업 표시줄 확인)
3. `설치 성공`이 나오면 **VS Code 완전히 껐다 켜기** (안 그러면 `gh`를 못 찾음)
4. 다시 `gh --version` → 버전 숫자가 나오면 OK
- 작은 글씨: Mac은 `brew install gh` (brew가 없으면 cli.github.com에서 설치 파일)
- notes: GitHub CLI(gh) = 터미널에서 GitHub를 다루는 도구. Claude가 저장소를 만들고 올릴 때 씀. winget이 없다는 오류가 나면 cli.github.com에서 Windows 설치 파일(.msi)을 받아 전부 Next. 관리자 허용 창이 작업 표시줄 뒤에 숨어 깜빡이는 경우가 많음.

**#9 [command] 실습 페이지 내려받기**
- 슬라이드 가운데에 큰 **[⬇ guestbook.zip 내려받기]** 버튼 (`<a href="downloads/guestbook.zip" download>`)
- 아래 안내 칸: 강사 화면만 보고 있다면 → 내 브라우저에서 `liebe842.github.io/claudecode-ppt/lesson2.html#9`
- 내려받은 `guestbook.zip` → 바탕화면으로 옮기기 → 오른쪽 클릭 **모두 압축 풀기** → `guestbook` 폴더 생성
- 폴더 안에 `index.html`, `style.css`, `app.js`, `config.js` 4개가 보이면 OK (`.gitignore`도 있음, 건드리지 않기)
- notes: ZIP 안에는 파일이 **바로** 들어 있어서(폴더 없이) "모두 압축 풀기"만 하면 `guestbook\파일들` 구조가 됨. 압축을 안 풀고 ZIP 안에서 바로 열면 수정이 저장되지 않으니 꼭 풀기.

**#10 [command] 폴더 열고 Claude 켜기**
- VS Code → `파일 > 폴더 열기` → `guestbook` → 신뢰 클릭
- 터미널(`` Ctrl + ` ``)에서:
```
claude
```
- 지난주와 다른 폴더라 **폴더 신뢰 질문**이 다시 나옴 → Yes

**#11 [checkpoint] 먼저 구경하기**
- 탐색기에서 `index.html`을 **더블클릭**해 브라우저로 열기
- 글을 하나 써 보기 → 목록에 나오는지 확인
- 새로고침해도 남아 있음. 그런데 **옆 사람 화면에는 안 보임** → 왜일까? (6부에서 해결)
- Claude에게:
```
이 폴더의 파일들이 각각 무슨 일을 하는지 초등 교사가 알기 쉽게 설명해줘
```
- notes: 지금은 브라우저 저장소(localStorage)에 저장되는 상태. "내 컴퓨터 서랍에만 넣어 둔 것"이라고 설명. 이 궁금증이 6부의 동기.

**#12 [command] 내 스타일로 고치기**
- 하나 골라서 Claude에게 요청 (문장은 내 것으로):
```
페이지 제목을 "4학년 2반 오늘의 한 줄"로 바꾸고, 전체 색을 따뜻한 파스텔 톤으로 바꿔줘
```
- 다른 예: "글마다 이모지 기분 버튼을 추가해줘" / "글자 크기를 크게 해줘"
- 바뀌면 브라우저에서 **새로고침(F5)** 해서 확인
- notes: 1차시의 요청문 3원칙(목적·대상·제약) 복습. frontend-design 스킬이 자동 적용되는 걸 체감하는 순간.

**#13 [bullets] 고칠 때 약속 3가지**
- 한 번에 **하나씩** 고치기
- 고치면 **바로 브라우저로 확인**
- 망가지면: "방금 바꾼 거 되돌려줘"
- 이 약속은 다음 부의 "저장 기록(커밋)"과 연결됨

---

### 3부. GitHub에 올리기 (25분)

**#14 [section] 3부. 보관소에 올리기**
- 부제: "GitHub = 내 파일 보관소"

**#15 [twocol] 커밋과 푸시**
- 왼쪽 "커밋(commit)": **내 컴퓨터 안에** 저장 기록을 남김. 게임의 세이브 포인트
- 오른쪽 "푸시(push)": 그 기록을 **GitHub 보관소로** 보냄
- 한 줄 요약: **커밋 = 저장, 푸시 = 업로드**
- notes: 단어가 낯설 뿐 개념은 쉽다는 분위기. 오늘 외울 단어는 이 두 개.

**#16 [command] ① 내 이름표 달기 (처음 한 번만)**
```
git config --global user.name "홍길동"
git config --global user.email "GitHub가입이메일@example.com"
git config --global init.defaultBranch main
```
- 따옴표 안을 **내 이름, GitHub 가입 이메일**로 바꿔서 입력
- 이걸 안 하면 첫 커밋에서 오류가 남
- notes: Claude 대화창이 아니라 터미널에서 입력. Claude 안에 있다면 `!`를 앞에 붙여 실행하거나 터미널을 하나 더 열기. 또는 Claude에게 "내 git 이름을 홍길동, 이메일을 ○○로 설정해줘"라고 시켜도 됨.

**#17 [command] ② GitHub 로그인 — 질문 4개**
```
gh auth login
```
- 터미널 라벨: "Claude 대화창 말고 일반 터미널에서"
- 질문과 고를 답 (표):

| 질문 | 고를 답 |
|---|---|
| `Where do you use GitHub?` | **GitHub.com** |
| `preferred protocol for Git operations?` | **HTTPS** |
| `Authenticate Git with your GitHub credentials?` | **Y** |
| `How would you like to authenticate?` | **Login with a web browser** |
- 작은 글씨: 고르는 법 `↑` `↓` 로 움직이고 `Enter`
- notes: 오늘 가장 많이 막히는 장. 대화형 명령이라 반드시 일반 터미널에서 실행(Claude를 켜 둔 분은 터미널 오른쪽 `+` 버튼으로 새 터미널). 질문 순서는 gh 버전에 따라 조금 다를 수 있음 — 수업 전 강사가 한 번 실행해 확인.

**#18 [command] ③ 브라우저에서 코드 넣기**
1. 터미널에 나온 **8자리 코드** 확인 (`First copy your one-time code: ABCD-1234`)
2. `Enter` → 브라우저가 열림 (GitHub 로그인)
3. 코드 입력 → **Continue**
4. **Authorize github** 클릭
5. 터미널에 `✓ Logged in as ○○`
- 아래 안내 칸: 브라우저가 안 열리면 → `github.com/login/device` 를 직접 열고 코드 입력
- notes: VS Code 터미널에서 코드를 드래그하면 오른쪽 클릭 또는 Ctrl+C로 복사됨. 직접 보고 타이핑해도 됨(대소문자 구분 없음). 브라우저가 안 열리면 github.com/login/device 를 직접 열기.

**#19 [command] 로그인 확인**
```
gh auth status
```
- `Logged in to github.com account ○○` 가 나오면 성공

**#20 [checkpoint] ④ Claude에게 올려 달라고 하기**
```
이 폴더를 git으로 관리하고, 첫 커밋을 만든 다음, 내 GitHub에 guestbook이라는 비공개 저장소를 만들어서 푸시해줘
```
- Claude가 명령을 실행하려 할 때마다 허락 → Yes
- 끝나면 Claude가 알려 준 주소를 브라우저로 열기 → 내 파일 4개가 보이면 성공 🎉
- notes: **비공개(private)**로 만드는 이유: 학교·학급 정보가 들어갈 수 있음. Vercel은 비공개 저장소도 무료로 배포 가능.

**#21 [table] Claude가 방금 한 일 (구경만)**
| 명령 | 뜻 |
|---|---|
| `git init` | 이 폴더를 기록 관리 시작 |
| `git add .` | 저장할 파일 고르기 (전부) |
| `git commit -m "..."` | 저장 기록 남기기 |
| `gh repo create ... --private` | GitHub에 비공개 보관소 만들기 |
| `git push` | 보관소로 업로드 |
- 아래 한 줄: **외울 필요 없음.** "커밋하고 푸시해줘"라고 말하면 됨
- notes: Claude의 실제 명령은 조금 다를 수 있음(`--source=. --push` 옵션으로 한 번에 처리 등). 개념만 짚기.

**#22 [trouble] 막혔을 때 — GitHub 편**
| 증상 | 원인 | 해결 |
|---|---|---|
| `gh`를 찾을 수 없음 | 설치 후 창을 안 껐음 | VS Code 완전 종료 후 재실행 |
| `Please tell me who you are` | 이름표 미설정 | #16 명령 다시 |
| `gh auth` 코드 입력 화면 안 열림 | 브라우저 연동 | github.com/login/device 직접 열기 |
| `repository already exists` | 같은 이름 저장소 있음 | 이름을 `guestbook2`로 바꿔 요청 |
| 푸시할 때 로그인 창 반복 | 인증 정보 꼬임 | `gh auth setup-git` 입력 후 재시도 |

**#23 [checkpoint] 확인 미션 3**
- github.com → 내 프로필 → `guestbook` 저장소에 **자물쇠(Private)** 표시가 있는지
- 파일을 눌러 내용이 보이는지
- 완료한 분은 옆 사람 도와주기

---

### 4부. Vercel로 인터넷에 열기 (15분)

**#24 [section] 4부. 가게 열기**
- 부제: "Vercel = 보관소의 파일을 인터넷 주소로 진열"

**#25 [command] ① 새 프로젝트 만들기**
- vercel.com → 오른쪽 위 **Add New…** → **Project**
- **Import Git Repository**에서 `guestbook` 찾기 → **Import**
- `guestbook`이 목록에 없으면 → **Adjust GitHub App Permissions** → 저장소 접근 허용(다음 장)

**#26 [bullets] 저장소가 안 보일 때**
- Vercel에게 "내 보관소를 봐도 된다"는 허락이 필요함
- **Adjust GitHub App Permissions** 클릭 → GitHub 화면으로 이동
- Repository access에서 **All repositories** 또는 `guestbook` 선택 → Save
- Vercel 화면으로 돌아오면 목록에 나타남
- notes: 비공개 저장소라서 생기는 단계. 가장 흔한 막힘 2위.

**#27 [command] ② 설정 없이 Deploy**
- Framework Preset: **Other** (자동으로 잡힘)
- Build 설정, 환경 변수: **아무것도 건드리지 않기**
- **Deploy** 클릭 → 30초~1분 기다리기
- 축하 화면이 나오면 **Continue to Dashboard**
- notes: 빌드 과정이 없는 순수 HTML이라 설정이 필요 없음. 이게 순수 HTML을 고른 이유.

**#28 [checkpoint] 확인 미션 4 — 휴대폰으로 열기**
- 대시보드의 **Domains** 주소 (`guestbook-○○.vercel.app`) 클릭
- 그 주소를 **카톡 나에게 보내기**로 휴대폰에서 열기 📱
- 옆 사람 주소도 열어 보기
- notes: 수업에서 가장 반응이 큰 순간. 충분히 즐기게 둘 것. 주소가 마음에 안 들면 Settings → Domains에서 앞부분 변경 가능(심화로 안내만).

**#29 [twocol] 그런데 이상한 점**
- 왼쪽 "내 휴대폰에서": 글을 쓰면 보임
- 오른쪽 "옆 사람 휴대폰에서": **내 글이 안 보임**
- 이유: 글이 아직 **각자의 브라우저 서랍**에만 저장됨
- 해결: 모두가 같이 쓰는 **공책(Supabase)** 이 필요 → 6부
- notes: #11의 궁금증을 다시 꺼내 동기 강화.

---

### 5부. 고치고 푸시 → 자동 반영 (10분)

**#30 [section] 5부. 고치면 저절로 바뀐다**

**#31 [checkpoint] 한 바퀴 돌려 보기**
- Claude에게 (내용은 자유):
```
맨 아래에 "만든 사람: ○○○ 선생님" 문구를 넣어줘
```
- 브라우저에서 확인한 다음:
```
지금 바꾼 걸 커밋하고 푸시해줘
```
- 1분 뒤 **휴대폰에서 새로고침** → 바뀌어 있으면 성공 🎉
- notes: Vercel 대시보드의 Deployments 탭에서 새 배포가 진행되는 모습도 같이 보여 주기.

**#32 [bullets] 앞으로의 작업 순서 (이것만 기억)**
- ① Claude에게 고쳐 달라고 말하기
- ② 브라우저에서 확인
- ③ "커밋하고 푸시해줘"
- ④ 1분 뒤 인터넷 주소에 반영
- 이 네 단계가 **앞으로 모든 작업의 기본 루프**

---

**#33 [checkpoint] 쉬는 시간 5분 — 그 전에 버튼 하나만**
- supabase.com → **New project**
  - Name: `guestbook`
  - Database Password: **Generate a password** → 메모장에 복사해 두기
  - Region: **Northeast Asia (Seoul)**
- **Create new project** 누르고 쉬는 시간 시작
- 프로젝트 준비에 1~2분 걸림 → 쉬는 동안 완료됨
- notes: 대기 시간을 쉬는 시간과 겹치려는 장. 비밀번호는 오늘 실습에선 안 쓰지만 나중을 위해 보관. 무료 플랜은 프로젝트 2개까지.

---

### 6부. Supabase로 글 저장하기 (30분)

**#34 [section] 6부. 모두의 공책 만들기**
- 부제: "Supabase = 방문자가 쓴 글을 모아 두는 공책"

**#35 [twocol] 지금 vs 바꾼 후**
- 왼쪽 "지금": 글 → **내 브라우저 서랍**(localStorage) → 나만 봄
- 오른쪽 "바꾼 후": 글 → **Supabase 공책** → 모두가 봄
- 바꿀 파일: `app.js`(저장 방식), `config.js`(공책 주소)
- notes: 부록 A대로 페이지를 만들었다면 저장 부분이 한 파일에 모여 있어 교체가 쉬움.

**#36 [command] ① 표(테이블) 설계를 Claude에게 받기**
```
Supabase에 이 방명록 글을 저장할 테이블을 만드는 SQL을 써줘.
누구나 글을 읽고 쓸 수는 있지만, 수정과 삭제는 못 하게 RLS 정책도 넣어줘.
```
- Claude가 SQL을 보여주면 **전체 복사**
- notes: 핵심은 "RLS 정책도 넣어줘" 문장. 빠지면 누구나 글을 지울 수 있는 상태가 됨. 강사용 정답 SQL은 부록 B.

**#37 [command] ② SQL Editor에 붙여넣고 실행**
- Supabase 왼쪽 메뉴 **SQL Editor** → 빈 칸에 붙여넣기 → **Run**
- `Success. No rows returned` 가 나오면 성공
- 왼쪽 **Table Editor**에서 `entries` 표가 생긴 것 확인
- notes: "destructive operation" 경고가 나오면 내용 확인 후 진행. 표 이름은 Claude가 다르게 지을 수 있음.

**#38 [bullets] RLS — 공책의 자물쇠**
- RLS = **누가 무엇을 할 수 있는지** 정하는 규칙
- 오늘 규칙: 누구나 **읽기·쓰기 O**, 고치기·지우기 **X**
- RLS가 꺼져 있으면: 주소만 알면 **누구나 전부 지울 수 있음**
- Table Editor에서 표 이름 옆에 `RLS disabled` 경고가 **없어야** 정상
- ⚠️ **학생 실명·연락처 같은 개인정보는 넣지 않기**
- notes: 선생님 대상이라 개인정보 부분을 꼭 강조. 실명 대신 번호·별명.

**#39 [command] ③ 공책 주소와 열쇠 가져오기**
- Supabase 왼쪽 아래 **Project Settings** → **API Keys**
- 두 가지 복사:
  - **Project URL** (`https://○○.supabase.co`)
  - **Publishable key** (`sb_publishable_…`로 시작. 화면에 없으면 `anon` `public` 키)
- ⚠️ `secret` 또는 `service_role` 키는 **절대 복사하지 않기**
- notes: Publishable/anon 키는 브라우저에 공개되어도 되는 키. 안전은 RLS가 지킴. secret 키는 모든 규칙을 무시하는 마스터키라 웹페이지에 넣으면 안 됨. Project URL은 Settings → Data API에 있을 수도 있음 — 강사가 사전에 화면 확인 후 수정.

**#40 [checkpoint] ④ Claude에게 연결 요청**
```
config.js에 Supabase 주소와 publishable key를 넣고, app.js가 브라우저 저장소 대신 Supabase의 entries 테이블에 글을 저장하고 불러오게 바꿔줘.
주소: 여기에붙여넣기
키: 여기에붙여넣기
```
- 브라우저에서 `index.html` 새로고침 → 글 쓰기 → Supabase **Table Editor**에 그 글이 들어왔는지 확인
- 잘 되면:
```
커밋하고 푸시해줘
```
- notes: 로컬 파일로 열었을 때 안 되면 Claude에게 "브라우저 콘솔 오류를 보고 고쳐줘" 또는 Vercel 주소에서 확인.

**#41 [checkpoint] 확인 미션 5 — 같이 쓰기**
- 1분 뒤 내 Vercel 주소를 휴대폰에서 열기 → 글 쓰기
- **옆 사람 휴대폰**에서 내 주소 열기 → 내 글이 보이면 성공 🎉
- Table Editor에서 글이 쌓이는 것 구경
- notes: #29의 "이상한 점"이 해결되는 순간. 강사 화면에 강사 페이지를 띄우고 다 같이 글을 남기면 좋음.

**#42 [trouble] 막혔을 때 — Vercel · Supabase 편**
| 증상 | 원인 | 해결 |
|---|---|---|
| Vercel에 저장소가 안 보임 | GitHub 앱 권한 | #26 다시 |
| 푸시했는데 안 바뀜 | 캐시 / 배포 중 | 1분 기다린 뒤 새로고침, Deployments 탭 확인 |
| 글이 저장 안 됨 (`401`, `Invalid API key`) | 키 복사 실수 | 키를 다시 복사해서 Claude에게 전달 |
| `new row violates row-level security` | 쓰기 정책 없음 | Claude에게 "insert 정책 추가 SQL 써줘" |
| 글이 안 불러와짐 | 읽기 정책 없음 | Claude에게 "select 정책 추가 SQL 써줘" |
- notes: 표가 너무 길면 2장으로 나눠도 됨.

---

### 7부. 마무리 (5분)

**#43 [bullets] 오늘 한 것**
- 실습 페이지를 Claude로 고침 ✔
- GitHub 비공개 보관소에 커밋·푸시 ✔
- Vercel로 인터넷 주소 만들기 ✔
- Supabase 공책으로 모두의 글 저장 ✔
- 기본 루프: **말하기 → 확인 → 커밋·푸시 → 반영**

**#44 [bullets] 다음까지 (과제)**
- 1차시 **내 설계서**로 오늘 과정을 그대로 해 보기
  - 새 폴더 → Claude에게 "설계서대로 순수 HTML로 만들어줘" → 커밋·푸시 → Vercel
- 내 주소를 단톡방에 공유하기
- 막히면 Claude에게 오류 메시지를 **그대로 붙여넣기**
- 다음 예고: 오늘 손으로 한 일을 **Claude에게 전부 맡기는 법** (심화 내용)

**#45 [title] 끝**
- "작게 만들고, 되면 키우자"
- 질문 · 연락: 아이스톡으로 부내초 유경윤에게 메세지 주세요

---

### 심화 A. Vercel CLI — 터미널에서 가게 관리하기 (10분, 시간이 있으면)

> 모든 심화 슬라이드에 `.optional` 클래스와 "심화 · 시간이 있으면" 배지.
> 전제: **Node.js가 설치되어 있음**. 없으면 nodejs.org에서 LTS 설치 후 VS Code 재시작.

**#46 [section/optional] 심화 A. Vercel CLI**
- 부제: "CLI = Claude가 내 대신 터미널에 명령을 입력하는 방식"

**#47 [command/optional] 설치와 로그인**
```
npm i -g vercel
```
```
vercel login
```
- 로그인 방법에서 **Continue with GitHub** 선택 → 브라우저에서 허용
- 확인: `vercel --version`
- notes: `vercel.ps1 … 스크립트를 실행할 수 없습니다` 오류는 1차시 트러블슈팅의 `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`로 해결. `node`를 찾을 수 없으면 Node.js 미설치.

**#48 [command/optional] 이 폴더를 가게와 연결**
```
vercel link
```
- 질문이 나오면: 기존 프로젝트에 연결 → `guestbook` 선택
- 폴더에 `.vercel` 폴더가 생기면 연결 완료
- notes: `.vercel` 폴더는 자동으로 `.gitignore`에 추가됨. 안 되어 있으면 Claude에게 추가해 달라고 하기.

**#49 [table/optional] Claude에게 이렇게 시키기**
| Claude에게 하는 말 | Claude가 쓰는 명령 | 결과 |
|---|---|---|
| "푸시하기 전에 테스트 주소 만들어줘" | `vercel` | 미리보기용 주소 생성 |
| "최근 배포 목록 보여줘" | `vercel ls` | 언제 무엇이 배포됐는지 |
| "마지막 배포에 문제 있었는지 확인해줘" | `vercel inspect` | 배포 상태·기록 |
- 아래 한 줄: 대시보드에 들어가 클릭하던 일을 **말 한마디로**
- notes: 미리보기 주소는 기본적으로 Vercel 로그인한 사람만 볼 수 있음(본 주소는 누구나). 실제 명령 옵션은 Claude가 상황에 맞게 붙임.

---

### 심화 B. Supabase MCP — Claude에게 공책을 직접 맡기기 (15분, 시간이 있으면)

**#50 [section/optional] 심화 B. Supabase MCP**
- 부제: "MCP = Claude에게 그 서비스를 직접 다루는 손을 달아 주는 방식"

**#51 [twocol/optional] CLI vs MCP**
- 왼쪽 "CLI (심화 A)": Claude가 **터미널에 명령을 입력**. 무엇을 했는지 화면에 그대로 보임
- 오른쪽 "MCP (심화 B)": Claude가 **서비스에 직접 연결**. 설치 없이 로그인만
- 한 줄 요약: 둘 다 "Claude에게 맡기는 방법". **서비스마다 편한 쪽**을 고르면 됨
- notes: 오늘은 Vercel=CLI, Supabase=MCP. Supabase CLI는 DB 비밀번호 입력, Windows 설치가 번거로워 MCP가 더 쉬움.

**#52 [command/optional] ① 프로젝트 ID 확인**
- Supabase → **Project Settings** → **General** → **Project ID** 복사
- (주소창의 `supabase.com/dashboard/project/` 뒤 글자와 같음)
- notes: 이 ID로 MCP 연결을 "이 프로젝트 하나"로 제한. 다른 프로젝트를 Claude가 못 건드리게 하는 안전장치.

**#53 [command/optional] ② 읽기 전용으로 연결**
- Claude를 끄고(`Ctrl+C` 두 번) 터미널에서, `프로젝트ID`를 바꿔 입력:
```
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=프로젝트ID&read_only=true"
```
- 다시 `claude` 실행 →
```
/mcp
```
- `supabase` 선택 → **Authenticate** → 브라우저에서 로그인·허용 (organization 선택 확인)
- notes: `read_only=true` = Claude가 보기만 하고 바꾸지 못함. `--scope project`라 이 폴더에 `.mcp.json` 파일이 생김(키는 안 들어 있어서 커밋해도 됨). 명령어는 Supabase 공식 문서(supabase.com/docs/guides/ai-tools/mcp) 기준 — 수업 전 최신 확인.

**#54 [checkpoint/optional] ③ 물어보기 (읽기 전용)**
```
Supabase MCP로 내 데이터베이스에 어떤 테이블이 있고 글이 몇 개 쌓였는지 알려줘
```
```
Supabase 보안 점검(advisors)을 돌려서 문제가 있으면 쉽게 설명해줘
```
- 두 번째가 핵심: **RLS 빠뜨린 곳**을 Claude가 먼저 찾아 줌
- notes: Claude가 MCP 도구 사용 허락을 물으면 Yes. 보안 점검 결과가 비어 있으면 6부를 잘 한 것.

**#55 [command/optional] ④ 쓰기 권한 열고 기능 추가**
- 연결을 지우고 `read_only` 없이 다시 연결:
```
claude mcp remove supabase
```
```
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=프로젝트ID"
```
- 다시 `claude` → Claude에게:
```
방명록 글마다 좋아요 버튼을 추가해줘. 테이블 변경은 Supabase MCP로 하고, 코드 수정 후 커밋하고 푸시해줘.
```
- ⚠️ 쓰기 권한이 있으면 Claude가 **데이터를 지울 수도** 있음 → Claude가 실행 전에 보여주는 SQL을 **읽고** 허락하기
- notes: 연습용 프로젝트에서만. 실제 학급 데이터가 있는 프로젝트에는 읽기 전용으로만 연결하라고 강조. 오늘 손으로 한 SQL 복사·붙여넣기가 사라지는 걸 보여 주는 게 목적.

---

## 4. 제작 시 주의

- 명령어 박스 안의 텍스트는 **한 글자도 바꾸지 말 것**. 단 `홍길동`, `프로젝트ID`, `여기에붙여넣기`처럼 바꿔 쓰는 자리는 **강조색으로 표시**해 수강생이 알아보게.
- `[checkpoint]`는 1차시처럼 배경색을 달리하고, `.optional`은 그와 또 다른 배경으로 구분.
- `[trouble]` 표는 최소 28px, 필요하면 2장으로 나눔.
- 1차시처럼 마지막에 슬라이드 목록(`data-title` 기반) 제공. 심화는 목록에서 "심화" 묶음으로.
- 완성 후 `lesson2.html`을 브라우저로 열어 전 장이 넘어가는지, 복사 버튼이 동작하는지, 심화 배지가 보이는지 확인하고 보고할 것.

---

## 부록 A. 실습 페이지 "오늘의 한 줄" 명세 (강사가 미리 제작·배포)

- **목적**: 학생이 수업 끝에 배운 것 한 줄을 남기는 방명록. 1차시 #32의 예시와 같은 아이디어
- **파일 4개, 빌드 없음, 외부 라이브러리 없음** (Supabase 연결 후에만 CDN 1개 추가)
  - `index.html`: 제목, 입력 폼(별명 + 한 줄 내용 + 남기기 버튼), 글 목록
  - `style.css`: 단순하고 밝은 기본 디자인. 수강생이 "색 바꿔줘"를 했을 때 차이가 잘 보이게 **일부러 수수하게**
  - `app.js`: 저장·불러오기를 `saveEntry()`, `loadEntries()` 두 함수에만 모아 둠. 처음엔 localStorage 사용 → 6부에서 이 두 함수만 Supabase로 교체되게
  - `config.js`: `SUPABASE_URL = ""`, `SUPABASE_KEY = ""` 빈 값과 주석("6부에서 채워요")
- 글 데이터: 별명(nickname), 내용(content), 작성 시각(created_at)
- 별명 입력란 안내 문구: "실명 대신 별명이나 번호" (개인정보 교육 겸)
- 배포: 원본 `lesson2-files/guestbook/` → 폴더 **안의 파일들만** 압축해 `downloads/guestbook.zip` 생성 (ZIP 안에 상위 폴더를 넣지 않아야 "모두 압축 풀기" 시 폴더가 이중으로 안 생김). 수강생은 슬라이드 #9의 버튼으로 내려받음
- `.gitignore`에 `.vercel`, `.env*` 미리 포함

## 부록 B. 강사용 정답 SQL (Claude 결과와 비교용)

```sql
create table entries (
  id bigint generated always as identity primary key,
  nickname text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table entries enable row level security;

create policy "누구나 읽기" on entries
  for select to anon using (true);

create policy "누구나 쓰기" on entries
  for insert to anon with check (true);
```
- 수정(update)·삭제(delete) 정책은 **일부러 만들지 않음** → 아무도 못 고치고 못 지움
- 강사는 Table Editor에서 직접 지울 수 있음 (관리자 권한)

## 부록 C. 사전 안내문 (수업 3일 전 발송)

1. github.com 가입 (이미 했으면 통과)
2. vercel.com 가입 — **Continue with GitHub**, Hobby 선택
3. supabase.com 가입 — **Continue with GitHub**
4. (가능하면) PowerShell에서 `winget install --id GitHub.cli`
5. (심화를 원하면) nodejs.org에서 Node.js LTS 설치
