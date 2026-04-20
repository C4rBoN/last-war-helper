import { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { t } from '../../i18n';
import { HEROES } from '../../data/heroes.data';
import { useHeroData } from '../../hooks/usePriorities';
import { getPlayerHero } from '../../store/selectors';
import { Lang } from '../../types/player.types';
import { HeroDefinition, GearSlot, HeroTeam, PlayerHero } from '../../types/hero.types';
import { UnifiedAction, ActionCategory } from '../../utils/hero.utils';
import { GearStarInput } from '../../components/ui/GearStarInput';
import { EWInput } from '../../components/ui/EWInput';
import { SkillsInput } from '../../components/ui/SkillsInput';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';
import styles from './Heroes.module.css';

const TEAMS: HeroTeam[] = ['T1', 'T2', 'T3'];
const GEAR_SLOTS: GearSlot[] = ['canon', 'puce', 'armor', 'radar'];

// ─── Priorités par catégorie ──────────────────────────────────────────────────

const URGENCY_LABELS: Record<string, string> = {
  urgent: '!', recommended: '↑', optional: '·', done: '✓',
};

const CATEGORY_CONFIG: Record<ActionCategory, { icon: string; titleKey: string }> = {
  ew:     { icon: '⚔',  titleKey: 'heroes.actions.cat.ew'     },
  stars:  { icon: '★',  titleKey: 'heroes.actions.cat.stars'   },
  skills: { icon: '⚡', titleKey: 'heroes.actions.cat.skills'  },
  gear:   { icon: '🔧', titleKey: 'heroes.actions.cat.gear'    },
};

function CategorySection({ category, actions, lang }: {
  category: ActionCategory;
  actions: UnifiedAction[];
  lang: Lang;
}) {
  const [open, setOpen] = useState(true);
  const [showDone, setShowDone] = useState(false);

  const pending = actions.filter(a => a.urgency !== 'done');
  const done    = actions.filter(a => a.urgency === 'done');
  const cfg     = CATEGORY_CONFIG[category];

  return (
    <div className={styles.categorySection}>
      <button className={styles.categoryToggle} onClick={() => setOpen(v => !v)}>
        <span className={styles.categoryIcon}>{cfg.icon}</span>
        <span className={styles.categoryTitle}>{t(lang, cfg.titleKey)}</span>
        {pending.length > 0 && <span className={styles.categoryBadge}>{pending.length > 99 ? '99+' : pending.length}</span>}
        {pending.length === 0 && done.length > 0 && <span className={styles.categoryDoneTag}>✓</span>}
        <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className={`${styles.actionsList} ${pending.length > 5 ? styles.actionsScrollable : ''}`}>
          {pending.length === 0 && (
            <div className={styles.actionsEmpty}>{t(lang, 'heroes.actions.empty')}</div>
          )}
          {pending.map(action => (
            <div
              key={action.id}
              className={`${styles.actionItem} ${styles[`action_${action.urgency}`]} ${action.kind === 'threshold' ? styles.actionThreshold : ''} ${!action.isPrimary ? styles.actionSecondary : ''}`}
            >
              <span className={styles.actionIcon}>{URGENCY_LABELS[action.urgency]}</span>
              <span className={styles.actionLabel}>{action.label}</span>
              <div className={styles.actionTags}>
                {action.kind === 'threshold' && <span className={styles.tagT1}>Seuil T1</span>}
                {action.team && <span className={styles[`tag${action.team}`]}>{action.team}</span>}
                {!action.isPrimary && <span className={styles.tagSecondary}>{t(lang, 'heroes.actions.secondary')}</span>}
              </div>
            </div>
          ))}
          {done.length > 0 && (
            <button className={styles.showDoneBtn} onClick={() => setShowDone(v => !v)}>
              {showDone ? '▲' : '▼'} {done.length} {t(lang, 'heroes.actions.done')}
            </button>
          )}
          {showDone && done.map(action => (
            <div key={action.id} className={`${styles.actionItem} ${styles.actionDone}`}>
              <span className={styles.actionIcon}>✓</span>
              <span className={styles.actionLabel}>{action.label}</span>
              <span className={styles.tagT1}>Seuil T1</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionsSection({ actions, lang }: { actions: Record<ActionCategory, UnifiedAction[]>; lang: Lang }) {
  return (
    <div className={styles.actionsSection}>
      <CategorySection category="ew"     actions={actions.ew}     lang={lang} />
      <CategorySection category="stars"  actions={actions.stars}  lang={lang} />
      <CategorySection category="skills" actions={actions.skills} lang={lang} />
      <CategorySection category="gear"   actions={actions.gear}   lang={lang} />
    </div>
  );
}

// ─── Hero Card ────────────────────────────────────────────────────────────────

function HeroCard({ hero }: { hero: HeroDefinition }) {
  const { state, dispatch } = useAppContext();
  const lang = state.language;
  const ph = getPlayerHero(state, hero.id);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<PlayerHero>(ph);

  function handleToggle() {
    if (!open) setDraft(ph); // reset draft on open
    setOpen(v => !v);
  }

  const isDirty = JSON.stringify(draft) !== JSON.stringify(ph);

  function handleSave() {
    dispatch({ type: 'UPDATE_HERO', payload: draft });
  }

  function handleCancel() {
    setDraft(ph);
  }

  const roleClass = hero.role === 'DPS' ? styles.roleDPS
    : hero.role === 'Tank défensif' ? styles.roleTank
    : styles.roleSupport;

  return (
    <Card className={`${styles.heroCard} ${open ? styles.heroExpanded : ''}`}>
      <button className={styles.heroHeader} onClick={handleToggle}>
        {hero.imageUrl
          ? <img src={hero.imageUrl} alt={hero.name} className={styles.heroAvatar} loading="lazy" />
          : <span className={styles.heroAvatarFallback}>{hero.name.slice(0, 2).toUpperCase()}</span>
        }
        <span className={styles.heroName}>{hero.name}</span>
        <span className={`${styles.roleTag} ${roleClass}`}>{t(lang, `heroes.role.${hero.role}`)}</span>
        {ph.stars > 0 && <span className={styles.starsBadge}>{'★'.repeat(ph.stars)}</span>}
        <span className={styles.ewBadge}>⚔ {ph.ew}/30</span>
        <span className={styles.gearBadge}>
          {GEAR_SLOTS.map(s => {
            const sv = ph.gear[s];
            if (sv.level === 0) return '—';
            if (sv.level < 40) return `${sv.level}`;
            return `40+${sv.stars}★`;
          }).join(' ')}
        </span>
        {isDirty && open && <span className={styles.dirtyDot} title="Modifications non enregistrées">●</span>}
        <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className={styles.heroBody}>
          {/* ── Étoiles héros ── */}
          <div className={styles.starsSection}>
            <span className={styles.starsLabel}>{t(lang, 'heroes.stars.label')}</span>
            <div className={styles.starsButtons}>
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  className={`${styles.starBtn} ${s <= draft.stars ? styles.starBtnActive : ''}`}
                  onClick={() => setDraft(d => ({ ...d, stars: d.stars === s ? s - 1 : s }))}
                >★</button>
              ))}
            </div>
            {draft.stars >= 2 && draft.stars < 4 && <span className={styles.starsHint}>{t(lang, 'heroes.stars.hint.2')}</span>}
            {draft.stars >= 4 && draft.stars < 5 && <span className={styles.starsHint}>{t(lang, 'heroes.stars.hint.4')}</span>}
            {draft.stars >= 5 && <span className={styles.starsHintMax}>{t(lang, 'heroes.stars.hint.5')}</span>}
          </div>

          <div className={styles.gearGrid}>
            {GEAR_SLOTS.map(slot => (
              <GearStarInput
                key={slot}
                slot={slot}
                label={t(lang, `heroes.gear.${slot}`)}
                value={draft.gear[slot]}
                role={hero.role}
                onChange={value => setDraft(d => ({ ...d, gear: { ...d.gear, [slot]: value } }))}
              />
            ))}
          </div>
          <SkillsInput
            value={draft.skills}
            heroStars={draft.stars}
            ew={draft.ew}
            role={hero.role}
            skillNames={lang === 'fr' ? (hero.skillNamesFr ?? hero.skillNames) : hero.skillNames}
            onChange={skills => setDraft(d => ({ ...d, skills }))}
          />
          <EWInput
            value={draft.ew}
            target={hero.ewTarget}
            heroStars={draft.stars}
            onChange={ew => setDraft(d => ({ ...d, ew }))}
          />

          {/* ── Barre de validation ── */}
          {isDirty && (
            <div className={styles.draftBar}>
              <span className={styles.draftHint}>Modifications non enregistrées</span>
              <button className={styles.cancelBtn} onClick={handleCancel}>Annuler</button>
              <button className={styles.saveBtn} onClick={handleSave}>Valider ✓</button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

// ─── Main Heroes Page ─────────────────────────────────────────────────────────

export function Heroes() {
  const { state } = useAppContext();
  const lang = state.language;
  const actions = useHeroData();

  return (
    <div className={styles.page}>
      <ActionsSection actions={actions} lang={lang} />

      {TEAMS.map(team => {
        const teamHeroes = HEROES.filter(h => h.team === team);
        return (
          <div key={team} className={styles.teamSection}>
            <SectionHeader title={t(lang, `heroes.team.${team}`)} />
            <div className={styles.heroList}>
              {teamHeroes.map(hero => (
                <HeroCard key={hero.id} hero={hero} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
