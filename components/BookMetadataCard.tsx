import React from "react";
import { XStack, Text } from "tamagui";

interface BookMetadataCardProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  accessibilityLabel?: string;
}

export function BookMetadataCard({ icon, children, accessibilityLabel }: BookMetadataCardProps) {
  return (
    <XStack
      backgroundColor="$backgroundHover"
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius="$4"
      alignItems="center"
      justifyContent="center" 
      gap="$2"
      flex={1}                
      minWidth={130}          
      maxWidth="100%"
      aria-label={accessibilityLabel}
    >
      <XStack alignItems="center" justifyContent="center">
        {icon}
      </XStack>

      <Text 
        fontSize="$3" 
        color="$colorMuted"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {children}
      </Text>
    </XStack>
  );
}