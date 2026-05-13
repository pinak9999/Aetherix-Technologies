# Security Specification: Aetherix Technologies

## Data Invariants
1. A user profile can only be created/updated by the authenticated user matching the UID.
2. Only Admins can read contacts, career applications, and demo bookings in bulk.
3. Blog posts can be read by anyone if `published` is true, but created/updated only by admins.
4. Newsletter subscriptions can be created by anyone, but read only by admins.

## The Dirty Dozen Payloads
1. **Identity Theft**: Creating a User profile with a different UID.
2. **Privilege Escalation**: Setting `role: 'admin'` on a User profile as a non-admin.
3. **Data Pollution**: Injecting a 1MB string into a contact message.
4. **ID Poisoning**: Using `../` or long junk strings as document IDs.
5. **Unauthorized Access**: Fetching all contact requests as a guest user.
6. **State Hijacking**: Changing a CareerApplication status from 'applied' to 'hired' as a candidate.
7. **Orphaned Writes**: Creating a CareerApplication for a non-existent Job ID (handled logic side, but rules can verify).
8. **PII Leak**: Reading another user's profile info.
9. **Spamming**: Creating thousands of newsletter subscriptions (Rate limiting is backend/app level, but schema enforcement helps).
10. **Shadow Updates**: Adding a `verified: true` field to a User profile during update.
11. **Draft Leak**: Accessing unpublished blog posts as a guest.
12. **Timestamp Spoofing**: Setting a future `createdAt` from the client.

## Test Runner (Conceptual)
All tests below expect PERMISSION_DENIED for unauthorized operations.
- `create /users/NOT_ME { data: { uid: 'ME' } }` -> Deny
- `update /users/ME { data: { role: 'admin' } }` -> Deny
- `get /contacts/ANY` as Guest -> Deny
- `list /demoBookings` as non-Admin -> Deny
- `update /blogPosts/1 { data: { title: 'Hacked' } }` as non-Admin -> Deny
