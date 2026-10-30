-- Lock down write access after removing login/posting from the site
-- Run in Supabase SQL Editor
-- Also disable sign-ups: Authentication > Providers > Email > "Enable sign ups" = OFF

-- Games become read-only (existing games stay viewable)
DROP POLICY IF EXISTS "Authenticated users can create games" ON games;
DROP POLICY IF EXISTS "Users can update own games" ON games;
DROP POLICY IF EXISTS "Users can delete own games" ON games;

-- Profile names can no longer be changed
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Favorites and votes are now stored in the browser
DROP POLICY IF EXISTS "Users can manage own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can manage own actions" ON user_actions;
