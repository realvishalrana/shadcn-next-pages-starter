# Next.js Modern Web Application

A complete Next.js application built with modern best practices, featuring authentication, internationalization, state management, form validation, and a beautiful UI.

## 🚀 Features

### ✅ Authentication System

- **Login/Register Forms** with validation
- **Forgot Password** flow with email reset
- **JWT Token** management
- **Protected Routes** with Redux state
- **Form Validation** with React Hook Form + Yup

### ✅ Internationalization (i18n)

- **Multi-language support** (10+ languages)
- **next-i18next** integration
- **Language switcher** component
- **Translation files** for all UI text

### ✅ State Management

- **Redux Toolkit** with async thunks
- **Auth slice** for user authentication
- **User slice** for user management
- **UI slice** for application state
- **TypeScript-ready** store configuration

### ✅ API Integration

- **Axios-based** API client
- **Request/Response interceptors**
- **Error handling** with automatic token refresh
- **Service layer** architecture
- **Custom hooks** for API calls

### ✅ Form Management

- **React Hook Form** integration
- **Yup validation** schemas
- **Custom form components**
- **Error handling** and display
- **Type-safe** form handling

### ✅ UI Components

- **shadcn/ui** component library
- **Tailwind CSS** styling
- **Responsive design**
- **Dark/Light theme** support
- **Accessible components**

### ✅ Code Quality

- **ESLint** configuration
- **Prettier** formatting
- **Husky** pre-commit hooks
- **Lint-staged** for staged files
- **Consistent code style**

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Internationalization**: next-i18next
- **Code Quality**: ESLint + Prettier + Husky

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── ForgotPasswordForm.jsx
│   │   └── ResetPasswordForm.jsx
│   ├── forms/                # Form components
│   │   └── FormField.jsx
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── dialog.jsx
│   │   ├── toast.jsx
│   │   └── ...
│   └── LanguageSwitcher.jsx
├── hooks/                    # Custom React hooks
│   ├── useApi.js
│   ├── useForm.js
│   ├── useTranslation.js
│   ├── useToast.js
│   └── redux.js
├── lib/                      # Utility libraries
│   ├── api.js               # API client configuration
│   ├── utils.js             # Utility functions
│   └── validations.js       # Yup validation schemas
├── pages/                    # Next.js pages
│   ├── auth/                # Authentication pages
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── forgot-password.js
│   │   └── reset-password.js
│   ├── dashboard.js
│   ├── index.js
│   ├── _app.js
│   └── _document.js
├── services/                 # API service layer
│   ├── authService.js
│   └── userService.js
├── store/                    # Redux store
│   ├── index.js
│   └── slices/
│       ├── authSlice.js
│       ├── userSlice.js
│       └── uiSlice.js
└── styles/
    └── globals.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 Configuration

### ESLint

ESLint is configured with:

- Next.js recommended rules
- Prettier integration
- Custom rules for code quality

### Prettier

Prettier is configured with:

- Single quotes
- Semicolons
- 2-space indentation
- Trailing commas

### Husky

Pre-commit hooks run:

- ESLint on staged files
- Prettier formatting
- Type checking (if TypeScript)

## 🌍 Internationalization

The app supports multiple languages:

- English (en) - Default
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Japanese (ja)
- Korean (ko)
- Chinese (zh)

### Adding Translations

1. Add translation keys to `public/locales/{language}/common.json`
2. Use the `useTranslation` hook in components:

   ```jsx
   import { useTranslation } from '@/hooks/useTranslation';

   const { t } = useTranslation();
   return <h1>{t('navigation.home')}</h1>;
   ```

## 🔐 Authentication

### Features

- JWT token-based authentication
- Automatic token refresh
- Protected routes
- Form validation
- Error handling

### Usage

```jsx
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { loginUser } from '@/store/slices/authSlice';

const { user, isAuthenticated, loading } = useAppSelector(state => state.auth);
const dispatch = useAppDispatch();

// Login
await dispatch(loginUser({ email, password }));
```

## 📊 State Management

### Redux Store Structure

- **auth**: User authentication state
- **user**: User data and management
- **ui**: Application UI state

### Usage

```jsx
import { useAppSelector, useAppDispatch } from '@/hooks/redux';

const dispatch = useAppDispatch();
const { data, loading, error } = useAppSelector(state => state.user);
```

## 🌐 API Integration

### API Client

Configured with:

- Base URL from environment
- Request/response interceptors
- Automatic token attachment
- Error handling

### Usage

```jsx
import { apiClient } from '@/lib/api';

// GET request
const users = await apiClient.get('/users');

// POST request
const user = await apiClient.post('/users', userData);
```

## 📝 Form Handling

### React Hook Form + Yup

```jsx
import { useForm } from '@/hooks/useForm';
import { loginSchema } from '@/lib/validations';

const { register, handleSubmit, errors } = useForm(loginSchema);

const onSubmit = data => {
  // Handle form submission
};
```

## 🎨 UI Components

### shadcn/ui Components

- Button, Card, Input, Dialog
- Toast, Alert, Badge
- Select, Checkbox, Switch
- Avatar, Separator, Tabs

### Usage

```jsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button>Click me</Button>
  </CardContent>
</Card>;
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Other Platforms

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-i18next](https://github.com/i18next/next-i18next)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for the amazing Next.js framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
