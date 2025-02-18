/*
  # Initial Schema Setup for LottoAI

  1. New Tables
    - `user_credits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `credits` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `number_generations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `numbers` (integer array)
      - `is_ai_generated` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read and modify their own data
*/

-- Create user_credits table
CREATE TABLE user_credits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    credits integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

-- Create number_generations table
CREATE TABLE number_generations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    numbers integer[] NOT NULL,
    is_ai_generated boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE number_generations ENABLE ROW LEVEL SECURITY;

-- Policies for user_credits
CREATE POLICY "Users can view their own credits"
    ON user_credits
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
    ON user_credits
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

-- Policies for number_generations
CREATE POLICY "Users can view their own generations"
    ON number_generations
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own generations"
    ON number_generations
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Function to create user credits on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (new.id, 0);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user credits on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();