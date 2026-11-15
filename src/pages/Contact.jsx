import usePageMeta from '../hooks/usePageMeta.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import Section, { SectionHead } from '../components/Section.jsx';
import SocialLinks from '../components/SocialLinks.jsx';
import MapEmbed from '../components/MapEmbed.jsx';
import EmergencyNotice from '../components/EmergencyNotice.jsx';
import ContactForm from '../forms/ContactForm.jsx';
import { SITE, telUrl, mailUrl, whatsappUrl, mapLinkUrl } from '../config/site.js';

export default function Contact() {
  usePageMeta('contact');
  const { t } = useLang();
  const avail = SITE.enquiries247Confirmed ? 'availability.label247' : 'availability.labelGeneral';

  return (
    <>
      <PageHero eyebrow={t('contact.hero.eyebrow')} title={t('contact.hero.title')} lead={t('contact.hero.lead')} />

      <Section>
        <div className="contact-layout">
          <aside className="contact-card">
            <h2 className="h3">{t('contact.info.title')}</h2>
            <p>{t('contact.info.text')}</p>
            <ul className="contact-list">
              <li>
                <Icon name="phone" size={20} />
                <div>
                  <small>{t('contact.info.call')}</small>
                  {SITE.phones.map((p) => (
                    <a key={p.tel} href={telUrl(p.tel)}>{p.display}</a>
                  ))}
                </div>
              </li>
              <li>
                <Icon name="whatsapp" size={20} />
                <div>
                  <small>{t('contact.info.whatsapp')}</small>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{SITE.whatsapp.display}</a>
                </div>
              </li>
              <li>
                <Icon name="mail" size={20} />
                <div>
                  <small>{t('contact.info.email')}</small>
                  <a href={mailUrl()}>{SITE.email}</a>
                </div>
              </li>
              <li>
                <Icon name="pin" size={20} />
                <div>
                  <small>{t('contact.info.visit')}</small>
                  <address>
                    {SITE.address.map((l) => (
                      <span key={l}>{l}<br /></span>
                    ))}
                  </address>
                  <a
                    className="btn btn-outline"
                    href={mapLinkUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: '0.75rem', display: 'inline-flex' }}
                  >
                    {t('contact.info.directions')}
                  </a>
                </div>
              </li>
              <li>
                <Icon name="clock" size={20} />
                <div>
                  <small>{t('common.availability')}</small>
                  <strong>{t(avail)}</strong>
                </div>
              </li>
            </ul>
            <p className="form-note">{t('contact.visitNote')}</p>
            <div>
              <small className="muted">{t('common.followUs')}</small>
              <SocialLinks className="social-links--light" />
            </div>
          </aside>
          <ContactForm />
        </div>
      </Section>

      <Section tone="mist" narrow>
        <h2>{t('contact.preAdmission.title')}</h2>
        <p className="lead">{t('contact.preAdmission.text')}</p>
      </Section>

      <Section tone="navy" className="cta-band">
        <div className="cta-band__inner">
          <div className="cta-band__copy">
            <h2>{t('contact.cta.title')}</h2>
            <p>{t('contact.cta.text')}</p>
          </div>
          <div className="cta-band__actions">
            <a className="btn btn-gold" href={telUrl()}>{t('contact.cta.call')}</a>
            <a className="btn btn-outline-light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              {t('contact.cta.whatsapp')}
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <div className="split split--top">
          <div>
            <SectionHead title={t('contact.map.title')} />
            <MapEmbed />
          </div>
          <div>
            <SectionHead title={t('contact.steps.title')} />
            <ol className="number-list">
              {t('contact.steps.items').map((s) => (
                <li key={s.title}><strong>{s.title}</strong> {s.text}</li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
      <Section><EmergencyNotice /></Section>
    </>
  );
}
