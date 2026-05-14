import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, LogIn, Mail, Lock } from 'lucide-react';

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#060b1d] via-[#0b2442] to-[#060b1d] p-6 text-white">
      <form className="w-full max-w-md rounded-3xl border border-slate-700 bg-white/10 p-8 backdrop-blur">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500"><Activity size={28}/></div>
        <h1 className="text-center text-3xl font-extrabold">Selamat Datang</h1>
        <p className="mt-2 text-center text-slate-400">Masuk ke akun TrafficSense Anda</p>
        <label className="mt-8 block"><span className="text-sm font-bold text-slate-300">EMAIL</span><div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-700 bg-[#081126] px-4 py-3"><input className="w-full bg-transparent outline-none" placeholder="nama@example.com"/><Mail size={18} className="text-slate-500"/></div></label>
        <label className="mt-5 block"><span className="text-sm font-bold text-slate-300">PASSWORD</span><div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-700 bg-[#081126] px-4 py-3"><input className="w-full bg-transparent outline-none" type="password" placeholder="Masukkan password"/><Lock size={18} className="text-slate-500"/></div></label>
        <Link to="/dashboard" className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-4 font-extrabold"><LogIn size={18}/> Masuk</Link>
        <p className="mt-6 text-center text-sm text-slate-400">Belum punya akun? <span className="font-bold text-cyan-300">Daftar sekarang</span></p>
      </form>
    </main>
  );
}
