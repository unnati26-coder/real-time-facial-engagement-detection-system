# Real-Time Facial Engagement Detection System

## Overview
An AI-powered real-time classroom engagement and facial expression monitoring system built using React, OpenCV, CNN, and WebSockets.

The system analyzes live webcam feeds to detect student facial expressions and engagement levels while displaying real-time engagement indicators on an interactive teacher dashboard.

---

## Features
- Real-time facial expression recognition
- Classroom engagement monitoring
- Webcam-based face detection
- CNN-based emotion classification
- Interactive teacher dashboard
- Live engagement indicators
- WebSocket-based real-time communication
- Multi-student classroom simulation
- Responsive React interface
- Real-time OpenCV visualization

---

## Tech Stack
- React.js
- JavaScript
- Python
- TensorFlow
- Keras
- OpenCV
- CNN
- WebSockets
- Vite
- Tailwind CSS
- NumPy
- Haar Cascade Classifier

---

## System Workflow
1. Capture webcam video feed
2. Detect human faces using Haar Cascade
3. Process facial images using CNN model
4. Predict facial emotions and engagement levels
5. Send real-time updates through WebSockets
6. Display engagement indicators on teacher dashboard

---

## Key Highlights
- Real-time facial emotion recognition
- Interactive teacher monitoring dashboard
- CNN-based emotion classification
- Live webcam inference support
- WebSocket-based communication system
- Responsive classroom monitoring interface

---

## Emotion Classes
- Angry
- Disgust
- Fear
- Happy
- Sad
- Surprise
- Neutral

---

## Project Structure

```text
real-time-facial-engagement-detection-system/
│
├── frontend/
│   ├── App.jsx
│   ├── VideoTile.jsx
│   ├── main.jsx
│   ├── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── engagement_server.py
│   └── webcam_test.py
│
├── models/
│   ├── Facial Expression Recognition.json
│   ├── fer.h5
│   └── haarcascade_frontalface_default.xml
│
├── screenshots/
│   ├── dashboard.png
│   └── emotion-detection.png
│
├── README.md
├── requirements.txt
└── .gitignore
```

---

## Installation

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python engagement_server.py
```

### CNN Emotion Detection

```bash
cd backend
python webcam_test.py
```

---

## Future Enhancements
- Eye tracking
- Attendance analytics
- Cloud deployment
- Multi-classroom monitoring
- Emotion analytics dashboard

---

## Author
Unnati Lunawat