import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Weather from './Weather';

export default function Position() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [message, setMessage] = useState('Retrieving location...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setMessage('Location permission not granted.');
                setIsLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setMessage('Location retrieved');
            setIsLoading(false);
        })();
    }, []);

    return (
        <View>
            {!isLoading && (
                <>
                    <Text>Latitude: {latitude}</Text>
                    <Text>Longitude: {longitude}</Text>
                    <Weather latitude={latitude} longitude={longitude} />
                </>
            )}
            <Text>{message}</Text>
        </View>
    );
}