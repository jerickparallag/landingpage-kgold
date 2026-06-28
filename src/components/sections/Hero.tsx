import { HERO } from '../../constants/content';
import { PageHero } from '../ui/PageHero';

export function Hero() {
  return <PageHero hero={HERO} routeKey="/" id="home-hero" variant="home" />;
}
