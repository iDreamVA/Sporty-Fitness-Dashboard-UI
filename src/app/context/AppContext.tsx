import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from '../i18n/translations';

type Theme = 'light' | 'dark';

interface UserData {
  name: string;
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Translations;
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  bmi: number | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    return saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'th' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setUserData = (data: UserData) => {
    setUserDataState(data);
  };

  const bmi = userData
    ? Number((userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1))
    : null;

  const value: AppContextType = {
    language,
    setLanguage,
    toggleLanguage,
    theme,
    toggleTheme,
    t: translations[language],
    userData,
    setUserData,
    bmi,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
