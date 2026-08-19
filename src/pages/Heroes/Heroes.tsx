import { useState } from 'react';
import { useAppContext } from '../../store/AppContext';
import { useHQConstraints } from '../../hooks/useHQConstraints';
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

/** Libellé d'affichage T1/T2/T3 dérivé de la position de l'équipe dans l'ordre choisi par le joueur. */
function displayTeamLabel(team: HeroTeam, teamOrder: HeroTeam[]): string {
  return `T${teamOrder.indexOf(team) + 1}`;
}

function CategorySection({ category, actions, lang, teamOrder }: {
  category: ActionCategory;
  actions: UnifiedAction[];
  lang: Lang;
  teamOrder: HeroTeam[];
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
                {action.team && (() => {
                  const label = displayTeamLabel(action.team, teamOrder);
                  return <span className={styles[`tag${label}`]}>{label}</span>;
                })()}
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

function ActionsSection({ actions, lang, teamOrder }: {
  actions: Record<ActionCategory, UnifiedAction[]>;
  lang: Lang;
  teamOrder: HeroTeam[];
}) {
  return (
    <div className={styles.actionsSection}>
      <CategorySection category="ew"     actions={actions.ew}     lang={lang} teamOrder={teamOrder} />
      <CategorySection category="stars"  actions={actions.stars}  lang={lang} teamOrder={teamOrder} />
      <CategorySection category="skills" actions={actions.skills} lang={lang} teamOrder={teamOrder} />
      <CategorySection category="gear"   actions={actions.gear}   lang={lang} teamOrder={teamOrder} />
    </div>
  );
}

// ─── Hero Card ────────────────────────────────────────────────────────────────

function HeroCard({ hero }: { hero: HeroDefinition }) {
  const { state, dispatch } = useAppContext();
  const { cap, hqLevel } = useHQConstraints();
  const maxStars = cap.maxHeroStarLevel;
  const maxHeroLevel = hqLevel * 5;
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
        {ph.level > 0 && <span className={styles.levelBadge}>Nv.{ph.level}</span>}
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
          {/* ── Niveau héros ── */}
          <div className={styles.levelSection}>
            <span className={styles.starsLabel}>{lang === 'fr' ? 'Niveau' : 'Level'}</span>
            <div className={styles.levelInputRow}>
              <input
                type="range"
                min={0}
                max={maxHeroLevel}
                value={draft.level}
                onChange={e => setDraft(d => ({ ...d, level: parseInt(e.target.value) }))}
                className={styles.levelSlider}
              />
              <input
                type="number"
                min={0}
                max={maxHeroLevel}
                value={draft.level === 0 ? '' : draft.level}
                placeholder="0"
                onChange={e => {
                  const v = Math.max(0, Math.min(maxHeroLevel, parseInt(e.target.value) || 0));
                  setDraft(d => ({ ...d, level: v }));
                }}
                className={styles.levelNumber}
              />
              <span className={styles.levelCap}>/ {maxHeroLevel}</span>
            </div>
          </div>

          {/* ── Étoiles héros ── */}
          <div className={styles.starsSection}>
            <span className={styles.starsLabel}>{t(lang, 'heroes.stars.label')}</span>
            <div className={styles.starsButtons}>
              {[1, 2, 3, 4, 5].map(s => {
                const locked = s > maxStars;
                return (
                  <button
                    key={s}
                    className={`${styles.starBtn} ${s <= draft.stars ? styles.starBtnActive : ''} ${locked ? styles.starBtnLocked : ''}`}
                    onClick={() => !locked && setDraft(d => ({ ...d, stars: d.stars === s ? s - 1 : s }))}
                    disabled={locked}
                    title={locked ? (lang === 'fr' ? `Nécessite QG ${s === 2 ? 6 : s === 3 ? 11 : s === 4 ? 16 : 22}` : `Requires HQ ${s === 2 ? 6 : s === 3 ? 11 : s === 4 ? 16 : 22}`) : undefined}
                  >★</button>
                );
              })}
            </div>
            {maxStars < 5 && (
              <span className={styles.starsCapHint}>
                {lang === 'fr' ? `QG ${cap.hqLevel} → max ${maxStars}★` : `HQ ${cap.hqLevel} → max ${maxStars}★`}
              </span>
            )}
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

// ─── Réorganisation des équipes ────────────────────────────────────────────────

function TeamReorderButtons({ team, teamOrder, lang }: { team: HeroTeam; teamOrder: HeroTeam[]; lang: 'fr' | 'en' }) {
  const { dispatch } = useAppContext();
  const index = teamOrder.indexOf(team);

  function move(delta: -1 | 1) {
    const newOrder = [...teamOrder];
    const target = index + delta;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    dispatch({ type: 'SET_TEAM_ORDER', payload: newOrder });
  }

  return (
    <div className={styles.reorderButtons}>
      <button
        className={styles.reorderBtn}
        onClick={() => move(-1)}
        disabled={index === 0}
        title={lang === 'fr' ? 'Monter en priorité' : 'Move up'}
      >▲</button>
      <button
        className={styles.reorderBtn}
        onClick={() => move(1)}
        disabled={index === teamOrder.length - 1}
        title={lang === 'fr' ? 'Descendre en priorité' : 'Move down'}
      >▼</button>
    </div>
  );
}

// ─── Main Heroes Page ─────────────────────────────────────────────────────────

export function Heroes() {
  const { state } = useAppContext();
  const lang = state.language;
  const actions = useHeroData();
  const teamOrder = state.teamOrder;

  return (
    <div className={styles.page}>
      <ActionsSection actions={actions} lang={lang} teamOrder={teamOrder} />

      <p className={styles.teamOrderHint}>
        {lang === 'fr'
          ? "Réordonne tes équipes avec ▲▼ : l'ordre détermine la priorité de tes recommandations. La 1ère équipe devient ton « T1 » — c'est elle qui doit remplir le seuil obligatoire avant les autres."
          : "Reorder your teams with ▲▼: the order drives your recommendation priority. The 1st team becomes your «T1» — it's the one that must clear the mandatory threshold before the others."}
      </p>

      {teamOrder.map((team, i) => {
        const teamHeroes = HEROES.filter(h => h.team === team);
        const teamType = teamHeroes[0]?.type;
        const title = `${lang === 'fr' ? 'Équipe' : 'Team'} T${i + 1} — ${teamType ? t(lang, `heroes.type.${teamType}`) : ''}`;
        return (
          <div key={team} className={styles.teamSection}>
            <SectionHeader
              title={title}
              action={<TeamReorderButtons team={team} teamOrder={teamOrder} lang={lang} />}
            />
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
