import { router, Slot, useSegments } from 'expo-router';
import { SessionProvider, useAuth } from '../context/authContext';
import { useEffect } from 'react';

const MainLayout = () => {
    const { session, isLoading } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        const insideApp = segments[0] === '(app)';
        if (isLoading) return;
        if (!session) {
            router.replace('/SignIn');
        } else if (session && !insideApp) {
            router.replace('/Home');
        }
    }, [session, isLoading]);
    return <Slot />;
};

export default function Root() {
    return (
        <SessionProvider>
            <MainLayout />
        </SessionProvider>
    );
}
