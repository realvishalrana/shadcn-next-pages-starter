'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import {
  Trophy,
  Wallet,
  Plus,
  Users,
  Award,
  Star,
  HelpCircle,
  FileText,
  Shield,
  Home,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';

const Sidebar = ({ onClose, user, onLogout }) => {
  const router = useRouter();

  const navigationItems = [
    {
      name: 'Fantasy (DFS)',
      href: '/dashboard',
      icon: Shield,
      active: router.pathname === '/dashboard',
    },
    {
      name: 'My Matches',
      href: '/matches',
      icon: Trophy,
      active: router.pathname === '/matches',
    },
    {
      name: 'Wallet',
      href: '/wallet',
      icon: Wallet,
      active: router.pathname === '/wallet',
    },
    {
      name: 'Join Contest',
      href: '/contests',
      icon: Plus,
      active: router.pathname === '/contests',
    },
    {
      name: 'Invite & Earn',
      href: '/invite',
      icon: Users,
      active: router.pathname === '/invite',
    },
    {
      name: 'Leaderboard',
      href: '/leaderboard',
      icon: Award,
      active: router.pathname === '/leaderboard',
    },
    {
      name: 'Fantasy Point System',
      href: '/points',
      icon: Star,
      active: router.pathname === '/points',
    },
    {
      name: 'Statistics',
      href: '/stats',
      icon: BarChart3,
      active: router.pathname === '/stats',
    },
    {
      name: 'FAQ',
      href: '/faq',
      icon: HelpCircle,
      active: router.pathname === '/faq',
    },
    {
      name: 'Terms & Conditions',
      href: '/terms',
      icon: FileText,
      active: router.pathname === '/terms',
    },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800 flex-shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center space-x-3"
          onClick={onClose}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Fantasy Cricket</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200',
                item.active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-800 flex-shrink-0 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-400 truncate">₹1,400</p>
          </div>
        </div>

        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
