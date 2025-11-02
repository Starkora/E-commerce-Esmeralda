let recaptchaLoading: Promise<void> | null = null;

function loadRecaptcha(siteKey: string) {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).grecaptcha) return Promise.resolve();
  if (recaptchaLoading) return recaptchaLoading;
  recaptchaLoading = new Promise<void>((resolve) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return recaptchaLoading;
}

export async function getRecaptchaToken(action: string): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';
  if (!siteKey || typeof window === 'undefined') return null;
  await loadRecaptcha(siteKey);
  return new Promise((resolve) => {
    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha || !grecaptcha.execute) return resolve(null);
    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action }).then((token: string) => resolve(token)).catch(() => resolve(null));
    });
  });
}
