import aboutJson from '../src/content/about.json';

type TAboutJson = typeof aboutJson;

/** Rich About-page knowledge for Gemini and static fallback. */
export function buildAboutPageKnowledge(): string {
  const about = aboutJson as TAboutJson;

  const valueLines = about.mission.values.map(
    (value) => `  • ${value.title} (${value.subtitle}): ${value.description}`,
  );

  return [
    '--- ABOUT PAGE CONTENT ---',
    `Hero intro: ${about.hero.body}`,
    '',
    'COMPANY:',
    about.company.whoBody,
    `Purpose: ${about.company.purposeBody}`,
    `Why we exist: ${about.company.whyBody}`,
    '',
    'STORY:',
    `${about.mission.storyLead} ${about.mission.story}`,
    '',
    'MISSION (direct answer for "what is your mission"):',
    about.mission.missionStatement.body,
    '',
    'VISION (direct answer for "what is your vision"):',
    about.mission.vision.body,
    '',
    'CORE VALUES:',
    ...valueLines,
    '',
    'LEADERSHIP:',
    `${about.leadership.name}, ${about.leadership.role}. "${about.leadership.quote}"`,
  ].join('\n');
}
