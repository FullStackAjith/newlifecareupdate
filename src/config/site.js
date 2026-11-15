// Single source of truth for verified centre details.
// Phone, WhatsApp, email and address are preserved from the original website.

export const SITE = {
  name: 'New Life Care Rehab',
  phones: [
    { display: '+91 89256 20885', tel: '+918925620885' },
    { display: '+91 89256 20886', tel: '+918925620886' },
    { display: '+91 89256 20887', tel: '+918925620887' },
  ],
  whatsapp: { display: '+91 89256 20885', number: '918925620885' },
  email: 'newlifecarecbe@gmail.com',
  address: [
    'No. 3/3, Bajanai Kovil Street',
    'Udayampalayam, Coimbatore – 641049',
    'Tamil Nadu, India',
  ],
  mapQuery: 'No. 3/3, Bajanai Kovil Street, Udayampalayam, Coimbatore 641049, Tamil Nadu, India',
  // Google Maps link provided by the centre (Contact Us PDF).
  mapLink: 'https://maps.google.com/maps?udm&fvr=1&pvq=Cg0vZy8xMXp4eTc5ZDRfIhIKDG5ld2xpZmUgY2FyZRACGAOJAQqdr8xah22O&lqi=ChduZXdsaWZlIGNhcmUgY29pbWJhdG9yZUif4dLT876AgAhaIxAAEAEYABgBGAIiF25ld2xpZmUgY2FyZSBjb2ltYmF0b3JlkgEIaG9zcGl0YWw&vet=10CAAQoqAOahcKEwiYg4WB5oeYAxUAAAAAHQAAAAAQCw..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3ba8590041b290bb:0x8e6d875accaf9d0a',
  // National emergency number in India.
  emergencyNumber: '112',
  /**
   * IMPORTANT: leave `false` until the centre confirms that enquiries are
   * genuinely monitored 24/7. When false, the site shows neutral wording such
   * as "Contact Us for Enquiries". Flip it with VITE_ENQUIRIES_247=true.
   */
  enquiries247Confirmed: import.meta.env?.VITE_ENQUIRIES_247 === 'true',
  social: [
    { id: 'facebook', icon: 'facebook', url: 'https://www.facebook.com/share/1FEtTz1n3V/?mibextid=wwXIfr' },
    { id: 'instagram', icon: 'instagram', url: 'https://www.instagram.com/newlifecarecbe?srtk=cDQ4b2dmcjc5cXN5' },
    { id: 'youtube', icon: 'youtube', url: 'https://youtube.com/@newlifedeaddictionrehabcbe?si=GDBlnm9WeqiMIaFa' },
  ],
};

export const whatsappUrl = (text) =>
  `https://wa.me/${SITE.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const telUrl = (tel = SITE.phones[0].tel) => `tel:${tel}`;
export const mailUrl = () => `mailto:${SITE.email}`;

export const mapEmbedUrl = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`;
export const mapLinkUrl = () => SITE.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;
