---
title: 'Homebrew Permission denied 해결방법'
date: '2020-04-17 15:08'
slug: '/dev/error/2020-04-17-homebrew-permission-denied'
category1: 'dev'
category2: 'error'
tags: ['error', 'homebrew', 'fontforge']
---



###### `Homebrew` 를 이용하다 보면 **'Permission denied'** 라는 에러를 만나는 경우가 생긴다. 이를 해결하는 방법은 다음과 같다.

<!-- end -->



## 에러 로그

현재 손글씨 이미지를 통해 나만의 손글씨 폰트를 제작해주는 프로젝트를 진행중이다. 이 때 `fontforge` 라는 오픈소스가 필요해서 `brew` 를 이용해 install 하던 과정에서 다음과 같은 에러가 발생하였다.

```
Error: Permission denied @ apply2files - {directory}
```



## 해결방법

참고사이트: https://github.com/Homebrew/homebrew-core/issues/45009

sudo 명령어를 붙여도 허가가 나지 않기 때문에 에러에서 말해주는 경로에 접근 권한을 부여해주어야 한다. `name` 은 os 이름이고 `directory` 는 경로이다.

```
sudo chown -R {name} {directory}
```



### [Mac OS] Operation not Permitted

이때 mac os 의 경우 권한 설정이 되지 않는 경우가 발생한다. 

> 이것은 El Capitan 에 적용된 Apple 의 SIP (System Integrity Protection; 시스템통합보안) 때문이라고 한다. SIP대상 폴더는 /System, /bin, /sbin, /usr 폴더이다.



 SIP 기능을 해제하려면

1. 재부팅 시 `cmd + R` 을 누르고 있는다.
2. 유틸리티 > `터미널`을 작동시킨다.
3. `csrutil disable` 을 입력한다.
4. `roboot` 을 입력해 재부팅한다.



다시 `sudo chown` 명령어로 `directory` 에 권한을 부여해보면, 오류가 발생하지 않는 것을 확인할 수 있다.