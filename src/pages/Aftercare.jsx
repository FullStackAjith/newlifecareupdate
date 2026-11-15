import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from '../components/Icon.jsx';
import PageHero from '../components/PageHero.jsx';
import Section, { SectionHead } from '../components/Section.jsx';
import ContactButtons from '../components/ContactButtons.jsx';

const FOCUS = [['recovery', 'refresh'], ['relapse', 'shield']];

export default function Aftercare() {
  usePageMeta('aftercare');
  const { t } = useLang();
  const questions = t('aftercare.questions.list');

  return (
    <>
      <PageHero eyebrow={t('aftercare.hero.eyebrow')} title={t('aftercare.hero.title')} lead={t('aftercare.hero.lead')} />

      <Section narrow>
        <h2>{t('aftercare.intro.title')}</h2>
        <p className="lead">{t('aftercare.intro.text')}</p>
      </Section>

      <Section tone="mist">
        <SectionHead title={t('aftercare.focusTitle')} align="center" />
        <div className="grid grid--2">
          {FOCUS.map(([id, icon]) => (
            <article className="card" key={id}>
              <span className="icon-badge"><Icon name={icon} size={24} /></span>
              <h3>{t(`aftercare.items.${id}.title`)}</h3>
              <p>{t(`aftercare.items.${id}.text`)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="card card--accent consult">
          <div>
            <h2>{t('aftercare.questions.title')}</h2>
            <p className="lead">{t('aftercare.questions.lead')}</p>
            <ul className="check-list">
              {questions.map((q) => (
                <li key={q}><Icon name="check" size={18} />{q}</li>
              ))}
            </ul>
            <p className="form-note">{t('aftercare.questions.note')}</p>
          </div>
        </div>
      </Section>

      <Section tone="mist" narrow>
        <h2>{t('aftercare.familyNote.title')}</h2>
        <p className="lead">{t('aftercare.familyNote.text')}</p>
      </Section>

      <Section tone="navy" className="cta-band">
        <div className="cta-band__inner">
          <div className="cta-band__copy">
            <h2>{t('aftercare.cta.title')}</h2>
            <p>{t('aftercare.cta.text')}</p>
          </div>
          <div className="cta-band__actions">
            <Link className="btn btn-gold" to="/contact">{t('aftercare.cta.primary')}</Link>
            <Link className="btn btn-outline-light" to="/services">{t('aftercare.cta.secondary')}</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
