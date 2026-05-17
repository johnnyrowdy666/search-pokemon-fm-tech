"use client";

import { getDefensiveCoverage, getOffensiveCoverage } from "@/lib/type-chart";
import type { StandardTypeName } from "@/lib/type-chart";
import { TypeBadge } from "@/components/TypeBadge";

type TypeCoverageProps = {
  types: string[];
};

export function TypeCoverage({ types }: TypeCoverageProps) {
  const defensive = getDefensiveCoverage(types);
  const offensive = getOffensiveCoverage(types);

  const weaknesses = (Object.entries(defensive) as [StandardTypeName, number][])
    .filter(([, val]) => val > 1)
    .sort(([, a], [, b]) => b - a);

  const strongAgainst = (Object.entries(offensive) as [StandardTypeName, number][])
    .filter(([, val]) => val >= 1)
    .sort(([, a], [, b]) => b - a);

  if (weaknesses.length === 0 && strongAgainst.length === 0) return null;

  return (
    <div className="type-coverage">
      {weaknesses.length > 0 && (
        <section className="detail-section">
          <h4>Weak Against</h4>
          <ul className="tag-list">
            {weaknesses.map(([name, val]) => (
              <li key={name}>
                <TypeBadge type={name} size="md" />
                <span className="multiplier">×{val}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {strongAgainst.length > 0 && (
        <section className="detail-section">
          <h4>Strong Against</h4>
          <ul className="tag-list">
            {strongAgainst.map(([name, val]) => (
              <li key={name}>
                <TypeBadge type={name} size="md" />
                <span className="multiplier">×{val}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
