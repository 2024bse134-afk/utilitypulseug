CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, district, town_village)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'district', ''),
    COALESCE(NEW.raw_user_meta_data->>'town_village', '')
  );
  
  IF NEW.email = 'nabulyashadia6@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  
  INSERT INTO public.utility_units (user_id, utility, units) VALUES (NEW.id, 'electricity', 0);
  INSERT INTO public.utility_units (user_id, utility, units) VALUES (NEW.id, 'water', 0);
  
  RETURN NEW;
END;
$function$;