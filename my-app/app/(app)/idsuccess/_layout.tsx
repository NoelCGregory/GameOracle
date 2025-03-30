import { Stack } from "expo-router";

export default function StackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
                name="rateid"
                options={{ headerShown: false, animation: "none" }}
            />
        </Stack>
    )
}