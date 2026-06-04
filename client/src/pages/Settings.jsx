import React, { useMemo, useState } from 'react';
import {
  Globe,
  Moon,
  RefreshCw,
  Save,
  Sun,
  Monitor,
  Settings as Gear,
  Clock,
  Laptop,
} from 'lucide-react';

import { useLanguage } from '../Context/LanguageContext.jsx';
import { useTheme } from '../Context/ThemeContext.jsx';
import { useTimezone, TIMEZONE_OPTIONS } from '../Context/TimezoneContext.jsx';
import { useDateFormat, DATE_FORMAT_OPTIONS } from '../Context/DateFormatContext.jsx';

const tabs = ['Akun', 'Model AI'];

// ─── Token tema terpusat ───────────────────────────────────────────────────
function useTokens(isDark) {
  return {
    page: isDark
      ? 'bg-[#060d1f] text-white'
      : 'bg-gray-50 text-slate-900',

    card: isDark
      ? 'bg-[#0b1228] border border-slate-700'
      : 'bg-white border border-gray-200',

    tabBar: isDark
      ? 'border-slate-700 bg-[#0b1228]'
      : 'border-gray-200 bg-white',

    tabActive: isDark
      ? 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/40'
      : 'bg-cyan-50 text-cyan-600 ring-1 ring-cyan-400',

    tabInactive: isDark
      ? 'text-slate-400 hover:bg-slate-800'
      : 'text-slate-500 hover:bg-gray-100',

    heading: isDark
      ? 'text-white'
      : 'text-slate-800',

    subtext: isDark
      ? 'text-slate-400'
      : 'text-slate-500',

    input: isDark
      ? 'bg-slate-800 border-slate-700 text-white'
      : 'bg-gray-50 border-gray-300 text-slate-900',

    row: isDark
      ? 'bg-slate-800/70 border border-slate-700'
      : 'bg-gray-50 border border-gray-200',

    divider: isDark
      ? 'border-slate-700'
      : 'border-gray-200',

    themeBtn: (active) =>
      active
        ? isDark
          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
          : 'border-cyan-500 bg-cyan-50 text-cyan-600'
        : isDark
          ? 'border-slate-700 bg-slate-900/30 text-slate-400'
          : 'border-gray-200 bg-white text-slate-500',

    systemInfo: isDark
      ? 'border-slate-700 bg-slate-800/70 text-slate-300'
      : 'border-cyan-200 bg-cyan-50 text-slate-600',

    deteksiOn: isDark
      ? 'border-slate-600 bg-slate-800 text-white'
      : 'border-gray-300 bg-white text-slate-800',

    deteksiOff: isDark
      ? 'border-slate-800 bg-slate-950/40 text-slate-500'
      : 'border-gray-100 bg-gray-50 text-slate-400',

    saveBtn:
      'flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 font-bold text-white hover:opacity-90 transition-opacity',

    resetBtn: isDark
      ? 'flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-bold text-slate-400 hover:border-slate-500 hover:text-white transition-colors'
      : 'flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-bold text-slate-500 hover:border-gray-400 transition-colors',
  };
}

// ─── Root ──────────────────────────────────────────────────────────────────
export default function Settings() {
  const { lang, setLang, t } = useLanguage();
  const { themeMode, setThemeMode, activeTheme, isDark } = useTheme();
  const { timezone, setTimezone } = useTimezone();
  const { dateFormat, setDateFormat } = useDateFormat();
  const [tab, setTab] = useState(0);

  const autoTheme = useMemo(() => {
    const h = new Date().getHours();
    return h >= 6 && h < 18 ? 'Light' : 'Dark';
  }, []);

  const tk = useTokens(isDark);

  const tabLabels = t?.tabs?.slice(0, 2) || tabs;

  return (
    <div className={`min-h-full space-y-5 p-5 transition-colors duration-300 ${tk.page}`}>
      {/* Tab bar */}
      <div className={`flex flex-wrap gap-2 rounded-2xl border p-2 transition-colors ${tk.tabBar}`}>
        {tabLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`rounded-xl px-5 py-3 font-bold transition-all ${
              tab === i ? tk.tabActive : tk.tabInactive
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 0 && (
        <Akun
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          autoTheme={autoTheme}
          activeTheme={activeTheme}
          isDark={isDark}
          tk={tk}
          t={t}
          lang={lang}
          setLang={setLang}
          timezone={timezone}
          setTimezone={setTimezone}
          dateFormat={dateFormat}
          setDateFormat={setDateFormat}
        />
      )}

      {tab === 1 && (
        <ModelAI
          isDark={isDark}
          tk={tk}
          t={t}
        />
      )}
    </div>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────
function Section({ title, icon, children, tk }) {
  return (
    <section className={`rounded-2xl p-5 transition-colors ${tk.card}`}>
      <h3 className={`mb-6 flex items-center gap-2 text-xl font-extrabold ${tk.heading}`}>
        {icon}
        {title}
      </h3>
      {children}
    </section>
  );
}

// ─── Tab: Akun ─────────────────────────────────────────────────────────────
function Akun({
  themeMode,
  setThemeMode,
  autoTheme,
  activeTheme,
  isDark,
  tk,
  t,
  lang,
  setLang,
  timezone,
  setTimezone,
  dateFormat,
  setDateFormat,
}) {
  const a = t.akun;

  const themeOptions = [
    ['Dark', Moon, a.dark, a.darkSub],
    ['Light', Sun, a.light, a.lightSub],
    ['System', Laptop, a.system, a.systemSub],
  ];

  return (
    <div className="space-y-5">
      <Section
        title={a.sectionTitle}
        icon={<Monitor size={18} className="text-cyan-400" />}
        tk={tk}
      >
        {/* Tema */}
        <p className={`mb-3 text-sm ${tk.subtext}`}>
          {a.temaLabel}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {themeOptions.map(([name, Icon, label, sub]) => (
            <button
              key={name}
              onClick={() => setThemeMode(name)}
              className={`rounded-xl border p-6 text-center transition-all ${
                tk.themeBtn(themeMode === name)
              }`}
            >
              <Icon className="mx-auto mb-3" size={24} />
              <b>{label}</b>
              <p className="mt-1 text-sm">{sub}</p>
            </button>
          ))}
        </div>

        {/* Info System mode */}
        {themeMode === 'System' && (
          <div className={`mt-4 rounded-xl border p-4 text-sm transition-colors ${tk.systemInfo}`}>
            <b className="text-cyan-400">{a.systemInfo}</b>{' '}
            ☀️ Light (06:00–18:00) • 🌙 Dark (18:00–06:00)
            <br />
            <span className="mt-1 inline-block">
              {a.systemActive}{' '}
              <strong className="text-cyan-400">
                {activeTheme || autoTheme}
              </strong>
            </span>
          </div>
        )}

        {/* Bahasa / Timezone / Format */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {/* Bahasa */}
          <div>
            <p className={`mb-2 flex items-center gap-1.5 text-sm ${tk.subtext}`}>
              <Globe size={14} />
              {a.bahasa}
            </p>

            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 font-semibold outline-none transition-colors focus:ring-1 focus:ring-cyan-400 ${tk.input}`}
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English (US)</option>

            </select>
          </div>

          {/* Timezone */}
          <div>
            <p className={`mb-2 flex items-center gap-1.5 text-sm ${tk.subtext}`}>
              <Clock size={14} />
              {a.timezone}
            </p>

            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 font-semibold outline-none transition-colors focus:ring-1 focus:ring-cyan-400 ${tk.input}`}
            >
              {TIMEZONE_OPTIONS.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {/* Format Tanggal */}
          <div>
            <p className={`mb-2 flex items-center gap-1.5 text-sm ${tk.subtext}`}>
              {a.dateFormat}
            </p>

            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 font-semibold outline-none transition-colors focus:ring-1 focus:ring-cyan-400 ${tk.input}`}
            >
              {DATE_FORMAT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      {/* Privasi */}
      <Section
        title={a.privacyTitle}
        icon={<Monitor size={18} className="text-cyan-400" />}
        tk={tk}
      >
        <div className="space-y-3">
          <Row
            title={a.telemetri}
            sub={a.telemetriSub}
            on
            tk={tk}
          />

          <div className={`flex flex-col justify-between gap-4 rounded-xl p-4 sm:flex-row sm:items-center ${tk.row}`}>
            <div>
              <p className={`font-bold ${tk.heading}`}>
                {a.downloadData}
              </p>
              <p className={`text-sm ${tk.subtext}`}>
                {a.downloadSub}
              </p>
            </div>

            <button
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                isDark
                  ? 'border-slate-600 text-white hover:bg-slate-700'
                  : 'border-gray-300 text-slate-700 hover:bg-gray-100'
              }`}
            >
              {a.downloadBtn}
            </button>
          </div>
        </div>
      </Section>

      <SaveButtons tk={tk} t={t} />
    </div>
  );
}

// ─── Tab: Model AI ─────────────────────────────────────────────────────────
function ModelAI({ isDark, tk, t }) {
  const m = t.modelAI;

  return (
    <div className="space-y-5">
      <Section
        title={m.deteksiTitle}
        icon={<Gear size={18} className="text-cyan-400" />}
        tk={tk}
      >
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { label: 'Motor', color: 'bg-cyan-400', on: true },
            { label: 'Mobil', color: 'bg-emerald-400', on: true },
            { label: 'Bus', color: 'bg-amber-400', on: true },
            { label: 'Truk', color: 'bg-violet-400', on: true },
            { label: 'Sepeda', color: 'bg-slate-500', on: false },
            { label: 'Pejalan Kaki', color: 'bg-slate-500', on: false },
            { label: 'Ambulans', color: 'bg-rose-400', on: true },
            { label: 'Polisi', color: 'bg-slate-500', on: false },
          ].map(({ label, color, on }) => (
            <button
              key={label}
              className={`rounded-xl border px-4 py-3 text-left transition-all ${
                on ? tk.deteksiOn : tk.deteksiOff
              }`}
            >
              <span className={`mr-2 inline-block h-3 w-3 rounded-full ${color}`} />
              {label}
            </button>
          ))}
        </div>
      </Section>

      <SaveButtons tk={tk} t={t} />
    </div>
  );
}

// ─── Primitives ────────────────────────────────────────────────────────────
function InfoField({ label, value, tk }) {
  return (
    <div className={`rounded-xl p-4 transition-colors ${tk.row}`}>
      <p className={`text-xs ${tk.subtext}`}>
        {label}
      </p>
      <p className={`mt-1 font-semibold ${tk.heading}`}>
        {value}
      </p>
    </div>
  );
}

function SelectField({ label, icon, children, tk }) {
  return (
    <label>
      <p className={`mb-2 flex items-center gap-1.5 text-sm ${tk.subtext}`}>
        {icon}
        {label}
      </p>

      <select
        className={`w-full rounded-xl border px-4 py-3 font-semibold outline-none transition-colors focus:ring-1 focus:ring-cyan-400 ${tk.input}`}
      >
        {children}
      </select>
    </label>
  );
}

function Slider({ label, value, min, max, step, onChange, tk }) {
  return (
    <div>
      <p className={`mb-3 text-sm ${tk.subtext}`}>
        {label}:{' '}
        <b className="text-cyan-400">
          {step < 1 ? value.toFixed(2) : value}
        </b>
      </p>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) =>
          onChange(
            step < 1
              ? parseFloat(e.target.value)
              : parseInt(e.target.value)
          )
        }
        className="w-full accent-cyan-400"
      />

      <div className={`mt-1 flex justify-between text-xs ${tk.subtext}`}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function Toggle({ on = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-7 w-12 flex-shrink-0 items-center rounded-full p-1 transition-all ${
        on ? 'justify-end bg-cyan-400' : 'justify-start bg-slate-600'
      }`}
    >
      <i className="h-5 w-5 rounded-full bg-white shadow" />
    </button>
  );
}

function Row({ title, sub, on = false, onClick, tk }) {
  return (
    <div className={`flex items-center justify-between rounded-xl p-4 transition-colors ${tk.row}`}>
      <div>
        <p className={`font-bold ${tk.heading}`}>
          {title}
        </p>
        <p className={`text-sm ${tk.subtext}`}>
          {sub}
        </p>
      </div>

      <Toggle on={on} onClick={onClick} />
    </div>
  );
}

function SaveButtons({ tk, t }) {
  return (
    <div className="flex gap-3">
      <button className={tk.saveBtn}>
        <Save size={16} />
        {t.save}
      </button>

      <button className={tk.resetBtn}>
        <RefreshCw size={16} />
        {t.reset}
      </button>
    </div>
  );
}