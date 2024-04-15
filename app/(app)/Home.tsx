import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useAuth } from '@/context/authContext';
import { Button } from 'react-native';

export default function Home() {
    const { signOut } = useAuth();
    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <View>
            <Text>Home</Text>
            <Pressable onPress={handleSignOut}>
                <Text>Sign Out</Text>
            </Pressable>
        </View>
    );
}
