# 프로젝트 소개
한국공학대학교 2023년 졸업작품 S2-12팀 휴먼리더 카피트레이딩 프로젝트입니다.

해당 프로젝트에서는 Upbit api를 이용하여 리더로 등록된 계좌를 모니터링 한 후, 리더를 구독한 사용자들에게 카피트레이딩 기능을 제공합니다.
*카피 트레이딩: 다른 트레이더들의 거래를 카피(복제)하는 것을 포함한 특별한 유형의 거래 활동을 말한다. 


# 팀원
|김충오|김진유|서지원|
|:---:|:---:|:---:|
|팀장<br>앱 프론트엔드|monitoring 서버<br>trading 서버|main 서버<br>admin 서버|

# 기술 스택
## monitoring 서버, trading 서버
|Node.js|MariaDB|express|Upbit API|
|---|---|---|---|
## main 서버
|nodejs|express|pm2|mariaDB|swagger|
|---|---|---|---|---|
## admin 서버
|nodejs|reactjs|react-Router| 
|---|---|---|
## 앱 프론트엔드
|JavaScript|React Native|CSS|
|---|---|---|
./readme_img/mariadb.svg
# 아키텍처 구성도
![poster](./readme_img/sys_arch.jpg)
<img src="data:image/png;base64,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", width="50">

# DB 구성도
![poster](./readme_img/db.png)


