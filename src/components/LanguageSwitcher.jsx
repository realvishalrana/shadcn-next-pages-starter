'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSwitcher = ({ className }) => {
  const { currentLanguage, changeLanguage } = useTranslation();

  const currentLang =
    languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = newLanguage => {
    if (changeLanguage) {
      changeLanguage(newLanguage);
    }
  };

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className={`w-[180px] ${className}`}>
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4" />
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span>{currentLang?.flag}</span>
              <span>{currentLang?.name}</span>
            </div>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map(language => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center space-x-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
