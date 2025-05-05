import React from 'react';
import { BiRuler, BiPaintRoll, BiHomeAlt } from 'react-icons/bi';
import { FaBuilding, FaCalendarAlt, FaSmile } from 'react-icons/fa';

export interface StatItemData {
    icon: React.ReactNode;
    count: string | number;
    label: string;
}

export interface ServiceCardData {
    icon: React.ReactNode;
    title: string;
    description: string;
}

// Stats data
export const statsData: StatItemData[] = [
    {
        icon: React.createElement(FaBuilding),
        count: '239+',
        label: 'Proyek Selesai'
    },
    {
        icon: React.createElement(FaCalendarAlt),
        count: '179+',
        label: 'Arsitektur'
    },
    {
        icon: React.createElement(FaSmile),
        count: '58+',
        label: 'Konstruksi'
    }
];

// Services data
export const servicesData: ServiceCardData[] = [
    {
        icon: React.createElement(BiRuler),
        title: "Desain",
        description: "Layanan desain arsitektur dan interior yang inovatif dan sesuai kebutuhan klien. Kami memadukan estetika dan fungsionalitas untuk menciptakan ruang yang sempurna."
    },
    {
        icon: React.createElement(BiHomeAlt),
        title: "Konstruksi",
        description: "Jasa konstruksi bangunan berkualitas tinggi dengan standar keamanan terbaik. Tim profesional kami memastikan proyek selesai tepat waktu dan sesuai anggaran."
    },
    {
        icon: React.createElement(BiPaintRoll),
        title: "Renovasi",
        description: "Ubah ruang lama menjadi baru dengan layanan renovasi kami. Kami menangani segala jenis renovasi dari yang kecil hingga perubahan total struktur bangunan."
    }
];
