---
title: '프로그래머스 블록 이동하기'
date: '2020-04-03 00:11'
slug: '/dev/algorithm/2020-04-03-move-the-blocks'
category1: 'dev'
category2: 'algorithm'
tags: ['algorithm', 'programmers', '시뮬레이션', 'bfs', 'python']

---

###### 2020년 카카오 공채 기출문제 **블록 이동하기** 문제이다. 미로를 탈출하는 문제인데, 보통 이동시키는 대상의 길이가 1인데 반면 이 문제의 경우 2였다.

<!-- end -->



## 문제 요약

문제: https://programmers.co.kr/learn/courses/30/lessons/60063

이동시키는 대상의 길이가 `2` 이다. (e.g. [[0,0], [0,1]]) 

이 문제에서는 이동시키는 대상이 `회전` 도 하기 때문에 `회전` 을 할 수 있는 경우에 맞게 잘 `회전` 을 시키고 `visited` 를 잘 구현해야한다.



## 문제 풀이

이동과 회전이 불가능할 때와 visited 를 잘 구현하면 무난히 해결할 수 있었다.

내 경우엔 `visited` 를 `bike` 의 `후미 (rear)` 를 기준으로 가로일 때와 세로일 때를 구별해서 기록했다.

이 방법은 안 되겠다고 생각이 들어서 주어진 순서대로 한 가지씩 실행해보면서, 작업을 수행한 뒤에도 모든 구조물들이 주어진 조건에 맞는지 확인을 했다. 생각을 이렇게 전환하고 나니 코드가 간결해졌다.

```python
from collections import deque


def solution(board):
    answer = 0
    N = len(board)
    visited = [[[0, 0] for _ in range(N)] for _ in range(N)]

    state = 0  # 0: 가로, 1: 세로
    bike = [[0, 0], [0, 1]]
    visited[0][0][0] = 1

    q = deque([[0, state, bike]])
    while q:
        cnt, s, bike = q.popleft()
        r, f = bike  # rear - front

        if f == [N-1, N-1]:
            answer = cnt
            break

        # move
        for dr, dc in (-1, 0), (1, 0), (0, -1), (0, 1):
            r1, r2, f1, f2 = r[0] + dr, r[1] + dc, f[0] + dr, f[1] + dc
            if not (0 <= r1 and 0 <= r2 and f1 < N and f2 < N): continue
            if board[r1][r2] == 1 or board[f1][f2] == 1: continue
            if visited[r1][r2][s]: continue
            nxt = [[r1, r2], [f1, f2]]
            visited[r1][r2][s] = 1
            q.append([cnt+1, s, nxt])

        # rotate
        for dr, dc, s in (-1, 0, 0), (1, 0, 0), (0, -1, 1), (0, 1, 1):
            r1, r2, f1, f2 = r[0] + dr, r[1] + dc, f[0] + dr, f[1] + dc
            if s == 0 and not (0 <= r1 < N and 0 <= f1 < N): continue
            if s == 1 and not (0 <= r2 < N and 0 <= f2 < N): continue
            if board[r1][r2] == 1 or board[f1][f2] == 1: continue

            # 회전 후 rear 부분의 좌표
            rr1, rr2 = min(r1, r[0]), min(r2, r[1])
            if not (visited[rr1][rr2][s^1]):
                nxt = list(sorted([[r1, r2], [r[0], r[1]]]))
                visited[rr1][rr2][s^1] = 1
                q.append([cnt+1, s^1, nxt])

            ff1, ff2 = min(f1, f[0]), min(f2, f[1])
            if not (visited[ff1][ff2][s^1]):
                nxt = list(sorted([[f1, f2], [f[0], f[1]]]))
                visited[ff1][ff2][s^1] = 1
                q.append([cnt+1, s^1, nxt])

    return answer

```

