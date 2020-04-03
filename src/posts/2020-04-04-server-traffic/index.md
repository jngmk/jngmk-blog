---
title: '프로그래머스 추석 트래픽'
date: '2020-04-04 00:33'
slug: '/dev/algorithm/2020-04-04-server-traffic'
category1: 'dev'
category2: 'algorithm'
tags: ['algorithm', 'programmers', '완전탐색', 'python']
---

###### 2018년 카카오 기출문제 **추석 트래픽** 문제이다. 익숙하지 않은 시간 데이터가 들어와서 어떻게 처리할지 고민됐다.

<!-- end -->



## 문제 요약

문제: https://programmers.co.kr/learn/courses/30/lessons/17676

로그 데이터가  ["2016-09-15 01:00:04.001 2.0s", "2016-09-15 01:00:07.000 2s"] 이런식으로 주어진다.

요청이 끝난 시간이 **2016-09-15 01:00:04.001** 이고, 처리 시간이 **2.0s** 이다. 이 때 **처리시간은 시작시간과 끝시간을 포함**한다.즉, 이 로그는 **01:00:02.002 ~ 01:00:04.001**동안 처리된 것이다.

문제에서 요구하는 것은 전체 기간 중에 1초 동안 서버 요청을 가장 많이 처리한 구간의 요청 개수이다. 





## 문제 풀이

우선 주어진 시간 데이터를 모두 `초(second)` 로 환산하였다. 처리하기 좋게 `split` 함수를 사용했고, `map` 함수로 `float` 로 타입을 바꿔주었다. 시간 데이터를 환산할 때 왜인지 모르겠지만 `0.001` 만 더해줬을 뿐인데 자꾸 `0.00000000004` 와 같은 오차가 생겨서 `round` 함수로 자릿수를 맞춰주었다.

전체 로그를 돌면서 로그의 시작 시간과 끝 시간의 앞뒤 1초를 구간으로 잡고, 그 안에 몇 개의 로그가 포함되어있는지 확인했다. **이 때 1초라는 처리사간은 시작시간과 끝시간을 포함**하기 때문에, 비교 연산을 할 때 `e < start` 이런식으로 시작시간을 포함시켜주지 않아야한다.

```python
def solution(lines):
    max_ans = 0
    times = []
    for line in lines:
        date, time, elapsed = line.split()
        time = list(map(float, time.split(':')))
        end_time = time[0] * 60 * 60 + time[1] * 60 + time[2]
        end_time = round(end_time, 3)
        start_time = end_time - float(elapsed[:-1]) + 0.001
        start_time = round(start_time, 3)
        times.append([start_time, end_time])

    for time in times:
        for t in time:
            for dt in -1, 1:
                start, end = list(sorted([t, t+dt]))
                ans = 0
                for s, e in times:
                    if not (e < start or end <= s): ans += 1
                max_ans = max(max_ans, ans)
    return max_ans

```

