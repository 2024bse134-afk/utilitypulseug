
-- Create utility_units table to track remaining units per user per utility
CREATE TABLE public.utility_units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  utility text NOT NULL,
  units numeric NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, utility)
);

ALTER TABLE public.utility_units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own units" ON public.utility_units
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own units" ON public.utility_units
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own units" ON public.utility_units
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all units" ON public.utility_units
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Update handle_new_user to auto-assign admin role to specific email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  -- Auto-assign admin role for specific email
  IF NEW.email = 'nabulyashadia6@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  
  -- Initialize utility units for both utilities
  INSERT INTO public.utility_units (user_id, utility, units) VALUES (NEW.id, 'electricity', 0);
  INSERT INTO public.utility_units (user_id, utility, units) VALUES (NEW.id, 'water', 0);
  
  RETURN NEW;
END;
$$;
