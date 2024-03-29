import { StyleSheet, Text, View, Button, Animated, Image, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import SlidingUpPanel from 'rn-sliding-up-panel';
import { LineDivider, Thumb, StopCard, NearbyStopsComponent } from '../components';
import SearchResultCard from '../components/SearchResultCard';

const Home = () => {

    let _panel = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isResultVisible, setResultVisible] = useState(false);
    const [dragging, setDragging] = useState(true);
    const _draggedValue = useRef(new Animated.Value(0)).current;

    const [routeStops, setRouteStops] = useState([


        {
            stopId: "1",
            stopName: "IIUI Male-Stop",
            stopAddress: "Main Rd, H-10/2, IIU, Islamabad",
            tta: "2 mins",
        },
        {
            stopId: "2",
            stopName: "Khayaban-e-Johar Stop",
            stopAddress: "H 8/1 H-8, Islamabad",
            tta: "10 mins",
        },
        {
            stopId: "3",
            stopName: "Potohar Stop",
            stopAddress: "9th Ave, I -8, Islamabad Territory",
            tta: "15 mins",
        },
        {
            stopId: "4",
            stopName: "Bahria Town Stop",
            stopAddress: "Bahria Town Phase VIII, Rawalpindi",
            tta: "25 mins",
        },

    ]);
    const [stopsInfo, setStopInfo] = useState([
        {
            id: 1,
            name: "Bahria Town Stop",
            address: "Circular Drive, Rafi Block",
            distance: '100m'
        },
        {
            id: 2,
            name: "IIUI Boys Campus",
            address: "H-10/2 Islamabad",
            distance: '100m'

        },
        {
            id: 3,
            name: "Saddar Stop",
            address: "Bank Road, Saddar, Rawalpindi",
            distance: '100m'

        },
        {
            id: 4,
            name: "Islamabad Airport Stop",
            address: "Fatehjang, Islamabad",
            distance: '100m'

        },
        {
            id: 5,
            name: "PWD Stop",
            address: "PWD, Rawalpindi",
            distance: '100m'

        },
        {
            id: 6,
            name: "Umer Block",
            address: "Bahria Town Phase VIII",
            distance: '100m'

        },
        {
            id: 7,
            name: "Usman Block",
            address: "Bahria Town Phase VIII",
            distance: '100m'

        },
        {
            id: 8,
            name: "Civic Center Ph IV",
            address: "Bahria Town Phase IV",
            distance: '100m'

        },

    ])
    const [searchResult, setSearchResult] = useState([
        {
            id: 1,
            name: "Block A",
            address: "losar Sharfoo"
        },
        {
            id: 2,
            name: "Block A",
            address: "losar Sharfoo"
        },


    ])

    useEffect(() => {
        _draggedValue.addListener((valueObject) => {
            if (valueObject.value > SIZES.height) { setDragging(false); }
        })

        return () => {
            _draggedValue.removeAllListeners();
        }

    }, []);


    function renderSearchResultModal() {
        const [coordinates] = useState([
            { latitude: 33.504013, longitude: 73.102201 },
            { latitude: 33.503686, longitude: 73.100291 }
        ]);

        return (
            <Modal
                transparent
                visible={isResultVisible}
                animationType='fade'
                onRequestClose={() => { setResultVisible(!isResultVisible) }}
                style={{
                    backgroundColor: COLORS.black
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        height: "100%",
                        width: "100%",
                    }}

                >
                    <View
                        style={{
                            flex: 0.3,
                        }}

                    >
                        <MapView
                            style={{ flex: 1 }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            rotateEnabled={false}
                            initialRegion={{
                                latitude: 33.504013,
                                longitude: 73.102201,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >

                            <Marker
                                coordinate={{ latitude: 33.504013, longitude: 73.102201 }}

                            />
                            <Marker
                                coordinate={{ latitude: 33.503686, longitude: 73.100291 }}

                            />
                            <Polyline
                                coordinates={[{ latitude: 33.504013, longitude: 73.102201 }, { latitude: 33.503686, longitude: 73.100291 }]}
                                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                strokeColors={['#7F0000']}
                                strokeWidth={6}
                            />
                        </MapView>

                    </View>
                    <View
                        style={{
                            flex: 0.7,


                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: COLORS.mailaWhite,
                                borderTopStartRadius: 22,
                                borderTopEndRadius: 22,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                            }}
                        >
                            <View
                                style={{
                                    position: "absolute",
                                    width: 390,
                                    height: 115,
                                    alignSelf: 'center',
                                    marginTop: 20,

                                }}
                            >
                                <Image
                                    source={icons.bus3}
                                    resizeMode="cover"
                                    style={{
                                        width: 40,
                                        height: 40
                                    }}
                                />
                                <Text
                                    style={{
                                        position: 'absolute',
                                        top: 40,
                                        fontSize: 25,
                                        color: COLORS.black
                                    }}
                                >
                                    Bahria Town Stop
                                </Text>
                                <Text
                                    style={{
                                        position: 'absolute',
                                        top: 70,
                                        left: 2,
                                        fontSize: 14,
                                        color: '#9B9999'
                                    }}
                                >
                                    From <Text style={{ color: '#535353' }}>current location</Text>
                                </Text>
                                <View>
                                    <Image
                                        source={icons.online}
                                        resizeMode="cover"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            position: 'absolute',
                                            right: 70,
                                            top: -20,

                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            position: 'absolute',
                                            right: 14,
                                            top: -10,
                                            color: '#4FCF88',
                                        }}
                                    >
                                        On-time
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            position: 'absolute',
                                            right: 4,
                                            top: 20,
                                            color: COLORS.black,
                                        }}
                                    >
                                        3 stops • <Text style={{ color: '#4FCF88' }} >25 mins</Text>
                                    </Text>

                                </View>


                            </View>

                            <View style={
                                {
                                    position: 'absolute',
                                    top: 120,
                                    width: "90%",
                                    height: 2,
                                    alignSelf: 'center',
                                    backgroundColor: '#B6B6B6',
                                    borderRadius: 2,
                                }
                            } />





                            {/* <FlatList
                                style={{
                                    top: 125,
                                }}
                                data={routeStops}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={() => {
                                    return (
                                        <LineDivider />
                                    )
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <StopCard data = {item}/>

                                        
                                    )
                                }}
                            /> */}




                        </View>
                    </View>
                </View>
            </Modal >
        )
    }

    function renderMap() {
        return (

            <View style={styles.MAP}>
                <RenderCenterLocation />
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 33.504013,
                        longitude: 73.102201,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    <Marker
                        coordinate={{ latitude: 33.504013, longitude: 73.102201 }}

                    />
                    <Marker
                        coordinate={{ latitude: 33.503686, longitude: 73.100291 }}

                    />
                    <Marker
                        coordinate={{ latitude: 33.505569, longitude: 73.092765 }}

                    />

                </MapView>
            </View>
        )
    }

    function renderSwipeUpModal() {
        return (
            <View style={styles.MODAL}>
                <SlidingUpPanel
                    ref={c => { _panel = c; }}
                    allowDragging={dragging}
                    draggableRange={{
                        top: SIZES.height - 120,
                        bottom: SIZES.height / 3,
                    }}
                    animatedValue={_draggedValue}
                    snappingPoints={[SIZES.height]}
                    height={SIZES.height}
                    friction={0.7}
                    onBottomReached={() => { setDragging(true) }}
                >
                    <View style={{
                        flex: 1, backgroundColor: COLORS.stopModalGray, borderTopLeftRadius: SIZES.radius * 2,
                        borderTopRightRadius: SIZES.radius * 2
                    }}>
                        {/* List Header: Current Address */}
                        <View style={{
                            // borderColor:COLORS.black,
                            // borderWidth:1,
                            // // top:15,
                            height: 60,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                source={icons.pinpoint}
                                style={{
                                    position: 'absolute',
                                    left: 10,
                                    width: 25,
                                    height: 25,
                                    // borderColor:COLORS.black,
                                    // borderWidth: 1,
                                }}
                            />
                            <Text style={{
                                fontSize: 20,
                                color: COLORS.black,
                                marginLeft: 10,
                                // borderColor:COLORS.black,
                                // borderWidth: 1,
                            }}
                            >
                                657, Rafi Block, Bahria Phase VIII
                            </Text>
                        </View>
                        {/* List of Nearyby Stops */}
                        <FlatList
                            data={stopsInfo}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={() => {
                                return (
                                    <View>
                                        <Text 
                                            style={{
                                                // borderColor:COLORS.black,
                                                // borderWidth:1,
                                                color:COLORS.black,
                                                paddingLeft:15,
                                                fontSize:17,
                                                fontWeight:'600'
                                            }}
                                        >
                                            Near by Stops:
                                        </Text>
                                    </View>
                                   
                                )
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <NearbyStopsComponent data={{ item, index }} />
                                )
                            }}
                        />

                    </View>


                </SlidingUpPanel>
            </View>
        )
    }

    function renderSearchBar() {
        return (
            <View style={styles.SEARCHBAR}>
                <TouchableOpacity style={styles.SEARCHBARIN}
                    onPress={() => {
                        setModalVisible(!isModalVisible);
                        console.warn("search pressed")
                    }}
                >

                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: COLORS.black,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image

                            source={icons.search}
                            resizeMode="cover"
                            style={{ width: 25, height: 25, tintColor: COLORS.white }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            height: "100%",
                        }}
                    >
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={COLORS.gray}
                            style={{
                                color: COLORS.black
                            }}
                        />
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    function RenderCenterLocation() {

        return (
            <TouchableOpacity
                onPress={() => {
                    console.warn("Center Location")
                }}
                style={{
                    position: "absolute",
                    right: 25,
                    bottom: 50,
                    zIndex: 1
                }}
            >
                <Image
                    style={{
                        height: 35,
                        width: 35,
                    }}
                    source={icons.locationcenter}
                ></Image>
            </TouchableOpacity>
        )
    }
    function renderSearchModal() {
        return (
            <Modal
                transparent
                visible={isModalVisible}
                animationType='slide'
                onRequestClose={() => { setModalVisible(!isModalVisible) }}
            >
                <View style={{
                    flex: 0.3,
                    backgroundColor: "rgba(0,0,0,0.8)"
                }}>
                    <View
                        style={{
                            width: "100%",
                            height: 30,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => { setModalVisible(!isModalVisible) }}
                        >
                            <Image
                                style={{
                                    position: 'absolute',
                                    height: 25,
                                    width: 25,
                                    left: 15,
                                    top: 10,
                                    tintColor: COLORS.white,
                                }}
                                source={icons.back}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            paddingTop: 50,
                            alignItems: 'center',
                            // borderColor: COLORS.black,
                            // borderWidth: 1
                        }}
                    >
                        <View
                            style={
                                {
                                    width: '95%',
                                    height: 50,
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.white,
                                    marginBottom: 5,
                                    borderRadius: SIZES.radius
                                }

                            }
                        >
                            <View
                                style={{
                                    flex: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        padding: SIZES.base,
                                        backgroundColor: COLORS.lightGray,
                                        borderRadius: 25
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 20,
                                            backgroundColor: COLORS.blue
                                        }}
                                    />
                                </View>

                            </View>

                            <TextInput
                                placeholder='From'
                                placeholderTextColor={COLORS.gray}
                                style={
                                    {
                                        flex: 10,
                                        paddingHorizontal: SIZES.base,
                                    }

                                }
                            />

                        </View>
                        <View
                            style={
                                {
                                    width: "95%",
                                    height: 50,
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.white,
                                    borderRadius: SIZES.radius
                                }

                            }
                        >
                            <View
                                style={{
                                    flex: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        padding: 5,
                                        borderRadius: SIZES.radius,
                                        backgroundColor: COLORS.blue
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: COLORS.white
                                        }}
                                    />
                                </View>

                            </View>
                            <TextInput
                                placeholder='To'

                                placeholderTextColor={COLORS.gray}
                                style={
                                    {
                                        flex: 10,
                                        paddingHorizontal: SIZES.base,
                                    }
                                }
                            />
                        </View>
                        <View
                            style={{
                                width: 4,
                                height: 45,
                                backgroundColor: COLORS.blue,
                                position: 'absolute',
                                top: 80,
                                left: 39.5,
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            marginTop: SIZES.radius,
                            alignItems: 'flex-end',

                        }}
                    >
                        <Image
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: COLORS.white,
                                marginRight: SIZES.padding
                            }}
                            source={icons.go}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 0.7,
                    backgroundColor: COLORS.gray
                }}>
                    <FlatList
                        data={searchResult}
                        renderItem={({ item, index }) => {
                            return (
                                <SearchResultCard handlePress={() => { setResultVisible(!isResultVisible) }} />
                            )
                        }}
                    >
                    </FlatList>

                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.HOME}>
            {renderSearchResultModal()}
            {renderMap()}
            {renderSwipeUpModal()}
            {renderSearchBar()}
            {renderSearchModal()}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    SEARCHBAR:
    {
        height: 50,
        position: 'absolute',
        top: SIZES.padding * 2,
        left: SIZES.padding,
        right: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: SIZES.padding * .25,

    },

    SEARCHBARIN: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    HOME: {
        flex: 1,
        backgroundColor: COLORS.gray
    },

    MAP: {
        flex: 0.7,
    },
    MODAL: {
        flex: 0.3,
        zIndex: 2
    },
})