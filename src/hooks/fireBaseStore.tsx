import { db } from '@/firebase/firebase';
import type { ClassChatRoom } from '@/firebase/Types';
import type { Unsubscribe } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
  type DocumentData,
  Timestamp,
} from 'firebase/firestore';

/**
 * ✅ Create a new Firebase class and default welcome message
 */
// export const createNewFireBaseClass = async (
//   classId: string,
//   className: string,
//   classDuration: string,
//   gymName: string,
//   avatar: string,
//   userIds: string[] = [],
//   userInfo: any[] = [],
// ) => {
//   console.log('check-firebase create request', { classId, className, classDuration, gymName, avatar, userIds, userInfo });
//   try {
//     const classRef = doc(db, 'ClassesChatRoom', classId);
//     await setDoc(classRef, {
//       id: classId,
//       name: className,
//       gymName,
//       avatar,
//       classDuration,
//       userIds,
//       userInfo,
//       createdAt: serverTimestamp(),
//       isArchived: [] as { userId: string; archive: boolean }[],
//       isMuted: [] as { userId: string; muted: boolean }[],
//       lastMessageAt: '',
//     });

//     const defaultMessage = await getDefaultMessage();
//     if (defaultMessage) {
//       const messagesCol = collection(db, 'ClassesChatRoom', classId, 'messages');
//       await addDoc(messagesCol, {
//         content: defaultMessage,
//         contentType: 'text',
//         sender: { id: 'system', name: 'System' },
//         receivers: userInfo.map((u) => ({ id: u.id, name: u.name })),
//         isRead: false,
//         readCount: 0,
//         createdAt: serverTimestamp(),
//       });
//     }
//     // await addDoc(messagesCol, {
//     //   id: serverTimestamp(),
//     //   content: 'Chat room created successfully!',
//     //   contentType: '',
//     //   idFrom: '',
//     //   idTo: '',
//     //   isRead: false,
//     //   readCount: 0,
//     //   createdAt: serverTimestamp(),
//     // });

//     console.log('✅ Class and chat room created successfully!');
//     return { success: true, message: 'Class created successfully' };
//   } catch (error: any) {
//     console.error('❌ Error creating class:', error);
//     return { success: false, message: error.message || 'Failed to create class' };
//   }
// };
export const createNewFireBaseClass = async (
  classId: string,
  className: string,
  classDuration: string,
  gymName: string,
  avatar: string,
  userIds: string[] = [],
  userInfo: any[] = [],
) => {
  console.log('check-firebase create request', {
    classId,
    className,
    classDuration,
    gymName,
    avatar,
    userIds,
    userInfo,
  });

  try {
    // ✅ FIX USER INFO STRUCTURE
    const formattedUsers = userInfo.map((u) => ({
      id: u.userId, // ✅ correct
      name: u.UserName, // ✅ correct
      role: u.userRole,
      avatar: u.userAvatar,
    }));

    const classRef = doc(db, 'ClassesChatRoom', classId);

    await setDoc(classRef, {
      id: classId,
      name: className,
      gymName,
      avatar,
      classDuration,
      userIds,
      userInfo: formattedUsers,
      createdAt: serverTimestamp(),
      isArchived: [],
      isMuted: [],
      lastMessageAt: serverTimestamp(),
    });

    const defaultMessage = await getDefaultMessage();

    if (defaultMessage) {
      const messagesCol = collection(db, 'ClassesChatRoom', classId, 'messages');

      await addDoc(messagesCol, {
        content: defaultMessage,
        contentType: 'text',
        sender: { id: 'system', name: 'System' },
        receivers: formattedUsers.map((u) => ({
          id: u.id,
          name: u.name,
        })), // ✅ NO undefined possible now
        isRead: false,
        readCount: 0,
        createdAt: serverTimestamp(),
      });
    }

    console.log('✅ Class and chat room created successfully!');
    return { success: true, message: 'Class created successfully' };
  } catch (error: any) {
    console.error('❌ Error creating class:', error);
    return { success: false, message: error.message || 'Failed to create class' };
  }
};

/**
 * ✅ Send message to class chat
 */
export const sendMessageToFireBase = async (
  classId: string,
  sender: { id: string; name: string; avatar?: string },
  receivers: { id: string; name: string; avatar?: string }[],
  content: string = '',
  contentType: string = '',
  attachment?: { name: string; url: string; contentType: string; size: number },
) => {
  try {
    const messagesRef = collection(db, 'ClassesChatRoom', classId, 'messages');
    await addDoc(messagesRef, {
      id: serverTimestamp(),
      content,
      contentType,
      sender,
      receivers,
      isRead: false,
      readCount: 0,
      createdAt: serverTimestamp(),
      attachment: attachment || null,
    });

    console.log('✅ Message sent successfully');
  } catch (error) {
    console.error('❌ Error sending message:', error);
  }
};

/**
 * ✅ Send system notification (like user joined)
 */
// export const sendSystemNotification = async (classId: string, userName: string) => {
//   await sendMessageToFireBase(classId, 'system', 'System', `${userName} joined the class 💪`, 'text');
// };

/**
 * ✅ Mark all messages as read by user
 */
export const markMessagesAsRead = async (classId: string, userId: string) => {
  try {
    if (!classId || typeof classId !== 'string') {
      console.error('Invalid classId:', classId);
      return;
    }

    const messagesRef = collection(db, 'ClassesChatRoom', classId, 'messages');
    const snapshot = await getDocs(messagesRef);

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();

      // 🔹 Ensure receivers is an array
      const receivers = Array.isArray(data?.receivers) ? data.receivers : [];

      // 🔹 Ensure senderId is a string
      const senderId = data?.sender?.id?.toString();

      if (senderId !== userId && receivers.includes(userId)) {
        if (!data.isRead) {
          await updateDoc(docSnap.ref, {
            isRead: true,
            readCount: (data.readCount || 0) + 1,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
};

/**
 * ✅ Toggle mute/unmute class notifications
 */
export const toggleMuteClassChat = async (classId: string, userId: string) => {
  try {
    const classRef = doc(db, 'ClassesChatRoom', classId);
    const classSnap = await getDoc(classRef);
    const classData = classSnap.data();

    if (!classData) throw new Error('Class not found');

    let isMutedArray: { userId: string; muted: boolean }[] = classData.isMuted || [];

    const userIndex = isMutedArray.findIndex((item) => item.userId === userId);

    if (userIndex !== -1) {
      isMutedArray[userIndex].muted = !isMutedArray[userIndex].muted;
    } else {
      isMutedArray.push({ userId, muted: true });
    }

    await updateDoc(classRef, { isMuted: isMutedArray });

    const newStatus = isMutedArray.find((item) => item.userId === userId)?.muted;
    return { success: true, message: `Class notifications ${newStatus ? 'muted' : 'unmuted'} successfully` };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to toggle mute' };
  }
};
/**
 * ✅ Toggle archive/unarchive class
 */
export const toggleArchiveClassChat = async (classId: string, userId: string) => {
  try {
    const classRef = doc(db, 'ClassesChatRoom', classId);
    const classSnap = await getDoc(classRef);
    const classData = classSnap.data();

    if (!classData) throw new Error('Class not found');

    let isArchivedArray: { userId: string; archive: boolean }[] = classData.isArchived || [];

    const userIndex = isArchivedArray.findIndex((item) => item.userId === userId);

    if (userIndex !== -1) {
      isArchivedArray[userIndex].archive = !isArchivedArray[userIndex].archive;
    } else {
      isArchivedArray.push({ userId, archive: true });
    }

    await updateDoc(classRef, { isArchived: isArchivedArray });

    const newStatus = isArchivedArray.find((item) => item.userId === userId)?.archive;
    return { success: true, message: `Class ${newStatus ? 'archived' : 'unarchived'} successfully` };
  } catch (error: any) {
    return { success: false, message: error.message || 'Failed to toggle archive' };
  }
};
/**
 * ✅ Delete all chat messages for a class
 */
export const deleteClassChat = async (classId: string, userRole: string) => {
  if (userRole !== 'Admin') {
    return { success: false, message: 'Only admin can delete this class.' };
  }

  try {
    const messagesRef = collection(db, 'ClassesChatRoom', classId, 'messages');
    const messagesSnap = await getDocs(messagesRef);
    const deleteMessages = messagesSnap.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deleteMessages);

    // Delete class document
    const classRef = doc(db, 'ClassesChatRoom', classId);
    await deleteDoc(classRef);

    return { success: true, message: 'Class and all messages deleted successfully.' };
  } catch (error: any) {
    console.error('Error deleting class:', error);
    return { success: false, message: error.message || 'Failed to delete class.' };
  }
};

/**
 * ✅ Fetch all classes
 */
export const getFireBaseClasses = async () => {
  try {
    const classesSnap = await getDocs(collection(db, 'ClassesChatRoom'));
    return classesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('🔥 Error fetching classes:', error);
    throw error;
  }
};

/**
 * ✅ Real-time listener for classes
 */
export const listenToFireBaseClasses = (userId: string, userRole: string, setClasses: (classes: ClassChatRoom[]) => void): (() => void) => {
  let unsubscribers: Unsubscribe[] = [];

  const sortClasses = (classes: ClassChatRoom[]): ClassChatRoom[] => {
    return classes.sort((a, b) => {
      const aArchived = a.isArchived?.some((x) => x.userId === userId && x.archive);
      const bArchived = b.isArchived?.some((x) => x.userId === userId && x.archive);

      // ✅ Archived classes appear first
      if (aArchived && !bArchived) return -1;
      if (!aArchived && bArchived) return 1;

      const aTime = a.lastMessageAt ? new Date(a.lastMessageAt as any).getTime() : new Date(a.createdAt as any).getTime();
      const bTime = b.lastMessageAt ? new Date(b.lastMessageAt as any).getTime() : new Date(b.createdAt as any).getTime();

      return bTime - aTime;
    });
  };

  const classesCol = collection(db, 'ClassesChatRoom');

  const unsubscribe = onSnapshot(classesCol, (snapshot) => {
    const allClasses: ClassChatRoom[] = snapshot.docs.map((doc) => {
      const data = doc.data() as DocumentData;
      return {
        id: data.id || doc.id,
        name: data.name || '',
        gymName: data.gymName || '',
        avatar: data.avatar || '',
        classDuration: data.classDuration || '',
        userIds: data.userIds || [],
        userInfo: data.userInfo || [],
        createdAt: data.createdAt,
        isArchived: data.isArchived || [],
        isMuted: data.isMuted || [],
        lastMessageAt: data.lastMessageAt || data.createdAt,
      };
    });

    const filteredClasses = userRole === 'Admin' ? allClasses : allClasses.filter((cls) => cls.userIds?.includes(userId));

    setClasses(sortClasses(filteredClasses));
  });

  unsubscribers.push(unsubscribe);

  return (): void => unsubscribers.forEach((u) => u());
};

/**
 * ✅ Real-time listener for class messages
 */
export const listenToClassMessages = (classId: string, callback: Function) => {
  const messagesRef = collection(db, 'ClassesChatRoom', classId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

/**
 * ✅ Fetch default message
 */
export const getDefaultMessage = async () => {
  const defaultDoc = doc(db, 'AppSettings', 'defaultMessage');
  const snap = await getDoc(defaultDoc);
  if (snap.exists()) {
    return snap.data().message || '';
  }
  return '';
};

/**
 * ✅ Add or update default message
 */
export const saveDefaultMessage = async (message: string) => {
  const defaultDoc = doc(db, 'AppSettings', 'defaultMessage');
  await setDoc(defaultDoc, {
    message,
    updatedAt: serverTimestamp(),
  });
  return { success: true, message: 'Default message saved successfully!' };
};

/**
 * ✅ Delete default message
 */
export const deleteDefaultMessage = async () => {
  const defaultDoc = doc(db, 'AppSettings', 'defaultMessage');
  await deleteDoc(defaultDoc);
  return { success: true, message: 'Default message deleted successfully!' };
};
