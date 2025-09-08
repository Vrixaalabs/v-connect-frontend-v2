'use client';

import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Bell, LogOut, Menu, Settings, User, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuth } from '../../hooks/useAuth';
import { Badge } from '../ui/badge';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { isAuthenticated, user, logout } = useAuth();
  const [hasNotifications] = useState(true); // This would be connected to your notification system

  useMotionValueEvent(scrollY, 'change', latest => {
    setIsScrolled(latest > 50);
  });

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
      },
    },
  };

  const menuItemVariants = {
    closed: {
      x: -20,
      opacity: 0,
    },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial='hidden'
      animate='visible'
      className={`fixed w-full z-50 transition-colors duration-200 ${
        isScrolled ? 'bg-white/80 backdrop-blur-sm border-b shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          <motion.div variants={logoVariants} initial='initial' whileHover='hover' whileTap='tap'>
            <Link to='/' className='text-2xl font-bold text-blue-600'>
              V-Connect
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-4'>
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to='/feed'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Feed
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to='/clubs'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Clubs
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to='/feed/events'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Events
                  </Link>
                </motion.div>

                {/* Notifications */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='relative'>
                  <Button variant='ghost' size='icon' className='relative'>
                    <Bell className='h-5 w-5' />
                    {hasNotifications && (
                      <Badge
                        variant='destructive'
                        className='absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]'
                      >
                        1
                      </Badge>
                    )}
                  </Button>
                </motion.div>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={user?.avatar} alt={user?.username} />
                        <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56' align='end' forceMount>
                    <DropdownMenuLabel className='font-normal'>
                      <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>{user?.username}</p>
                        <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className='mr-2 h-4 w-4' />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className='mr-2 h-4 w-4' />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className='mr-2 h-4 w-4' />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to='/features'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Features
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to='/about'
                    className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant='default'>
                    <Link to='/login'>Sign In</Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className='md:hidden'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial='closed'
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={mobileMenuVariants}
        className='md:hidden overflow-hidden bg-white border-b'
      >
        <div className='px-4 pt-2 pb-3 space-y-1'>
          {isAuthenticated ? (
            <>
              {[
                { href: '/feed', text: 'Feed' },
                { href: '/clubs', text: 'Clubs' },
                { href: '/feed/events', text: 'Events' },
              ].map((item, i) => (
                <motion.div key={item.href} custom={i} variants={menuItemVariants} className='block'>
                  <Link
                    to={item.href}
                    className='text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
              <motion.div custom={3} variants={menuItemVariants} className='block border-t pt-2 mt-2'>
                <div className='flex items-center px-3 py-2'>
                  <Avatar className='h-8 w-8 mr-2'>
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium'>{user?.username}</span>
                    <span className='text-xs text-gray-500'>{user?.email}</span>
                  </div>
                </div>
              </motion.div>
              <motion.div custom={4} variants={menuItemVariants} className='block'>
                <Link
                  to='/profile'
                  className='text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </motion.div>
              <motion.div custom={5} variants={menuItemVariants} className='block'>
                <Link
                  to='/settings'
                  className='text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
              </motion.div>
              <motion.div custom={6} variants={menuItemVariants} className='block'>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className='text-red-600 hover:text-red-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium'
                >
                  Log out
                </button>
              </motion.div>
            </>
          ) : (
            <>
              {[
                { href: '/features', text: 'Features' },
                { href: '/about', text: 'About' },
                { href: '/login', text: 'Sign In' },
              ].map((item, i) => (
                <motion.div key={item.href} custom={i} variants={menuItemVariants} className='block'>
                  <Link
                    to={item.href}
                    className='text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
