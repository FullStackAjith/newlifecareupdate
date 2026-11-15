import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import Section, { SectionHead } from '../components/Section.jsx';
import ServiceGrid from '../components/ServiceGrid.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';

const APPROACH = [
  ['assessment', 'clipboard'],
  ['psychiatric', 'shield'],
  ['medication', 'pill'],
  ['physical', 'heart'],
  ['yoga', 'sun'],
  ['awareness', 'message'],
  ['group', 'users'],
  ['followup', 'refresh'],
];

export default function Services() {
  usePageMeta('services');
  const { t } = useLang();

  return (
    <>
      <PageHero eyebrow={t('services.hero.eyebrow')} title={t('services.hero.title')} lead={t('services.hero.lead')} />

      <Section>
        <SectionHead title="Addiction and Behavioural Concerns We Support" align="center" />
        <ServiceGrid withLinks={false} />
        <p className="form-note form-note--center">{t('services.note')}</p>
      </Section>

      <Section tone="mist">
        <SectionHead title={t('services.approachTitle')} lead={t('services.approachLead')} align="center" />
        <div className="grid grid--2">
          {APPROACH.map(([id, icon]) => (
            <article className="card" key={id}>
              <span className="icon-badge"><Icon name={icon} size={24} /></span>
              <h3>{t(`services.approach.${id}.title`)}</h3>
              <p>{t(`services.approach.${id}.text`)}</p>
            </article>
          ))}
        </div>
        <p className="form-note form-note--center">
          <Link to="/team">Explore Our Team</Link>
        </p>
      </Section>

      <Section>
        <div className="card card--accent consult">
          <div>
            <h2>{t('services.preAdmission.title')}</h2>
            <p>{t('services.preAdmission.text')}</p>
            <Link className="btn btn-primary" to="/contact" style={{ marginTop: '1rem' }}>
              {t('services.cta.primary')}
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="navy" className="cta-band">
        <div className="cta-band__inner">
          <div className="cta-band__copy">
            <h2>{t('services.cta.title')}</h2>
            <p>{t('services.cta.text')}</p>
          </div>
          <div className="cta-band__actions">
            <Link className="btn btn-gold" to="/contact">{t('services.cta.primary')}</Link>
            <Link className="btn btn-outline-light" to="/aftercare">{t('services.cta.secondary')}</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
