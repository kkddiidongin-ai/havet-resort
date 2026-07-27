#!/usr/bin/env python3
"""GitHub API를 통해 변경된 파일들을 직접 업데이트하는 스크립트"""
import subprocess
import base64
import json
import urllib.request
import urllib.error
import os

# 이전에 성공한 태그 push에서 사용한 방식: GH_TOKEN="" gh api
# gh CLI의 내부 keyring/credential 사용

def gh_api(method, path, data=None):
    """gh CLI를 통해 GitHub API 호출"""
    cmd = ['gh', 'api', path, '-X', method]
    if data:
        for k, v in data.items():
            cmd += ['-f', f'{k}={v}']
    env = os.environ.copy()
    env['GH_TOKEN'] = ''  # GH_TOKEN 비워서 gh 자체 인증 사용
    result = subprocess.run(cmd, capture_output=True, text=True, env=env)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        return None
    return json.loads(result.stdout) if result.stdout.strip() else None

def get_file_sha(repo, filepath):
    """원격 파일의 SHA 가져오기"""
    result = gh_api('GET', f'repos/{repo}/contents/{filepath}')
    if result:
        return result.get('sha')
    return None

def update_file(repo, filepath, content, message, file_sha=None):
    """파일 업데이트"""
    encoded = base64.b64encode(content.encode('utf-8')).decode('utf-8')
    data = {
        'message': message,
        'content': encoded,
    }
    if file_sha:
        data['sha'] = file_sha
    
    cmd = ['gh', 'api', f'repos/{repo}/contents/{filepath}', '-X', 'PUT',
           '-f', f'message={message}',
           '-f', f'content={encoded}']
    if file_sha:
        cmd += ['-f', f'sha={file_sha}']
    
    env = os.environ.copy()
    env['GH_TOKEN'] = ''
    result = subprocess.run(cmd, capture_output=True, text=True, env=env)
    if result.returncode == 0:
        print(f"✓ {filepath} 업데이트 완료")
        return True
    else:
        print(f"✗ {filepath} 실패: {result.stderr[:200]}")
        return False

REPO = 'kkddiidongin-ai/havet-resort'

# 변경된 파일 목록
changed_files = [
    'css/style.css',
    'index.html',
    'reservation.html', 
    'restaurant.html',
    'rooms.html',
    'room_royal.html',
    'room_grand.html',
    'room_ocean_a.html',
    'room_ocean_b.html',
    'room_skyloft_a.html',
    'room_skyloft_b.html',
    'about.html',
    'access.html',
    'community.html',
    'enjoy_summer.html',
    'enjoy_winter.html',
    'facility.html',
    'gallery.html',
]

for filepath in changed_files:
    local_path = f'/home/ubuntu/havet/{filepath}'
    if not os.path.exists(local_path):
        print(f"스킵 (파일 없음): {filepath}")
        continue
    
    with open(local_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    file_sha = get_file_sha(REPO, filepath)
    update_file(REPO, filepath, content, 
                '전체 사이트 폰트 세리프 변경: Cormorant Garamond(영문) + Noto Serif KR(한글)',
                file_sha)

print("\n완료!")
