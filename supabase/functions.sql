-- Helper functions for game statistics
-- Run in Supabase SQL Editor

-- Increment views
CREATE OR REPLACE FUNCTION increment_views(game_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE games SET views = views + 1 WHERE id = game_id;
END;
$$ LANGUAGE plpgsql;

-- Increment likes
CREATE OR REPLACE FUNCTION increment_likes(game_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE games SET likes = likes + 1 WHERE id = game_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement likes
CREATE OR REPLACE FUNCTION decrement_likes(game_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE games SET likes = GREATEST(0, likes - 1) WHERE id = game_id;
END;
$$ LANGUAGE plpgsql;

-- Increment dislikes
CREATE OR REPLACE FUNCTION increment_dislikes(game_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE games SET dislikes = dislikes + 1 WHERE id = game_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement dislikes
CREATE OR REPLACE FUNCTION decrement_dislikes(game_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE games SET dislikes = GREATEST(0, dislikes - 1) WHERE id = game_id;
END;
$$ LANGUAGE plpgsql;
