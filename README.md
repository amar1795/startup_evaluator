# 🚀 Startup Idea Evaluator – AI + Voting App

A React Native mobile app where users can submit startup ideas, get a fun **AI-generated rating**, vote on others’ ideas, and view the **leaderboard of top ideas**.  
Built as part of the **Mobile App Internship Assignment**.

---

## 📜 App Description
The **Startup Idea Evaluator** is a playful app that allows users to:
- Submit their startup idea with a name, tagline, and description.
- Receive a **random AI rating** (0–100) upon submission.
- Browse all ideas, **upvote** their favorites (one vote per idea per user).
- Sort ideas by rating or votes.
- View the **top 5 ideas** in the leaderboard with 🥇🥈🥉 badges.
- Expand/collapse idea descriptions with **Read More / Show Less**.
- **Share** ideas via social apps.
- **Swipe** cards to upvote quickly.
- Enjoy a polished UI with **gradient cards**, shadows, and **dark mode**.

---

## 🛠 Tech Stack Used
- **React Native** (Expo CLI) – core framework
- **React Navigation** – bottom tab navigation
- **React Native Paper** – UI components
- **AsyncStorage** – local persistent storage
- **Expo Linear Gradient** – gradient card backgrounds
- **Expo Google Fonts** – Poppins custom font
- **React Native Gesture Handler** – swipe-to-upvote
- **React Native Toast Message** – toast notifications
- **JavaScript (ES6+)** – app logic

---

## ✨ Features Implemented
- ✅ Submit idea with name, tagline, description  
- ✅ Fun **AI-generated random rating** (0–100)  
- ✅ Store ideas locally in **AsyncStorage**  
- ✅ One upvote per idea per user (stored in `votedIdeas`)  
- ✅ Sort by **votes** or **rating**  
- ✅ Leaderboard – top 5 ideas with badges  
- ✅ **Dark mode** toggle  
- ✅ Toast notifications (submission, voting, errors)  
- ✅ **Read More / Show Less** for long descriptions  
- ✅ Share idea via native share sheet  
- ✅ Swipe right to **upvote** (gesture)  
- ✅ shadows for cards  
- ✅ Custom font for titles

---

## 🖥 How to Run Locally
1. **Clone this repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/startup-idea-evaluator.git
   cd startup-idea-evaluator
   
2. **Install dependencies**:
   ```bash
   npm install
3. **Run the app with Expo:**:
   ```bash
   npx expo start
4.Open on your device:
 -Install the Expo Go app from Play Store or App Store.
 -Scan the QR code shown in your terminal/Expo DevTools.
   
