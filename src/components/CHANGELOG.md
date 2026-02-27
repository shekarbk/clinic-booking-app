# Clinic Booking App — Changelog

## v1.1 — Refactored Release
- Split App.js into components
- Added AdminDashboard component
- Added BookingForm component
- Added AdminLogin component
- Added AppointmentCard component
- Improved maintainability

## v1.0 — Initial Release
- Patient booking form
- Smart time slots
- Admin dashboard
- Status management
- Today filter
- Search feature
- Firebase deployment

## v1.2 — Queue Management Release

### Added
- Token-based queue system
- Walk-in patient registration with details
- "Call Next Patient" control
- Safe call-next confirmation
- Recall current patient feature
- Now Serving indicator
- Today's summary panel (Total, Pending, Completed, Cancelled)

### Improved
- Patient confirmation now shows token, date, and time
- Queue ordering based on token for today's appointments

### Technical
- Refactored into reusable React components
- Production redeployment to Firebase Hosting