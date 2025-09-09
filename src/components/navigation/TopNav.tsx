import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Mail, Search, User, Settings, Bookmark, LogOut, HelpCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface Message {
  id: string;
  sender: {
    name: string;
    avatar?: string;
  };
  content: string;
  time: string;
  read: boolean;
}

export default function TopNav() {
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - replace with actual data from your backend
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'New Event',
      description: 'Technical Workshop next week',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Club Update',
      description: 'Your club request was approved',
      time: '1 day ago',
      read: true,
    },
  ];

  const mockMessages: Message[] = [
    {
      id: '1',
      sender: {
        name: 'John Doe',
        avatar: 'https://github.com/shadcn.png',
      },
      content: 'Hey, when is the next meeting?',
      time: '5 mins ago',
      read: false,
    },
    {
      id: '2',
      sender: {
        name: 'Jane Smith',
      },
      content: 'The project files are ready',
      time: '2 hours ago',
      read: true,
    },
  ];

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  const unreadMessages = mockMessages.filter(m => !m.read).length;

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 flex'>
          <Link to='/' className='mr-6 flex items-center space-x-2'>
            <span className='font-bold'>VConnect</span>
          </Link>
        </div>

        <div className='flex flex-1 items-center justify-between space-x-2'>
          <div className={`flex-1 max-w-xl transition-all ${isSearching ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search everything...'
                className='pl-8'
                onFocus={() => setIsSearching(true)}
                onBlur={() => setIsSearching(false)}
              />
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            {/* Notifications */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <Bell className='h-5 w-5' />
                  {unreadNotifications > 0 && (
                    <Badge
                      variant='destructive'
                      className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center'
                    >
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                </SheetHeader>
                <div className='mt-4 space-y-4'>
                  {mockNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg ${notification.read ? 'bg-background' : 'bg-muted'}`}
                    >
                      <h4 className='font-medium'>{notification.title}</h4>
                      <p className='text-sm text-muted-foreground'>{notification.description}</p>
                      <span className='text-xs text-muted-foreground'>{notification.time}</span>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Messages */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='relative'>
                  <Mail className='h-5 w-5' />
                  {unreadMessages > 0 && (
                    <Badge
                      variant='destructive'
                      className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center'
                    >
                      {unreadMessages}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Messages</SheetTitle>
                </SheetHeader>
                <div className='mt-4 space-y-4'>
                  {mockMessages.map(message => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg ${message.read ? 'bg-background' : 'bg-muted'}`}
                    >
                      <Avatar>
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>
                          {message.sender.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <h4 className='font-medium'>{message.sender.name}</h4>
                        <p className='text-sm text-muted-foreground'>{message.content}</p>
                        <span className='text-xs text-muted-foreground'>{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Contact Us */}
            <Button variant='ghost' size='icon' asChild>
              <Link to='/contact'>
                <HelpCircle className='h-5 w-5' />
              </Link>
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>
                      <User className='h-5 w-5' />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to='/profile' className='flex items-center'>
                    <User className='mr-2 h-4 w-4' />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/settings' className='flex items-center'>
                    <Settings className='mr-2 h-4 w-4' />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/your-saves' className='flex items-center'>
                    <Bookmark className='mr-2 h-4 w-4' />
                    Your Saves
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-red-600'>
                  <LogOut className='mr-2 h-4 w-4' />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
