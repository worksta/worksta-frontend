/**
 * Worksta Backend – REST API v1 client
 * Base URL defaults to '/api/v1' and can be overridden with NEXT_PUBLIC_WORKSTA_API_BASE_URL
 *
 * Features:
 * - Class-based API client with typed methods and JSDoc
 * - Token storage (safe for SSR) using localStorage when available, else in-memory
 * - Centralized fetch wrapper with JSON handling, auth header, and APIError mapping
 * - Preflight validation for documented XOR constraints and date/time formats
 */

export type UUID = string;
export type ISODateString = string;  // "YYYY-MM-DD"
export type ISOTimeString = string;  // "HH:MM:SS"

/** Error thrown by API client on non-2xx responses or client-side validation failures */
export class APIError<T = any> extends Error {
  public status: number;
  public details?: T;
  constructor(message: string, status: number, details?: T) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
  }
}

/** Internal token storage abstraction (browser-safe) */
interface TokenStore {
  get(): string | null;
  set(token: string | null): void;
}

const TOKEN_KEY = 'worksta_jwt';

class MemoryTokenStore implements TokenStore {
  private token: string | null = null;
  get() {
    return this.token;
  }
  set(token: string | null) {
    this.token = token;
  }
}

class BrowserLocalStorageTokenStore implements TokenStore {
  get() {
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }
  set(token: string | null) {
    try {
      if (!token) {
        window.localStorage.removeItem(TOKEN_KEY);
      } else {
        window.localStorage.setItem(TOKEN_KEY, token);
      }
    } catch {
      // ignore storage errors
    }
  }
}

function createDefaultTokenStore(): TokenStore {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return new BrowserLocalStorageTokenStore();
    }
  } catch {
    // ignore
  }
  return new MemoryTokenStore();
}

/* ==============================
   API Models
   ============================== */

export interface AuthLoginRequest {
  username: string;
  password: string;
}
export interface AuthLoginResponse {
  token: string;
}
export interface AuthRegisterRequest {
  username: string;
  password: string;
  worker: boolean;
  business: boolean;
}

export interface JobApplication {
  workerID: UUID;
  accepted: boolean;
  coverMessage?: string | null;
}

export interface JobShift {
  id: UUID;
  date: ISODateString;
  startTime: ISOTimeString;
  endTime: ISOTimeString;
  hourlyRate?: number;
  fixedAmount?: number;
  available?: boolean;
  jobApplications?: JobApplication[];
}

export interface JobShiftCreate {
  date: ISODateString;
  startTime: ISOTimeString;
  endTime: ISOTimeString;
  hourlyRate?: number;
  fixedAmount?: number;
}

export interface JobPosting {
  id: UUID;
  businessId: UUID;
  title: string;
  description: string;
  location: string;
  jobRequirements?: string[];
  tags?: string[];
  shifts: JobShift[];
}

export interface JobCreateRequest {
  title: string;
  description: string;
  location: string;
  jobRequirements?: string[];
  tags?: string[];
  shifts: readonly JobShiftCreate[];
}

/** Authenticated worker's own application summary item */
export interface WorkerApplicationItem {
  shiftId: UUID;
  postingId: UUID;
  title: string;
  date: ISODateString;
  startTime: ISOTimeString;
  endTime: ISOTimeString;
  accepted: boolean;
}

export interface GetJobsParams {
  jid?: UUID;
  bid?: UUID;
  page?: number; // defaults to 0 on the backend
}

/* ==============================
   Validation helpers
   ============================== */

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}:\d{2}$/;

function xor(a: unknown, b: unknown) {
  return Boolean(a) !== Boolean(b);
}

function ensureRoleXor(payload: AuthRegisterRequest) {
  if (!xor(payload.worker, payload.business)) {
    throw new APIError('Exactly one of "worker" or "business" must be true', 400, { field: 'role' });
  }
}

function ensureShiftPricingXor(shift: JobShiftCreate, index?: number) {
  const ok = xor(shift.hourlyRate != null, shift.fixedAmount != null);
  if (!ok) {
    const where = typeof index === 'number' ? ` at shifts[${index}]` : '';
    throw new APIError(
      `Shift pricing must include exactly one of "hourlyRate" or "fixedAmount"${where}`,
      400,
      { field: 'pricing' }
    );
  }
  if (shift.hourlyRate != null && !(isFinite(shift.hourlyRate) && shift.hourlyRate >= 0)) {
    throw new APIError('hourlyRate must be a non-negative number', 400, { field: 'hourlyRate' });
  }
  if (shift.fixedAmount != null && !(isFinite(shift.fixedAmount) && shift.fixedAmount >= 0)) {
    throw new APIError('fixedAmount must be a non-negative number', 400, { field: 'fixedAmount' });
  }
}

function ensureDateTimeFormat(shift: JobShiftCreate, index?: number) {
  const where = typeof index === 'number' ? ` at shifts[${index}]` : '';
  if (!DATE_RE.test(shift.date)) {
    throw new APIError(`Invalid date format (expected YYYY-MM-DD)${where}`, 400, { field: 'date' });
  }
  if (!TIME_RE.test(shift.startTime)) {
    throw new APIError(`Invalid startTime format (expected HH:MM:SS)${where}`, 400, { field: 'startTime' });
  }
  if (!TIME_RE.test(shift.endTime)) {
    throw new APIError(`Invalid endTime format (expected HH:MM:SS)${where}`, 400, { field: 'endTime' });
  }
}

function validateJobCreateRequest(payload: JobCreateRequest) {
  if (!payload.title?.trim()) throw new APIError('title is required', 400, { field: 'title' });
  if (!payload.description?.trim()) throw new APIError('description is required', 400, { field: 'description' });
  if (!payload.location?.trim()) throw new APIError('location is required', 400, { field: 'location' });
  if (payload.tags !== undefined && !Array.isArray(payload.tags)) {
    throw new APIError('tags must be an array when provided', 400, { field: 'tags' });
  }
  if (payload.jobRequirements !== undefined && !Array.isArray(payload.jobRequirements)) {
    throw new APIError('jobRequirements must be an array when provided', 400, { field: 'jobRequirements' });
  }
  if (!Array.isArray(payload.shifts) || payload.shifts.length === 0) {
    throw new APIError('at least one shift is required', 400, { field: 'shifts' });
  }
  payload.shifts.forEach((s, i) => {
    ensureDateTimeFormat(s, i);
    ensureShiftPricingXor(s, i);
  });
}

/* ==============================
   API Client
   ============================== */

export interface WorkstaApiOptions {
  baseUrl?: string;      // defaults to '/api/v1' or env
  tokenStore?: TokenStore;
}

/**
 * Class-based API client for Worksta Backend.
 * Usage:
 *   const api = new WorkstaAPI(); // or use exported default instance `workstaApi`
 *   await api.login({ username, password });
 *   const jobs = await api.getJobs({ page: 0 });
 */
export class WorkstaAPI {
  private readonly baseUrl: string;
  private tokenStore: TokenStore;
  private tokenCache: string | null;

  constructor(options?: WorkstaApiOptions) {
    const envBase =
      (typeof process !== 'undefined' && (process as any).env && (process as any).env.NEXT_PUBLIC_WORKSTA_API_BASE_URL) ||
      (typeof process !== 'undefined' && (process as any).env && (process as any).env.NEXT_PUBLIC_API_BASE_URL);
    this.baseUrl = (options?.baseUrl || envBase || '/api/v1').replace(/\/+$/, '');
    this.tokenStore = options?.tokenStore || createDefaultTokenStore();
    this.tokenCache = this.tokenStore.get();
  }

  /** Returns the current JWT (if any) */
  getToken(): string | null {
    if (this.tokenCache) return this.tokenCache;
    const stored = this.tokenStore.get();
    this.tokenCache = stored;
    return stored;
  }

  /** Sets or clears the current JWT; persists to the underlying store */
  setToken(token: string | null) {
    this.tokenCache = token;
    this.tokenStore.set(token);
  }

  /** True when a JWT is present */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /** Remove the token locally (backend logout is stateless and always 200) */
  logout() {
    this.setToken(null);
  }

  /** Authenticate and store JWT */
  async login(payload: AuthLoginRequest, opts?: { signal?: AbortSignal }): Promise<AuthLoginResponse> {
    const res = await this.request<AuthLoginResponse>('/auth/login', {
      method: 'POST',
      body: payload,
      auth: false,
      signal: opts?.signal,
    });
    if (!res?.token) {
      throw new APIError('Malformed auth response: missing token', 500);
    }
    this.setToken(res.token);
    return res;
  }

  /** Register a user with exactly one role (worker XOR business) */
  async register(payload: AuthRegisterRequest, opts?: { signal?: AbortSignal }): Promise<void> {
    ensureRoleXor(payload);
    await this.request<void>('/auth/register', {
      method: 'POST',
      body: payload,
      auth: false,
      signal: opts?.signal,
      expectBody: false,
    });
  }

  /**
   * Fetch job postings.
   * - You may specify at most one of jid or bid.
   * - page is optional (defaults to 0 on the backend)
   */
  async getJobs(params?: GetJobsParams, opts?: { signal?: AbortSignal }): Promise<JobPosting[]> {
    if (params?.jid && params?.bid) {
      throw new APIError('Specify at most one of "jid" or "bid"', 400);
    }
    const query: Record<string, string> = {};
    if (params?.jid) query.jid = params.jid;
    if (params?.bid) query.bid = params.bid;
    if (typeof params?.page === 'number') query.page = String(params.page);

    return this.request<JobPosting[]>('/jobs/', {
      method: 'GET',
      query,
      // Attach Authorization if a token is present (default behavior)
      signal: opts?.signal,
    });
    }

  /** Create a job posting (role: BUSINESS) */
  async createJob(payload: JobCreateRequest, opts?: { signal?: AbortSignal }): Promise<JobPosting> {
    validateJobCreateRequest(payload);
    return this.request<JobPosting>('/jobs/create', {
      method: 'POST',
      body: payload,
      requireAuth: true,
      signal: opts?.signal,
    });
  }

  /** Apply to a job shift (role: WORKER) */
  async applyToShift(shiftId: UUID, payload: { coverMessage: string }, opts?: { signal?: AbortSignal }): Promise<void> {
    if (!payload?.coverMessage?.trim()) {
      throw new APIError('coverMessage is required', 400, { field: 'coverMessage' });
    }
    await this.request<void>(`/jobs/${encodeURIComponent(shiftId)}/apply/`, {
      method: 'POST',
      body: { coverMessage: payload.coverMessage },
      requireAuth: true,
      signal: opts?.signal,
      expectBody: false,
    });
  }

  /** List the authenticated worker's applications (role: WORKER) */
  async getMyApplications(opts?: { signal?: AbortSignal }): Promise<WorkerApplicationItem[]> {
    return this.request<WorkerApplicationItem[]>('/jobs/applications/mine', {
      method: 'GET',
      requireAuth: true,
      signal: opts?.signal,
    });
  }

  /** Accept a worker's application for a shift (role: BUSINESS) */
  async acceptApplication(shiftId: UUID, workerId: UUID, opts?: { signal?: AbortSignal }): Promise<void> {
    const path = `/jobs/${encodeURIComponent(shiftId)}/applications/${encodeURIComponent(workerId)}/accept`;
    await this.request<void>(path, {
      method: 'POST',
      requireAuth: true,
      signal: opts?.signal,
      expectBody: false,
    });
  }

  /* ==============================
     Low-level request helper
     ============================== */

  private buildUrl(path: string, query?: Record<string, string | number | boolean | undefined | null>) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const base = this.baseUrl;
    const url = new URL(base + normalizedPath, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    if (query) {
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          url.searchParams.set(k, String(v));
        }
      });
    }
    return base + normalizedPath + (url.search ? `?${url.searchParams.toString()}` : '');
  }

  private async request<T = any>(path: string, options: {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
    body?: any;
    query?: Record<string, string | number | boolean | undefined | null>;
    auth?: boolean;          // attach token if available (default true)
    requireAuth?: boolean;   // enforce that a token is present, else throw before request
    expectBody?: boolean;    // if false, do not attempt to parse JSON on 204/empty responses
    signal?: AbortSignal;
    headers?: Record<string, string>;
  } = {}): Promise<T> {
    const method = options.method || 'GET';
    const auth = options.auth !== false; // default attach token if present
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    const token = this.getToken();
    if (auth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (options.requireAuth && !token) {
      throw new APIError('Missing auth token. Please login first.', 401);
    }

    const url = this.buildUrl(path, options.query);

    const resp = await fetch(url, {
      method,
      headers,
      body: method === 'GET' || method === 'HEAD' ? undefined : (options.body !== undefined ? JSON.stringify(options.body) : undefined),
      signal: options.signal,
    });

    const contentType = resp.headers.get('content-type') || '';
    const isJson = contentType.toLowerCase().includes('application/json');

    // Handle non-2xx
    if (!resp.ok) {
      let errorBody: any = undefined;
      try {
        errorBody = isJson ? await resp.json() : await resp.text();
      } catch {
        // ignore parse errors
      }

      if (resp.status === 401 && options.requireAuth) {
        // Token might be invalid; drop it to avoid loops
        this.setToken(null);
      }

      const message =
        (errorBody && typeof errorBody === 'object' && (errorBody.message || errorBody.error)) ||
        (typeof errorBody === 'string' && errorBody) ||
        `Request failed with status ${resp.status}`;

      throw new APIError(message, resp.status, errorBody);
    }

    if (options.expectBody === false || resp.status === 204) {
      // Some endpoints intentionally return empty body
      return undefined as unknown as T;
    }

    // Parse JSON or return void if empty
    if (isJson) {
      return (await resp.json()) as T;
    }

    // If not JSON but OK, return as text (typed as any)
    const text = await resp.text();
    return text as unknown as T;
  }
}

/* Default instance for convenience */
export const workstaApi = new WorkstaAPI();
export default WorkstaAPI;