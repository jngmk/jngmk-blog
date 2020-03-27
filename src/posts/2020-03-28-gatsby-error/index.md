---
title: 'Gatsby Error: Input file contains unsupported image format'
date: '2020-03-28 02:59'
slug: '/dev/gatsby/2020-03-28-gatsby-error-input-file-contains-unsupported-image-format'
category1: 'dev'
category2: 'gatsby'
tags: ['gatsby', 'error', 'manifest', 'sharp']
---



###### 오랜만에 포스팅을 하고 배포를 하는데 갑자기 에러가 발생했다. **Error: Input file contains unsupported image format** 라는 로그가 떴고, 이 에러로 고생하는 분들에게 도움이 되고자 글로 남긴다.

<!--end-->

## 에러 로그

이 블로그는 `gatsby` 로 생성하고 `netlify` 를 통해 배포하고 있다. 글을 포스팅하고 로컬 서버에서는 잘 작동했는데, 배포를 하면서 에러가 발생했다. 에러 로그는 다음과 같다.

```
2:05:25 AM: error "gatsby-plugin-manifest" threw an error while running the onPostBootstrap lifecycle:
2:05:25 AM: Input file contains unsupported image format
2:05:25 AM: 
2:05:25 AM:   Error: Input file contains unsupported image format
```



## 에러 해결

### ~~삽질~~

처음에는 에러 로그를 보고 image format 에 문제가 있는 줄 알고 구글링을 했다. 파비콘 icon 이 .ico 로 되어있거나 경로가 다르게 설정되었을 때 위와 같은 오류가 발생한다고 한다. 하지만 내 경우는 format 이나 directory 에는 이상이 없었다.

```js
{
      resolve: `gatsby-plugin-manifest`,
      options: {
        ...
        icon: `src/images/gatsby-icon.png`,
      },
    },
```



### 해결방법

`Gatsby github issue` 와 `stackoverflow` 를 뒤져도 해결이 안되길래 에라 모르겠다라는 마음으로 `gatsby-plugin-manifest` 를 재설치했다. 그리고 나서 로컬 서버를 실행시켰더니 다음과 같은 에러가 발생했다. 

```bash
It looks like there are multiple versions of "sharp" module installed.
Please update any packages that depend on "sharp".

To get a list of installed packages that depend on "sharp" try running:
 - npm list sharp (if you use npm)
 - yarn why sharp (if you use yarn)
 and update packages that depend on version older than latest listed in output of above command.

If an older version of "sharp" still persists and this error is displayed after updating your packages, open an issue in the package's repository and request them to update the "sharp" dependency.
```



`npm list sharp` 로 확인해봤더니, `sharp` library 가 세 개가 설치되어 있었는데 **버전이 달랐다.** manifest 플러그인을 다시 설치하기 전에 `sharp` 의 버전이 어땠는지 확인은 못했지만, sharp 의 버전이 달랐던 것이 문제였나 보다.

```bash
(base) jngmk@gimjeong-ui-MacBookPro jngmk-blog % npm list sharp
gatsby-starter-default@0.1.0 /Users/jngmk/Desktop/project/jngmk-blog
├─┬ gatsby-plugin-manifest@2.3.3
│ └── sharp@0.25.2 
├─┬ gatsby-plugin-sharp@2.4.13
│ └── sharp@0.23.4 
└─┬ gatsby-transformer-sharp@2.3.16
  └── sharp@0.23.4  deduped
```



그래서 오래된 버전의 플러그인을 update 해줬더니 에러가 해결되었다.

```bash
(base) jngmk@gimjeong-ui-MacBookPro jngmk-blog % npm list sharp
gatsby-starter-default@0.1.0 /Users/jngmk/Desktop/project/jngmk-blog
├─┬ gatsby-plugin-manifest@2.3.3
│ └── sharp@0.25.2 
├─┬ gatsby-plugin-sharp@2.5.3
│ └── sharp@0.25.2 
└─┬ gatsby-transformer-sharp@2.4.3
  └── sharp@0.25.2 
```

