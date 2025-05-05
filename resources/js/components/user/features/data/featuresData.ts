import React from 'react';
import { FaPencilRuler, FaPaintRoller, FaHammer, FaTools, FaHardHat, FaWrench } from 'react-icons/fa';
import { FaBuilding, FaCheckCircle, FaDraftingCompass, FaRulerCombined } from 'react-icons/fa';
import { MdArchitecture, MdDesignServices } from 'react-icons/md';

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
        icon: React.createElement(FaCheckCircle),
        count: '239+',
        label: 'Proyek Selesai'
    },
    {
        icon: React.createElement(FaDraftingCompass),
        count: '179+',
        label: 'Arsitektur'
    },
    {
        icon: React.createElement(FaHardHat),
        count: '58+',
        label: 'Konstruksi'
    }
];

// Services data
export const servicesData: ServiceCardData[] = [
    {
        icon: React.createElement(MdDesignServices),
        title: "Desain",
        description: "Layanan desain arsitektur dan interior yang inovatif dan sesuai kebutuhan klien. Kami memadukan estetika dan fungsionalitas untuk menciptakan ruang yang sempurna."
    },
    {
        icon: React.createElement(FaHardHat),
        title: "Konstruksi",
        description: "Jasa konstruksi bangunan berkualitas tinggi dengan standar keamanan terbaik. Tim profesional kami memastikan proyek selesai tepat waktu dan sesuai anggaran."
    },
    {
        icon: React.createElement(FaHammer),
        title: "Renovasi",
        description: "Ubah ruang lama menjadi baru dengan layanan renovasi kami. Kami menangani segala jenis renovasi dari yang kecil hingga perubahan total struktur bangunan."
    }
];
