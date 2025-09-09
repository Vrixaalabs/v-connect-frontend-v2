import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Search,
  Plus,
  Users,
  UserCircle,
  Mail,
  MessageSquare,
  Star,
  Archive,
  Trash2,
} from 'lucide-react';

// Mock data for chats
const mockChats = [
  {
    id: '1',
    type: 'direct',
    participants: [
      {
        id: '2',
        name: 'John Doe',
        avatar: null,
        status: 'online',
        lastSeen: new Date(),
      },
    ],
    lastMessage: {
      content: 'Hey, when is the next club meeting?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      unread: true,
    },
    pinned: true,
  },
  {
    id: '2',
    type: 'group',
    name: 'Tech Club Admins' as const,
    avatar: null,
    participants: [
      {
        id: '2',
        name: 'John Doe',
        avatar: null,
        status: 'offline',
      },
      {
        id: '3',
        name: 'Jane Smith',
        avatar: null,
        status: 'offline',
      },
      // More participants...
    ],
    lastMessage: {
      sender: 'Jane Smith',
      content: 'Updated the event schedule for next month',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      unread: false,
    },
    pinned: false,
  },
  // More mock chats...
];

const MessagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Filter chats based on search and active tab
  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = chat.type === 'group' && chat.name
      ? chat.name.toLowerCase().includes(searchQuery.toLowerCase())
      : chat.participants[0].name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'all' ||
      (activeTab === 'direct' && chat.type === 'direct') ||
      (activeTab === 'group' && chat.type === 'group') ||
      (activeTab === 'pinned' && chat.pinned);

    return matchesSearch && matchesTab;
  });

  return (
    <MemberLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-sm text-muted-foreground">
              Chat with your network
            </p>
          </div>
          <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Conversation</DialogTitle>
                <DialogDescription>
                  Start a new chat with a person or create a group.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex gap-4">
                  <Button className="flex-1" variant="outline">
                    <UserCircle className="h-4 w-4 mr-2" />
                    Direct Message
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search people..."
                    className="pl-9"
                  />
                </div>
                {/* Add user list here */}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewChatOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Start Chat</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-1 flex">
          {/* Sidebar */}
          <div className="w-full max-w-sm border-r flex flex-col">
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="direct" className="flex-1">Direct</TabsTrigger>
                  <TabsTrigger value="group" className="flex-1">Groups</TabsTrigger>
                  <TabsTrigger value="pinned" className="flex-1">Pinned</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">No messages found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchQuery
                      ? "Try adjusting your search"
                      : "Start a new conversation"}
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredChats.map((chat) => (
                    <Link
                      key={chat.id}
                      to={`/member/messages/chat/${chat.id}`}
                      className="block p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          {chat.type === 'direct' ? (
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-medium">
                                {chat.participants[0].name.charAt(0)}
                              </span>
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5" />
                            </div>
                          )}
                          {chat.type === 'direct' && chat.participants[0].status === 'online' && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium truncate">
                              {chat.type === 'direct'
                                ? chat.participants[0].name
                                : chat.name}
                            </span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {chat.lastMessage.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {chat.type === 'group' && (
                              <span className="text-sm text-muted-foreground font-medium">
                                {chat.lastMessage.sender}:
                              </span>
                            )}
                            <span className="text-sm text-muted-foreground truncate">
                              {chat.lastMessage.content}
                            </span>
                            {chat.lastMessage.unread && (
                              <Badge variant="default" className="ml-auto">New</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t bg-muted/50">
              <div className="flex justify-around">
                <Button variant="ghost" size="sm">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <Button variant="ghost" size="sm">
                  <Star className="h-4 w-4 mr-2" />
                  Starred
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Trash
                </Button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex items-center justify-center bg-muted/10">
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
              <p className="text-muted-foreground mb-4">
                Choose a chat from the list or start a new conversation
              </p>
              <Button onClick={() => setIsNewChatOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default MessagesPage;