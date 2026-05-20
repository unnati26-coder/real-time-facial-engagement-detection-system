import asyncio
import json
import websockets
import cv2
import numpy as np
import os

# Uses your existing haarcascade file from the project root if available
DEFAULT_CASCADE = os.path.join(os.path.dirname(__file__), '..', 'Facial-Expression-Detection-using-CNN-Real-Time-Recognition-with-Webcam-main (1)', 'Facial-Expression-Detection-using-CNN-Real-Time-Recognition-with-Webcam-main', 'haarcascade_frontalface_default.xml')
CASCADE_PATH = os.environ.get('HAAR_CASCADE', DEFAULT_CASCADE)

face_cascade = cv2.CascadeClassifier(CASCADE_PATH)
if face_cascade.empty():
    raise RuntimeError(f"Failed to load Haar cascade at {CASCADE_PATH}")

async def camera_loop(websocket):
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        await websocket.send(json.dumps({"error": "camera_open_failed"}))
        return
    try:
        while True:
            ok, frame = cap.read()
            if not ok:
                await asyncio.sleep(0.05)
                continue
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(80, 80))
            seeing = len(faces) > 0
            msg = {"studentId": "s0", "seeing": bool(seeing)}
            try:
                await websocket.send(json.dumps(msg))
            except Exception:
                break
            await asyncio.sleep(0.2)
    finally:
        cap.release()

async def handler(websocket):
    await camera_loop(websocket)

async def main():
    async with websockets.serve(handler, 'localhost', 8765):
        print('Engagement server running on ws://localhost:8765 (Ctrl+C to stop)')
        await asyncio.Future()

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass



