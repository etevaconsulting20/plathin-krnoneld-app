import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Overlay } from "react-native-elements"
import { StackActions } from "@react-navigation/native"




class LogoScreen extends Component {
    componentDidMount=()=>{
       
        setTimeout(()=>{
            this.props.navigation.dispatch(
                StackActions.replace("mainApp"))
        },4000);
       
    }

    render() {
        return(
        <View
            style={{backgroundColor:"transparent",marginVertical:290,padding:5,marginHorizontal:5}}
            
        >
            <>
                <Image
                    style={{ height: 55, width: 340 }}
                    source={require('../assets/images/P_K_logo-removebg-preview.png')}
                />
            </>
        </View>
        )
    }
}
export default LogoScreen;
