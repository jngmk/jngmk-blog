---
title: 'REST API란?'
date: '2020-03-10 19:24'
slug: '/dev/network/2020-03-10-REST-API'
category1: 'dev'
category2: 'network'
tags: ['network', 'REST', 'REST API']
---

###### REST API를 사용은 해봤지만, 누군가에게 설명을 해야할 때면 어디서부터 어떻게 설명해야할지 난감한 적이 많았다. 그래서 REST API에 대해 한 번쯤 정리해야겠다고 생각했는데, 여유 시간도 있고 정리해볼 기회가 생겨 글로 남겨봤다.

<!-- end -->

## REST란?

### REST 정의

“Representational State Transfer” 의 약자로 HTTP `URI`(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, `HTTP Method`(POST, GET, PUT, DELETE)`를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.



### REST가 주목을 받은 이유

1. 프론트엔드Front-End와 백엔드Back-End가 분리되기 시작했고,
2. 다양한 클라이언트가 등장하기 시작하면서 최근의 서버 프로그램은 다양한 브라우저와 모바일 디바이스들과 통신을 할 수 있어야  했기 때문이다.



### REST 장단점

#### 장점

- HTTP 프로토콜의 인프라를 그대로 사용하므로 REST API 사용을 위한 별도의 인프라를 구출할 필요가 없다.
- HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.

#### 단점

- 표준이 존재하지 않는다.



### REST 특징

#### Uniform (유니폼 인터페이스)

URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행한다. 때문에 HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능하다.

#### Stateless (무상태성)

REST는 상태정보를 따로 저장하고 관리하지 않는다. 세션 정보나 쿠키정보를 별도로 저장하고 관리하지 않기 때문에 API 서버는 들어오는 요청만을 단순히 처리하면 된다. 때문에 서비스의 자유도가 높아지고 서버에서 불필요한 정보를 관리하지 않음으로써 구현이 단순하다.

#### Cacheable (캐시 가능)

HTTP 프로토콜의 인프라를 그대로 사용하므로 HTTP가 가진 캐싱 기능이 적용 가능하다. HTTP 프로토콜 표준에서 사용하는 Last-Modified태그나 E-Tag를 이용하면 캐싱 구현이 가능하다.

#### Self-descriptiveness (자체 표현 구조)

REST API 메시지만 보고도 이를 쉽게 이해 할 수 있다.

#### Client - Server 구조

REST 서버는 API 제공, 클라이언트는 사용자 인증이나 컨텍스트(세션, 로그인 정보)등을 직접 관리하는 구조로 각각의 역할이 확실히 구분되기 때문에 클라이언트와 서버에서 개발해야 할 내용이 명확해지고 서로간 의존성이 줄어들게 된다.

#### 계층형 구조

REST 서버는 다중 계층으로 구성될 수 있다. API Server는 순수 비즈니스 로직을 수행하고 그 앞단에 보안, 로드밸런싱, 암호화, 사용자 인증 등을 추가하여 구조상의 유연성을 줄 수 있다. 또한 PROXY, 게이트웨이 같은 네트워크 기반의 중간매체를 사용할 수 있다.





## REST API 설계

### REST API 규칙

- `URI`는 정보의 자원을 표현 (리소스명은 명사를 사용)

- 자원에 대한 행위는 `HTTP Method`(GET, POST, PUT, DELETE 등)로 표현

```
GET /members/delete/1 (x)
DELETE /members/1     (o)
```



### REST API 설계시 주의할 점

- 슬래시 구분자(/)는 계층 관계를 나타내는 데 사용한다.

```
http://restapi.example.com/houses/apartments
http://restapi.example.com/animals/mammals/whales
```

- URI 마지막 문자로 슬래시(/)를 포함하지 않는다. URI에 포함되는 모든 글자는 리소스의 유일한 식별자로 사용되어야 한다.

- 밑줄(_)은 URI에 사용하지 않는다. 밑줄은 보기 어렵거나 밑줄 때문에 문자가 가려질 위험이 있다.

- 대신 가독성을 높이기 위해 하이픈(-)을 사용한다.

- URI 경로에 대문자 사용은 피하도록 해야 한다. 대소문자에 따라 다른 리소스로 인식하게 된다. RFC 3986(URI 문법 형식)은 URI 스키마와 호스트를 제외하고는 대소문자를 구별하도록 규정하기 때문이다.

- 파일 확장자는 URI에 포함시키지 않는다.

```
http://restapi.example.com/members/soccer/345/photo.jpg (x)

REST API에서는 메시지 바디 내용의 포맷을 나타내기 위한 파일 확장자를 
URI 안에 포함시키지 않고 Accept header를 사용한다.
```





## REST API 요청 예시

python으로 간단하게 요청 코드를 짜보았다. 

```python
import requests

url = 'http://restapi.example.com/members'
headers = { 
  'Accept': 'application/json', 'Content-Type': 'application/json' 
} # json 형식으로 주고 받음
data = { 'username': 'username' }

r = requests.post(url=url, json=data, headers=headers)

print(r.json()) 
# {'code': 200, 'data': 'success'}
```





## 참조

- https://meetup.toast.com/posts/92
- https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html
- https://www.slipp.net/wiki/pages/viewpage.action?pageId=12878219
- [https://www.a-mean-blog.com/ko/blog/%ED%86%A0%EB%A7%89%EA%B8%80/_/REST%EC%99%80-RESTful-API](https://www.a-mean-blog.com/ko/blog/토막글/_/REST와-RESTful-API)
- https://ko.wikipedia.org/wiki/REST