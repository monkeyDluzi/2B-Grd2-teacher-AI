
# 2B-Grd2-teacher-AI

2B-Grd2-teacher-AI is a playful web-based AI assistant designed to help Grade 2 students learn school subjects using the Ontario curriculum. The project creates a friendly, engaging experience that guides children through lessons in reading, math, science, and language through interactive UI and AI-powered conversations.

##  Features

- **Landing Page**: Animated typing effect, interactive logo with background cycling, smooth transitions
- **Main Page**: Subject cards (Math, Reading, Science, Language), responsive navigation, interactive hover effects
- **AI Chat Interface**: Real-time chat with AI teacher "2B", message bubbles, backend API integration
- **Dashboard**: Responsive header, user profile with coin display, navigation buttons, mobile-first design
- **Design System**: CSS variables, modern gradients, smooth animations, accessibility-focused

## Project Structure

```text
2B-Grd2-teacher-AI/
├── index.html                 # Main landing page
├── 2B.css/js                  # Landing page styles & interactions
├── brain.py                   # Backend AI logic
├── requirements.txt           # Python dependencies
├── images/                    # Image assets
└── pages/                     # Main application pages
    ├── main.html/css/js       # Main subject selection
    ├── chat.html/Chat.js      # AI chat interface
    ├── dashboard.html/css/js  # User dashboard
    └── index.html             # Pages entry point
```

##  How It Works

### Landing Page: **2B.js** handles animations, background cycling, transitions; **2B.css** provides styling

### Main Page: **main.css** styles subject cards and responsive layout; **main.js** adds animations

### Chat Interface: **Chat.js** integrates with API (`https://2b-grd2-teacher-ai.onrender.com/api/chat`) for real-time AI conversation

### Dashboard: **dashboard.css** provides responsive styling; **dashboard.js** handles interactions; features user profile with coin system

##  Technologies Used

**Frontend**: HTML5, CSS3, JavaScript (ES6+), Google Fonts (Nunito) | **Backend**: Python, Flask, Render (cloud hosting) | **Design**: CSS variables, Flexbox/Grid, animations, ARIA accessibility

##  Responsive Design

- **Desktop** (1024px+): Full multi-column layouts
- **Tablet** (768px-1024px): Adjusted spacing, 2-column layouts
- **Mobile** (480px-768px): Single column, touch-optimized
- **Small Mobile** (<480px): Compact layout with wrapped elements

##  Getting Started

### Prerequisites: Modern web browser, Python 3.x (for backend), Internet connection

### Installation

```bash
git clone https://github.com/yourusername/2B-Grd2-teacher-AI.git
cd 2B-Grd2-teacher-AI
pip install -r requirements.txt  # For backend
```

### Usage: Open `index.html` in browser or use local server

```bash
python -m http.server 8000
# Navigate to http://localhost:8000
```

##  Contributors

- **monkeyDluzi** 
- **santiagoalexgonzalezc-sys** 

##  Future Enhancements

- [ ] Complete backend AI integration with custom curriculum
- [ ] Add interactive learning games and quizzes
- [ ] Implement user progress tracking
- [ ] Enhance coin/reward system
- [ ] Add parent/teacher dashboard
- [ ] Implement user authentication

##  License

Educational prototype project in active development.

##  Acknowledgments

- Ontario Curriculum guidelines
- Google Fonts for Nunito typeface
- Open-source web development community
