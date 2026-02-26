import { useState } from 'react';
import { cheatUsers } from './Utils';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MessagePage() {
  const [activeChat, setActiveChat] = useState(cheatUsers[0]);
  const [tab, setTab] = useState('all');

  const filteredUsers = cheatUsers.filter((user) => {
    if (tab === 'unread') return user.unread > 0 && !user.archived;
    if (tab === 'archived') return user.archived;
    return !user.archived;
  });

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[555px] border-r border-input bg-white overflow-y-auto">
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-primary text-lg lg:text-2xl font-semibold">Messages</h2>

            <Button type="button" className="flex items-center gap-2 h-[44px] text-white hover:text-primary bg-primary hover:bg-transparent border border-primary roundedDefault">
              <Icon icon="/icons/message.svg" stroke />
              <span>New Message</span>
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="gap-2 bg-white">
              <TabsTrigger value="all" className="bg-input">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="bg-input">
                Unread
              </TabsTrigger>
              <TabsTrigger value="archived" className="bg-input">
                Archived
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Chat List */}
        {filteredUsers.map((user) => {
          const isActive = activeChat?.id === user.id;
          const isUnread = user.unread > 0;

          return (
            <div
              key={user.id}
              onClick={() => setActiveChat(user)}
              className={`
                border border-input w-full h-[75px] flex items-center gap-3 p-3 cursor-pointer
                ${isActive ? 'bg-input' : isUnread ? 'bg-secondary' : 'bg-white'}
                hover:bg-muted
              `}
            >
              <img src={user.avatar} className="w-12 h-12 rounded-full" />

              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">{user.time}</p>

                {isUnread && <span className="inline-flex mt-1 min-w-[20px] justify-center text-xs bg-primary text-white px-2 py-0.5 rounded-full">{user.unread}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT */}
      <div className="w-full flex flex-col">
        {/* Chat Header */}
        {activeChat && (
          <div className="border-b border-input bg-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={activeChat.avatar} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold">{activeChat.name}</h3>
                {/* Active chat start time */}
                <p className="text-xs text-muted-foreground">Started at {activeChat.time}</p>
              </div>
            </div>

            <Button type="button" className="flex items-center gap-2 h-[44px] text-primary hover:text-white bg-transparent hover:bg-primary border border-primary roundedDefault">
              <Icon icon="/icons/single_user.svg" stroke />
              <span>View Profile</span>
            </Button>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {activeChat?.messages.map((msg, index) => {
            const messageTime = msg.time || activeChat.time;

            return (
              <div key={index} className={`max-w-xs ${msg.from === 'me' ? 'ml-auto text-right' : ''}`}>
                <div
                  className={`px-4 py-2 rounded-lg text-sm
                    ${msg.from === 'me' ? 'bg-primary text-white' : 'bg-white text-primary border border-input'}`}
                >
                  {msg.text}
                </div>

                {/* Message Time */}
                <span className="block mt-1 text-[11px] text-muted-foreground">{messageTime}</span>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="gap-3 p-4 border-t border-input flex items-center bg-white">
          <div className="border border-input roundedDefault px-2 py-2">
            <Icon icon="/icons/upload-multi-media.svg" stroke={true} fill={false} />
          </div>
          <input type="text" placeholder="Type a message..." className="w-full border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          <Button
            type="button"
            className="flex items-center gap-2 h-[44px] text-white hover:text-secondary bg-secondary hover:bg-transparent border border-secondary roundedDefault"
          >
            <Icon icon="/icons/send-icon.svg" stroke />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
