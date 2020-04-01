---
title: '프로그래머스 자물쇠와 열쇠'
date: '2020-04-01 20:55'
slug: '/dev/algorithm/2020-04-01-lock'
category1: 'dev'
category2: 'algorithm'
tags: ['algorithm', 'programmers', '완전탐색', 'python']
---

###### 2020년 카카오 공채 기출문제 **자물쇠와 열쇠** 문제이다. 배열을 주어진 조건에 맞게 잘 조작하는 것이 중요했다.

<!-- end -->



## 문제 요약

문제: https://programmers.co.kr/learn/courses/30/lessons/60059

`key` 와 `lock` 이 주어진다. `key` 는 `M*M`, `lock` 은 `N*N` 배열이다. (3 <= M <= N <= 20)

`key와` `lock의` 원소는 `0` 또는 `1` 로 이루어져 있다. `0` 은 홈 부분, `1` 은 돌기 부분을 나타낸다. 

열쇠는 회전과 이동이 가능하며 열쇠의 돌기 부분을 자물쇠의 홈 부분에 딱 맞게 채우면 자물쇠가 열린다. 자물쇠 영역을 벗어난 부분에 있는 열쇠의 홈과 돌기는 자물쇠를 여는 데 영향을 주지 않지만, 자물쇠 영역 내에서는 열쇠의 돌기 부분과 자물쇠의 홈 부분이 정확히 일치해야 하며 열쇠의 돌기와 자물쇠의 돌기가 만나면 안된다. 또한 자물쇠의 모든 홈을 채워야 자물쇠를 열 수 있다.

### 입출력 

| key                               | lock                              | result |
| --------------------------------- | --------------------------------- | ------ |
| [[0, 0, 0], [1, 0, 0], [0, 1, 1]] | [[1, 1, 1], [1, 1, 0], [1, 0, 1]] | true   |

## 문제 풀이

문제는 다음과 같은 순서로 해결했다.

1. 자물쇠의 홈의 개수와, 가장 상단 왼쪽에 있는 홈의 좌표를 저장한다. (이 때, 주의할 점은 자물쇠에 홈이 없을 수도 있다. 이것 때문에 런타임 에러가 계속 발생했었다...)
2. 열쇠를 회전하면서 돌기의 좌표를 리스트에 저장한다. 자물쇠를 위에서 아래로, 왼쪽에서 오른쪽으로 살펴볼 것이기 때문에, 같은 방향으로 돌기 좌표를 정렬한다.
3. 돌기 좌표 리스트에서 돌기 좌표를 하나씩 꺼내면서 홈과 돌기가 맞물리는지 등 자물쇠를 풀 수 있는 조건을 만족하는지 확인한다.

```python
def solution(key, lock):
    N = len(lock)
    v, vac = vacant(lock)

    if not vac: return True
    vac = vac[0]

    find = False
    for key in rotate(key):
        for i in range(len(key)):
            cnt = 0
            rr, cc = vac[0]-key[i][0], vac[1]-key[i][1]
            for j in range(i, len(key)):
                r, c = key[j]
                r, c = r+rr, c+cc
                if not (0 <= r < N and 0 <= c < N): continue
                if lock[r][c] == 1: break
                cnt += 1
            if cnt == v:
                find = True
                break
        if find: break
    if find: return True
    return False


def vacant(lock):
    N = len(lock)
    vac = []
    v = 0
    for r in range(N):
        for c in range(N):
            if lock[r][c] == 0:
                vac.append((r, c))
                v += 1
    return v, vac


def rotate(key):
    M = len(key)
    key1 = [(r, c) for r in range(M) for c in range(M) if key[r][c] == 1]
    key2 = [(M-r-1, c) for c, r in key1]
    key3 = [(r, M-c-1) for c, r in key1]
    key4 = [(M-r-1, M-c-1) for r, c in key1]

    key1 = quick_sort(key1)
    key2 = quick_sort(key2)
    key3 = quick_sort(key3)
    key4 = quick_sort(key4)

    return key1, key2, key3, key4


def quick_sort(arr):
    if not arr: return []
    pivot = arr[len(arr)//2]
    lesser, equal, greater = [], [pivot], []

    for pos in arr:
        if pos[0] < pivot[0]:
            lesser.append(pos)
        elif pos[0] > pivot[0]:
            greater.append(pos)
        else:
            if pos[1] < pivot[1]:
                lesser.append(pos)
            elif pos[1] > pivot[1]:
                greater.append(pos)

    return quick_sort(lesser) + equal + quick_sort(greater)
```

