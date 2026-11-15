import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import Section, { SectionHead } from '../components/Section.jsx';
import EnquiryCTA from '../components/EnquiryCTA.jsx';

export default function Team() {
  usePageMeta('team');
  const { t } = useLang();
  const doctors = t('team.doctors');
  const support = t('team.support');

  return (
    <>
      <PageHero eyebrow={t('team.hero.eyebrow')} title={t('team.hero.title')} lead={t('team.hero.lead')} />

      <Section>
        <SectionHead title={t('team.doctorsTitle')} />
        <div className="grid grid--2">
          {doctors.map((d) => (
            <article className="card team-card" key={d.name}>
              <span className="team-card__photo"><Icon name="shield" size={34} /></span>
              <h3>{d.name}</h3>
              <p className="team-card__role"><strong>{d.role}</strong></p>
              <p className="muted">{d.quals}</p>
              {d.reg ? <p className="muted">{d.reg}</p> : null}
              <p>{d.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead title={t('team.supportTitle')} />
        <div className="grid grid--2">
          {support.map((s, i) => (
            <article className="card team-card" key={s.name}>
              <span className="team-card__photo"><Icon name={i === 0 ? 'message' : 'users'} size={34} /></span>
              <h3>{s.name}</h3>
              <p className="team-card__role"><strong>{s.role}</strong></p>
              <p className="muted">{s.quals}</p>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead title={t('team.dayTitle')} />
        <div className="grid grid--2">
          <article className="card team-card">
            <span className="team-card__photo"><Icon name="heart" size={34} /></span>
            <h3>{t('team.nursing.title')}</h3>
            <p>{t('team.nursing.text')}</p>
          </article>
          <article className="card team-card">
            <span className="team-card__photo"><Icon name="users" size={34} /></span>
            <h3>{t('team.wardens.title')}</h3>
            <p>{t('team.wardens.text')}</p>
          </article>
        </div>
      </Section>

      <Section tone="navy" className="cta-band">
        <div className="cta-band__inner">
          <div className="cta-band__copy">
            <h2>{t('team.ctaTitle')}</h2>
            <p>{t('team.ctaText')}</p>
          </div>
          <div className="cta-band__actions">
            <Link className="btn btn-gold" to="/contact">{t('team.ctaButton')}</Link>
            <div className="related-links">
              <Link to="/services">What We Treat</Link>
              <span aria-hidden="true"> · </span>
              <Link to="/facilities">Our Facilities</Link>
            </div>
          </div>
        </div>
      </Section>
      <EnquiryCTA />
    </>
  );
}
