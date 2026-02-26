// // src/hooks/useAuth.tsx
// import React, { useEffect, useState, createContext, useContext } from 'react';
// import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import type { FBUser } from '@/firebase/Types';
// import { auth } from '@/firebase/firebase';

// const AuthContext = createContext<{ user: FBUser | null; loading: boolean; signInWithGoogle: () => Promise<void>; signOutUser: () => Promise<void> } | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<FBUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (u) => {
//       setUser(u ? { uid: u.uid, displayName: u.displayName ?? undefined, email: u.email ?? undefined, photoURL: u.photoURL ?? undefined } : null);
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     await signInWithPopup(auth, provider);
//   };

//   const signOutUser = async () => {
//     await signOut(auth);
//   };

//   return <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOutUser }}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
//   return ctx;
// };

// src/hooks/useAuth.tsx
import React, { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';
import type { FBUser } from '@/firebase/Types';
import { auth } from '@/firebase/firebase';

interface AuthContextType {
  user: FBUser | null;
  loading: boolean;
  firebaseLogin: () => Promise<void>;
  firebaseLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FBUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(
        u
          ? {
              uid: u.uid,
              displayName: u.displayName ?? undefined,
              email: u.email ?? undefined,
              photoURL: u.photoURL ?? undefined,
            }
          : null,
      );
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const firebaseLogin = async () => {
    try {
      await signInAnonymously(auth);
      console.log('Firebase anonymous login successful!');
    } catch (err) {
      console.error('Firebase anonymous login error:', err);
      throw err;
    }
  };

  const firebaseLogout = async () => {
    await signOut(auth);
  };

  return <AuthContext.Provider value={{ user, loading, firebaseLogin, firebaseLogout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
