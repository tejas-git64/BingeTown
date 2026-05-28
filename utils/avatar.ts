export function getDefaultAvatarUrl(seed: string | number, size = 70) {
  const avatarSeed = encodeURIComponent(String(seed));

  return `https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}&size=${size}&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear,solid&glassesProbability=50`;
}
