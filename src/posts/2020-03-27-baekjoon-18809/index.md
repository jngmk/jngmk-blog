---
title: '백준 18809번 Gaaaaaaaaaarden'
date: '2020-03-28 01:07'
slug: '/dev/algorithm/2020-03-27-baekjoon-18809'
category1: 'dev'
category2: 'algorithm'
tags: ['algorithm', 'baekjoon', '시뮬레이션', '조합', '그래프', 'BFS', 'python']
---



정말 오랜만에 알고리즘 문제를 하나 풀었다. 삼성 코테 스타일의 시뮬레이션 문제였고, 조합과 BFS를 사용하여 해결했다. 

<!-- end -->

문제: [https://www.acmicpc.net/problem/18809](https://www.acmicpc.net/problem/18809)



##  문제 요약

input 첫 줄에는 N, M, G, R (행, 열, 녹색 배양액 개수, 적색 배양액 개수) 이 주어지고, 아랫 줄부터 N * M 모양의 배열이 주어진다. (단, 2 < N, M <= 50, 1 <= G, R <= 5)

배열은 0, 1, 2의 값을 가지고 있는데, 0은 호수, 1은 배양액을 뿌릴 수 없는 땅, 2는 배양액을 뿌릴 수 있는 땅이다. 배양액은 매 초마다 인접한 땅으로 퍼지는데, 배양액이 있거나, 호수로는 퍼지지 않는다. 

배양액은 녹색과 적색이 있는데, 주어진 배양액은 모두 사용해야한다. 각각 다른 땅에 배치해야하며 동시에 퍼진다. 녹색과 적색이 동시에 같은 땅에 퍼진다면 꽃이 피어나고, 꽃이 피어나면 배양액이 사라지기 때문에 더이상 배양액이 퍼지지 않는다.

이러한 조건에서 피울 수 있는 꽃의 최대 개수를 구해야 한다. 



## 문제 풀이

[전체 코드 보기]([https://github.com/jngmk/Training/blob/master/Python/BAEKJOON/18809%20Gaaaaaaaaaarden/18809.py](https://github.com/jngmk/Training/blob/master/Python/BAEKJOON/18809 Gaaaaaaaaaarden/18809.py))

문제를 풀는 과정은 다음과 같다.

1. 배양액을 뿌릴  땅을 선정하고,
2. 녹색 배양액을 뿌릴 땅과 적색 배양액을 뿌릴 땅을 나누고,
3. 완전 탐색을 하면서 피우는 꽃의 개수를 구한다.



### 함수 선언

배양액을 뿌릴 `땅의 index` 를 조합을 사용해서 구했다. 조합의 경우 중 한 가지가 완성되면, 녹색 배양액과 적색 배양액을 뿌릴 땅을 구하는 함수를 실행시켰다.

```python
def select_soil(k, now, soil_idx):
    if k == G + R:
        green_or_red(soil_idx, 0, 0, [])
    else:
        for s in range(now, S):
            select_soil(k+1, s+1, soil_idx + [s])
```



녹색 배양액과 적색 배양액을 뿌릴 `땅의 좌표` 를 조합을 사용해서 구했고, 땅의 좌표 리스트를 solve 함수로 보냈다.

```python
def green_or_red(soil_idx, k, now, temp):
    if k == G:
        green, red = [], []
        for i in range(G+R):
            if i in temp:
                green.append(soil[soil_idx[i]])
            else:
                red.append(soil[soil_idx[i]])
        solve(green, red)
    else:
        for s in range(now, G+R):
            green_or_red(soil_idx, k+1, s+1, temp + [s])
```



solve 함수에서는 원본 배열을 복사한 후, 인자로 넘겨받은 녹색 배양액 좌표 리스트와 적색 배양액 좌표 리스트를 돌면서 복사 배열에 위치를 표시했다.

```python
def solve(green, red):
    global max_flower

    flower = 0
    # 0: 호수, 1, 2: 퍼질 수 있는 땅, 3: green, 4: red
    copy = [board[n][:] for n in range(N)]
    for (n, m) in green:
        copy[n][m] = 3
    for (n, m) in red:
        copy[n][m] = 4
```



꽃은 녹색 배양액과 적색 배양액이 동시에 한 땅에 합쳐졌을 때 생성되므로, **더 이상 퍼뜨려질 녹색 배양액과 적색 배양액이 없는 경우를 탈출 조건으로 삼았다.** 

```python
    # 초록색, 빨간색 순서로 진행
    while True:
        if not green or not red: break
```



녹색 배양액 리스트를 돌면서 복사한 배열에 퍼뜨리고, 적색 배양액 리스트를 돌면서 같은 작업을 진행하는 것을 한 사이클로 해서 while 문을 돌았다. **이미 지나버린 시간의 배양액은 더 이상 의미가 없으므로, pop 한 좌표의 값은 0으로 바꿔줬다.** 

녹색 -> 적색의 순서이기 때문에 적색 배양액을 퍼뜨릴 땅에 녹색 배양액이 있다면 꽃의 개수를 증가시켜주고, 배양액이 더이상 퍼지지 않도록 값을 0으로 바꿔줬다. 

**이 때 주의할 점이 녹색 배양액이 퍼뜨려진 땅에 적색 배양액이 합쳐져 꽃이 피면 더 이상 배양액이 퍼지면 안되는데, tmp_green 리스트에는 그 정보가 반영되지 않았다는 것이다.** 그래서 녹색 배양액을 퍼뜨릴 때, pop 한 좌표의 값이 0이라면 배양액을 퍼뜨리지 않도록 조건문을 만들었다.

```python
        tmp_green = []
        while green:
            n, m = green.pop(0)
            # 녹색 배양액을 뿌렸었는데 꽃이 된 곳은 지나침
            if copy[n][m] == 0: continue
            copy[n][m] = 0
            for nn, nm in (0, -1), (0, 1), (1, 0), (-1, 0):
                vn, vm = n + nn, m+nm
                if not (0 <= vn < N and 0 <= vm < M): continue
                if copy[vn][vm] == 1 or copy[vn][vm] == 2:
                    tmp_green.append((vn, vm))
                    copy[vn][vm] = 3
        green = tmp_green

        tmp_red = []
        while red:
            n, m = red.pop(0)
            copy[n][m] = 0
            for nn, nm in (0, -1), (0, 1), (1, 0), (-1, 0):
                vn, vm = n + nn, m + nm
                if not (0 <= vn < N and 0 <= vm < M): continue
                if copy[vn][vm] == 1 or copy[vn][vm] == 2:
                    tmp_red.append((vn, vm))
                    copy[vn][vm] = 4
                elif copy[vn][vm] == 3:
                    copy[vn][vm] = 0
                    flower += 1
        red = tmp_red

    max_flower = max(flower, max_flower)
```



### 변수 설정, 함수실행, 결과 출력

```python
N, M, G, R = map(int, input().split())
board = [list(map(int, input().split())) for _ in range(N)]
soil = []

# 배양액 뿌릴 수 있는 땅
for n in range(N):
    for m in range(M):
        if board[n][m] == 2:
            soil.append((n, m))

S = len(soil)
max_flower = 0
select_soil(0, 0, [])

print(max_flower)
```



