-- Operator-only: verify the requester's authority before executing.
-- Bind $1 to the single verified invite ID. Do not interpolate user input.
-- Removes the shared record for both participants; review that effect first.
with deleted as (
  delete from invite_sessions
  where id = $1
  returning 1
)
select count(*)::integer as deleted_count from deleted;
