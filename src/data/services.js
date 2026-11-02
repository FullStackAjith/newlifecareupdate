// id -> translation key under services.items.<id>; icon from components/Icon.jsx
// group: 'addiction' = what we treat, 'care' = how we help
export const SERVICES = [
  { id: 'alcohol', icon: 'wine', group: 'addiction' },
  { id: 'drug', icon: 'pill', group: 'addiction' },
  { id: 'tobacco', icon: 'wind', group: 'addiction' },
  { id: 'mobile', icon: 'smartphone', group: 'addiction' },
  { id: 'gaming', icon: 'gamepad', group: 'addiction' },
  { id: 'gambling', icon: 'dice', group: 'addiction' },
  { id: 'pornography', icon: 'eyeoff', group: 'addiction' },
  { id: 'pills', icon: 'pill', group: 'addiction' },
  { id: 'counselling', icon: 'message', group: 'care' },
  { id: 'familyCounselling', icon: 'users', group: 'care' },
  { id: 'rehabilitation', icon: 'trend', group: 'care' },
  { id: 'aftercare', icon: 'refresh', group: 'care' },
  { id: 'other', icon: 'compass', group: 'care' },
];

export const JOURNEY_ICONS = ['clipboard', 'message', 'heart', 'sun', 'refresh'];
