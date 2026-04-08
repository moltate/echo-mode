# Echo

**Controlled anonymity. Ephemeral. Safe.**

A structured, ephemeral anonymous interaction system with built-in behavioral safeguards for safe, meaningful conversations.

## ✨ Core Features

- One-screen safety explainer on landing
- Mood + Intent selection (8+ predefined cards)
- Instant matching with 30-second fallback to listener mode
- 12-minute server-synced timed chat rooms
- Real-time text-only chat with strict content filtering
- Automatic message & room deletion at timer end
- Device fingerprinting + reputation system for abuse prevention
- No profiles, no history, no persistent data — everything disappears forever
- Full Row Level Security (RLS) on Supabase

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (Anonymous Auth, Postgres, Realtime)
- **Security**: FingerprintJS + SHA-256 device hashing, keyword + regex content filter, reputation scoring
- **UI**: Mobile-first, responsive design with visible countdown timer and safety banners everywhere

## 🚀 Quick Start (Local Development)

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the complete schema below
3. Copy these three values from your Supabase dashboard:
   - Project URL
   - `anon` public key
   - `service_role` key

### 2. Run Locally

```bash
git clone https://github.com/moltate/echo-mode.git
cd echo-mode

npm install