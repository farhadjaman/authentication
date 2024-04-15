import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => {},
    signOut: () => {},
    isLoading: true,
    session: null,
});

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setSession(user);
            } else {
                setSession(null);
            }
        });

        return unSub;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email, password) => {
                    try {
                        setSession('token');
                    } catch (e) {
                        console.error('Failed to sign in:', e);
                    }
                },
                signOut: async () => {
                    try {
                        await signOut(auth);
                        return {
                            success: true,
                        };
                    } catch (e) {
                        return {
                            success: false,
                            message: e.message,
                            error: e,
                        };
                    }
                },
                session,
                isLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error(
                'useSession must be wrapped in a <SessionProvider />'
            );
        }
    }

    return value;
}
