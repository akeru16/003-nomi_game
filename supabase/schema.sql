-- Supabase Database Schema for のみげーむ
-- Run this SQL in Supabase SQL Editor

-- 1. Profiles Table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- 2. Games Table
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  rules TEXT[] NOT NULL,
  materials TEXT[],
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  weekly_likes INTEGER DEFAULT 0,
  tags TEXT[] NOT NULL,
  posted_by UUID REFERENCES auth.users, -- NULL = system game
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Games are viewable by everyone"
  ON games FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create games"
  ON games FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own games"
  ON games FOR UPDATE
  USING (auth.uid() = posted_by);

CREATE POLICY "Users can delete own games"
  ON games FOR DELETE
  USING (auth.uid() = posted_by);

-- 3. Favorites Table
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  game_id INTEGER REFERENCES games NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, game_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own favorites"
  ON favorites FOR ALL
  USING (auth.uid() = user_id);

-- 4. User Actions Table (likes/dislikes)
CREATE TABLE user_actions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  game_id INTEGER REFERENCES games NOT NULL,
  action VARCHAR(10) CHECK (action IN ('like', 'dislike')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, game_id)
);

ALTER TABLE user_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own actions"
  ON user_actions FOR ALL
  USING (auth.uid() = user_id);

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (new.id, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
