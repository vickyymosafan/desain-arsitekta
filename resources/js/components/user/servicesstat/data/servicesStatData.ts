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
        count: '500+',
        label: 'Proyek Selesai'
    },
    {
        icon: React.createElement(FaBuilding),
        count: '12',
        label: 'Tahun Pengalaman'
    },
    {
        icon: React.createElement(MdArchitecture),
        count: '50+',
        label: 'Arsitek Ahli'
    }
];

// Services data
export const servicesData: ServiceCardData[] = [
    {
        icon: React.createElement(MdDesignServices),
        title: 'Desain Arsitektur',
        description: 'Layanan desain arsitektur untuk berbagai jenis bangunan, mulai dari rumah tinggal, kantor, hingga bangunan komersial.'
    },
    {
        icon: React.createElement(FaRulerCombined),
        title: 'Perencanaan Interior',
        description: 'Jasa perencanaan interior untuk menciptakan ruangan yang fungsional, estetis, dan sesuai dengan kebutuhan Anda.'
    },
    {
        icon: React.createElement(FaDraftingCompass),
        title: 'Konsultasi Konstruksi',
        description: 'Layanan konsultasi untuk proyek konstruksi Anda, termasuk perencanaan anggaran, pemilihan material, dan koordinasi kontraktor.'
    }
];
