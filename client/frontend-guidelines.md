# Frontend Code Guidelines (React + Electron)

## 📁 File & Folder Naming

- Use **camelCase** for general files (e.g., `userProfile.jsx`, `imageEditor.js`)
- Use **PascalCase** for React components (e.g., `ImageUploader.jsx`, `LoginForm.jsx`)
- Organize components into folders by feature (e.g., `/components/features/upload/UploadForm.jsx`)

---

## ⚛️ Component Guidelines

- One component per file
- Components should be **reusable** — avoid hardcoded logic when possible

---

## 🧠 Function Naming

- Use **camelCase** (e.g., `handleLogin`, `fetchUserData`)
- Name functions clearly based on their action (e.g., `convertToBW()`, `cropImage()`)

---

## 🗂️ State Management

- Use **Redux Toolkit** or **Context API** for global state
- Keep global state organized in a `/store` folder
- Avoid **prop drilling** by lifting state or using context

---

## 🎨 CSS & Styling

**BEM Naming Convention**  
_BEM = Block\_\_Element--Modifier_

Example:

```html
<div class="card">
  <h2 class="card__title">Image Editor</h2>
  <button class="card__button card__button--active">Start</button>
</div>
```

```css
.card {
  background: #fff;
}
.card__title {
  font-size: 18px;
}
.card__button {
  padding: 10px;
}
.card__button--active {
  background-color: #007bff;
}
```

## 📥 File Imports

- Use **absolute imports** for shared modules/helpers  
  (e.g., `import formatDate from 'utils/formatDate';`)

**Import Order:**

1. React
2. Third-party libraries
3. Custom components
4. Styles

---

## 🧭 Routing

- Use `BrowserRouter` from `react-router-dom`
- Store route components inside the `src/pages` folder
- Keep route paths **lowercase**  
  _(e.g., `/login`, `/home`, `/dashboard`)_

---

## 📁 Suggested Folder Structure

```bash
src/
├── assets/           # Static files (images, icons, fonts)
├── components/       # Reusable UI components
│   ├── common/
│   ├── layout/
│   ├── feature1/     # example of feature: upload
├── hooks/            # Custom React hooks (e.g., useAuth, useImageEditor)
├── lib/              # External integrations, SDKs, and third-party logic
├── pages/            # Page components mapped to routes
├── store/            # Redux or context state management
├── styles/
├── utils/            # Pure utility functions/helpers (formatters, validators)
├── App.jsx
├── main.jsx
├── index.css
├── vite.config.js
```
