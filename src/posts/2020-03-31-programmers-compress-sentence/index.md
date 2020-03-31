---
title: '프로그래머스 문자열 압축'
date: '2020-03-31 22:21'
slug: '/dev/algorithm/2020-03-31-programmers-compress-sentence'
category1: 'dev'
category2: 'algorithm'
tags: ['algorithm', 'programmers', '완전탐색', 'python']
---

###### 2020년 카카오 공채 기출문제 **문자열 압축** 문제이다. 그냥 모든 경우 다 확인하면 되는 비교적 간단한 문제였다.

<!-- end -->



## 문제 요약

문제: https://programmers.co.kr/learn/courses/30/lessons/60057

예를 들어, abcabcabcabcdededededede 와 같은 문자열이 있었다고 가정하자. 이 문자열은 반복되는 단어를 요약함으로써 요약할 수 있다.  (문자열의 최대길이는 1000이고, 소문자로만 이루어져 있다.)

길이가 2인 문자열로 요약하면 abcabcabcabc6de 되고, 길이가 3인 문자열로 요약하면 4abcdededededede 이 된다. 위의 문자열의 경우 6인 문자열로 요약한 2abcabc2dedede 가 길이가 14로 가장 짧다. 

이렇게 하나씩 살펴서 가장 짧게 압축될 때의 길이는 얼마인지 구해야 한다.

주의할 점은 문자열을 제일 앞부터 정해진 길이만큼 잘라야 한다. 따라서 주어진 문자열을 x / ababcdcd / ababcdcd 로 자르는 것은 불가능하다.



## 문제 풀이

문제를 해결하는 순서는 다음과 같다.

1. 압축한 문자열의 길이의 최댓값은 원본 문자열의 길이이다.
2. 첫 반복문을 통해서 길이가 `i` 인 문자열로 슬라이싱
3. `before_word` 와 `cur_word의` 비교를 통해 정답 도출
4. `count` 를 하는 이유는 aaaaaaaaaa 처럼 같은 문자열이 10회 이상 반복되는 경우 **9a** 에서 **10a** 로 전체 길이에 변동이 있기 때문이다.

```python
def solution(s):
    length = len(s)
    answer = length
    for i in range(1, (length//2)+1):
        before_word = ''
        sentence = ''
        count = 1
        for j in range(0, length, i):
            cur_word = s[j:j+i]
            if before_word == cur_word:
                count += 1
            else:
                if count != 1:
                    sentence += str(count)
                    count = 1
                before_word = cur_word
                sentence += before_word
        if count != 1:
            sentence += str(count)
        answer = min(answer, len(sentence))
    return answer
```

