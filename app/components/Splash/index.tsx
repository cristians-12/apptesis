import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import LottieView from "lottie-react-native";

export default function SplashScreen({ onFinish }: { onFinish?: (isCanceled: boolean) => void }) {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', minHeight: '100%' }}>
            <LottieView
                source={require('../../assets/lotties/fish.json')}
                autoPlay
                onAnimationFinish={onFinish}
                resizeMode='cover'
                loop={false}
                style={{
                    flex: 1,
                    width: '100%',
                }}
            />
        </SafeAreaView>
    );
}