import {default as phoneNumberParser} from 'libphonenumber-js'


export const toS3Url = (url) => {
    if (!url) return ''
    return (process.env.s3_url + url)
}


export const cancerTypes = [
    {label: 'Breast Cancer', value: 'breast'},
    {label: 'Lung Cancer', value: 'lung'},
    {label: 'Prostate Cancer', value: 'prostate'},
    {label: 'Colorectal Cancer', value: 'colorectal'},
    {label: 'Other', value: 'other'}
]

export const treatmentTypes = [
    {label: 'Chemotherapy', value: 'chemotherapy'},
    {label: 'Radiation Therapy', value: 'radiation'},
    {label: 'Surgery', value: 'surgery'},
    {label: 'Immunotherapy', value: 'immunotherapy'},
    {label: 'Other', value: 'other'},
]


export const calculateBMI = (height, weight) => {
    if (height && weight) {
        const heightInMeters = parseFloat(height) / 100
        const weightInKg = parseFloat(weight)
        return (weightInKg / (heightInMeters * heightInMeters)).toFixed(2)
    }
    return ''
}

export const numberWithCommas = (x: number, fixed = 0, prefix = '') => {
    if (isNaN(x) || !x) return ''
    return prefix + x.toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


export const categories = ['Planète', 'Éducation', 'Pauvreté', 'Égalité', 'Santé', 'Eau', 'Énergie', 'Travail', 'Climat', 'Paix et Justice', 'Vie aquatique', 'Vie terrestre', 'À venir', 'Industrie & Innovation', 'Faim', 'Inégalités', 'Villes durables', 'Recyclage'];


export const months = {
    'January': 'Janvier',
    'February': 'Février',
    'March': 'Mars',
    'April': 'Avril',
    'May': 'Mai',
    'June': 'Juin',
    'July': 'Juillet',
    'August': 'Août',
    'September': 'Septembre',
    'October': 'Octobre',
    'November': 'Novembre',
    'December': 'Décembre',
}

export const days = {
    'Monday': 'Lundi',
    'Tuesday': 'Mardi',
    'Wednesday': 'Mercredi',
    'Thursday': 'Jeudi',
    'Friday': 'Vendredi',
    'Saturday': 'Samedi',
    'Sunday': 'Dimanche',
}


export const roles = [
    {
        label: "Supervisor",
        value: 'supervisor'
    },
    {
        label: 'Accounter',
        value: 'accounter'
    },
    {
        label: 'Admin',
        value: 'admin'
    },
    {
        label: 'IT',
        value: 'it'
    }
]


export const getStatusClass = status => {
    return (statusClass[status]) + ' inline-block text-[#0EA714] border rounded-full px-2.5 py-1.5 leading-[15px] text-xs font-medium capitalize'
}

export const statusClass = {
    active: 'border-[#C5E3CC]',
    pending: 'bg-[#FFECDA] text-[#944E06]',
    inactive: 'bg-[#F0F0F0] text-[#414141]',
    approved: 'bg-indigo-500 text-indigo-100',
}

export const parsePhoneNumber = (phoneNumber) => {
    try {
        return phoneNumberParser(phoneNumber.code + phoneNumber.number, phoneNumber.code.toUpperCase())
    } catch (e) {
        return null
    }
}

export const parsePlainPhoneNumber = (phoneNumber) => {
    try {
        return phoneNumberParser(phoneNumber)
    } catch (e) {

    }
}

export const formatPhoneNumber = (phoneNumber) => {
    try {
        phoneNumber = phoneNumber.replaceAll(' ', '')
        if (phoneNumber.startsWith('+33')) {
            return phoneNumber.substring(0, 3) + ' ' + phoneNumber.substring(3, 4) + ' ' + phoneNumber.substring(4, 6) + ' ' + phoneNumber.substring(6, 8) + ' ' + phoneNumber.substring(8, 10) + ' ' + phoneNumber.substring(10, 12)
        }
        return phoneNumberParser(phoneNumber).formatInternational()
    } catch (e) {

    }
}


export const isEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

