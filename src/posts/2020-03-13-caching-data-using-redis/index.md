---
title: 'Redis를 활용한 데이터 캐싱'
date: '2020-03-13 18:02'
slug: '/dev/CS/2020-03-13-caching-data-using-redis'
category1: 'dev'
category2: 'redis'
tags: ['redis', 'cache']
---

###### 웹 페이지를 개발했는데 접속할 때마다 이미지가 출력되는데 시간이 오래걸린다면 다시 방문하고 싶은 사용자는 없을 것이다. 이런 문제를 해결할 수 있는 방법 중 하나가  캐시이다.

<!-- end -->

## Cache

### 개념

캐시는 한번 읽은(처리한) 데이타를 임시로 저장하고 필요에 따라 전송, 갱신, 삭제하는 기법이다. 어플리케이션이 캐시에 요청을 보내서 저장된 사본이 있다면 메모리에서 바로 데이터를 제공한다. 캐시에 저장된 사본이 없다면 그 때 데이터베이스 접근하여 데이터를 가져온다. 

### 적합한 정보

- `단순`한 구조의 정보
- `반복`적으로 요청되는 정보
- 요청의 처리가 `오래걸리는` 정보
- 갱신이 빈번하지 않고, 즉시 최신화가 이루어지지 않아도 무방한 정보

### 장점

- 불필요한 데이터 전송을 줄여, 네트워크 비용을 절감해준다.
- 사용자가 많이 몰리는 구간의 네트워크 병목현상을 해결할 수 있다.
- 캐시에 저장할 때 `key-value` 형태로 저장하기 때문에 database에 접근하여 결과 값을 가져오는 것보다 속도가 빠르다.
- 먼 거리로 인한 지연도 해소된다.

### 고려사항

1. 캐시에 저장할 정보를 잘 선별해야 한다.
2. 정보의 특성에 맞게 만료기간을 설정하여 적절히 갱신이 이루어져야 한다.



## Redis

### 개념

**Re**mote **Di**ctionary **S**erver의 약어인 Redis는 데이터베이스, 캐시, 메시지 브로커 및 대기열로 사용하는 오픈 소스, 인 메모리 키-값 데이터 스토어이다.

> 인메모리 데이터베이스(In-memory Database)는 데이터 스토리지의 메인 메모리에 설치되어 운영되는 방식의 데이터베이스 관리 시스템이다. [출처: [위키백과](https://ko.wikipedia.org/wiki/인메모리_데이터베이스)]



### 설치 및 실행 (mac)

#### 설치

```
$ brew install redis
```

#### redis 서비스 시작, 중지, 재시작

```
$ brew services start redis
$ brew services stop redis
$ brew services restart redis
```

#### 서버 실행

```
$ redis-server

20941:C 13 Mar 2020 17:22:08.754 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
20941:C 13 Mar 2020 17:22:08.754 # Redis version=5.0.7, bits=64, commit=00000000, modified=0, pid=20941, just started
20941:C 13 Mar 2020 17:22:08.754 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
20941:M 13 Mar 2020 17:22:08.755 * Increased maximum number of open files to 10032 (it was originally set to 2560).
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 5.0.7 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 20941
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

20941:M 13 Mar 2020 17:22:08.756 # Server initialized
20941:M 13 Mar 2020 17:22:08.756 * Ready to accept connections
```

#### 서버 작동 확인

아래와 같이 입력해서 `PONG`이라고 응답이 온다면 서버가 잘 작동하고 있는 것이다.

```
$ redis-cli ping

PONG
```

#### 서버와 통신

```
$ redis-cli

127.0.0.1:6379>
```

로컬에서 실행하게되면 `127.0.0.1` 의 주소로 접속하게 되고 포트는 레디스의 기본 포트번호인 `6379` 를 사용함을 알 수 있다.



### 사용방법

#### SET

```
127.0.0.1:6379> set key1 myvalue1
OK
```

#### GET

```
127.0.0.1:6379> get key1
"myvalue1"
```

#### DEL

동시에 여러 개의 키를 지울 수 있으며, 성공적으로 삭제된 키의 개수를 반환한다.

```
127.0.0.1:6379> del key1
(integer) 1

127.0.0.1:6379> del key2 key3
(integer) 2
```

#### SELECT

하나의 레디스 서버는 여러 개의 데이터베이스를 가지고 있을 수 있으며 각각의 번호를 SELECT 문에 전달하여 접속할 수 있다. 각각의 데이터베이스는 서로 독립적으로 데이터를 저장하므로 다른 데이터베이스에 저장된 데이터에 접근하기 위해서는 해당 데이터베이스에 먼저 접속해야 한다.

```
127.0.0.1:6379[1]> select 1
OK
127.0.0.1:6379[2]> set key1 myvalue1
OK
127.0.0.1:6379[2]> get key1
"myvalue1"
127.0.0.1:6379[2]> select 2
OK
127.0.0.1:6379[1]> get key1
(nil)
```





## 참조

- https://opentutorials.org/course/697/3839
- https://feel5ny.github.io/2019/09/30/HTTP_007-1/
- https://nachwon.github.io/redis/

