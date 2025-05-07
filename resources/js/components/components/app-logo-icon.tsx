import React, { HTMLAttributes } from 'react';

interface AppLogoIconProps extends HTMLAttributes<HTMLImageElement> {
    className?: string;
}

export default function AppLogoIcon({ className, ...props }: AppLogoIconProps) {
    return (
        <img
            src="/storage/images/4.webp"
            alt="Arsitekta Logo"
            className={className}
            {...props}
        />
    );
}
