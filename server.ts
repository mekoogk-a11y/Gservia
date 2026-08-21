import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Body parsing with safe size limit
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple in-memory rate limiting map
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = req.ip || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 120; // 120 requests per minute

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests, please slow down.',
      retryAfterSeconds: Math.ceil((record.resetAt - now) / 1000),
    });
  }

  record.count += 1;
  next();
};

app.use(rateLimiter);

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Mock In-Memory Store for Multi-Tenant Sessions & Integrations
interface StoredUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  organization?: string;
  role: 'user' | 'developer' | 'enterprise_admin';
  timezone: string;
  currency: string;
  language: string;
  createdAt: string;
  twoFactorEnabled: boolean;
  securityScore: number;
}

let currentUser: StoredUser = {
  id: 'usr_global_01',
  email: 'entrepreneur@gservia.global',
  fullName: 'GServia Enterprise User',
  avatarUrl: '',
  organization: 'Global Innovation Labs',
  role: 'enterprise_admin',
  timezone: 'UTC+03:00 (Africa/Cairo/Khartoum/Riyadh)',
  currency: 'USD ($)',
  language: 'ar',
  createdAt: new Date().toISOString(),
  twoFactorEnabled: true,
  securityScore: 92,
};

let userSessions = [
  {
    id: 'sess_01',
    device: 'Desktop Browser (Chrome / Windows 11)',
    browser: 'Chrome 134.0',
    ip: '197.251.10.42',
    location: 'Khartoum / Riyadh Gateway',
    lastActive: 'Just now',
    isCurrent: true,
  },
  {
    id: 'sess_02',
    device: 'iPhone 16 Pro (PWA Client)',
    browser: 'Safari Mobile 18.2',
    ip: '197.251.14.88',
    location: 'Mobile Network',
    lastActive: '2 hours ago',
    isCurrent: false,
  },
];

let securityLogs = [
  {
    id: 'log_01',
    action: 'Session Authentication Verified',
    actionAr: 'تم التحقق من الجلسة وتسجيل الدخول الآمن',
    category: 'auth',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    ip: '197.251.10.42',
    status: 'success',
    details: 'OAuth 2.0 PKCE Handshake verified with zero secrets leak',
  },
  {
    id: 'log_02',
    action: 'Google Workspace Scope Audit Checked',
    actionAr: 'فحص وتدقيق نطاقات أذونات Google Workspace',
    category: 'integration',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    ip: '197.251.10.42',
    status: 'success',
    details: 'Verified least-privilege readonly scopes for Gmail and Drive sync',
  },
  {
    id: 'log_03',
    action: 'Multi-Factor Authentication (2FA) Confirmed',
    actionAr: 'تأكيد تفعيل المصادقة الثنائية (2FA)',
    category: 'security',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    ip: '197.251.10.42',
    status: 'success',
    details: 'Hardware security key / Authenticator app linked',
  },
];

let integrationStatusMap: Record<string, { status: string; connectedAt?: string; account?: string }> = {
  'google-workspace': { status: 'connected', connectedAt: '2026-08-15T10:00:00Z', account: 'admin@globaltech.com' },
  'google-cloud': { status: 'connected', connectedAt: '2026-08-18T14:30:00Z', account: 'cloud-eng@globaltech.com' },
  'google-gemini-ai': { status: 'connected', connectedAt: '2026-08-19T09:12:00Z', account: 'ai-lead@globaltech.com' },
  'microsoft-365': { status: 'disconnected' },
  'openai-platform': { status: 'connected', connectedAt: '2026-08-20T11:00:00Z', account: 'devs@globaltech.com' },
  'github-enterprise': { status: 'connected', connectedAt: '2026-08-21T08:00:00Z', account: 'org-admin' },
  'notion-workspaces': { status: 'disconnected' },
  'slack-enterprise': { status: 'disconnected' },
  'apple-developer': { status: 'disconnected' },
  'aws-cloud': { status: 'disconnected' },
};

let developerApiKeys = [
  {
    id: 'key_prod_9921',
    name: 'GServia Production Gateway API',
    keyPrefix: 'gsv_live_89fa***4a',
    scopes: ['integrations:read', 'services:catalog', 'webhooks:dispatch'],
    createdAt: '2026-08-01T12:00:00Z',
    lastUsedAt: '2 minutes ago',
    status: 'active',
  },
  {
    id: 'key_sandbox_102',
    name: 'Mobile SDK Development Key',
    keyPrefix: 'gsv_test_31ab***9c',
    scopes: ['services:read'],
    createdAt: '2026-08-10T14:20:00Z',
    lastUsedAt: '1 day ago',
    status: 'active',
  },
];

let developerWebhooks = [
  {
    id: 'whk_01',
    endpointUrl: 'https://api.enterprisepartner.com/webhooks/gservia',
    events: ['integration.connected', 'integration.disconnected', 'security.alert'],
    secretMasked: 'whsec_78fa***31b',
    createdAt: '2026-08-05T09:00:00Z',
    status: 'active',
    successRate: 99.8,
  },
];

let notifications = [
  {
    id: 'notif_01',
    title: 'GServia Global Architecture Ready',
    titleAr: 'منظومة GServia العالمية جاهزة للتكامل والشراكات',
    message: 'Independent platform framework initialized with multi-provider integrations, user accounts, and developer console.',
    messageAr: 'تم تجهيز بنية المنصة المستقلة مع دعم التكاملات المتعددة، وإدارة الحسابات، وقابلية التوسع المؤسسي.',
    type: 'success',
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  {
    id: 'notif_02',
    title: 'Zero Password Storage Compliance',
    titleAr: 'الامتثال للأمان والخصوصية: عدم تخزين كلمات المرور',
    message: 'GServia uses secure token handshakes and does not store external Google or third-party passwords.',
    messageAr: 'تلتزم GServia بأعلى معايير الخصوصية حيث يتم الربط الآمن عبر الرموز المشفرة دون تخزين أي كلمات مرور.',
    type: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    isRead: false,
  },
];

// ==========================================
// REST API ENDPOINTS (/api/*)
// ==========================================

// 1. System Health & Metadata
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'GServia Universal Ecosystem',
    version: '2.5.0-enterprise',
    environment: process.env.NODE_ENV || 'development',
    legalDisclaimer: 'GServia is an independent global platform and is not affiliated with or endorsed by Google LLC or third parties.',
    timestamp: new Date().toISOString(),
  });
});

// 2. Authentication & User Profile Endpoints (/api/auth & /api/users)
app.post('/api/auth/register', (req, res) => {
  const { email, fullName, organization } = req.body;
  if (!email || !fullName) {
    return res.status(400).json({ error: 'Email and full name are required.' });
  }

  currentUser = {
    id: `usr_${Date.now().toString(36)}`,
    email,
    fullName,
    organization: organization || 'Independent Pro',
    role: 'user',
    timezone: 'UTC+03:00 (Africa/Cairo/Khartoum/Riyadh)',
    currency: 'USD ($)',
    language: 'ar',
    createdAt: new Date().toISOString(),
    twoFactorEnabled: false,
    securityScore: 80,
  };

  securityLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'New Account Created',
    actionAr: 'تم إنشاء حساب مستخدم جديد بنجاح',
    category: 'auth',
    timestamp: new Date().toISOString(),
    ip: req.ip || '127.0.0.1',
    status: 'success',
    details: `User registered with email: ${email}`,
  });

  res.status(201).json({
    message: 'User registered successfully',
    user: currentUser,
    token: `gsv_jwt_${Date.now()}_secure_session`,
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  if (email) {
    currentUser.email = email;
  }

  securityLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'User Session Login',
    actionAr: 'تسجيل دخول آمن للمستخدم',
    category: 'auth',
    timestamp: new Date().toISOString(),
    ip: req.ip || '127.0.0.1',
    status: 'success',
    details: 'User authenticated via zero-trust session handler',
  });

  res.json({
    message: 'Logged in successfully',
    user: currentUser,
    token: `gsv_jwt_${Date.now()}_secure_session`,
  });
});

app.post('/api/auth/logout', (req, res) => {
  securityLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'User Session Terminated',
    actionAr: 'تم إنهاء الجلسة وتسجيل الخروج بأمان',
    category: 'auth',
    timestamp: new Date().toISOString(),
    ip: req.ip || '127.0.0.1',
    status: 'success',
    details: 'Session token invalidated across active devices',
  });

  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    user: currentUser,
    sessions: userSessions,
  });
});

app.put('/api/users/profile', (req, res) => {
  const { fullName, organization, timezone, currency, language, twoFactorEnabled } = req.body;
  
  if (fullName !== undefined) currentUser.fullName = fullName;
  if (organization !== undefined) currentUser.organization = organization;
  if (timezone !== undefined) currentUser.timezone = timezone;
  if (currency !== undefined) currentUser.currency = currency;
  if (language !== undefined) currentUser.language = language;
  if (twoFactorEnabled !== undefined) {
    currentUser.twoFactorEnabled = twoFactorEnabled;
    currentUser.securityScore = twoFactorEnabled ? 92 : 75;
  }

  securityLogs.unshift({
    id: `log_${Date.now()}`,
    action: 'User Profile & Preferences Updated',
    actionAr: 'تم تحديث الملف الشخصي وتفضيلات النظام',
    category: 'settings',
    timestamp: new Date().toISOString(),
    ip: req.ip || '127.0.0.1',
    status: 'success',
    details: 'User settings and localization preferences refreshed',
  });

  res.json({
    message: 'Profile updated successfully',
    user: currentUser,
  });
});

app.get('/api/users/sessions', (req, res) => {
  res.json({ sessions: userSessions });
});

app.delete('/api/users/sessions/:id', (req, res) => {
  const { id } = req.params;
  userSessions = userSessions.filter((s) => s.id !== id);
  res.json({ message: 'Session terminated', sessions: userSessions });
});

app.get('/api/users/audit-logs', (req, res) => {
  res.json({ logs: securityLogs });
});

app.get('/api/users/export', (req, res) => {
  const exportArchive = {
    exportVersion: '1.0.0',
    generatedAt: new Date().toISOString(),
    user: currentUser,
    integrations: integrationStatusMap,
    activeSessions: userSessions,
    auditTrail: securityLogs,
    complianceNotice: 'Data strictly prepared in accordance with GDPR and international data portability standards.',
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=gservia_export_${Date.now()}.json`);
  res.json(exportArchive);
});

// 3. Integrations Management (/api/integrations & /api/integrations/google)
app.get('/api/integrations', (req, res) => {
  res.json({
    integrations: integrationStatusMap,
  });
});

app.get('/api/integrations/google', (req, res) => {
  res.json({
    provider: 'Google Integrations via Official OAuth 2.0 & APIs',
    disclaimer: 'GServia integrates with supported Google APIs in compliance with official Google Terms of Service and Least-Privilege Scopes.',
    modules: [
      {
        id: 'google-workspace',
        name: 'Google Workspace (Docs, Sheets, Drive)',
        status: integrationStatusMap['google-workspace']?.status || 'disconnected',
        scopes: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/userinfo.profile'],
      },
      {
        id: 'google-cloud',
        name: 'Google Cloud Platform (GCP Console)',
        status: integrationStatusMap['google-cloud']?.status || 'disconnected',
        scopes: ['https://www.googleapis.com/auth/cloud-platform.read-only'],
      },
      {
        id: 'google-gemini-ai',
        name: 'Google Gemini & AI Studio API',
        status: integrationStatusMap['google-gemini-ai']?.status || 'disconnected',
        scopes: ['https://www.googleapis.com/auth/generative-language'],
      },
    ],
  });
});

app.post('/api/integrations/:id/connect', (req, res) => {
  const { id } = req.params;
  const { accountEmail } = req.body;

  integrationStatusMap[id] = {
    status: 'connected',
    connectedAt: new Date().toISOString(),
    account: accountEmail || currentUser.email,
  };

  securityLogs.unshift({
    id: `log_${Date.now()}`,
    action: `Integration Connected: ${id}`,
    actionAr: `تم تفعيل وتوصيل التكامل: ${id}`,
    category: 'integration',
    timestamp: new Date().toISOString(),
    ip: req.ip || '127.0.0.1',
    status: 'success',
    details: `Official token grant created for ${accountEmail || currentUser.email}`,
  });

  res.json({
    message: `Integration ${id} connected successfully`,
    integration: integrationStatusMap[id],
  });
});

app.post('/api/integrations/:id/disconnect', (req, res) => {
  const { id } = req.params;

  integrationStatusMap[id] = {
    status: 'disconnected',
  };

  securityLogs.unshift({
    id: `log_${Date.now()}`,
    action: `Integration Disconnected: ${id}`,
    actionAr: `تم قطع اتصال التكامل وإلغاء الرمز: ${id}`,
    category: 'integration',
    timestamp: new Date().toISOString(),
    ip: req.ip || '127.0.0.1',
    status: 'warning',
    details: `Access tokens revoked safely`,
  });

  res.json({
    message: `Integration ${id} disconnected`,
    integration: integrationStatusMap[id],
  });
});

// 4. Developer Platform Endpoints (/api/developers/*)
app.get('/api/developers/keys', (req, res) => {
  res.json({ keys: developerApiKeys });
});

app.post('/api/developers/keys', (req, res) => {
  const { name, scopes } = req.body;
  const newKey = {
    id: `key_${Date.now().toString(36)}`,
    name: name || 'API Key',
    keyPrefix: `gsv_${Math.random().toString(36).substring(2, 8)}***${Math.random().toString(36).substring(2, 4)}`,
    scopes: scopes || ['services:read'],
    createdAt: new Date().toISOString(),
    lastUsedAt: 'Never',
    status: 'active' as const,
  };

  developerApiKeys.unshift(newKey);
  res.status(201).json({ key: newKey, rawToken: `gsv_live_${Date.now()}_${Math.random().toString(36).substring(2, 15)}` });
});

app.delete('/api/developers/keys/:id', (req, res) => {
  const { id } = req.params;
  developerApiKeys = developerApiKeys.filter((k) => k.id !== id);
  res.json({ message: 'API Key revoked successfully' });
});

app.get('/api/developers/webhooks', (req, res) => {
  res.json({ webhooks: developerWebhooks });
});

app.post('/api/developers/webhooks', (req, res) => {
  const { endpointUrl, events } = req.body;
  if (!endpointUrl) {
    return res.status(400).json({ error: 'Endpoint URL is required' });
  }

  const newWebhook = {
    id: `whk_${Date.now().toString(36)}`,
    endpointUrl,
    events: events || ['integration.connected'],
    secretMasked: `whsec_${Math.random().toString(36).substring(2, 8)}***`,
    createdAt: new Date().toISOString(),
    status: 'active' as const,
    successRate: 100.0,
  };

  developerWebhooks.unshift(newWebhook);
  res.status(201).json({ webhook: newWebhook });
});

// 5. Notifications API
app.get('/api/notifications', (req, res) => {
  res.json({ notifications });
});

app.post('/api/notifications/:id/read', (req, res) => {
  const { id } = req.params;
  notifications = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
  res.json({ message: 'Notification marked as read', notifications });
});

// ==========================================
// Vite Middleware / Production Static Serve
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GServia Platform Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
