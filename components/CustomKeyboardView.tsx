import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import React from 'react';
import { Platform } from 'react-native';

type CustomKeyboardViewProps = {
    children: React.ReactNode;
};

export default function CustomKeyboardView({
    children,
}: CustomKeyboardViewProps) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
            }}
        >
            <ScrollView
                style={{
                    flex: 1,
                }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
