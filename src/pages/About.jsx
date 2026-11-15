import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from '../components/Icon.jsx';
import Picture from '../components/Picture.jsx';
import PageHero from '../components/PageHero.jsx';
import Section, { SectionHead } from '../components/Section.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';
import { SITE, telUrl, mailUrl } from '../config/site.js';

const VALUES = [['respect', 'heart'], ['family', 'users'], ['clarity', 'shield'], ['continuity', 'refresh']];

export default function About() {
  usePageMeta('about');
  const { t } = useLang();
  const why = t('about.why');
  const checks = t('about.story.checks');

  return (
    <>
      <PageHero eyebrow={t('about.hero.eyebrow')} title={t('about.hero.title')} lead={t('about.hero.lead')} />

      <Section>
        <div className="split">
          <div className="split__media"><Picture name="garden" alt={t('about.story.imgAlt')} /></div>
          <div className="split__text">
            <h2>{t('about.story.title')}</h2>
            <p className="lead">{t('about.story.lead')}</p>
          </div>
        </div>
      </Section>

      <Section tone="mist" narrow>
        <h2>{t('about.goal.title')}</h2>
        <p className="lead">{t('about.goal.text')}</p>
      </Section>

      <Section>
        <SectionHead title={t('about.valuesTitle')} align="center" />
        <ul className="check-list check-list--grid">
          {checks.map((c) => (
            <li key={c}><Icon name="check" size={18} />{c}</li>
          ))}
        </ul>
      </Section>

      <Section tone="mist">
        <div className="card card--accent consult">
          <div>
            <h2>{t('about.commitment.title')}</h2>
            <p>{t('about.commitment.text')}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title={t('about.whyTitle')} align="center" />
        <ul className="check-list check-list--grid">
          {why.map((item) => (
            <li key={item}><Icon name="check" size={18} />{item}</li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" narrow>
        <h2>{t('about.familyNote.title')}</h2>
        <p className="lead">{t('about.familyNote.text')}</p>
      </Section>

      <Section tone="navy" className="cta-band">
        <div className="cta-band__inner">
          <div className="cta-band__copy">
            <h2>{t('about.cta.title')}</h2>
            <p>{t('about.cta.text')}</p>
          </div>
          <div className="cta-band__actions">
            <Link className="btn btn-gold" to="/contact">{t('nav.contact')}</Link>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead title={t('about.visitTitle')} />
        <ul className="contact-list contact-list--row">
          <li><Icon name="pin" size={20} /><address>{SITE.address.join(', ')}</address></li>
          <li><Icon name="phone" size={20} /><a href={telUrl()}>{SITE.phones[0].display}</a></li>
          <li><Icon name="mail" size={20} /><a href={mailUrl()}>{SITE.email}</a></li>
        </ul>
      </Section>
      <EnquiryCTA />
    </>
  );
}
