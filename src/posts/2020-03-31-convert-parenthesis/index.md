---
title: '프로그래머스 괄호 변환'
date: '2020-03-31 23:41'
slug: '/dev/algorithm/2020-03-31-convert-parenthesis'
category1: 'dev'
category2: 'algorithm'
tags: ['algorithm', 'programmers', '재귀', 'python']
---

###### 2020년 카카오 공채 기출문제 **문자열 압축** 문제이다. 주어진 명세대로 코드를 짜면 무난하게 풀 수 있다.

<!-- end -->



## 문제 요약

문제: https://programmers.co.kr/learn/courses/30/lessons/60058

사실 이 문제는 주어진 명세대로 재귀함수를 구현할 수 있는지 확인하려고 출제한 것 같다. 재귀함수만 구현할 줄 알면 해결할 수 있는 문제이다



## 문제 풀이

`균형잡힌 괄호 문자열` 을 구하기 위해 `is_balance` 함수, `올바른 괄호 문자열` 을 구하기 위해 `is_correct` 함수, `재귀` 를 위한 `solve` 함수를 구현했다.

```python
def solution(p):
    if is_correct(p): return p

    answer = solve(p)
    return answer


def solve(parenthesis):
    if parenthesis == '': return ''

    answer = ''
    slice_num = is_balance(parenthesis)
    u, v = parenthesis[:slice_num], parenthesis[slice_num:]
    if is_correct(u):
        answer += u
        answer += solve(v)
        return answer
    else:
        answer += '('
        answer += solve(v)
        answer += ')'

        for i in range(1, len(u)-1):
            if u[i] == '(':
                answer += ')'
            else:
                answer += '('
        return answer


def is_correct(parenthesis):
    stack = []
    for p in parenthesis:
        if p == '(':
            stack.append('p')
        else:
            if not stack: return False
            stack.pop()

    if stack: return False
    return True


def is_balance(parenthesis):
    left, right = 0, 0

    length = len(parenthesis)
    for i in range(length):
        if parenthesis[i] == '(':
            left += 1
        else:
            right += 1

        if left == right: return i + 1

    return length
```

