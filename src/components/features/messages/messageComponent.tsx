'use client';

import { useState, type FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import NextImage from '@/components/ui/nextImage/NextImage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/svg_icon/SvgIcon';
import { FaArrowLeftLong } from 'react-icons/fa6';

interface Props {
  chatsData: any;
  messages: any;
  cardTitle: string;
  cardIcon?: string;
}

const MessageComponent: FC<Props> = ({ chatsData, messages, cardTitle, cardIcon }) => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  return (
    <Card className="bg-text-950 p-4 border border-text-500">
      <CardHeader className="p-0 px-0 flex flex-row gap-2">
        {!selectedUser ? (
          <>
            <span className="bg-primary/15 w-[44px] h-[44px] rounded-[12px] flex items-center justify-center">
              <Icon icon={cardIcon ? cardIcon : '/icons/sidebar-message.svg'} className="text-primary" stroke />
            </span>
            <CardTitle className="text-cardHeading">{cardTitle ?? ''}</CardTitle>
          </>
        ) : (
          <>
            <span
              onClick={() => setSelectedUser(null)}
              className="cursor-pointer bg-text-700 border border-text-500 w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
            >
              <FaArrowLeftLong size={20} />
            </span>
            <div className="flex flex-col">
              <p className="font-bold text-textLight-25">{selectedUser?.name}</p>
              <span className="font-normal text-text-25 text-sm">Thursday - 06:00PM - 07:00PM</span>
            </div>
          </>
        )}
      </CardHeader>

      <CardContent className="p-0 mt-8 space-y-4">
        <div className="h-auto w-full">
          {/* If NO user selected -> Show Chat List */}
          {!selectedUser && (
            <div className="flex flex-col gap-4 h-full overflow-y-auto">
              {chatsData.map((item: any, index: any) => (
                <div
                  key={index}
                  onClick={() => setSelectedUser(item)}
                  className="cursor-pointer w-full h-[64px] gap-3 border border-text-500 hover:border-primary-800 bg-text-850 shadow rounded-2xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <NextImage image={item?.avatar ? item?.avatar : '/images/user-default.png'} width={62} height={62} classNames="object-cover rounded-2xl" />

                    <div className="flex flex-col">
                      <span className="font-bold text-textLight-25 text-base">{item?.name ?? ''}</span>
                      <span className="font-normal text-text-25 text-sm">{item?.lastMessage ?? ''}</span>
                    </div>
                  </div>
                  <div className="me-4">
                    <span className="text-xs text-text-25 font-normal">13:29</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* If user selected -> Show Chat Screen */}
          {selectedUser && (
            <div className="flex flex-col h-full">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {messages.map((msg: any) => {
                    const isMe = msg.senderId === 'me';
                    return (
                      <div key={msg.id} className={cn('flex items-start gap-2 my-1', isMe ? 'justify-end' : 'justify-start')}>
                        {!isMe && <img src={msg.avatar || '/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full" />}
                        <div className={cn('flex w-full my-1', isMe ? 'justify-end' : 'justify-start')}>
                          <div className="flex flex-col ">
                            <div
                              className={cn(
                                'p-2 text-sm text-textLight-25 w-full',
                                isMe ? 'bg-[#DAC0681F] rounded-tl-xl rounded-br-xl rounded-bl-xl self-end' : 'bg-[#FDFDFE14] rounded-tr-xl rounded-bl-xl rounded-br-xl self-start',
                              )}
                            >
                              {msg?.userName && !isMe && <p className="text-base font-bold text-textLight-25">{msg?.userName}</p>}
                              <p className="mt-1 text-sm text-textLight-25">{msg.text}</p>
                            </div>

                            <div className={cn('text-[10px] text-text-25 mt-1 flex items-center gap-1', isMe ? 'text-right self-end' : 'text-left self-start')}>
                              {msg.isRead && (
                                <span>
                                  <Icon icon="/icons/double-checks.svg" className="text-success-500" stroke={true} />
                                </span>
                              )}
                              <span className={cn('text-[10px] text-text-25 mt-1', isMe ? 'text-right self-end' : 'text-left self-start')}>{msg.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        {isMe && <img src={msg.avatar || '/my-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full" />}
                      </div>
                    );
                  })}

                  {messages.length === 0 && <p className="text-center text-sm text-muted-foreground">No messages</p>}
                </div>
              </div>

              {/* Input Box */}
              <div className="flex gap-2 mt-2">
                <Input
                  className="w-full h-[52px] rounded-full border border-text-500"
                  //   value={filters.search}
                  //   onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  placeholder="Write message..."
                  icon={<Icon icon="/icons/image-upload.svg" stroke={true} className="text-text-25" />}
                  iconPosition="right"
                />
                <Button type="button" className="rounded-full h-[52px] w-[52px] flex items-center justify-center">
                  <Icon icon="/icons/sent-fast.svg" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageComponent;
