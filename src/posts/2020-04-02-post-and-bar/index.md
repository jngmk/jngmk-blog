---
title: '프로그래머스 기둥과 보 설치'
date: '2020-04-02 20:27'
slug: '/dev/algorithm/2020-04-02-post-and-bar'
category1: 'dev'
category2: 'algorithm'
tags: ['algorithm', 'programmers', '시뮬레이션', 'python']
---

###### 2020년 카카오 공채 기출문제 **기둥과 보 설치** 문제이다. 주어진 규칙에 따라 구현해야 하는데 실수하기 쉬운 문제이다.

<!-- end -->



## 문제 요약

문제: https://programmers.co.kr/learn/courses/30/lessons/60061

숙지해야 할 규칙이 많은 편이다. 이런 경우 규칙 하나를 놓치거나 잘못 해석하면 그 날은 문제를 풀 수 못할 수도 있다.

주어진 규칙에 맞게 기둥과 보를 설치할 수 있는지, 혹은 제거할 수 있는지 확인해서 되는 경우만 진행해야 한다.



## 문제 풀이

처음에는 기둥과 보가 설치되는 조건을 찾고, 제거되는 조건을 찾아서 하드 코딩을 하려고 했었다. 이렇게 접근하니까 모든 조건을 다 찾아내기가 쉽지 않았고, 계속 오답만 출력하게 되었다. 테스트 케이스도 2개밖에 없어서, 디버깅도 힘들었다.

이 방법은 안 되겠다고 생각이 들어서 주어진 순서대로 한 가지씩 실행해보면서, 작업을 수행한 뒤에도 모든 구조물들이 주어진 조건에 맞는지 확인을 했다. 생각을 이렇게 전환하고 나니 코드가 간결해졌다.

```python
def solution(n, build_frame):
    frames = dict()
    answer = []

    for build in build_frame:
        x, y, a, b = build  # 0: 기둥, 1: 보, 0: 삭제, 1: 설치
        if b == 1:
            frames.update({(x, y, a): 1})
            if check(frames.keys()):
                continue
            frames.pop((x, y, a))
        else:
            frames.pop((x, y, a))
            if check(frames.keys()):
                continue
            frames.update({(x, y, a): 1})
    for x, y, a in sorted((frames.keys())):
        answer.append([x, y, a])
    return answer


def check(frames):
    for x, y, a in frames:
        if a == 0:
            if not (y == 0 or (x, y, 1) in frames or (x-1, y, 1) in frames 
                    or (x, y-1, 0) in frames):
                return False
        else:
            if not ((x, y-1, 0) in frames or (x+1, y-1, 0) in frames 
                    or ((x-1, y, 1) in frames and (x+1, y, 1) in frames)):
                return False
    return True

```



