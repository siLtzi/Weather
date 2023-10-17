import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

const api = {
    url: 'https://api.openweathermap.org/data/2.5/weather?',
    key: '7ced617c124b8cd3227136dbf9a259f1',
    icons: 'http://openweathermap.org/img/wn/'
};

export default function Weather(props) {
    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api.url}lat=${props.latitude}&lon=${props.longitude}&appid=${api.key}&units=metric`);
                const data = await response.json();

                setTemp(data.main.temp);
                setDescription(data.weather[0].description);
                setIcon(data.weather[0].icon);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, [props.latitude, props.longitude]);

    return (
        <View>
            <Text>Temperature: {temp}°C</Text>
            <Text>Description: {description}</Text>
            {icon && <Image source={{ uri: `${api.icons}${icon}@2x.png` }} style={{width: 100, height: 100}} />}
        </View>
    );
}