---
title: 'OpenCV, dlib 을 이용한 얼굴인식'
date: '2020-03-19 14:33'
slug: '/dev/python/2020-03-19-face-recognition-with-openCV-and-dlib'
category1: 'dev'
category2: 'python'
tags: ['python', 'dlib', 'openCV', 'colab']
---

###### 연예인 닮은꼴 찾기, 스마트폰에서 인물별 사진 분류 기능 등에 사용되는 얼굴인식 기능을 구현해봤다. 매우 기초적인 방법으로 진행했고,  [openCV](https://opencv.org/) 와 dlib 기반의[ face-recognition 1.3.0](https://pypi.org/project/face-recognition/) 패키지를 사용했다.

<!-- end -->

## Face Detection

동일인인지 아닌지 얼굴을 구분하려면, 인물의 얼굴을 잘 찾아야한다. 그래서 인물 사진에서 얼굴을 탐지하는 코드를 먼저 작성했다.

### colab notebook 설정

제일 먼저, `수정` - `노트설정` 에서 `런타임 유형` 을 `Python3` , `하드웨어 가속기` 를 `GPU` 로 바꿔준다.



### Google Drive 연동

얼굴인식을 할 사진을 구글 드라이브에서 불러오기 위해 구글 드라이브 연동코드를 입력해준다. 왼쪽 코드 스니펫 에서 `mounting google drive` 를 검색해서 코드를 실행시켜줘도 된다. 코드를 실행시킨 후 인증코드까지 입력하면 연동이 완료된다.

```python
from google.colab import drive
drive.mount('/gdrive')
```



### Library 불러오기

사용할 라이브러리를 설치해주고,

```python
pip install face_recognition opencv-python matplotlib
```

불러와준다.

```python
import cv2, os
import face_recognition as fr
from IPython.display import Image, display
from matplotlib import pyplot as plt
```



### 사진 불러오기

```python
image_path = '/gdrive/My Drive/colab/face recognition/BTS.jpg'
image = fr.load_image_file(image_path)
```



### 얼굴 감지

`face_recognition` 패키지에 기본 `HOG` (Histogram of Oriented Gradient) 모델을 사용해 얼굴을 감지하고, `openCV` 의 drawing API를 이용해 사각형을 그려준다.

```python
face_locations = fr.face_locations(image)

for (top, right, bottom, left) in face_locations:
  # (그릴 곳, 시작점, 끝점, 색, 두께)
  cv2.rectangle(image, (left, top), (right, bottom), (0, 255, 0), 3)
```



### 이미지 출력

`matplotlib` 을 이용해 `openCV` 를 이용해 가공된 `image` 를 화면에 출력한다.

```python
plt.rcParams['figure.figsize'] = (16, 16)
plt.imshow(image)
plt.show()
```

아래와 같이 초록색 사각형이 그려졌다면 HOG 모델을 사용해 얼굴을 잘 찾

![bts](/Users/jngmk/Desktop/blog resource/2020-03-19-face-recognition-with-openCV-and-dlib/bts.png)





## Face Recognition


동일인인지 판단하는 얼굴 인식은 다음과 같이 진행된다. 

1. `face_recognition` 패키지에 있는 `face_location` 함수로 얼굴의 위치를 알아내 이미지를 `crop` 한다. 
2. `crop` 된 이미지를 `face_encodings` 함수로 인코딩하여 저장한다. 
3. 인코딩된 데이터를 `face_distance` 함수로 얼마나 유사한지를 구한다. 
4. 보통 타인이라고 구분하는 기준을 `0.5` ~ `0.6` 사이로 잡으며, 이 이상일 경우 타인이라 판단한다.



### 얼굴 데이터 저장

보진 않았지만 최근에 핫한 드라마인 이태원 클라쓰 배우들의 얼굴로 진행했다.

![이태원클라쓰](/Users/jngmk/Desktop/blog resource/2020-03-19-face-recognition-with-openCV-and-dlib/이태원클라쓰.jpg)



#### 이미지 불러오기

```python
image_path = '/gdrive/My Drive/colab/face recognition/이태원클라쓰.jpg'
image = fr.load_image_file(image_path)
```



#### 이미지에서 얼굴만 크롭하기

이미지를 크롭할 때 `slice(:)` 를 사용하는데, 원본 이미지가 잘리기 때문에 `image` 를 `tmp_image` 로 복사해서 사용했다.

```python
face_locations = fr.face_locations(image)

actor_faces = []
for (top, right, bottom, left) in face_locations:
  # 원본 이미지 복사
  tmp_image = image[:]
  # 이미지 크롭
  face_image = tmp_image[top:bottom, left:right]
  # 얼굴 저장
  actor_faces.append(face_image)
```



#### 크롭한 결과보기

아래와 같이 한 명씩 얼굴이 잘 잘려서 나온 것을 볼 수 있다.

```python
plt.rcParams['figure.figsize'] = (1, 1)

for face in actor_faces:
  plt.imshow(face)
  plt.show()
```

![얼굴 크롭 결과](/Users/jngmk/Desktop/blog resource/2020-03-19-face-recognition-with-openCV-and-dlib/얼굴 크롭 결과.png)



### 얼굴 인식 테스트

6명의 얼굴이 등록되어 있는데, 이 중 박서준의 얼굴로 테스트를 해보겠다. 

![박서준](/Users/jngmk/Desktop/blog resource/2020-03-19-face-recognition-with-openCV-and-dlib/박서준.jpg)



#### 얼굴 크롭하기

위와 마찬가지의 과정으로 얼굴을 크롭해준다.

```python
image_path = '/gdrive/My Drive/colab/face recognition/박서준.jpg'
image = fr.load_image_file(image_path)

face_locations = fr.face_locations(image)

for (top, right, bottom, left) in face_locations:
  park = image[top:bottom, left:right]

plt.rcParams['figure.figsize'] = (1, 1)
plt.imshow(park)
plt.show()
```

![박서준 얼굴](/Users/jngmk/Desktop/blog resource/2020-03-19-face-recognition-with-openCV-and-dlib/박서준 얼굴.png)



#### 얼굴 인코딩하기

`face_encodings` 함수를 사용해 인코딩해주자.

```python
enc_park_face = fr.face_encodings(park)
```



#### 인코딩 결과

결과를 출력해보면 아래와 같다. ~~(음..)~~

```python
plt.imshow(enc_park_face)
plt.show()
```

![인코딩 결과](/Users/jngmk/Desktop/blog resource/2020-03-19-face-recognition-with-openCV-and-dlib/인코딩 결과.png)



#### 등록된 얼굴들과 distance 비교하기

for loop 를 돌면서 face_distance 함수를 이용해 비교해주면 되는데, 왜 첫 번째 인자와 다르게, 두 번째 인자는 array 를 벗겨야 하는지 이유를 못 찾았다. 아무튼 결과는 아래와 같다.

```python
for face in actor_faces:
  # 등록된 배우 얼굴 인코딩하기
  enc_actor_face = fr.face_encodings(face)
	# 박서준 얼굴과의 거리 비교
  distance = fr.face_distance(enc_actor_face, enc_park_face[0])
  # 사진 타이틀 지정 및 출력
  plt.title('distance' + str(distance))
  plt.imshow(face)
  plt.show()
```

![거리 비교 결과](/Users/jngmk/Desktop/blog resource/2020-03-19-face-recognition-with-openCV-and-dlib/거리 비교 결과.png)

#### 결론

결과가 이상적으로 박서준만 0.5 ~ 0.6 이하로 나오진 않았지만, 박서준이 제일 거리가 가깝게 나온거면 잘된거 아닐까 싶다.