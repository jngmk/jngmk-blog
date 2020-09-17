---
title: '[TIL] 2020.09.17'
date: '2020-09-17 21:51'
slug: '/til/app/2020-09-17-til'
category1: 'dev'
category2: 'til'
tags: ['til']
---



###### Mustache.js, Tabnabbing 과 rel=noopener 관한 내용 정리이다.

<!-- end -->

## Mustache.js


자바스크립트 템플릿 문법이 등장하기 전에 나온 라이브러리였을까? [npm](https://www.npmjs.com/package/mustache) 소개에서는 이렇게 편리하게 할 수 있다! 라고 예시를 보여주고 있다.

```js
var view = {
  title: "Joe",
  calc: function () {
    return 2 + 4;
  }
};
 
var output = Mustache.render("{{title}} spends {{calc}}", view);
```



## Tabnabbing 과 rel=noopener 

### Tabnabbing

`탭내빙(Tabnabbing)`이란 HTML 문서 내에서 링크(target이 _blank인 태그)를 클릭했을 때 새롭게 열린 탭(또는 페이지)에서 `window.opener` 의 기존 문서인 location을 피싱 사이트로 변경해 정보를 탈취하는 공격 기술을 말한다. 



### rel=noopener

`noopener` 속성을 이용하면 위의 위험을 어느정도 해결할 수 있다. `rel=noopener` 속성이 부여된 링크를 통해 열린 페이지는 `opener`의 `location`변경과 같은 자바스크립트 요청을 거부하기 때문이다.



### 참고

https://tech.lezhin.com/2017/06/12/tabnabbing

https://medium.com/@youngminhong/tabnabbing-%EA%B3%B5%EA%B2%A9-%EB%B0%A9%EC%96%B4-%EB%8C%80%EC%B1%85-%EC%A0%95%EB%A6%AC-9276ebf63f94

