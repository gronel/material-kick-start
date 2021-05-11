import React from "react";
import Link from "next/link";
import api from "../Services/api";
import { View, Text } from "react-native";

const AuthIndicator = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <View>
        <Text></Text>
      </View>
    );
    }
    return (
        <Link href="/login">
            <a className="">Sign in</a>
        </Link>
    )
};

export default AuthIndicator;
