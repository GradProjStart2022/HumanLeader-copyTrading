import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {LineChart, LineChartBicolor} from 'react-native-gifted-charts';
import {RFValue} from 'react-native-responsive-fontsize';

const lineData = [
    {value: 1, date: '		2023-01-01'},
    {value: 0, date: '	2023-01-02	'},
    {value: 0, date: '	2023-01-03	'},
    {value: 3, date: '	2023-01-04	'},
    {value: 5, date: '	2023-01-05	'},
    {value: 6, date: '	2023-01-06	'},
    {value: 3, date: '	2023-01-07	'},
    {value: 1, date: '	2023-01-08	'},
    {value: -1, date: '	2023-01-09	'},
    {value: -5, date: '	2023-01-10	'},
    {value: -3, date: '	2023-01-11	'},
    {value: 0, date: '	2023-01-12	'},
    {value: 3, date: '	2023-01-13	'},
    {value: 7, date: '	2023-01-14	'},
    {value: 9, date: '	2023-01-15	'},
    {value: 20, date: '	2023-01-16	'},
    {value: 17, date: '	2023-01-17	'},
    {value: 18, date: '	2023-01-18	'},
    {value: 1, date: '	2023-01-19	'},
    {value: 2, date: '	2023-01-20	'},
    {value: 2, date: '	2023-01-21	'},
    {value: 2, date: '	2023-01-22	'},
    {value: 2, date: '	2023-01-23	'},
    {value: 2, date: '	2023-01-24	'},
    {value: 2, date: '	2023-01-25	'},
    {value: 2, date: '	2023-01-26	'},
    {value: 2, date: '	2023-01-27	'},
    {value: 2, date: '	2023-01-28	'},
    {value: 2, date: '	2023-01-29	'},
    {value: 3, date: '	2023-01-30	'},
    {value: 3, date: '	2023-01-31	'},
    {value: 3, date: '	2023-02-01	'},
    {value: 3, date: '	2023-02-02	'},
    {value: 3, date: '	2023-02-03	'},
    {value: 3, date: '	2023-02-04	'},
    {value: 5, date: '	2023-02-05	'},
    {value: 5, date: '	2023-02-06	'},
    {value: 7, date: '	2023-02-07	'},
    {value: 7, date: '	2023-02-08	'},
    {value: 7, date: '	2023-02-09	'},
    {value: 7, date: '	2023-02-10	'},
    {value: 9, date: '	2023-02-11	'},
    {value: 10, date: '	2023-02-12'},
    {value: 10, date: '	2023-02-13	'},
    {value: 10, date: '	2023-02-14	'},
    {value: 10, date: '	2023-02-15	'},
    {value: 13, date: '	2023-02-16	'},
    {value: 15, date: '	2023-02-17	'},
    {value: 17, date: '	2023-02-18	'},
    {value: 17, date: '	2023-02-19	'},
    {value: 17, date: '	2023-02-20	'},
    {value: 10, date: '	2023-02-21	'},
    {value: 5, date: '	2023-02-22	'},
    {value: 5, date: '	2023-02-23	'},
    {value: 5, date: '	2023-02-24	'},
    {value: 5, date: '	2023-02-25	'},
    {value: 0, date: '	2023-02-26	'},
    {value: 0, date: '	2023-02-27	'},
    {value: 0, date: '	2023-02-28	'},
    {value: 0, date: '	2023-03-01	'},
    {value: 0, date: '	2023-03-02	'},
    {value: -5, date: '	2023-03-03	'},
    {value: -5, date: '	2023-03-04	'},
    {value: -5, date: '	2023-03-05	'},
    {value: -1, date: '	2023-03-06	'},
    {value: 3, date: '	2023-03-07	'},
    {value: 3, date: '	2023-03-08	'},
    {value: 6, date: '	2023-03-09	'},
    {value: 6, date: '	2023-03-10	'},
    {value: 7, date: '	2023-03-11	'},
    {value: 7, date: '	2023-03-12	'},
    {value: 7, date: '	2023-03-13	'},
    {value: 7, date: '	2023-03-14	'},
    {value: 17, date: '	2023-03-15	'},
    {value: 17, date: '	2023-03-16	'},
    {value: 17, date: '	2023-03-17	'},
    {value: 17, date: '	2023-03-18	'},
    {value: 17, date: '	2023-03-19	'},
    {value: 17, date: '	2023-03-20	'},
    {value: 20, date: '	2023-03-21	'},
    {value: 23, date: '	2023-03-22	'},
    {value: 25, date: '	2023-03-23	'},
    {value: 25, date: '	2023-03-24	'},
    {value: 25, date: '	2023-03-25	'},
    {value: 25, date: '	2023-03-26	'},
    {value: 25, date: '	2023-03-27	'},
    {value: 25, date: '	2023-03-28	'},
    {value: 25, date: '	2023-03-29	'},
    {value: 25, date: '	2023-03-30	'},
    {value: 25, date: '	2023-03-31	'},
];

const ChartComponent = () => {
    return (
        <View style={styles.container}>
            <LineChart
                areaChart
                data={lineData}
                hideYAxisText
                rotateLabel
                width={RFValue(300)}
                hideDataPoints
                spacing={RFValue(10)}
                color="#00ff83"
                thickness={RFValue(2)}
                startFillColor="rgba(20,105,81,0.3)"
                endFillColor="rgba(20,85,81,0.01)"
                startOpacity={RFValue(0.9)}
                endOpacity={RFValue(0.2)}
                initialSpacing={RFValue(0)}
                noOfSections={RFValue(6)}
                maxValue={RFValue(50)}
                yAxisColor="white"
                yAxisThickness={RFValue(0)}
                rulesType="solid"
                rulesColor="gray"
                yAxisTextStyle={{color: 'gray'}}
                yAxisSide="right"
                colorNegative="red"
                startFillColorNegative="red"
                xAxisColor="lightgray"
                pointerConfig={{
                    pointerStripHeight: RFValue(160),
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: RFValue(2),
                    pointerColor: 'lightgray',
                    radius: RFValue(6),
                    pointerLabelWidth: RFValue(100),
                    pointerLabelHeight: RFValue(90),
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        return (
                            <View
                                style={{
                                    height: RFValue(150),
                                    width: RFValue(100),
                                    justifyContent: 'center',
                                    marginTop: RFValue(-30),
                                    marginLeft: RFValue(-40),
                                }}>
                                <Text style={{color: 'white', fontSize: RFValue(14), marginBottom: RFValue(6), textAlign: 'center'}}>{items[0].date}</Text>
                                <View
                                    style={{paddingHorizontal: RFValue(14), paddingVertical: RFValue(6), borderRadius: RFValue(16), backgroundColor: 'white'}}>
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
        paddingBottom: RFValue(20),
        paddingTop: RFValue(20),
        paddingLeft: RFValue(10),
        backgroundColor: '#1C1C1C',
    },
});

export default ChartComponent;
