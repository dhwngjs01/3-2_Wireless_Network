# 3-2_Wireless_Network

## 라즈베리파이 초기 설정

#### 1. 정적 네트워크 주소 설정
```
sudo nano /etc/dhcpcd.conf
```

아래로 스크롤 후 주석 제거

```
# Example static IP configuration
interface eth0
static ip_address=192.168.0.10/24
static ip6_address=fd51:42f8:caae:d92e:ff/64
static routers=192.168.0.1
static domain_name_servers=192.168.0.1 8.8.8.8 fd51:42f8:caae:d92e::1
```


#### 2. 패키지 업데이트
```
sudo apt update
sudo apt upgrade # 이건 시간 꽤 걸림
```

#### 3. 한글 표기 및 입력 설정
```
sudo apt-get install -y fonts-unfonts-core
sudo apt-get install -y ibus ibus-hangul
sudo init 6
```

---

## InfluxDB 설치 
  - InfluxDB download key using wget
```
wget -q https://repos.influxdata.com/influxdata-archive_compat.key
echo '393e8779c89ac8d958f81f942f9ad7fb82a25e133faddaf92e15b16e6ac9ce4c influxdata-archive_compat.key' | sha256sum -c && cat influxdata-archive_compat.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg > /dev/null
echo 'deb [signed-by=/etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg] https://repos.influxdata.com/debian stable main' | sudo tee /etc/apt/sources.list.d/influxdata.list
```
  - Packages are up to date && install Influxdb
```
 sudo apt-get update && sudo apt-get install influxdb -y

```
  - InfluxDB as a background service on startup
```
sudo service influxdb start
```
  - InfluxDB is status (service)
```
sudo service influxdb status
```
  
## InfluxDB 데이터베이스 만들기

```
$ influx

>create database <데이터베이스이름>
확인 : show databases 
```

# Grafana Installation

## 1. Repository의 GPG key를 더하기
```
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

## 2. Repository를 더하기
```
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

## 3. 프로그램 설치
```
sudo apt update
sudo apt install grafana
```

## 4. 프로그램 실행
```
sudo service grafana-server start
```
## influxdb import with python
```
pip install influxdb
```

# Camera && TelegramBot
## TelegramBot 설치
```
pip install python-telegram-bot --upgrade
git clone https://github.com/python-telegram-bot/python-telegram-bot --recurisive
```

## PI 카메라 연결
  - Legacy Camera disable
```
libcamera-hello -t 0
```

  - Python Lib 설치
```
pip install picamera2
```

  - Error
```
libEGL warning : DRI2: failed to authenticate
Made X/EGL preview window
[1773] INFO Camera camera_manager.cpp:297 libcamera v0.0.5+83-bde9b04f
ERROR: *** no cameras available ***
```

  - 참고
```
https://github.com/raspberrypi/picamera2/blob/main/examples/capture_png.py
```
