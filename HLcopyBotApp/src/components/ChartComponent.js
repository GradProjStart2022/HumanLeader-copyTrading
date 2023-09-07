import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LineChart, LineChartBicolor} from 'react-native-gifted-charts';

const lineData = [
    {value: 0, date: '1 Apr 2022'},
    {value: 1, date: '2 Apr 2022'},
    {value: 2, date: '3 Apr 2022'},
    {value: 3, date: '4 Apr 2022'},
    {value: -5, date: '5 Apr 2022'},
    {value: 5, date: '6 Apr 2022'},
    {value: 5, date: '7 Apr 2022'},
    {value: 7, date: '8 Apr 2022'},
    {value: -16, date: '9 Apr 2022'},
    {value: 20, date: '10 Apr 2022'},

    {value: 2, date: '11 Apr 2022'},
    {value: 4, date: '12 Apr 2022'},
    {value: 5, date: '13 Apr 2022'},
    {value: 6, date: '14 Apr 2022'},
    {value: 4, date: '15 Apr 2022'},
    {value: 4, date: '16 Apr 2022'},
    {value: 4, date: '17 Apr 2022'},
    {value: 4, date: '18 Apr 2022'},
    {value: 4, date: '19 Apr 2022'},
    {value: 4, date: '20 Apr 2022'},

    {value: 5, date: '21 Apr 2022'},
    {value: 6, date: '22 Apr 2022'},
    {value: 7, date: '23 Apr 2022'},
    {value: -20, date: '24 Apr 2022'},
    {value: 10, date: '25 Apr 2022'},
    {value: 7, date: '26 Apr 2022'},
    {value: 5, date: '27 Apr 2022'},
    {value: 4, date: '28 Apr 2022'},
    {value: 3, date: '29 Apr 2022'},
    {value: 1, date: '30 Apr 2022'},

    {value: -5, date: '1 May 2022'},
    {value: 5, date: '2 May 2022'},
    {value: 7, date: '3 May 2022'},
    {value: 6, date: '4 May 2022'},
    {value: 8, date: '5 May 2022'},
];

const ChartComponent = () => {
    return (
        <View style={styles.container}>
            <LineChart
                areaChart
                data={lineData}
                hideYAxisText
                rotateLabel
                width={300}
                hideDataPoints
                spacing={10}
                color="#00ff83"
                thickness={2}
                startFillColor="rgba(20,105,81,0.3)"
                endFillColor="rgba(20,85,81,0.01)"
                startOpacity={0.9}
                endOpacity={0.2}
                initialSpacing={0}
                noOfSections={6}
                maxValue={50}
                yAxisColor="white"
                yAxisThickness={0}
                rulesType="solid"
                rulesColor="gray"
                yAxisTextStyle={{color: 'gray'}}
                yAxisSide="right"
                colorNegative="red"
                startFillColorNegative="red"
                xAxisColor="lightgray"
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        return (
                            <View
                                style={{
                                    height: 90,
                                    width: 100,
                                    justifyContent: 'center',
                                    marginTop: -30,
                                    marginLeft: -40,
                                }}>
                                <Text style={{color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center'}}>{items[0].date}</Text>

                                <View style={{paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white'}}>
                                    <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{items[0].value + '%'}</Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 10,
        backgroundColor: '#1C1C1C',
    },
});

export default ChartComponent;