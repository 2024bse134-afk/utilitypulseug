
CREATE OR REPLACE FUNCTION public.auto_update_report_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  confirm_count integer;
  deny_count integer;
BEGIN
  SELECT 
    COUNT(*) FILTER (WHERE confirmed = true),
    COUNT(*) FILTER (WHERE confirmed = false)
  INTO confirm_count, deny_count
  FROM public.verifications
  WHERE report_id = NEW.report_id;

  -- Update the report's confirmation/denial counts
  UPDATE public.reports
  SET 
    confirmations = confirm_count,
    denials = deny_count,
    status = CASE
      WHEN confirm_count >= 3 THEN 'confirmed'
      WHEN deny_count >= 3 THEN 'resolved'
      WHEN confirm_count >= 1 THEN 'investigating'
      ELSE 'pending'
    END
  WHERE id = NEW.report_id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_verification_auto_status
AFTER INSERT ON public.verifications
FOR EACH ROW
EXECUTE FUNCTION public.auto_update_report_status();
