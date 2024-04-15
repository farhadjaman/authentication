import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Pressable,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import Loading from '@/components/Loading';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import { useAuth } from '@/context/authContext';

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const emailRef = useRef<string>('test');
    const passwordRef = useRef<string>('test');

    const handleLogin = async () => {
        console.log('login');

        // if (!emailRef.current || !passwordRef.current) {
        //     Alert.alert('Please fill in all fields');
        //     return;
        // }
        setLoading(true);
        const response = await signIn('test@test.com', '12345678');
        setLoading(false);
        if (!response.success) {
            Alert.alert('Failed to sign in:', response.message);
        }
    };

    return (
        <CustomKeyboardView>
            <StatusBar style="dark" />
            <View
                style={{
                    alignItems: 'center',
                    paddingTop: hp(8),
                    paddingHorizontal: wp(5),
                    flex: 1,
                    gap: 12,
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#0075a3',
                        height: hp(20),
                        width: hp(20),
                    }}
                ></View>
                <View
                    style={{
                        rowGap: 10,
                    }}
                >
                    {/* Header */}
                    <Text
                        style={{
                            fontSize: hp(4),
                            textAlign: 'center',
                            marginTop: 40,
                        }}
                    >
                        Sign-in
                    </Text>
                    {/* inputs */}
                    <View
                        style={{
                            gap: 8,
                        }}
                    >
                        <View
                            style={{
                                height: hp(6),
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                backgroundColor: '#e6e8e7',
                                borderRadius: 10,
                                width: wp(80),
                                paddingHorizontal: 10,
                            }}
                        >
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                placeholder="Enter your email address"
                                placeholderTextColor={'gray'}
                                style={{
                                    fontSize: hp(2),
                                    flex: 1,
                                    fontWeight: '500',
                                    backgroundColor: '#e6e8e7',
                                }}
                            />
                        </View>
                        <View
                            style={{
                                height: hp(6),
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 8,
                                backgroundColor: '#e6e8e7',
                                borderRadius: 10,
                                width: wp(80),
                                paddingHorizontal: 10,
                            }}
                        >
                            <Octicons name="lock" size={hp(2.7)} color="gray" />
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor={'gray'}
                                style={{
                                    fontSize: hp(2),
                                    flex: 1,
                                    fontWeight: '500',
                                    backgroundColor: '#e6e8e7',
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        {loading ? (
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Loading size={hp(15)} />
                            </View>
                        ) : (
                            <TouchableOpacity onPress={handleLogin}>
                                <View
                                    style={{
                                        backgroundColor: '#0075a3',
                                        width: wp(80),
                                        height: hp(6),
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: hp(2.5),
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Sign In
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}
