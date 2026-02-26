import type { AmenitiesType } from './types';

export const defaultCurrency = [
  { name: 'USD', value: 'usd' },
  { name: 'GBP', value: 'gbp' },
  { name: 'AUD', value: 'aud' },
  { name: 'CAD', value: 'cad' },
];

export const defaultCountry = [
  { name: 'United States', value: 'united_states' },
  { name: 'United Kingdom', value: 'united_kingdom' },
  { name: 'Australia', value: 'australia' },
  { name: 'New Zealand', value: 'new_zealand' },
  { name: 'Canada', value: 'canada' },
];

export const defaultTimezone = [
  { name: 'CST', value: 'cst' },
  { name: 'CET', value: 'cet' },
  { name: 'GMT', value: 'gmt' },
];

export const defaultFormat = [
  { name: '$1, 234, 567', value: '$1, 234, 567 ' },
  { name: 'US$ 1, 234, 567', value: 'US$ 1, 234, 567' },
  { name: '1, 234, 567 $', value: '1, 234, 567 $' },
  { name: '1 , 234, 567 US$', value: '1 , 234, 567 US$' },
];

export const dateFormat = [
  { value: 'MM/DD/YYYY', name: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', name: 'DD/MM/YYYY' },
  { value: 'YYYY/MM/DD', name: 'YYYY/MM/DD' },
];

export const feeAndPricingPercentageBase = [
  { value: 'percentage_base', name: 'Percentage-based (Recommended)' },
  { value: 'flat_fee_per_booking', name: 'Flat fee per booking' },
  { value: 'tiered_pricing', name: 'Tiered pricing (Advanced)' },
];

export const securityDepositHoldDuration = [
  { value: '5', name: '5 days after checkout' },
  { value: '7', name: '7 days after checkout' },
  { value: '10', name: '10 days after checkout' },
  { value: '15', name: '15 days after checkout' },
];

export const securityDepositGracePeriod = [
  { value: '15', name: '15 Minutes' },
  { value: '30', name: '30 Minutes' },
  { value: '45', name: '45 Minutes' },
  { value: '60', name: '60 Minutes' },
];
export const distanceMeasurement = [
  { value: 'Miles', name: 'Miles' },
  { value: 'Kilometres', name: 'Kilometres' },
];
export const defaultMonths = [
  { name: '1 Month', value: '1 Month' },
  { name: '2 Months', value: '2 Months' },
  { name: '3 Months', value: '3 Months' },
  { name: '4 Months', value: '4 Months' },
  { name: '5 Months', value: '5 Months' },
  { name: '6 Months', value: '6 Months' },
  { name: '7 Months', value: '7 Months' },
  { name: '8 Months', value: '8 Months' },
  { name: '9 Months', value: '9 Months' },
  { name: '10 Months', value: '10 Months' },
  { name: '11 Months', value: '11 Months' },
  { name: '12 Months', value: '12 Months' },
];
export const defaultHours = [
  { name: '12 Hours', value: '12 Hours' },
  { name: '24 Hours', value: '24 Hours' },
];
export const generalPlateformFormOverlay = [
  {
    label: 'Platform Name',
    type: 'text',
    name: 'plateformName',
    class: '',
    placeholder: 'Enter Plateform Name',
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Platform Email',
    type: 'email',
    name: 'plateformEmail',
    class: '',
    placeholder: 'Enter Plateform email',
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Company Name',
    type: 'text',
    name: 'cpmpanyName',
    class: '',
    placeholder: 'Enter Company Name',
    error: '',
    allowAsterisk: false,
  },
  { label: 'Tax ID', type: 'text', class: '', name: 'taxId', placeholder: 'Enter Tax ID', error: '', allowAsterisk: false },
  {
    label: 'Business Address',
    type: 'textarea',
    name: 'address',
    class: '',
    placeholder: 'Enter Business Address',
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Company Phone Number',
    type: 'text',
    name: 'companyPhoneNumber',
    class: '',
    placeholder: 'Enter Company Phone Number',
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Support Phone Number',
    type: 'text',
    name: 'supportPhoneNumber',
    class: '',
    placeholder: 'Enter Support Phone Number',
    error: '',
    allowAsterisk: false,
  },
];

export const generalRegionalFormOverlay = [
  {
    label: 'Default Currency',
    type: 'select',
    name: 'currency',
    class: '',
    placeholder: 'Select Currency',
    data: defaultCurrency,
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Default Country',
    type: 'select',
    name: 'country',
    class: '',
    placeholder: 'Select Country',
    data: defaultCountry,
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Default Timezone',
    type: 'select',
    name: 'timezone',
    class: '',
    placeholder: 'Select Timezone',
    data: defaultTimezone,
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Currency Format',
    type: 'select',
    name: 'currency_format',
    class: '',
    placeholder: 'Select Currency Format',
    data: defaultFormat,
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Date Format',
    type: 'radio',
    name: 'date_format',
    class: '',
    placeholder: '',
    data: dateFormat,
    error: '',
    allowAsterisk: false,
  },
  {
    label: 'Distance Measurement',
    type: 'radio',
    name: 'distance_measurement',
    class: '',
    placeholder: '',
    data: distanceMeasurement,
    error: '',
    allowAsterisk: false,
  },
];

export const DemoSettingAmenitiesRecords: AmenitiesType[] = [
  {
    id: '1',
    icon: '/icons/bedroom-lock.svg',
    name: 'Private Room',
    description: 'Access to a private room at the Pond Vicinity',
  },
  {
    id: '2',
    icon: '/icons/amenity-icon1.svg',
    name: 'Fishing Gear',
    description: 'Access to a private room at the Pond Vicinity',
  },
  {
    id: '3',
    icon: '/icons/amenity-icon2.svg',
    name: 'Private BBQ',
    description: 'Access to a private room at the Pond Vicinity',
  },
  {
    id: '4',
    icon: '/icons/amenity-icon3.svg',
    name: 'Parking',
    description: 'Access to a private room at the Pond Vicinity',
  },
  {
    id: '5',
    icon: '/icons/amenity-icon2.svg',
    name: 'Private BBQ',
    description: 'Access to a private room at the Pond Vicinity',
  },
  {
    id: '6',
    icon: '/icons/amenity-icon3.svg',
    name: 'Parking',
    description: 'Access to a private room at the Pond Vicinity',
  },
  {
    id: '7',
    icon: '/icons/amenity-icon2.svg',
    name: 'Private Room',
    description: 'Access to a private room at the Pond Vicinity',
  },
];

export const feesAndPricingFormOverlay = [
  {
    label: 'Percentage-based (Recommended)',
    type: 'radio',
    name: 'percentage_based',
    data: feeAndPricingPercentageBase,
  },
];

export const cancellationPolices = [
  {
    id: '1',
    name: 'flexible',
    title: 'Flexible',
    descriptions: [
      {
        title: '100% refund if cancelled 7+ days before check-in',
        icon: 'tick',
      },
      { title: '50% refund if cancelled 3-6 days before check-in', icon: 'tick' },
      { title: 'No refund if cancelled within 2 days of check-in', icon: 'cross' },
    ],
  },
  {
    id: '2',
    name: 'moderate',
    title: 'Moderate',
    descriptions: [
      {
        title: '1100% refund if cancelled 14+ days before check-in',
        icon: 'tick',
      },
      { title: '50% refund if cancelled 7-13 days before check-in', icon: 'tick' },
      { title: ' No refund if cancelled within 6 days of check-in', icon: 'cross' },
    ],
  },
  {
    id: '3',
    name: 'strict',
    title: 'Strict',
    descriptions: [
      {
        title: ' 50% refund if cancelled 30+ days before check-in',
        icon: 'tick',
      },
      { title: 'No refund if cancelled within 29 days of check-in', icon: 'cross' },
      { title: 'Service fees always non-refundable', icon: 'tick' },
    ],
  },
];

export const makeAmenityPayload = ({ data, amenityIcon }: any): any => {
  return {
    id: data?.id && null,
    name: data.name,
    description: data.description,
    icon: amenityIcon?.url || '',
  };
};
