# Mind Buddy - Project TODO

## Database & Schema
- [x] Design and implement database schema (users, moods, chat_messages, trusted_contacts, habits, community_posts, support_resources, notifications, weekly_reports)
- [x] Create Drizzle migrations and apply to database
- [ ] Set up query helpers in server/db.ts

## Authentication & Profile
- [x] Implement Manus OAuth login flow (template built-in)
- [x] Create User Profile page with avatar, name, and wellbeing stats
- [x] Implement logout functionality
- [ ] Add profile edit/update feature

## Core UI & Navigation
- [x] Design premium dark-purple-to-teal gradient theme
- [x] Create mobile-first app shell (max-w-sm centered)
- [x] Implement bottom navigation bar with 5-6 primary routes
- [x] Add smooth page transitions
- [x] Create reusable layout components

## Emotion Check-in & Mood Tracking
- [x] Create Emotion Check-in page with emoji/slider mood input
- [ ] Implement mood logging to database
- [ ] Create Mood History page with visual trend charts (Recharts)
- [ ] Add mood filtering and date range selection
- [ ] Display weekly/monthly mood statistics

## AI Chat Companion
- [x] Create Chat page with message history UI
- [ ] Implement tRPC procedure for LLM-powered chat
- [x] Add message streaming/typing indicators
- [ ] Implement emotion detection in user messages
- [ ] Add coping strategy suggestions from AI
- [ ] Create chat history persistence

## Crisis Alert System
- [ ] Implement distress detection algorithm in chat/check-ins
- [x] Create Crisis Alert modal/page with emergency resources (on Home page)
- [ ] Add prominent SOS button with confirmation dialog
- [ ] Display hotlines and crisis resources (hardcoded or fetched)
- [ ] Trigger Trusted Circle notifications on SOS
- [ ] Add crisis resources database table

## Trusted Circle
- [ ] Create Trusted Circle management page
- [ ] Implement add/remove trusted contact functionality
- [ ] Add contact notification preference settings (email/in-app)
- [ ] Create in-app notification system
- [ ] Implement email notification sending (via Manus API or external service)
- [ ] Display notification history for contacts

## Habit Builder
- [ ] Create Habit Builder page with daily micro-habits
- [ ] Implement habit streak tracking
- [ ] Add breathing exercises, gratitude journaling, hydration reminders
- [ ] Create habit completion logging
- [ ] Display habit streaks and progress visualization
- [ ] Add habit reminders/notifications

## Community Space
- [x] Create anonymous Community Feed page
- [x] Implement anonymous post creation
- [x] Add supportive reactions (emoji reactions)
- [ ] Implement reply/comment system
- [ ] Add content moderation (toxicity detection)
- [x] Create community post database schema

## Local Support Finder
- [ ] Integrate Google Maps API
- [ ] Create Support Finder page with map view
- [ ] Implement geolocation to get user location
- [ ] Add search/filter for support resources (clinics, counselors, groups)
- [ ] Display resource details (address, phone, hours)
- [ ] Populate support resources database

## Burnout Prediction Dashboard
- [x] Create Dashboard page with wellbeing score calculation
- [ ] Implement weekly score based on mood logs and habit streaks
- [x] Add visual burnout risk indicator
- [x] Display trend analysis and insights
- [ ] Integrate with AI for personalized recommendations

## Weekly Reports & Insights
- [ ] Create Weekly Report generation procedure (LLM-powered)
- [ ] Implement mood trend summary
- [ ] Add habit streak summary
- [ ] Generate personalized coping strategies
- [ ] Create motivational messages
- [ ] Schedule weekly report generation (cron or on-demand)

## Notifications System
- [ ] Create in-app notification UI component
- [ ] Implement notification center page
- [ ] Add email notification integration
- [ ] Create notification preferences settings
- [ ] Implement notification persistence in database

## Testing & Polish
- [ ] Write vitest tests for all tRPC procedures
- [ ] Test mobile responsiveness across devices
- [ ] Test all user flows end-to-end
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Accessibility audit (keyboard nav, screen readers)
- [ ] Error handling and user feedback (toasts, error messages)
- [ ] Loading states and skeleton screens

## Deployment & GitHub
- [ ] Create GitHub repository
- [ ] Set up GitHub Actions CI/CD (optional)
- [ ] Create comprehensive README with setup instructions
- [ ] Document API endpoints and database schema
- [ ] Add environment variable documentation
- [ ] Create deployment guide

## Completed Features
(none yet)
