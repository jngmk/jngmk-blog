---
title: 'Mysql 사용자 생성, DB 생성, 권한 부여'
date: '2020-03-16 16:30'
slug: '/dev/database/2020-03-16-mysql-create-a-new-user-and-grant-permissions'
category1: 'dev'
category2: 'database'
tags: ['database', 'mysql']
---

###### mysql에서 새로운 계정과 새로운 DB를 생성하는 방법을 알아보고, 계정에 DB 접근 권한을 부여하는 방법을 알아봤다.

<!-- end -->

##  사용자 생성 및 삭제

### 로그인

새로운 사용자 계정을 추가하기 위해선 먼저 mysql에 로그인을 해야한다.

```
$ mysql -u root -p
Enter password: 

mysql> 
```

### 사용자 생성

사용자를 생성하기 전에 먼저 생성되어 있는 계정을 확인해봤다.

```
mysql> use mysql
Database changed

mysql> select host, user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| localhost | mysql.infoschema |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |
+-----------+------------------+
4 rows in set (0.00 sec)
```

#### 방법1

사용자를 생성하는 가장 짧은 쿼리는 `create` `user` `'사용자ID'` 이다.

```
mysql> create user 'test01';
Query OK, 0 rows affected (0.01 sec)

mysql> select host, user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| %         | test01           |
| localhost | mysql.infoschema |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |
+-----------+------------------+
5 rows in set (0.00 sec)
```

생성된 결과를 보면 위와 같다. test01 계정의 `host` 열을 보면 `%`로 되어있는데, `%`는 외부 접근 권한을 부여받았음을 의미한다. 

#### 방법2

첫 번째 방법에서 옵션을 부여해서 바로 설정할 수도 있다.

`create` `user` `'사용자ID'@'IP'` `identified` `by` `'비밀번호'`

```
mysql> create user 'test02'@'localhost' identified by '1234';
Query OK, 0 rows affected (0.01 sec)

mysql> select host, user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| %         | test01           |
| localhost | mysql.infoschema |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |
| localhost | test02           |
+-----------+------------------+
6 rows in set (0.00 sec)
```



### 사용자 삭제

두 가지 방법이 있다.

`drop` `user` `'사용자ID'`

`delete` `from` `user` `where` `user='사용자ID'`

```
mysql> drop user 'test01';
Query OK, 0 rows affected (0.00 sec)

mysql> delete from user where user='test02';
Query OK, 1 row affected (0.00 sec)

mysql> select host, user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| localhost | mysql.infoschema |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |
+-----------+------------------+
4 rows in set (0.00 sec)
```



## 데이터베이스 생성 및 삭제

### 데이터베이스 생성

#### Character set 확인

`Character set`은 문자 데이터를 저장하는 데이터 파일에 해당 문자를 어떻게 인코딩할 것인지를 지정한다.

- server characterset:  MySQL 클라이언트의 `기본`이 되는 `characterset` 이다. 클라이언트에서 서버로 전송하는 SQL문에 대한 인코딩을 의미한다. 서버는 SQL문을 수신하면 SQL문을 conversion 하기 위해서 해당 `characterset` 을 사용한다.
- db characterset
- client characterset
- conn. characterset

```
mysql> status
--------------
mysql  Ver 8.0.19 for osx10.15 on x86_64 (Homebrew)

...
Server characterset:	utf8mb4
Db     characterset:	utf8mb4
Client characterset:	utf8mb4
Conn.  characterset:	utf8mb4
...

Threads: 2  Questions: 71  Slow queries: 0  Opens: 170  Flush tables: 3  Open tables: 92  Queries per second avg: 0.010
--------------
```

`characterset` 이 `utf8`이 아니라면 한글을 읽을 때 깨질 수 있기 때문에 다음과 같은 방법으로 `characterset` 을 설정해줘야 한다.

> utf8mb4 는 mysql에만 있는 character set이다. mysql의 utf-8은 3byte 밖에 표현하지 못하는 문제가 있어서 이모지를 표현할 수 없었다. 그래서 다른 DBMS 와 달리 4byte를 표현하는 utf8mb4 라는 character set을 만들게 되었다.

#### 방법1

데이터베이스를 생성할 때 옵션을 부여해서 `characterset` 을 직접 설정한다. 현재 mysql 설정이 utf8mb4로 되어있기 때문에 `latin1` 로 지정해서 테스트했다. `character_set_database` 가 `latin1` 로 설정된 것을 볼 수 있다.

```
mysql>create database char_latin character set latin1;
Query OK, 1 row affected (0.00 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| char_latin         |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql> show variables where variable_name like 'cha%';
+--------------------------+------------------------------------------------------+
| Variable_name            | Value                                                |
+--------------------------+------------------------------------------------------+
| character_set_client     | utf8mb4                                              |
| character_set_connection | utf8mb4                                              |
| character_set_database   | latin1                                               |
| character_set_filesystem | binary                                               |
| character_set_results    | utf8mb4                                              |
| character_set_server     | utf8mb4                                              |
| character_set_system     | utf8                                                 |
| character_sets_dir       | /usr/local/Cellar/mysql/8.0.19/share/mysql/charsets/ |
+--------------------------+------------------------------------------------------+
8 rows in set (0.00 sec)
```

다른 character_set 값을 변경해준다.

```
mysql> set character_set_client = latin1;
Query OK, 0 rows affected (0.00 sec)

mysql> show variables where variable_name like 'character_set_%';
+--------------------------+------------------------------------------------------+
| Variable_name            | Value                                                |
+--------------------------+------------------------------------------------------+
| character_set_client     | latin1                                               |
| character_set_connection | utf8mb4                                              |
| character_set_database   | latin1                                               |
| character_set_filesystem | binary                                               |
| character_set_results    | utf8mb4                                              |
| character_set_server     | utf8mb4                                              |
| character_set_system     | utf8                                                 |
| character_sets_dir       | /usr/local/Cellar/mysql/8.0.19/share/mysql/charsets/ |
+--------------------------+------------------------------------------------------+
8 rows in set (0.00 sec)
```



#### 방법2

그런데 위의 방법은 mysql demon 이 재실행될 경우 초기화된다는 단점이 있다.

계속 유지되도록 설정하려면 아래와 같은 방법을 사용하면 된다고 한다. [출처](http://develop.sunshiny.co.kr/385)

```
$ vi /etc/my.cnf
```

```
################# utf8 설정 #################
[client]
#password       = your_password
port            = 3306
socket          = /tmp/mysql.sock

default-character-set=utf8

[mysqld]
init_connect=SET collation_connection = utf8_general_ci
init_connect=SET NAMES utf8
default-character-set=utf8
character-set-server=utf8
collation-server=utf8_general_ci

port            = 3306
socket          = /tmp/mysql.sock
basedir       = /opt/mysql/mysql
datadir        = /opt/mysql/mysql/data

set-variable    = table_cache=1024
set-variable    = max_connections=500
set-variable    = max_user_connections=100
set-variable    = max_connect_errors=10000

log-slow-queries
set-variable    = long_query_time=3
skip-name-resolve

# InnoDB 사용 안할시 아래 내용추가
#skip-innodb
sync_binlog = 1

[mysqldump]
quick
max_allowed_packet = 16M

[mysql]
default-character-set=utf8
```



### 데이터베이스 삭제

```
mysql> drop database char_latin;
Query OK, 1 row affected (0.01 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
```



## 권한 부여

먼저 앞서 생성된 사용자 계정인 `test02`로 `char_latin` 데이터베이스에 접속해보면, 권한이 없다는 응답이 돌아온다.

```
$ mysql -u test02 -p;
Enter password: 
Welcome to the MySQL monitor.

mysql> use char_latin;
ERROR 1044 (42000): Access denied for user 'test02'@'localhost' to database 'char_latin'
```

다시 `root` 계정으로 돌아와 `test02` 계정에 모든 권한을 부여한 뒤 `test02` 로 `char_latin` 에 다시 접속해보면, 아래와 같이 데이터베이스 접근이 가능한 것을 볼 수 있다. 실제로는 모든 권한을 주기보다는 grant select ~ 와 같이 계정에 맞게 권한을 부여하면 되겠다.

```
$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.

mysql> grant all privileges on char_latin.* to 'test02'@'localhost';
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

jngmk@gimjeong-ui-MacBookPro ~ % mysql -u test02 -p char_latin;
Enter password: 
Welcome to the MySQL monitor.
```



## 참조

- http://develop.sunshiny.co.kr/385
- https://nickjoit.tistory.com/144