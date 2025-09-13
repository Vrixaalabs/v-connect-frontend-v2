import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  File,
  Smile,
  MoreVertical,
  UserCircle,
  Pin,
  Flag,
} from "lucide-react";
import type { Entity } from "@/types/entity";

// Mock data for group messages
const mockMessages = [
  {
    id: '1',
    content: 'Hey everyone! Just wanted to share the meeting notes from yesterday.',
    sender: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: null,
      role: 'Team Lead',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    attachments: [],
  },
  {
    id: '2',
    content: 'Thanks for sharing! I had a question about the third point regarding the project timeline.',
    sender: {
      id: '2',
      name: 'Michael Chen',
      avatar: null,
      role: 'Developer',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    attachments: [],
  },
  {
    id: '3',
    content: 'Here\'s the updated project timeline document.',
    sender: {
      id: '3',
      name: 'Emma Davis',
      avatar: null,
      role: 'Project Manager',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    attachments: [
      {
        type: 'file',
        name: 'project-timeline.pdf',
        size: '2.4 MB',
      }
    ],
  },
];

interface GroupTabProps {
  entity?: Entity;
}

export default function GroupTab({ entity }: GroupTabProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

//   const { data } = useQuery(GET_ENTITY_CHAT, {
//     variables: {
//       entityChatId: entity?.entityChatId,
//     },
//   });

//   const fetchedMessages = data?.getEntityChat?.entityChat?.messages || [];

//   const [addMessage, { loading: addMessageLoading, error: addMessageError }] = useMutation(ADD_MESSAGE_TO_ENTITY_CHAT);

//   const handleAddMessage = () => {
//     if (!message.trim()) return;
//     addMessage({
//       variables: {
//         input: {
//           entityChatId: entity?.entityChatId,
//           message: message,
//         },
//       },
//     });
//   };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: String(messages.length + 1),
      content: message,
      sender: {
        id: 'current-user',
        name: 'You',
        avatar: null,
        role: 'Member',
      },
      timestamp: new Date(),
      attachments: [],
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="h-[calc(100vh-13rem)]">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{entity?.name || 'Group Chat'}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {entity?.metadata?.totalUsers || 0} users
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
              <DropdownMenuItem>
                <Pin className="h-4 w-4 mr-2" />
                Pin Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Flag className="h-4 w-4 mr-2" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-full">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => {
              const isOwn = msg.sender.name === 'You';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                    {!isOwn && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium">
                          {msg.sender.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      {!isOwn && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{msg.sender.name}</span>
                          <span className="text-xs text-muted-foreground">{msg.sender.role}</span>
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 ${
                          isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        {msg.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-xs bg-background/50 rounded p-2"
                              >
                                <File className="h-4 w-4" />
                                <span className="flex-1 truncate">{attachment.name}</span>
                                <span className="text-muted-foreground">{attachment.size}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div
                        className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                          isOwn ? 'justify-end' : ''
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[2.5rem]"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <File className="h-4 w-4 mr-2" />
                    Document
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}