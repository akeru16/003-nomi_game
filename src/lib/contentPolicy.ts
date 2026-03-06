const HIGH_RISK_PATTERNS: RegExp[] = [
    /一気飲み|イッキ飲み|イッキ/i,
    /飲み干す|飲みほす/i,
    /ショット\s*\d*/i,
    /潰れ|つぶれ/i,
    /飲ませる|飲ませ/i,
    /無理強い|強要/i,
    /罰ゲーム.*(飲|酒)/i,
    /未成年.*(飲酒|酒)/i,
    /chug|binge\s*drink|shotgun|power\s*hour/i,
];

function normalize(text: string): string {
    return text
        .normalize("NFKC")
        .replace(/\s+/g, " ")
        .trim();
}

export function findContentPolicyViolations(texts: string[]): string[] {
    const joined = normalize(texts.filter(Boolean).join("\n"));
    if (!joined) return [];

    return HIGH_RISK_PATTERNS
        .filter((pattern) => pattern.test(joined))
        .map((pattern) => pattern.source);
}

export function hasContentPolicyViolation(texts: string[]): boolean {
    return findContentPolicyViolations(texts).length > 0;
}
