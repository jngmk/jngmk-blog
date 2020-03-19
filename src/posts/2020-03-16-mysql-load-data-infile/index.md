---
title: 'Mysql 데이터 불러오기'
date: '2020-03-16 18:39'
slug: '/dev/database/2020-03-16-mysql-load-data-infile'
category1: 'dev'
category2: 'database'
tags: ['database', 'mysql']
---

###### 프로젝트를 진행하면서 공공 데이터 등의 외부 데이터를 DB에 담아야 하는 경우나 새로운 서버를 개설하게 되어 데이터를 반영해야하는 경우에 REST API를 이용해서 하나하나 넣어주는 것은 비효율적이다. 따라서 이런 경우 유용하게 사용하는 데이터 적재 방법을 알아봤다.

<!-- end -->

참고로 사용해볼 파일은 도로명 데이터와 보건소 데이터이고, mysql (version 8.0.19)과 workbench(version 6.3) 을 사용해 진행했다.



## 워크벤치 로그인

먼저 워크벤치에 로그인 해준다. 만약 접속하는데 **Authentication plugin 'caching_sha2_password' cannot be loaded: dlopen** 와 같은 에러가 발생한다면 아래와 같은 쿼리로 비밀번호를 `mysql_native_password` 형태의 비밀번호로 변경해준다.


```
mysql> alter user 'userID'@'IP' identified with mysql_native_password by 'password';
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
```



## 도로명 데이터 db에 적재하기

2월 개선 도로명코드_전체분 데이터 [다운로드](http://www.juso.go.kr/addrlink/addressBuildDevNew.do?menu=match)

다운로드 해서 압축을 풀면 `txt파일` 이 들어있다. 여기서 사용해볼 파일은 **개선 도로명코드 전체분** 이다. 




### 테이블 생성

도로명 주소 테이블을 만든다.

```sql
CREATE TABLE addr (
	road_code INT NOT NULL,
	road_name VARCHAR(100),
	dong_code INT NOT NULL,
	city_name VARCHAR(20),
	user_name VARCHAR(20),
	time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```



### 데이터 불러오기

다운 받았던 도로명 주소 데이터를 불러와서 내가 만든 테이블에 넣어준다. 다운받은 파일에 `column` 이름이 없길래 추가해줬다.

```sql
LOAD DATA LOCAL INFILE 'Applications/data/importData'
INTO TABLE addr
CHARACTER SET euckr
FIELDS
	TERMINATED BY '|'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(road_code, road_name, @3, dong_code, city_name,
 @6, @7, @8, @9, @10, @11, @12, @13, @14, @15, @16, @17)
SET user_name = current_user();
```

`IGNORE 1 LINES` 은 첫 번째 줄에 column name 이 담겨있기 때문에 작성했다. 그 아래 `()`에는 불러오는 파일의 column 순서대로 작성하면 되고, `@`는 무시하고 지나간다는 뜻이다. 불러오는 파일에는 없지만 내가 새롭게 만든 `column` 은 `SET` 절을 통해 값을 넣어줬다.



### 데이터 가공하기

데이터가 너무 많기 때문에 서울이 아닌 지역의 데이터는 삭제했다.

```
DELETE FROM addr WHERE city_name != '서울특별시';
```



### 에러 모음

#### 에러코드 3948

혹시 에러 코드 `3948` 이 뜬다면 mysql 에서 `local_inflie` 이 `1` 인지 확인해봐야 한다. 

```sql
mysql> SELECT @@local_infile;
+----------------+
| @@local_infile |
+----------------+
|              0 |
+----------------+
```

만약 `0` 이라면 `my.cnf` 파일에  `local-infile=1` 을 추가해준다.

##### my.cnf 파일 위치 찾기

```
$ mysql --verbose --help | grep my.cnf
                      order of preference, my.cnf, $MYSQL_TCP_PORT,
/etc/my.cnf /etc/mysql/my.cnf /usr/local/etc/my.cnf ~/.my.cnf 
```



`my.cnf` 파일이 없다면 **"/private/etc/my.cnf" E212: Can't open file for writing** 라는 에러가 발생한다. 따라서 해당 경로에 `my.cnf` 파일이 없다면 생성 후 아래 코드를 넣어준다.

```
$ vi /etc/my.cnf 
```

```
[client]
loose-local-infile=1
```

> `local-infile` 을 이해하지 못하는 프로그램에서 문제가 발생하지 않도록 하기 위해서는, `loose-` 접두사를 사용해서 그것을 지정하도록 한다. [출처](http://www.mysqlkorea.com/sub.html?mcode=manual&scode=user&m_no=23143&cat1=1111&cat2=1204&cat3=1240&lang=k)



만약 이렇게 해도 바뀌지 않는다면 root 계정에서 직접 바꿔주면 된다.

```sql
mysql> SET GLOBAL local_infile = 1;
Query OK, 0 rows affected (0.00 sec)


mysql> SELECT @@local_infile;
+----------------+
| @@local_infile |
+----------------+
|              1 |
+----------------+
1 row in set (0.00 sec)
```



#### 에러코드 2

맥을 사용하는데 파일경로를 찾지 못했다고 한다면 파일경로를 Applications/data/importData 로 바꾸면 해결된다.



#### 에러코드 1300

characterset 을 utf8mb4로 설정하였더니 1300 에러가 발생했다. utf8mb4 대신 euckr 을 사용했더니 해결됐다.



#### 에러코드 1175

where 절을 포함한 update 나 delete 쿼리가 실행되지 않는 경우가 발생한다. 아래 쿼리를 통해 에러를 해결할 수 있다.

```sql
SET SQL_SAFE_UPDATES = 0;
```





## 진료소 데이터 db에 적재하기

보건복지부 선별진료소 데이터 [다운로드](https://www.data.go.kr/dataset/15043008/fileData.do)

진료소 데이터는 친절하게 `csv` 형식으로 다운로드 받을 수 있다.



### 테이블 생성

진료소 데이터 테이블을 만들어준다.

```sql
CREATE TABLE medical (
	연번 INT NOT NULL,
	시도 VARCHAR(20),
	시군구 VARCHAR(20),
	의료기관명 VARCHAR(100),
	주소 VARCHAR(100),
    대표전화번호 VARCHAR(20),
    created_by VARCHAR(20),
	time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```



### 데이터 불러오기

```sql
LOAD DATA LOCAL INFILE 'Applications/data/medical.csv'
INTO TABLE medical
CHARACTER SET euckr
FIELDS
	TERMINATED BY ',' ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
(연번, @검체채취가능여부, 시도, 시군구, 의료기관명, 주소, 대표전화번호)
SET created_by = current_user();
```

`csv` 파일은 **comma-separated values** 의 줄임말이다. 필드간의 구분이 `,` 로 되어있는데, 레이블 값에 `,` 가 포함되어 있다면 원하지 않게 구분되어진다. 때문에 `,` 가 들어가 있을 경우 `""` 로 감싸서 파일을 생성하고, 불러올 때는 `ENCLOSED BY '"'` 를 옵션으로 작성해줘야 한다.



### 데이터 가공하기

진료소 데이터 역시 서울 데이터 빼고 삭제했다.

```sql
DELETE FROM medical WHERE 시도 != '서울';
```



## 참조

- https://huhushow.github.io/huhushow/mysql-load-data-infile-set.html