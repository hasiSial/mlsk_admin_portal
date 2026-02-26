// src/types.ts
import { Timestamp } from 'firebase/firestore';

export interface FBUser {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  roles?: { admin?: boolean };
}

export interface ChatRoom {
  id: string;
  type: 'class' | 'group' | 'system';
  classId?: string;
  title?: string;
  lastMessage?: string;
  updatedAt?: Timestamp;
}

export interface Attachment {
  name: string;
  url: string;
  contentType?: string;
  size?: number;
}

export interface Message {
  id?: string;
  senderId: string;
  senderName?: string;
  text?: string;
  createdAt: Timestamp | any;
  attachment?: Attachment;
  system?: boolean;
}

export interface ClassChatRoom {
  id: string;
  name: string;
  gymName: string;
  avatar: string;
  classDuration: any;
  userIds: string[];
  userInfo: any;
  createdAt: string;
  isArchived: { userId: string; archive: boolean }[];
  isMuted: { userId: string; muted: boolean }[];
  lastMessageAt: string;
}
